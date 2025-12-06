import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutRequest {
  items: CartItem[];
  customerEmail?: string;
  shippingInfo?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[CHECKOUT] Starting checkout process");
    
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    // Initialize Supabase client for price validation
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration is missing");
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { items, customerEmail, shippingInfo } = await req.json() as CheckoutRequest;
    
    if (!items || items.length === 0) {
      throw new Error("No items in cart");
    }

    // Input validation - basic checks
    const MAX_QUANTITY = 100;
    const MAX_ITEMS = 50;
    
    if (items.length > MAX_ITEMS) {
      throw new Error(`Too many items in cart (max ${MAX_ITEMS})`);
    }
    
    for (const item of items) {
      if (!item.productId || typeof item.productId !== 'string') {
        throw new Error("Invalid product ID");
      }
      if (typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > MAX_QUANTITY || !Number.isInteger(item.quantity)) {
        throw new Error(`Invalid quantity for item`);
      }
    }

    console.log("[CHECKOUT] Validating prices against database for", items.length, "items");

    // SERVER-SIDE PRICE VALIDATION: Fetch actual prices from database
    const productIds = items.map(item => item.productId);
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, price, sale_price, in_stock, images')
      .in('id', productIds);

    if (productsError) {
      console.error("[CHECKOUT] Database error:", productsError);
      throw new Error("Failed to validate product prices");
    }

    if (!products || products.length === 0) {
      throw new Error("No valid products found");
    }

    // Create a map of product ID to product data for quick lookup
    const productMap = new Map(products.map(p => [p.id, p]));

    // Validate each item and build line items with SERVER-SIDE prices
    const lineItems = [];
    for (const item of items) {
      const product = productMap.get(item.productId);
      
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      
      if (!product.in_stock) {
        throw new Error(`Product out of stock: ${product.name}`);
      }

      // Use ACTUAL price from database (sale_price if available, otherwise regular price)
      const actualPrice = product.sale_price ?? product.price;
      
      console.log(`[CHECKOUT] Product ${product.name}: client price $${item.price}, actual price $${actualPrice}`);
      
      // Log if client price differs from actual (potential manipulation attempt)
      if (Math.abs(item.price - actualPrice) > 0.01) {
        console.warn(`[CHECKOUT] PRICE MISMATCH DETECTED for ${product.name}: client sent $${item.price}, actual is $${actualPrice}`);
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.images && product.images.length > 0 ? [product.images[0]] : [],
          },
          unit_amount: Math.round(actualPrice * 100), // Use SERVER-SIDE price
        },
        quantity: item.quantity,
      });
    }

    // Add shipping as a line item
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping",
          images: [],
        },
        unit_amount: 999, // $9.99 shipping
      },
      quantity: 1,
    });

    console.log("[CHECKOUT] Price validation complete, creating Stripe session");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const origin = req.headers.get("origin") || "http://localhost:5173";
    
    // Check for existing customer
    let customerId: string | undefined;
    const email = shippingInfo?.email || customerEmail;
    
    if (email) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        console.log("[CHECKOUT] Found existing customer:", customerId);
      }
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'PK', 'IN', 'AE', 'SA'],
      },
      metadata: {
        items: JSON.stringify(items.map(i => ({ id: i.productId, qty: i.quantity }))),
      },
    });

    console.log("[CHECKOUT] Session created:", session.id);

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[CHECKOUT] Error:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

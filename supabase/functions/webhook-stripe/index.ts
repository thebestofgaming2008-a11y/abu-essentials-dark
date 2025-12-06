import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }
    
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET not configured - webhook verification required");
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("Missing stripe-signature header");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const body = await req.text();

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log("[WEBHOOK] Event received:", event.type);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log("[WEBHOOK] Processing completed checkout:", session.id);

      const shipping = session.shipping_details;
      const items = session.metadata?.items ? JSON.parse(session.metadata.items) : [];
      
      // Calculate totals
      const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.qty), 0);
      const shippingCost = 9.99;
      const total = subtotal + shippingCost;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          status: "paid",
          subtotal,
          shipping_cost: shippingCost,
          total,
          shipping_name: shipping?.name || session.customer_details?.name,
          shipping_email: session.customer_details?.email,
          shipping_phone: session.customer_details?.phone,
          shipping_address: shipping?.address ? 
            `${shipping.address.line1}${shipping.address.line2 ? ', ' + shipping.address.line2 : ''}` : null,
          shipping_city: shipping?.address?.city,
          shipping_country: shipping?.address?.country,
        })
        .select()
        .single();

      if (orderError) {
        console.error("[WEBHOOK] Error creating order:", orderError);
        throw orderError;
      }

      console.log("[WEBHOOK] Order created:", order.id);

      // Create order items
      for (const item of items) {
        await supabase.from("order_items").insert({
          order_id: order.id,
          product_id: item.name, // Using name as ID since we don't have product IDs
          product_name: item.name,
          quantity: item.qty,
          price: item.price,
        });
      }

      console.log("[WEBHOOK] Order items created");
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[WEBHOOK] Error:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

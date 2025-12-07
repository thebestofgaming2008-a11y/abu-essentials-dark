# Abu Hurayrah Islamic E-Commerce Store - Complete Rebuild Guide

## 🎯 COPY THIS ENTIRE PROMPT TO YOUR NEW LOVABLE PROJECT

---

## STEP 1: INITIAL PROMPT (Copy this first)

```
Build me a professional Islamic e-commerce store called "Abu Hurayrah" (also known as Maktabah Abu Hurayrah). Follow these EXACT specifications:

## PROJECT OVERVIEW
- Store Name: Abu Hurayrah / Maktabah Abu Hurayrah
- Purpose: Sell Islamic books, clothing, and luxury gift items
- Target Market: Muslims in India
- Currency: Indian Rupees (₹ INR) - ALL prices must display in INR
- Tech Stack: React + TypeScript + Tailwind CSS + Shadcn/ui + Supabase + Stripe

## BRAND IDENTITY

### Font (CRITICAL - Use this EXACT font)
- Font Family: "Philosopher" from Google Fonts
- Apply to ALL text throughout the site
- Headings: font-weight 700 (bold)
- Body: font-weight 400 (regular)
- Add this import to index.html: <link href="https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap" rel="stylesheet">

### Color Palette (HSL Format - Add to index.css :root)
--background: 209 40% 96%;          /* Light gray-blue */
--foreground: 222 47% 11%;          /* Dark navy text */
--card: 210 40% 98%;                /* White cards */
--card-foreground: 222 47% 11%;
--primary: 217 32% 17%;             /* Dark blue-gray - main brand */
--primary-foreground: 204 100% 97%; /* Light text on primary */
--secondary: 215 24% 26%;           /* Secondary blue-gray */
--secondary-foreground: 210 40% 98%;
--muted: 215 20% 65%;               /* Muted gray */
--muted-foreground: 222 47% 11%;
--accent: 210 40% 98%;
--accent-foreground: 215 19% 34%;
--destructive: 0 72% 50%;           /* Red for sales/errors */
--destructive-foreground: 0 85% 97%;
--border: 212 26% 83%;
--input: 212 26% 83%;
--ring: 200 98% 39%;
--radius: 0.5rem;

### Hero Section Content
- Badge text: "Authentic Islamic Resources"
- Main Headline: "Islamic Essentials for Daily Life"
- Sub-headline: "Rooted in the Sunnah. Chosen with care. Built to serve your worship, knowledge, and everyday practice."
- Primary CTA: "Explore Essentials" → links to /shop
- Secondary CTA: "Learn About the Brand" → links to /contact

## PAGES REQUIRED (with routes)

1. **Homepage (/)** 
   - Header with logo, navigation, search, cart icon with count
   - Customs notice bar (dismissable): "International orders may be subject to customs duties"
   - Hero section with headline, sub-headline, CTAs, and featured book image
   - Featured products grid (4 items)
   - Category carousel with navigation arrows (12 categories)
   - Bundle deals section (4 bundles)
   - More products section
   - Footer with links

2. **Shop Page (/shop)**
   - Accepts query params: ?category=books OR ?search=tafsir
   - Category sidebar filter on desktop
   - Search bar
   - Product grid with cards
   - Sorting dropdown

3. **Product Detail (/product/:id)**
   - Image gallery with thumbnails
   - Product name, price (with sale price if applicable)
   - Description, rating, reviews count
   - Add to Cart button with quantity selector
   - Related products section
   - Auto-scroll to top on page load

4. **Cart Page (/cart)**
   - List of cart items with images
   - Quantity +/- controls
   - Remove item button
   - Subtotal, Shipping (₹99), Total
   - Free shipping message if under ₹2000
   - Proceed to Checkout button

5. **Checkout Page (/checkout)**
   - Shipping form: Full Name, Email, Phone, Address, City, Country
   - Order summary sidebar
   - Pay with Stripe button

6. **Checkout Success (/checkout-success)**
   - Thank you message
   - Order confirmation

7. **Auth Page (/auth)**
   - Login tab and Signup tab
   - Email + Password fields
   - Full Name field for signup
   - Redirect to home after auth

8. **Admin Page (/admin)** - Protected, admin role only
   - View all orders in a table
   - Update order status dropdown
   - Product management (add/edit/delete)

9. **Legal Pages:**
   - /contact - Contact form
   - /shipping-policy
   - /terms
   - /privacy-policy  
   - /cancellations-refunds

## PRODUCT CATEGORIES (12 total)
1. Tafsir (Quran commentary)
2. Hadith (Prophetic traditions) 
3. Aqeedah (Islamic creed)
4. Fiqh (Islamic jurisprudence)
5. Seerah (Prophet's biography)
6. Women (books for Muslim women)
7. Children (Islamic education for kids)
8. Arabic (Arabic language learning)
9. Urdu (Urdu language books)
10. Spirituality (Soul purification)
11. Clothing (Islamic attire)
12. Gifts (Luxury Islamic items)

## KEY FEATURES TO IMPLEMENT

1. **Currency Formatting** - Create utility function:
   formatPrice(price: number): string that returns ₹XX,XXX format using Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })

2. **Cart Context** - Persist to localStorage:
   - addToCart(product, quantity)
   - removeFromCart(productId)
   - updateQuantity(productId, quantity)
   - getTotal()
   - getItemCount()

3. **Auth Context** - Using Supabase:
   - signIn(email, password)
   - signUp(email, password, fullName)
   - signOut()
   - user state
   - isAdmin check (from user_roles table)

4. **Product Card Component:**
   - Image with hover zoom
   - Badge (Bestseller, Sale, Popular, etc)
   - Product name (2 lines max, truncate)
   - Star rating (filled/empty stars)
   - Price with sale price strikethrough
   - Add to Cart button

5. **Responsive Design:**
   - Mobile hamburger menu
   - Grid: 1 col mobile, 2 col tablet, 4 col desktop
   - Touch-friendly buttons

Start by creating the database schema, then build the pages in order. Enable Supabase auth with auto-confirm emails.
```

---

## STEP 2: DATABASE SCHEMA (Give this after initial setup)

```
Create these database tables with the following SQL migration:

-- Enums
CREATE TYPE app_role AS ENUM ('admin', 'customer');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled');

-- Products Table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  sale_price NUMERIC,
  category TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  rating NUMERIC DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  status order_status DEFAULT 'pending',
  subtotal NUMERIC NOT NULL,
  shipping_cost NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL,
  shipping_name TEXT,
  shipping_email TEXT,
  shipping_phone TEXT,
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_country TEXT,
  notes TEXT,
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User Roles Table (CRITICAL: Roles must be separate from profiles!)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role DEFAULT 'customer',
  UNIQUE(user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Handle new user signup - auto-create profile and assign customer role
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  
  INSERT INTO user_roles (user_id, role)
  VALUES (NEW.id, 'customer');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS Policies for Products
CREATE POLICY "Products are publicly readable" ON products FOR SELECT USING (true);
CREATE POLICY "Admins can insert products" ON products FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products" ON products FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON products FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for Orders
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK ((auth.uid() = user_id) OR (user_id IS NULL));
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (
  CASE WHEN user_id IS NULL THEN has_role(auth.uid(), 'admin')
  ELSE auth.uid() = user_id END
);
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for Order Items
CREATE POLICY "Users can create own order items" ON order_items FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND ((orders.user_id = auth.uid()) OR (orders.user_id IS NULL))));
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT 
USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Admins can view all order items" ON order_items FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for User Roles
CREATE POLICY "Users can view own role" ON user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON user_roles FOR SELECT USING (has_role(auth.uid(), 'admin'));
```

---

## STEP 3: STRIPE INTEGRATION (Give this after pages are built)

```
Set up Stripe payment integration with Indian Rupees (INR).

1. First, add the STRIPE_SECRET_KEY secret

2. Create edge function: create-checkout

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, customerEmail, shippingInfo, shippingCost = 99 } = await req.json();
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Validate products exist and get correct prices
    const productIds = items.map((item: any) => item.id);
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, price, sale_price, in_stock")
      .in("id", productIds);

    if (productsError) throw productsError;

    // Build line items with validated prices
    const lineItems = items.map((item: any) => {
      const product = products?.find((p: any) => p.id === item.id);
      if (!product) throw new Error(`Product ${item.id} not found`);
      
      const price = product.sale_price || product.price;
      return {
        price_data: {
          currency: "inr",
          product_data: { name: product.name },
          unit_amount: Math.round(price * 100),
        },
        quantity: item.quantity,
      };
    });

    // Add shipping
    lineItems.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Shipping" },
        unit_amount: shippingCost * 100,
      },
      quantity: 1,
    });

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => {
      const product = products?.find((p: any) => p.id === item.id);
      const price = product?.sale_price || product?.price || 0;
      return sum + (price * item.quantity);
    }, 0);

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        status: "pending",
        subtotal,
        shipping_cost: shippingCost,
        total: subtotal + shippingCost,
        shipping_name: shippingInfo?.name,
        shipping_email: customerEmail,
        shipping_phone: shippingInfo?.phone,
        shipping_address: shippingInfo?.address,
        shipping_city: shippingInfo?.city,
        shipping_country: shippingInfo?.country,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map((item: any) => {
      const product = products?.find((p: any) => p.id === item.id);
      return {
        order_id: order.id,
        product_id: item.id,
        product_name: product?.name || item.name,
        quantity: item.quantity,
        price: product?.sale_price || product?.price || item.price,
      };
    });

    await supabase.from("order_items").insert(orderItems);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
      customer_email: customerEmail,
      metadata: { orderId: order.id },
      shipping_address_collection: { allowed_countries: ["IN", "US", "GB", "AE", "SA", "PK", "BD"] },
    });

    // Update order with session ID
    await supabase
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

3. Create edge function: webhook-stripe (add STRIPE_WEBHOOK_SECRET)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

serve(async (req) => {
  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2023-10-16",
  });

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL") || "",
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
        );

        await supabase
          .from("orders")
          .update({
            status: "paid",
            stripe_payment_intent_id: session.payment_intent,
          })
          .eq("id", orderId);
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});

4. In supabase/config.toml add:
[functions.webhook-stripe]
verify_jwt = false
```

---

## STEP 4: SAMPLE PRODUCTS DATA (Give this to seed the database)

```
Insert these sample products into the database:

INSERT INTO products (id, name, description, price, sale_price, category, images, in_stock, rating, reviews, badge) VALUES
('1', 'Usool as-Sunnah (Arabic)', 'Imam Ahmad''s foundational text on the principles of the Sunnah in Arabic.', 2499, NULL, 'books', ARRAY['/images/books/sample1.jpg'], true, 4.8, 42, NULL),
('2', 'Foundations of the Sunnah (English)', 'Imam Ahmad''s essential reading for understanding the foundations of Islamic belief in English.', 2099, NULL, 'books', ARRAY['/images/books/sample2.jpg'], true, 4.9, 67, 'Restocked'),
('3', 'Kitab at-Tawhid', 'Book of Monotheism. The most important subject and the foundation of Islamic belief.', 2899, NULL, 'books', ARRAY['/images/books/sample3.jpg'], true, 5.0, 156, 'Bestseller'),
('8', 'Tafsir As-Sa''di (10 Volumes)', 'Beginner-friendly Quran commentary. Clear and accessible explanations.', 12499, NULL, 'books', ARRAY['/images/books/tafsir-sadi.jpg'], true, 5.0, 234, 'Bestseller'),
('10', 'Tafsir Ibn Kathir (10 Volumes)', 'The most famous comprehensive Quran commentary in English.', 14999, NULL, 'books', ARRAY['/images/books/ibn-kathir.jpg'], true, 5.0, 312, 'Premium'),
('11', 'Sahih al-Bukhari (9 Volumes)', 'The most authentic hadith collection after the Quran. Top quality print.', 16699, NULL, 'books', ARRAY['/images/books/bukhari.jpg'], true, 5.0, 445, 'Premium'),
('17', 'When the Moon Split', 'Complete and authentic biography of Prophet Muhammad (PBUH).', 2899, NULL, 'books', ARRAY['/images/books/moon-split.jpg'], true, 4.9, 178, 'Bestseller'),
('24', 'Great Women of Islam', 'Inspiring biographies of righteous Muslim women from Islamic history.', 2499, NULL, 'books', ARRAY['/images/books/women.jpg'], true, 4.8, 189, 'Popular'),
('31', 'Important Lessons for Muslim Women', 'Essential guidance for Muslim women on matters of faith and practice.', 1899, NULL, 'books', ARRAY['/images/books/women-lessons.jpg'], true, 4.9, 189, 'Popular');

Note: Prices are in INR. Update image paths to match your actual images.
```

---

## STEP 5: CURRENCY UTILITY (Critical for INR display)

```
Create src/lib/currency.ts:

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Usage: formatPrice(2499) returns "₹2,499"

Import this in ALL components that display prices:
import { formatPrice } from "@/lib/currency";

Then use: {formatPrice(product.price)} instead of ${product.price}
```

---

## STEP 6: COMPONENT SPECIFICATIONS

### Header Component
```
- Sticky position at top
- Dismissable customs notice bar at very top
- Logo in center (on mobile and desktop)
- Navigation links on left (desktop): Home, Shop All, Books, Contact
- Icons on right: Search toggle, User (login/logout), Cart with count badge
- Mobile: Hamburger menu that slides down
- Search input appears when search icon clicked
```

### Product Card Component
```
- Relative position for badge
- Badge at top-left (absolute positioned)
- Square aspect ratio image container
- Image with hover:scale-105 transition
- Padding around content
- Category label (small, primary color)
- Product name (2 lines max with line-clamp-2)
- Star rating row (filled yellow for rating, gray for empty)
- Price row: sale price in primary color, original price with line-through
- Full-width Add to Cart button
- Disabled state for out of stock
```

### Footer Component
```
- 4 column grid on desktop, stacked on mobile
- Column 1: Logo + brand description
- Column 2: Shop links (All Products, Books, Clothing, Luxury)
- Column 3: Support links (Contact, Shipping, Refunds, Privacy, Terms)
- Column 4: Account links (Sign In, Cart, Checkout)
- Bottom bar: Copyright + quick policy links
```

---

## STEP 7: ANIMATIONS (Add to index.css)

```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
  50% { transform: translateY(-20px) rotate(5deg); opacity: 0.6; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-float { animation: float 6s ease-in-out infinite; }
.animate-float-delayed { animation: float 8s ease-in-out infinite 2s; }
.animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
.animate-shimmer {
  background: linear-gradient(90deg, transparent, hsl(45 90% 48% / 0.1), transparent);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.hero-pattern {
  background-image: 
    radial-gradient(ellipse at 20% 30%, hsl(45 90% 48% / 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, hsl(45 90% 48% / 0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, hsl(45 10% 98%) 0%, hsl(0 0% 100%) 100%);
}
```

---

## STEP 8: FILE STRUCTURE

```
src/
├── assets/
│   ├── logo.svg              (Abu Hurayrah logo)
│   └── hero-books.png        (Hero section image)
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                   (Shadcn components)
├── contexts/
│   ├── AuthContext.tsx       (Supabase auth + isAdmin check)
│   └── CartContext.tsx       (localStorage cart)
├── data/
│   └── products.ts           (Product interface + sample data)
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── currency.ts           (formatPrice function)
│   └── utils.ts              (cn utility)
├── pages/
│   ├── Index.tsx             (Homepage)
│   ├── Shop.tsx              (Product listing)
│   ├── ProductDetail.tsx     (Single product)
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── CheckoutSuccess.tsx
│   ├── Auth.tsx              (Login/Signup)
│   ├── Admin.tsx             (Orders + Products management)
│   ├── Contact.tsx
│   ├── ShippingPolicy.tsx
│   ├── Terms.tsx
│   ├── PrivacyPolicy.tsx
│   ├── CancellationsRefunds.tsx
│   └── NotFound.tsx
├── App.tsx                   (Routes)
├── main.tsx
└── index.css                 (Tailwind + CSS variables)
```

---

## STEP 9: VERCEL + GITHUB DEPLOYMENT

After building in Lovable:

1. **Connect to GitHub:**
   - In Lovable: Settings → GitHub → Connect
   - Create repository

2. **Deploy to Vercel:**
   - Go to vercel.com
   - Import your GitHub repository
   - Add environment variables:
     - VITE_SUPABASE_URL
     - VITE_SUPABASE_ANON_KEY
   - Deploy

3. **Stripe Webhook (for production):**
   - In Stripe Dashboard: Developers → Webhooks
   - Add endpoint: https://your-supabase-project.functions.supabase.co/webhook-stripe
   - Select event: checkout.session.completed
   - Copy webhook signing secret
   - Add STRIPE_WEBHOOK_SECRET to Supabase secrets

---

## CHECKLIST BEFORE LAUNCH

- [ ] All pages responsive on mobile
- [ ] Cart persists on refresh (localStorage)
- [ ] Currency shows ₹ everywhere
- [ ] Stripe checkout works in test mode
- [ ] Login/Signup works with auto-confirm
- [ ] Admin panel only accessible to admin role
- [ ] Products load from database
- [ ] Search and category filters work
- [ ] Order is created in database on checkout
- [ ] Webhook updates order status to "paid"
- [ ] All legal pages have content
- [ ] Images load correctly
- [ ] Meta tags for SEO on all pages
- [ ] Logo displays in header and footer

---

## TROUBLESHOOTING

**RLS Errors:** Make sure user is logged in before creating orders, or allow NULL user_id for guest checkout.

**Admin Access:** Manually insert admin role: `INSERT INTO user_roles (user_id, role) VALUES ('your-user-id', 'admin');`

**Stripe not working:** Check STRIPE_SECRET_KEY in Supabase secrets. For testing, use Stripe test keys.

**Images not loading:** Store images in /public/images/ folder. They persist across deployments.

# Abu Hurayrah Islamic E-Commerce Store - Complete Rebuild Guide

## 🎯 MASTER PROMPT FOR AI ASSISTANTS

Copy this entire section when working with ChatGPT, Grok, or other AI assistants:

---

```
I want you to help me build a professional Islamic e-commerce store called "Abu Hurayrah" from scratch. Follow these exact specifications:

## PROJECT OVERVIEW
- Name: Abu Hurayrah Islamic Store
- Purpose: Sell Islamic books, clothing, and luxury items
- Target Market: Muslims in India (currency: INR ₹)
- Tech Stack: React + Vite + TypeScript + Tailwind CSS + Shadcn/ui + Supabase + Stripe

## BRAND IDENTITY

### Colors (HSL Format - CRITICAL)
```css
:root {
  --background: 209 40% 96%;      /* Light gray-blue background */
  --foreground: 222 47% 11%;      /* Dark text */
  --card: 210 40% 98%;            /* Card backgrounds */
  --primary: 217 32% 17%;         /* Dark blue-gray primary */
  --primary-foreground: 204 100% 97%;  /* Light text on primary */
  --secondary: 215 24% 26%;       /* Secondary blue-gray */
  --muted: 215 20% 65%;           /* Muted elements */
  --accent: 210 40% 98%;          /* Accent color */
  --border: 212 26% 83%;          /* Border color */
  --destructive: 0 72% 50%;       /* Red for errors/sales */
}
```

### Typography
- Font Family: "Philosopher" from Google Fonts for ALL text
- Import: `@import url('https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap');`
- Apply to body: `font-family: 'Philosopher', sans-serif;`
- Headings: font-weight: 700

### Logo
- The logo is an SVG with "Abu Hurayrah" text and Arabic calligraphy
- Use transparent background
- Import as ES6 module in React

## COPY/CONTENT

### Hero Section
- Badge: "Authentic Islamic Resources"
- Headline: "Islamic Essentials for Daily Life"
- Sub-headline: "Rooted in the Sunnah. Chosen with care. Built to serve your worship, knowledge, and everyday practice."
- Primary CTA: "Explore Essentials" → links to /shop
- Secondary CTA: "Learn About the Brand" → links to /contact

### Categories (12 total)
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

## PAGES REQUIRED

### 1. Homepage (/)
- Header with logo, navigation, search, cart icon
- Hero section with headline, sub-headline, CTAs
- Featured hero image (book collection showcase)
- Featured products grid (4 products)
- Categories carousel with navigation arrows
- Bundle deals section (4 bundles)
- "More to Explore" products section
- Footer with links and social media

### 2. Shop Page (/shop)
- Category sidebar filter
- Search functionality
- Product grid with cards
- Sorting options
- Filter by category via URL params (?category=books or ?search=tafsir)

### 3. Product Detail (/product/:id)
- Image gallery with thumbnails
- Product title, price, description
- Add to cart button
- Related products
- Auto-scroll to top on page load

### 4. Cart Page (/cart)
- Cart items list with quantity controls
- Remove item functionality
- Subtotal, shipping, total calculations
- Proceed to checkout button
- Free shipping threshold message

### 5. Checkout Page (/checkout)
- Shipping information form
- Order summary
- Stripe integration for payments
- Form validation

### 6. Auth Pages (/auth)
- Login form
- Signup form
- Email confirmation handling

### 7. Admin Panel (/admin)
- Protected route (admin role required)
- View all orders
- Update order status
- Manage products (CRUD)

### 8. Legal Pages
- /shipping-policy
- /terms
- /privacy-policy
- /cancellations-refunds
- /contact

## DATABASE SCHEMA (Supabase/PostgreSQL)

### Tables

```sql
-- User Roles Enum
CREATE TYPE app_role AS ENUM ('admin', 'customer');

-- Order Status Enum
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

-- User Roles Table (CRITICAL: Never store roles in profiles!)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role DEFAULT 'customer',
  UNIQUE(user_id, role)
);
```

### Database Functions

```sql
-- Check if user has a role (prevents RLS recursion)
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

-- Handle new user signup
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

-- Trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Products: Public read, admin write
CREATE POLICY "Products are publicly readable" ON products FOR SELECT USING (true);
CREATE POLICY "Admins can insert products" ON products FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products" ON products FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON products FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Orders: Users see own, admins see all
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK ((auth.uid() = user_id) OR (user_id IS NULL));
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (
  CASE WHEN user_id IS NULL THEN has_role(auth.uid(), 'admin')
  ELSE auth.uid() = user_id END
);
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- Order Items: Same pattern as orders
CREATE POLICY "Users can create own order items" ON order_items FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND ((orders.user_id = auth.uid()) OR (orders.user_id IS NULL))));
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT 
USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Admins can view all order items" ON order_items FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- Profiles: Users manage own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- User Roles: Read only for users
CREATE POLICY "Users can view own role" ON user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON user_roles FOR SELECT USING (has_role(auth.uid(), 'admin'));
```

## STRIPE INTEGRATION

### Edge Function: create-checkout

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, orderId, customerEmail, shippingCost } = await req.json();
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping as line item
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: { name: "Shipping" },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
      customer_email: customerEmail,
      metadata: { orderId },
    });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

### Edge Function: webhook-stripe

```typescript
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
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});
```

## CURRENCY FORMATTING

Create a utility function for Indian Rupees:

```typescript
// src/lib/currency.ts
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
```

## KEY COMPONENTS

### Product Card
- Image with hover zoom effect
- Badge (Bestseller, Sale, Popular, etc.)
- Product name (2 lines max, truncate)
- Star rating display
- Price with sale price styling
- Add to Cart button

### Header
- Logo (left)
- Navigation links: Shop, Categories dropdown
- Search bar
- Cart icon with item count
- User menu (login/logout)

### Footer
- Logo and brand description
- Quick links
- Legal links
- Social media icons
- Copyright notice

### Category Carousel
- Horizontal scroll with arrows
- Category icons with labels
- Click links to filtered shop page

## RESPONSIVE DESIGN

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile: Stack layouts, hamburger menu
- Desktop: Grid layouts, full navigation

## ANIMATIONS

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
```

## FILE STRUCTURE

```
src/
├── assets/
│   ├── logo.svg
│   └── hero-books.png
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── ... (shadcn components)
├── contexts/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── data/
│   └── products.ts
├── hooks/
│   ├── use-toast.ts
│   └── use-mobile.tsx
├── lib/
│   ├── currency.ts
│   └── utils.ts
├── pages/
│   ├── Index.tsx
│   ├── Shop.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── CheckoutSuccess.tsx
│   ├── Auth.tsx
│   ├── Admin.tsx
│   ├── Contact.tsx
│   └── ... (legal pages)
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── App.tsx
├── main.tsx
└── index.css
```

## PRODUCT DATA STRUCTURE

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;  // "books" | "clothing" | "luxury"
  images: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  badge?: string;  // "Bestseller" | "Popular" | "Sale" | "Premium" | "Restocked"
}
```

## IMPORTANT NOTES

1. **Images**: Store in /public/images/books/, /public/images/clothing/, etc.
2. **Currency**: Always display in INR (₹) format
3. **Font**: Philosopher font for EVERYTHING
4. **Security**: Never check admin status client-side, always use RLS
5. **Auto-scroll**: ProductDetail page scrolls to top on mount
6. **Carousel**: Include navigation arrows, not just auto-scroll
7. **Search**: Filter products by name and description
8. **Categories**: Use URL params for filtering (?category=books or ?search=tafsir)

## DEPLOYMENT

### Vercel
1. Connect GitHub repository
2. Set environment variables:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
3. Deploy

### Supabase
1. Create project
2. Run all SQL migrations
3. Enable email auth with auto-confirm
4. Add secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
5. Deploy edge functions

### Stripe
1. Create account
2. Get API keys (test mode for development)
3. Set up webhook endpoint
4. Configure INR as currency
```

---

## 📦 SAMPLE PRODUCTS DATA

Here are some sample products to seed your database (prices should be in INR):

```typescript
export const products = [
  {
    id: "1",
    name: "Tafsir As-Sa'di (10 Volumes)",
    description: "Beginner-friendly Quran commentary. Clear and accessible explanations by Imam As-Sa'di.",
    price: 12499, // ₹12,499
    category: "books",
    images: ["/images/books/tafsir-sadi-1.jpg"],
    inStock: true,
    rating: 5.0,
    reviews: 234,
    badge: "Bestseller"
  },
  {
    id: "2", 
    name: "Sahih al-Bukhari (9 Volumes)",
    description: "The most authentic hadith collection after the Quran. Premium English translation.",
    price: 16599, // ₹16,599
    category: "books",
    images: ["/images/books/bukhari-1.jpg"],
    inStock: true,
    rating: 5.0,
    reviews: 445,
    badge: "Premium"
  },
  {
    id: "3",
    name: "Kitab at-Tawhid",
    description: "Book of Monotheism - the foundation of Islamic belief by Muhammad ibn Abdul Wahhab.",
    price: 2899, // ₹2,899
    category: "books",
    images: ["/images/books/tawhid-1.jpg"],
    inStock: true,
    rating: 5.0,
    reviews: 156
  },
  // Add more products...
];
```

## 🔐 ENVIRONMENT VARIABLES

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Stripe (in Supabase secrets, not .env)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## ✅ CHECKLIST

Before launching:
- [ ] All products added with correct INR prices
- [ ] Logo uploaded and displaying
- [ ] Stripe webhooks configured
- [ ] Admin user role assigned in database
- [ ] All pages responsive
- [ ] Search working
- [ ] Category filtering working
- [ ] Cart persists across sessions
- [ ] Checkout flow complete
- [ ] Order confirmation emails (optional)
- [ ] SSL certificate active
- [ ] Custom domain connected

---

**Good luck with your halal e-commerce venture! May Allah bless your business. 🤲**

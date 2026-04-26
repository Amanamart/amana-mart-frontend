-- AMANAMART MASTER DATABASE MIGRATION (HIGH-SCALE)
-- Created for AmanaMart Professional Ecosystem 2026

-- 1. ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For advanced search

-- 2. CORE MODULES CONFIGURATION
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    icon TEXT,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Modules
INSERT INTO public.modules (slug, label, icon) VALUES
('grocery', 'Grocery', 'shopping-basket'),
('pharmacy', 'Pharmacy', 'pill'),
('food', 'Food Delivery', 'utensils'),
('shop', 'Online Shop', 'shopping-bag'),
('courier', 'Courier Service', 'package'),
('ride', 'Express (Ride)', 'car'),
('service', 'Professional Services', 'wrench'),
('classified', 'Classified Ads', 'megaphone')
ON CONFLICT (slug) DO NOTHING;

-- 3. PROFILES & ROLES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    phone_number VARCHAR(20) UNIQUE,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'vendor', 'delivery_man', 'admin')),
    wallet_balance DECIMAL(15, 2) DEFAULT 0.00,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GEOGRAPHICAL ZONES
CREATE TABLE IF NOT EXISTS public.zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    coordinates POLYGON, -- For map-based service areas
    is_active BOOLEAN DEFAULT true,
    delivery_fee_base DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MULTI-MODULE STORES / VENDORS
CREATE TABLE IF NOT EXISTS public.stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES public.profiles(id),
    module_id UUID REFERENCES public.modules(id),
    zone_id UUID REFERENCES public.zones(id),
    name TEXT NOT NULL,
    logo_url TEXT,
    cover_url TEXT,
    address TEXT,
    rating DECIMAL(3, 2) DEFAULT 5.00,
    review_count INTEGER DEFAULT 0,
    is_open BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    commission_rate DECIMAL(5, 2) DEFAULT 10.00,
    config JSONB DEFAULT '{}', -- Opening hours, min order, etc.
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CATEGORIES (MODULE-BASED)
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES public.modules(id),
    parent_id UUID REFERENCES public.categories(id),
    name TEXT NOT NULL,
    icon TEXT,
    image_url TEXT,
    priority INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- 7. UNIFIED PRODUCT CATALOG
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id UUID REFERENCES public.stores(id),
    category_id UUID REFERENCES public.categories(id),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    base_price DECIMAL(15, 2) NOT NULL,
    discount_price DECIMAL(15, 2),
    stock_quantity INTEGER DEFAULT 0,
    unit VARCHAR(20), -- kg, pcs, box, etc.
    images TEXT[] DEFAULT '{}',
    is_available BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}', -- Generic Name (Pharmacy), Prep Time (Food), etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PRODUCT VARIANTS
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. "500g", "Blue", "Large"
    price DECIMAL(15, 2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0
);

-- 9. ORDER MANAGEMENT ENGINE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.profiles(id),
    store_id UUID REFERENCES public.stores(id),
    delivery_man_id UUID REFERENCES public.profiles(id),
    total_amount DECIMAL(15, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
    coupon_discount DECIMAL(10, 2) DEFAULT 0.00,
    payable_amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending', 
    payment_status VARCHAR(20) DEFAULT 'unpaid',
    payment_method VARCHAR(50), -- COD, SSLCommerz, Wallet
    delivery_address JSONB NOT NULL,
    order_type VARCHAR(20), -- instant, scheduled
    scheduled_at TIMESTAMPTZ,
    otp VARCHAR(6),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    variant_id UUID REFERENCES public.product_variants(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(15, 2) NOT NULL,
    total_price DECIMAL(15, 2) NOT NULL
);

-- 11. FINANCIAL TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id),
    amount DECIMAL(15, 2) NOT NULL,
    type VARCHAR(20) NOT NULL, -- deposit, withdrawal, payment, refund
    status VARCHAR(20) DEFAULT 'pending',
    reference_id TEXT, -- Order ID or External Tx ID
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Sample Policies
CREATE POLICY "Users can see their own profile" ON public.profiles 
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Customers can see their own orders" ON public.orders 
FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Vendors can see their store orders" ON public.orders 
FOR SELECT USING (auth.uid() IN (SELECT owner_id FROM public.stores WHERE id = store_id));

-- 13. AUTOMATION FUNCTIONS
-- Stock reduction on new order
CREATE OR REPLACE FUNCTION public.reduce_stock_on_order() 
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.products 
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_reduce_stock
AFTER INSERT ON public.order_items
FOR EACH ROW EXECUTE FUNCTION public.reduce_stock_on_order();

-- 14. SEARCH INDEXES
CREATE INDEX idx_products_name ON public.products USING gin(name gin_trgm_ops);
CREATE INDEX idx_products_metadata ON public.products USING gin(metadata);

-- AMANAMART SECURITY & AUTOMATION (RLS, TRIGGERS, FUNCTIONS)
-- Ensuring data integrity and enterprise-grade security

-- 1. ENABLE RLS ON ALL TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zones ENABLE ROW LEVEL SECURITY;

-- 2. SECURITY POLICIES (RLS)

-- Profiles: Users can only see/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Stores: Anyone can view stores, but only owners can update
CREATE POLICY "Public can view stores" ON public.stores FOR SELECT USING (true);
CREATE POLICY "Owners can update own stores" ON public.stores FOR UPDATE USING (auth.uid() = owner_id);

-- Products: Anyone can view available products, but only vendors can manage their own
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (is_available = true);
CREATE POLICY "Vendors can manage own products" ON public.products FOR ALL USING (
    auth.uid() IN (SELECT owner_id FROM public.stores WHERE id = store_id)
);

-- Orders: Customers see their own, vendors see orders for their stores
CREATE POLICY "Customers can view own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Vendors can view store orders" ON public.orders FOR SELECT USING (
    auth.uid() IN (SELECT owner_id FROM public.stores WHERE id = store_id)
);

-- 3. AUTOMATION: WALLET BALANCE UPDATES
CREATE OR REPLACE FUNCTION public.update_wallet_on_transaction()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' THEN
        IF NEW.type = 'deposit' OR NEW.type = 'refund' THEN
            UPDATE public.profiles SET wallet_balance = wallet_balance + NEW.amount WHERE id = NEW.profile_id;
        ELSIF NEW.type = 'payment' OR NEW.type = 'withdrawal' THEN
            UPDATE public.profiles SET wallet_balance = wallet_balance - NEW.amount WHERE id = NEW.profile_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_wallet
AFTER INSERT OR UPDATE ON public.transactions
FOR EACH ROW EXECUTE FUNCTION public.update_wallet_on_transaction();

-- 4. AUTOMATION: NOTIFICATION ON ORDER STATUS CHANGE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.notify_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO public.notifications (user_id, title, message)
        VALUES (
            NEW.customer_id, 
            'Order Status Updated', 
            'Your order #' || NEW.id || ' is now ' || NEW.status
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_order_notification
AFTER UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.notify_order_status_change();

-- 5. AUTOMATION: PRODUCT SEARCH LOGS (For Analytics)
CREATE TABLE IF NOT EXISTS public.search_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id),
    query TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

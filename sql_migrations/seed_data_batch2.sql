-- AMANAMART SEEDING BATCH 2: ELECTRONICS, FASHION, & MORE GROCERY
-- Populate detailed products for Online Shop and extended Grocery items

DO $$
DECLARE 
    xiaomi_store UUID := (SELECT id FROM public.stores WHERE name = 'Xiaomi Official Store');
    samsung_plaza UUID := (SELECT id FROM public.stores WHERE name = 'Samsung Plaza');
    
    electronics_cat UUID := (SELECT id FROM public.categories WHERE name = 'Electronics & Gadgets');
    mobile_acc_cat UUID := (SELECT id FROM public.categories WHERE name = 'Mobile Accessories');
    home_app_cat UUID := (SELECT id FROM public.categories WHERE name = 'Home Appliances');

    amana_fresh UUID := (SELECT id FROM public.stores WHERE name = 'Amana Fresh Mart');
    fruits_cat UUID := (SELECT id FROM public.categories WHERE name = 'Fruits & Vegetables');
    dairy_cat UUID := (SELECT id FROM public.categories WHERE name = 'Dairy & Eggs');
BEGIN
    -- 1. Electronics & Gadgets
    INSERT INTO public.products (store_id, category_id, name, slug, description, base_price, stock_quantity, unit, metadata) VALUES
    (xiaomi_store, electronics_cat, 'Xiaomi Redmi Note 13 Pro', 'redmi-note-13-pro', '200MP Camera, 120Hz AMOLED Display', 32990.00, 50, 'Unit', '{"brand": "Xiaomi", "color": "Midnight Black", "ram": "8GB", "storage": "256GB"}'),
    (xiaomi_store, electronics_cat, 'Xiaomi Pad 6', 'xiaomi-pad-6', 'Snapdragon 870, 144Hz WQHD+ display', 42000.00, 30, 'Unit', '{"brand": "Xiaomi", "screen": "11 inch"}'),
    (samsung_plaza, electronics_cat, 'Samsung Galaxy S24 Ultra', 'galaxy-s24-ultra', 'Galaxy AI, Titanium Frame, 200MP Camera', 145000.00, 20, 'Unit', '{"brand": "Samsung", "storage": "512GB"}'),
    (samsung_plaza, home_app_cat, 'Samsung 43" Crystal UHD 4K TV', 'samsung-43-4k-tv', 'HDR 10+, Smart TV with Tizen OS', 48500.00, 15, 'Unit', '{"brand": "Samsung", "resolution": "4K"}');

    -- 2. Mobile Accessories
    INSERT INTO public.products (store_id, category_id, name, slug, description, base_price, stock_quantity, unit) VALUES
    (xiaomi_store, mobile_acc_cat, 'Mi 33W SonicCharge 2.0', 'mi-33w-charger', 'Fast charging adapter for Xiaomi phones', 1250.00, 100, 'Unit'),
    (xiaomi_store, mobile_acc_cat, 'Redmi Buds 5 Pro', 'redmi-buds-5-pro', '52dB Active Noise Cancellation', 6500.00, 40, 'Unit');

    -- 3. Extended Grocery (Fruits & Vegetables)
    INSERT INTO public.products (store_id, category_id, name, slug, description, base_price, stock_quantity, unit) VALUES
    (amana_fresh, fruits_cat, 'Banana - Sagor', 'banana-sagor', 'Fresh and sweet local bananas', 95.00, 100, 'Dozen'),
    (amana_fresh, fruits_cat, 'Mango - Himsagar', 'mango-himsagar', 'Premium Himsagar mango from Rajshahi', 120.00, 200, '1kg'),
    (amana_fresh, fruits_cat, 'Potato - Red', 'potato-red', 'Fresh red potatoes from Bogura', 45.00, 1000, '1kg'),
    (amana_fresh, fruits_cat, 'Onion - Local', 'onion-local', 'Deshi local onions', 85.00, 500, '1kg');

    -- 4. Dairy & Eggs
    INSERT INTO public.products (store_id, category_id, name, slug, description, base_price, stock_quantity, unit) VALUES
    (amana_fresh, dairy_cat, 'Farm Fresh Eggs', 'farm-fresh-eggs', 'Large size fresh farm eggs', 145.00, 1000, 'Dozen'),
    (amana_fresh, dairy_cat, 'Milk Vita Pasteurized Milk', 'milk-vita-1l', '100% pure pasteurized liquid milk', 90.00, 300, '1L Packet'),
    (amana_fresh, dairy_cat, 'Aarong Dairy Yogurt (Sweet)', 'aarong-yogurt-sweet', 'Traditional sweet yogurt from Aarong', 180.00, 150, '500g');
END $$;

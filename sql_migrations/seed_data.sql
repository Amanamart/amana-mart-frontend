-- AMANAMART MASSIVE REAL DATA SEEDING
-- Populate Categories, Stores, and Products for all 8 Modules

-- 1. SEED ZONES (Dhaka Districts/Areas)
INSERT INTO public.zones (name, delivery_fee_base) VALUES
('Dhaka North (Uttara, Gulshan)', 50.00),
('Dhaka South (Dhanmondi, Motijheel)', 60.00),
('Mirpur / Pallabi', 40.00),
('Chittagong City', 70.00)
ON CONFLICT DO NOTHING;

-- 2. SEED CATEGORIES (Module-Specific)
DO $$
DECLARE 
    grocery_id UUID := (SELECT id FROM public.modules WHERE slug = 'grocery');
    pharmacy_id UUID := (SELECT id FROM public.modules WHERE slug = 'pharmacy');
    food_id UUID := (SELECT id FROM public.modules WHERE slug = 'food');
    shop_id UUID := (SELECT id FROM public.modules WHERE slug = 'shop');
    service_id UUID := (SELECT id FROM public.modules WHERE slug = 'service');
    classified_id UUID := (SELECT id FROM public.modules WHERE slug = 'classified');
BEGIN
    -- Grocery Categories
    INSERT INTO public.categories (module_id, name, priority) VALUES
    (grocery_id, 'Rice & Grains', 1),
    (grocery_id, 'Oil & Spices', 2),
    (grocery_id, 'Fruits & Vegetables', 3),
    (grocery_id, 'Dairy & Eggs', 4),
    (grocery_id, 'Beverages', 5),
    (grocery_id, 'Snacks & Sweets', 6);

    -- Pharmacy Categories
    INSERT INTO public.categories (module_id, name, priority) VALUES
    (pharmacy_id, 'Fever & Pain', 1),
    (pharmacy_id, 'Gastric & Digestion', 2),
    (pharmacy_id, 'Antibiotics', 3),
    (pharmacy_id, 'Diabetes Care', 4),
    (pharmacy_id, 'Vitamins & Supplements', 5),
    (pharmacy_id, 'Baby Care', 6);

    -- Food Categories
    INSERT INTO public.categories (module_id, name, priority) VALUES
    (food_id, 'Fast Food', 1),
    (food_id, 'Bengali Traditional', 2),
    (food_id, 'Chinese & Thai', 3),
    (food_id, 'Pizza & Pasta', 4),
    (food_id, 'Bakery & Dessert', 5);

    -- Online Shop Categories
    INSERT INTO public.categories (module_id, name, priority) VALUES
    (shop_id, 'Electronics & Gadgets', 1),
    (shop_id, 'Mobile Accessories', 2),
    (shop_id, 'Home Appliances', 3),
    (shop_id, 'Fashion & Lifestyle', 4),
    (shop_id, 'Beauty & Skincare', 5);

    -- Service Categories
    INSERT INTO public.categories (module_id, name, priority) VALUES
    (service_id, 'AC & Home Repair', 1),
    (service_id, 'Cleaning & Pest Control', 2),
    (service_id, 'Plumbing & Electrical', 3),
    (service_id, 'Beauty & Salon', 4);

    -- Classified Categories
    INSERT INTO public.categories (module_id, name, priority) VALUES
    (classified_id, 'Mobiles', 1),
    (classified_id, 'Property / Flats', 2),
    (classified_id, 'Vehicles / Cars', 3),
    (classified_id, 'Jobs', 4);
END $$;

-- 3. SEED SAMPLE STORES (Vendors)
DO $$
DECLARE 
    zone_id UUID := (SELECT id FROM public.zones LIMIT 1);
    grocery_mod UUID := (SELECT id FROM public.modules WHERE slug = 'grocery');
    pharmacy_mod UUID := (SELECT id FROM public.modules WHERE slug = 'pharmacy');
    food_mod UUID := (SELECT id FROM public.modules WHERE slug = 'food');
    shop_mod UUID := (SELECT id FROM public.modules WHERE slug = 'shop');
BEGIN
    -- Grocery Stores
    INSERT INTO public.stores (module_id, zone_id, name, address, rating) VALUES
    (grocery_mod, zone_id, 'Amana Fresh Mart', 'Uttara Sector 7, Dhaka', 4.8),
    (grocery_mod, zone_id, 'Daily Shopping - Gulshan', 'Gulshan 1 Circle, Dhaka', 4.5);

    -- Pharmacy Stores
    INSERT INTO public.stores (module_id, zone_id, name, address, rating) VALUES
    (pharmacy_mod, zone_id, 'Lazz Pharma - Uttara', 'House 45, Road 7, Uttara', 4.9),
    (pharmacy_mod, zone_id, 'Tamanna Pharmacy', 'Banani 11, Dhaka', 4.7);

    -- Restaurants
    INSERT INTO public.stores (module_id, zone_id, name, address, rating) VALUES
    (food_mod, zone_id, 'KFC Bangladesh', 'Dhanmondi 27, Dhaka', 4.6),
    (food_mod, zone_id, 'Takeout Burgers', 'Banani, Dhaka', 4.8);

    -- Shop Brands
    INSERT INTO public.stores (module_id, zone_id, name, address, rating) VALUES
    (shop_mod, zone_id, 'Xiaomi Official Store', 'Bashundhara City, Dhaka', 4.7),
    (shop_mod, zone_id, 'Samsung Plaza', 'Jamuna Future Park, Dhaka', 4.8);
END $$;

-- 4. SEED MASSIVE PRODUCTS (First Batch)
DO $$
DECLARE 
    amana_fresh UUID := (SELECT id FROM public.stores WHERE name = 'Amana Fresh Mart');
    rice_cat UUID := (SELECT id FROM public.categories WHERE name = 'Rice & Grains');
    oil_cat UUID := (SELECT id FROM public.categories WHERE name = 'Oil & Spices');
    
    lazz_pharma UUID := (SELECT id FROM public.stores WHERE name = 'Lazz Pharma - Uttara');
    fever_cat UUID := (SELECT id FROM public.categories WHERE name = 'Fever & Pain');
    gastric_cat UUID := (SELECT id FROM public.categories WHERE name = 'Gastric & Digestion');

    kfc UUID := (SELECT id FROM public.stores WHERE name = 'KFC Bangladesh');
    fast_food_cat UUID := (SELECT id FROM public.categories WHERE name = 'Fast Food');
BEGIN
    -- Grocery Products
    INSERT INTO public.products (store_id, category_id, name, slug, description, base_price, stock_quantity, unit) VALUES
    (amana_fresh, rice_cat, 'Miniket Rice - Premium', 'miniket-rice-premium', 'High quality premium miniket rice from Dinajpur', 3850.00, 100, '50kg Bag'),
    (amana_fresh, rice_cat, 'Nazirshail Rice', 'nazirshail-rice', 'Standard nazirshail rice for daily use', 85.00, 500, '1kg'),
    (amana_fresh, oil_cat, 'Rupchanda Soyabean Oil', 'rupchanda-soyabean-oil-5l', 'Fortified soyabean oil for healthy cooking', 810.00, 200, '5L'),
    (amana_fresh, oil_cat, 'Radhuni Turmeric Powder', 'radhuni-turmeric-200g', 'Pure turmeric powder from Radhuni', 65.00, 300, '200g');

    -- Pharmacy Products (Real Medicines)
    INSERT INTO public.products (store_id, category_id, name, slug, description, base_price, stock_quantity, unit, metadata) VALUES
    (lazz_pharma, fever_cat, 'Napa Extra', 'napa-extra', 'Paracetamol & Caffeine for headache and fever', 30.00, 1000, 'Strip', '{"generic": "Paracetamol + Caffeine", "strength": "500mg+65mg"}'),
    (lazz_pharma, fever_cat, 'Ace 500mg', 'ace-500', 'Paracetamol for pain relief', 10.00, 2000, 'Strip', '{"generic": "Paracetamol", "strength": "500mg"}'),
    (lazz_pharma, gastric_cat, 'Seclo 20mg', 'seclo-20', 'Omeprazole for acidity and gastric', 50.00, 1500, 'Strip', '{"generic": "Omeprazole", "strength": "20mg"}'),
    (lazz_pharma, gastric_cat, 'Maxpro 20mg', 'maxpro-20', 'Esomeprazole for gastric issues', 70.00, 1000, 'Strip', '{"generic": "Esomeprazole", "strength": "20mg"}');

    -- Food Products
    INSERT INTO public.products (store_id, category_id, name, slug, description, base_price, unit) VALUES
    (kfc, fast_food_cat, '8 Pcs Hot & Smoky Chicken', 'kfc-8-pcs-chicken', 'Signature crispy chicken bucket', 1250.00, 'Bucket'),
    (kfc, fast_food_cat, 'Zinger Burger', 'kfc-zinger-burger', 'Classic spicy chicken zinger burger', 320.00, 'Serving');
END $$;

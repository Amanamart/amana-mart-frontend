-- AMANAMART SEEDING BATCH 3: EXTENDED PHARMACY, FOOD MENU & CLASSIFIED ADS
-- Massive data for Healthcare, Restaurants, and Marketplace

DO $$
DECLARE 
    lazz_pharma UUID := (SELECT id FROM public.stores WHERE name = 'Lazz Pharma - Uttara');
    kfc UUID := (SELECT id FROM public.stores WHERE name = 'KFC Bangladesh');
    takeout UUID := (SELECT id FROM public.stores WHERE name = 'Takeout Burgers');
    
    fever_cat UUID := (SELECT id FROM public.categories WHERE name = 'Fever & Pain');
    antibiotic_cat UUID := (SELECT id FROM public.categories WHERE name = 'Antibiotics');
    gastric_cat UUID := (SELECT id FROM public.categories WHERE name = 'Gastric & Digestion');
    baby_care_cat UUID := (SELECT id FROM public.categories WHERE name = 'Baby Care');
    
    fast_food_cat UUID := (SELECT id FROM public.categories WHERE name = 'Fast Food');
    pizza_cat UUID := (SELECT id FROM public.categories WHERE name = 'Pizza & Pasta');

    mobiles_cat UUID := (SELECT id FROM public.categories WHERE name = 'Mobiles');
    cars_cat UUID := (SELECT id FROM public.categories WHERE name = 'Vehicles / Cars');
BEGIN
    -- 1. Pharmacy Extension (Antibiotics & Baby Care)
    INSERT INTO public.products (store_id, category_id, name, slug, description, base_price, stock_quantity, unit, metadata) VALUES
    (lazz_pharma, antibiotic_cat, 'Zithrin 500mg', 'zithrin-500', 'Azithromycin for bacterial infections', 350.00, 500, 'Box (10)', '{"generic": "Azithromycin", "type": "Antibiotic"}'),
    (lazz_pharma, antibiotic_cat, 'Fixit 200mg', 'fixit-200', 'Cefixime for respiratory infections', 450.00, 400, 'Box (10)', '{"generic": "Cefixime"}'),
    (lazz_pharma, baby_care_cat, 'Huggies Wonder Pants (L)', 'huggies-pants-l', 'Premium diapers for babies (9-14kg)', 1850.00, 100, 'Pack', '{"brand": "Huggies", "size": "Large"}'),
    (lazz_pharma, baby_care_cat, 'Johnson’s Baby Powder', 'johnson-baby-powder-200g', 'Gentle and safe baby powder', 280.00, 200, '200g');

    -- 2. Food Delivery Menu (KFC & Takeout)
    INSERT INTO public.products (store_id, category_id, name, slug, description, base_price, unit) VALUES
    (kfc, fast_food_cat, 'Zinger Stacker', 'kfc-zinger-stacker', 'Double patty zinger burger with cheese', 540.00, 'Serving'),
    (kfc, fast_food_cat, 'Popcorn Chicken (Large)', 'kfc-popcorn-chicken-l', 'Bite-sized crispy chicken pieces', 380.00, 'Serving'),
    (takeout, fast_food_cat, 'Beef Cheese Blast', 'takeout-beef-cheese-blast', 'Double beef patty with melting cheese', 420.00, 'Serving'),
    (takeout, fast_food_cat, 'Chicken Classic Burger', 'takeout-chicken-classic', 'Traditional grilled chicken burger', 280.00, 'Serving');

    -- 3. Classified Ads (Sample Listings)
    -- Using a dummy store for classifieds
    INSERT INTO public.products (store_id, category_id, name, slug, description, base_price, stock_quantity, unit, metadata) VALUES
    (NULL, mobiles_cat, 'iPhone 13 Pro Max (Used)', 'iphone-13-used-classified', 'Battery health 88%, no scratches, full box', 75000.00, 1, 'Unit', '{"condition": "Used", "warranty": "None"}'),
    (NULL, cars_cat, 'Toyota Allion 2018', 'toyota-allion-classified', 'Pearl color, 1500cc, self-driven, 45k km', 2850000.00, 1, 'Unit', '{"mileage": "45000km", "year": "2018"}');

END $$;

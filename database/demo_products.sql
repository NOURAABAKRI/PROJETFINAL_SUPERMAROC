-- =========================================================
-- SuperMaroc - Demo Products
-- 30 additional products
-- Store 1: SuperMaroc Agadir
-- Store 2: SuperMaroc Casablanca
--
-- Categories:
-- 1 = Fruits
-- 2 = Boissons
-- 3 = Produits laitiers
-- 4 = Epicerie
-- =========================================================


-- =========================
-- SUPERMAROC AGADIR
-- =========================

INSERT INTO products
(store_id, category_id, name, price, quantity, description, image_path)
VALUES

-- Fruits
(1, 1, 'Fraise', 18.00, 60,
 'Fraises fraîches',
 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600'),

(1, 1, 'Citron', 8.00, 100,
 'Citrons frais',
 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600'),

(1, 1, 'Raisin', 16.00, 70,
 'Raisin frais',
 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600'),

(1, 1, 'Pastèque', 7.00, 45,
 'Pastèque fraîche',
 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=600'),


-- Boissons
(1, 2, 'Jus de pomme', 9.00, 80,
 'Jus de pomme rafraîchissant',
 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600'),

(1, 2, 'Eau gazeuse', 5.00, 120,
 'Eau gazeuse fraîche',
 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600'),

(1, 2, 'Thé glacé', 8.50, 75,
 'Boisson au thé servie fraîche',
 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600'),

(1, 2, 'Jus de citron', 10.00, 65,
 'Boisson rafraîchissante au citron',
 'https://images.unsplash.com/photo-1523371054106-bbf80586c38c?w=600'),


-- Produits laitiers
(1, 3, 'Yaourt fraise', 4.00, 90,
 'Yaourt saveur fraise',
 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600'),

(1, 3, 'Fromage frais', 15.00, 55,
 'Fromage frais',
 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600'),

(1, 3, 'Beurre', 13.00, 70,
 'Beurre doux',
 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600'),


-- Epicerie
(1, 4, 'Riz', 14.00, 100,
 'Riz de qualité',
 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'),

(1, 4, 'Pâtes', 8.00, 110,
 'Pâtes alimentaires',
 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=600'),

(1, 4, 'Lentilles', 12.00, 85,
 'Lentilles sèches',
 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600'),

(1, 4, 'Huile d olive', 55.00, 50,
 'Huile d olive',
 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600');


-- =========================
-- SUPERMAROC CASABLANCA
-- =========================

INSERT INTO products
(store_id, category_id, name, price, quantity, description, image_path)
VALUES

-- Fruits
(2, 1, 'Mangue', 20.00, 60,
 'Mangue fraîche',
 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600'),

(2, 1, 'Kiwi', 15.00, 70,
 'Kiwi frais',
 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=600'),

(2, 1, 'Avocat', 18.00, 65,
 'Avocat frais',
 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600'),

(2, 1, 'Poire', 12.00, 80,
 'Poires fraîches',
 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600'),


-- Boissons
(2, 2, 'Jus de mangue', 11.00, 75,
 'Jus saveur mangue',
 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600'),

(2, 2, 'Limonade', 8.00, 100,
 'Limonade fraîche',
 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600'),

(2, 2, 'Café froid', 14.00, 60,
 'Boisson au café',
 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600'),

(2, 2, 'Smoothie fruits', 16.00, 50,
 'Smoothie aux fruits',
 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600'),


-- Produits laitiers
(2, 3, 'Lait chocolaté', 7.00, 90,
 'Boisson lactée chocolatée',
 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?w=600'),

(2, 3, 'Fromage', 22.00, 60,
 'Fromage',
 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600'),

(2, 3, 'Yaourt grec', 6.00, 75,
 'Yaourt grec',
 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600'),


-- Epicerie
(2, 4, 'Couscous', 15.00, 100,
 'Semoule de couscous',
 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600'),

(2, 4, 'Haricots rouges', 13.00, 80,
 'Haricots rouges secs',
 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600'),

(2, 4, 'Miel', 35.00, 55,
 'Miel',
 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600'),

(2, 4, 'Café', 25.00, 70,
 'Café moulu',
 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600');
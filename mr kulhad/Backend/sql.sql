
USE mr_kulhad_db;

SHOW TABLES;

-- View categories
SELECT * FROM categories ORDER BY id;

-- View seeded products and their category names
SELECT
    p.id,
    p.name,
    c.name AS category,
    p.price,
    p.is_available
FROM products p
JOIN categories c ON c.id = p.category_id
ORDER BY c.name, p.name;

-- Check order tables
SELECT * FROM customers;
SELECT * FROM orders;
SELECT * FROM order_items;

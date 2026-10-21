
CREATE DATABASE IF NOT EXISTS mr_kulhad_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE mr_kulhad_db;

-- 1. Menu categories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Menu products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    emoji VARCHAR(20) DEFAULT '🍽️',
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_product_price CHECK (price >= 0),
    UNIQUE KEY uq_product_category_name (category_id, name),
    INDEX idx_products_category (category_id),
    INDEX idx_products_available (is_available)
) ENGINE=InnoDB;

-- 3. Customers
CREATE TABLE IF NOT EXISTS customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_customer_phone (phone)
) ENGINE=InnoDB;

-- 4. Orders
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(40) NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL,
    delivery_address VARCHAR(500) NOT NULL,
    payment_method ENUM('COD', 'UPI') NOT NULL DEFAULT 'COD',
    payment_status ENUM(
        'PENDING', 'PAID', 'FAILED', 'REFUNDED'
    ) NOT NULL DEFAULT 'PENDING',
    order_status ENUM(
        'PLACED', 'CONFIRMED', 'PREPARING',
        'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'
    ) NOT NULL DEFAULT 'PLACED',
    subtotal DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_order_amounts CHECK (
        subtotal >= 0 AND delivery_fee >= 0
        AND total_amount = subtotal + delivery_fee
    ),
    INDEX idx_orders_customer (customer_id),
    INDEX idx_orders_status (order_status),
    INDEX idx_orders_created (created_at)
) ENGINE=InnoDB;

-- 5. Items belonging to each order
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    line_total DECIMAL(10,2)
        GENERATED ALWAYS AS (unit_price * quantity) STORED,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_item_price CHECK (unit_price >= 0),
    CONSTRAINT chk_item_quantity CHECK (quantity > 0),
    INDEX idx_order_items_order (order_id)
) ENGINE=InnoDB;

-- Insert categories
INSERT IGNORE INTO categories (name) VALUES
('Chai (Tea)'),
('Healthy Tea'),
('Hot Coffee'),
('Buns'),
('Shakes'),
('Chillers'),
('Cold Coffee'),
('Maggi'),
('Fries & Nuggets'),
('Wraps'),
('Momos'),
('Garlic Bread'),
('Burgers'),
('Sandwiches'),
('Pizza');

-- Insert starter products from the printed menu
INSERT INTO products
    (category_id, name, description, price, emoji)
SELECT id, 'Adrak (Ginger) Chai',
       'Classic cutting chai with ginger.', 20.00, '🫖'
FROM categories WHERE name = 'Chai (Tea)'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products
    (category_id, name, description, price, emoji)
SELECT id, 'Kesar (Saffron) Chai',
       'Fragrant saffron chai.', 40.00, '🍵'
FROM categories WHERE name = 'Chai (Tea)'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products
    (category_id, name, description, price, emoji)
SELECT id, 'Regular Hot Coffee',
       'A warm cafe classic.', 50.00, '☕'
FROM categories WHERE name = 'Hot Coffee'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products
    (category_id, name, description, price, emoji)
SELECT id, 'Vanilla Shake',
       'Creamy vanilla shake.', 110.00, '🥤'
FROM categories WHERE name = 'Shakes'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products
    (category_id, name, description, price, emoji)
SELECT id, 'Plain Maggi',
       'Classic noodle comfort.', 40.00, '🍜'
FROM categories WHERE name = 'Maggi'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products
    (category_id, name, description, price, emoji)
SELECT id, 'Classic Fries',
       'Golden crispy fries.', 90.00, '🍟'
FROM categories WHERE name = 'Fries & Nuggets'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products
    (category_id, name, description, price, emoji)
SELECT id, 'Veg Momos',
       'Steamed vegetable momos.', 60.00, '🥟'
FROM categories WHERE name = 'Momos'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products
    (category_id, name, description, price, emoji)
SELECT id, 'Aloo Tikki Burger',
       'Crispy aloo tikki burger.', 60.00, '🍔'
FROM categories WHERE name = 'Burgers'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products
    (category_id, name, description, price, emoji)
SELECT id, 'Garlic Cheese Sandwich',
       'Garlic and cheese sandwich.', 60.00, '🥪'
FROM categories WHERE name = 'Sandwiches'
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products
    (category_id, name, description, price, emoji)
SELECT id, 'Margherita Pizza',
       'Classic tomato and cheese pizza.', 150.00, '🍕'
FROM categories WHERE name = 'Pizza'
ON DUPLICATE KEY UPDATE name = VALUES(name);

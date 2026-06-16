CREATE DATABASE ecommerce;
USE ecommerce;

INSERT INTO orders (user_id, total)
VALUES (1, 16000);
SELECT * FROM orders;
SELECT * FROM order_details;
INSERT INTO order_details
(order_id, product_id, cantidad, precio)
VALUES
(1, 1, 1, 15000),
(1, 3, 2, 500);
SELECT * FROM products;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente','vendedor') DEFAULT 'cliente'
);

ALTER TABLE products
MODIFY imagen VARCHAR(600);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    categoria VARCHAR(50),
    imagen VARCHAR(255)
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Graficos para chart.js
SELECT
    p.categoria,
    SUM(od.cantidad) AS total_vendido
FROM products p
INNER JOIN order_details od
    ON od.product_id = p.id
GROUP BY p.categoria;
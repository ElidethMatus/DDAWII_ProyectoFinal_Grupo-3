USE ecommerce;

-- Crear tabla orders si no existe
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Crear tabla order_details si no existe
CREATE TABLE IF NOT EXISTS order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insertar datos de prueba para orders
INSERT INTO orders (user_id, fecha, total) VALUES
(1, '2024-01-15', 150.00),
(1, '2024-02-20', 200.50),
(1, '2024-03-10', 180.00),
(2, '2024-01-25', 120.00),
(2, '2024-02-15', 250.00),
(1, '2024-04-05', 300.00),
(3, '2024-03-20', 175.50),
(1, '2024-05-12', 220.00),
(2, '2024-04-18', 190.00),
(1, '2024-06-01', 280.00);

-- Insertar datos de prueba para order_details
INSERT INTO order_details (order_id, product_id, cantidad, precio) VALUES
(1, 1, 2, 50.00),
(1, 2, 1, 50.00),
(2, 1, 3, 50.00),
(2, 3, 1, 50.50),
(3, 2, 2, 45.00),
(3, 4, 2, 45.00),
(4, 1, 1, 50.00),
(4, 3, 2, 35.00),
(5, 2, 3, 45.00),
(5, 4, 2, 57.50),
(6, 1, 4, 50.00),
(6, 2, 2, 50.00),
(7, 3, 3, 35.00),
(7, 4, 2, 35.25),
(8, 1, 2, 50.00),
(8, 3, 2, 60.00),
(9, 2, 2, 45.00),
(9, 4, 2, 50.00),
(10, 1, 3, 50.00),
(10, 2, 2, 65.00);

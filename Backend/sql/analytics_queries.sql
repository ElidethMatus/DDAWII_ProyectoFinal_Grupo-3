-- ===============================================
-- QUERIES SQL PARA GRÁFICAS DE ANALYTICS
-- ===============================================

-- 1. PRODUCTOS MÁS VENDIDOS (Top 10)
SELECT 
    p.nombre,
    SUM(od.cantidad) AS total_vendido,
    COUNT(od.id) AS num_ordenes
FROM products p
INNER JOIN order_details od ON od.product_id = p.id
GROUP BY p.id, p.nombre
ORDER BY total_vendido DESC
LIMIT 10;


-- 2. VENTAS POR CATEGORÍA
SELECT 
    p.categoria,
    SUM(od.cantidad) AS total_vendido,
    COUNT(DISTINCT od.order_id) AS num_ordenes,
    SUM(od.cantidad * od.precio) AS ingresos
FROM products p
INNER JOIN order_details od ON od.product_id = p.id
GROUP BY p.categoria
ORDER BY ingresos DESC;


-- 3. INGRESOS POR MES (Últimos 12 meses)
SELECT 
    DATE_FORMAT(o.fecha, '%Y-%m') AS mes,
    SUM(o.total) AS ingresos,
    COUNT(o.id) AS num_ordenes
FROM orders o
GROUP BY DATE_FORMAT(o.fecha, '%Y-%m')
ORDER BY mes DESC
LIMIT 12;


-- 4. ÓRDENES POR MES (Últimos 12 meses)
SELECT 
    DATE_FORMAT(o.fecha, '%Y-%m') AS mes,
    COUNT(o.id) AS total_ordenes,
    SUM(o.total) AS ingresos_mes,
    AVG(o.total) AS promedio_orden
FROM orders o
GROUP BY DATE_FORMAT(o.fecha, '%Y-%m')
ORDER BY mes DESC
LIMIT 12;


-- ===============================================
-- QUERIES ADICIONALES ÚTILES
-- ===============================================

-- Producto más vendido
SELECT 
    p.nombre,
    SUM(od.cantidad) AS total_vendido,
    SUM(od.cantidad * od.precio) AS ingresos
FROM products p
INNER JOIN order_details od ON od.product_id = p.id
GROUP BY p.id, p.nombre
ORDER BY total_vendido DESC
LIMIT 1;


-- Categoría con más ingresos
SELECT 
    p.categoria,
    SUM(od.cantidad * od.precio) AS ingresos
FROM products p
INNER JOIN order_details od ON od.product_id = p.id
GROUP BY p.categoria
ORDER BY ingresos DESC
LIMIT 1;


-- Mes con más ventas
SELECT 
    DATE_FORMAT(o.fecha, '%Y-%m') AS mes,
    SUM(o.total) AS total_ventas,
    COUNT(o.id) AS num_ordenes
FROM orders o
GROUP BY DATE_FORMAT(o.fecha, '%Y-%m')
ORDER BY total_ventas DESC
LIMIT 1;


-- Cliente que más ha gastado
SELECT 
    u.nombre,
    u.correo,
    COUNT(o.id) AS num_ordenes,
    SUM(o.total) AS total_gastado
FROM users u
INNER JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.nombre, u.correo
ORDER BY total_gastado DESC
LIMIT 10;

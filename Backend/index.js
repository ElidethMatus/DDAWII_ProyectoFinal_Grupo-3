const express = require('express');
const cors = require('cors');

const sequelize = require('./connection/db');
const Producto = require('./models/producto');
const Usuario = require('./models/usuario');
const Order = require('./models/ordenes');
const OrderDetail = require('./models/ordDetalles');

const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
.then(() => {
    console.log('Conexión exitosa a MySQL');
})
.catch((error) => {
    console.log('Error:', error);
});

app.get('/products', async (req, res) => {

    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

});

app.get('/orders/:userId', async (req, res) => {

    try {

        const orders = await Order.findAll({
            where: {
                user_id: req.params.userId
            },
            order: [['fecha', 'DESC']]
        });

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.get('/orders/detail/:orderId', async (req, res) => {

    try {

        const detalles = await OrderDetail.findAll({
            where: {
                order_id: req.params.orderId
            }
        });

        const detallesConNombre = [];

        for (const detalle of detalles) {

            const producto = await Producto.findByPk(
                detalle.product_id
            );

            detallesConNombre.push({
                id: detalle.id,
                nombre: producto.nombre,
                cantidad: detalle.cantidad,
                precio: detalle.precio
            });

        }

        res.status(200).json(detallesConNombre);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
    });

app.get('/users', async (req, res) => {

    try {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'nombre', 'correo', 'rol']
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.post('/users', async (req, res) => {

    try {
        const usuario = await Usuario.create({
            nombre: req.body.nombre?.trim(),
            correo: req.body.correo?.trim().toLowerCase(),
            password: req.body.password?.trim(),
            rol: req.body.rol || 'cliente'
        });
        res.status(201).json(usuario);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.post('/login', async (req, res) => {

    try {
        const correo = req.body.correo?.trim().toLowerCase();
        const password = req.body.password?.trim();

        const usuario = await Usuario.findOne({
            where: {
                correo,
                password
            }
        });

        if(usuario){
            res.status(200).json({
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            });
        } else {

            res.status(401).json({
                message: 'Correo o contraseña incorrectos'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.post('/products', async (req, res) => {

    try {
        const producto = await Producto.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            imagen: req.body.imagen
        });

        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

});

app.post('/orders', async (req, res) => {

    try {

        const { user_id, productos } = req.body;

        let total = 0;

        for (const item of productos) {

            const producto = await Producto.findByPk(
                item.product_id
            );

            if (producto.stock < item.cantidad) {

                return res.status(400).json({
                    message: `Stock insuficiente para ${producto.nombre}`
                });

            }

            total += producto.precio * item.cantidad;

        }

        const orden = await Order.create({
            user_id,
            total
        });

        for (const item of productos) {

            const producto = await Producto.findByPk(
                item.product_id
            );

            await OrderDetail.create({
                order_id: orden.id,
                product_id: item.product_id,
                cantidad: item.cantidad,
                precio: producto.precio
            });

            await Producto.update(
                {
                    stock: producto.stock - item.cantidad
                },
                {
                    where: {
                        id: item.product_id
                    }
                }
            );

        }

        res.status(201).json({
            message: 'Compra registrada',
            order_id: orden.id
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.put('/products/:id', async (req, res) => {

    try {
        await Producto.update(
            {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                stock: req.body.stock,
                categoria: req.body.categoria,
                imagen: req.body.imagen
            },
            {where: { id: req.params.id }
            }
        );

        res.status(200).json({
            message: 'Producto actualizado'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Endpoint temporal para verificar estructura de tablas
app.get('/debug/tables', async (req, res) => {
    try {
        const [orderDetails] = await sequelize.query("DESCRIBE order_details");
        const [orders] = await sequelize.query("DESCRIBE orders");
        const [products] = await sequelize.query("DESCRIBE products");
        
        res.status(200).json({
            order_details: orderDetails,
            orders: orders,
            products: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para insertar datos de prueba
app.get('/debug/seed-data', async (req, res) => {
    try {
        // Primero verificar qué productos existen
        const [products] = await sequelize.query("SELECT id FROM products LIMIT 10");
        
        if (products.length === 0) {
            return res.status(400).json({ error: 'No hay productos en la base de datos' });
        }

        // Usar los IDs de productos existentes
        const productIds = products.map(p => p.id);
        
        // Insertar orders de prueba
        await sequelize.query(`
            INSERT INTO orders (user_id, fecha, total) VALUES
            (1, '2024-01-15 10:30:00', 150.00),
            (1, '2024-02-20 14:45:00', 200.50),
            (1, '2024-03-10 09:15:00', 180.00),
            (2, '2024-01-25 16:20:00', 120.00),
            (2, '2024-02-15 11:00:00', 250.00),
            (1, '2024-04-05 13:30:00', 300.00),
            (3, '2024-03-20 15:45:00', 175.50),
            (1, '2024-05-12 10:00:00', 220.00),
            (2, '2024-04-18 14:15:00', 190.00),
            (1, '2024-06-01 09:30:00', 280.00)
        `);

        // Insertar order_details de prueba usando IDs de productos reales
        const p1 = productIds[0] || 1;
        const p2 = productIds[1] || productIds[0] || 2;
        const p3 = productIds[2] || productIds[0] || 3;
        const p4 = productIds[3] || productIds[0] || 4;

        await sequelize.query(`
            INSERT INTO order_details (order_id, product_id, cantidad, precio) VALUES
            (1, ${p1}, 2, 50.00),
            (1, ${p2}, 1, 50.00),
            (2, ${p1}, 3, 50.00),
            (2, ${p3}, 1, 50.50),
            (3, ${p2}, 2, 45.00),
            (3, ${p4}, 2, 45.00),
            (4, ${p1}, 1, 50.00),
            (4, ${p3}, 2, 35.00),
            (5, ${p2}, 3, 45.00),
            (5, ${p4}, 2, 57.50),
            (6, ${p1}, 4, 50.00),
            (6, ${p2}, 2, 50.00),
            (7, ${p3}, 3, 35.00),
            (7, ${p4}, 2, 35.25),
            (8, ${p1}, 2, 50.00),
            (8, ${p3}, 2, 60.00),
            (9, ${p2}, 2, 45.00),
            (9, ${p4}, 2, 50.00),
            (10, ${p1}, 3, 50.00),
            (10, ${p2}, 2, 65.00)
        `);

        res.status(200).json({ message: 'Datos de prueba insertados correctamente', productIds });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== ENDPOINTS PARA GRÁFICAS =====

// 1. Productos más vendidos (Top 10)
app.get('/metrics/top-products', async (req, res) => {
    try {
        const result = await sequelize.query(`
            SELECT 
                p.nombre,
                SUM(od.cantidad) AS total_vendido,
                COUNT(od.id) AS num_ordenes
            FROM products p
            INNER JOIN order_details od ON od.product_id = p.id
            GROUP BY p.id, p.nombre
            ORDER BY total_vendido DESC
            LIMIT 10
        `, { type: sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            res.status(200).json({
                message: 'Top 10 productos más vendidos',
                data: result
            });
        } else {
            res.status(400).json({
                message: 'No se encontraron datos',
                data: []
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener productos más vendidos',
            error: error.message
        });
    }
});

// 2. Ventas por categoría
app.get('/metrics/sales-by-category', async (req, res) => {
    try {
        const result = await sequelize.query(`
            SELECT 
                p.categoria,
                SUM(od.cantidad) AS total_vendido,
                COUNT(DISTINCT od.order_id) AS num_ordenes,
                SUM(od.cantidad * od.precio) AS ingresos
            FROM products p
            INNER JOIN order_details od ON od.product_id = p.id
            GROUP BY p.categoria
            ORDER BY ingresos DESC
        `, { type: sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            res.status(200).json({
                message: 'Ventas por categoría',
                data: result
            });
        } else {
            res.status(400).json({
                message: 'No se encontraron datos',
                data: []
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener ventas por categoría',
            error: error.message
        });
    }
});

// 3. Ingresos por mes
app.get('/metrics/revenue-by-month', async (req, res) => {
    try {
        const result = await Order.findAll({
            attributes: [
                [sequelize.fn('DATE_FORMAT', sequelize.col('fecha'), '%Y-%m'), 'mes'],
                [sequelize.fn('SUM', sequelize.col('total')), 'ingresos'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'num_ordenes']
            ],
            group: [sequelize.fn('DATE_FORMAT', sequelize.col('fecha'), '%Y-%m')],
            order: [[sequelize.literal('mes'), 'DESC']],
            limit: 12,
            raw: true
        });

        if (result.length > 0) {
            res.status(200).json({
                message: 'Ingresos por mes',
                data: result
            });
        } else {
            res.status(400).json({
                message: 'No se encontraron datos',
                data: []
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener ingresos por mes',
            error: error.message
        });
    }
});

// 4. Órdenes por mes
app.get('/metrics/orders-by-month', async (req, res) => {
    try {
        const result = await Order.findAll({
            attributes: [
                [sequelize.fn('DATE_FORMAT', sequelize.col('fecha'), '%Y-%m'), 'mes'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'total_ordenes'],
                [sequelize.fn('SUM', sequelize.col('total')), 'ingresos_mes'],
                [sequelize.fn('AVG', sequelize.col('total')), 'promedio_orden']
            ],
            group: [sequelize.fn('DATE_FORMAT', sequelize.col('fecha'), '%Y-%m')],
            order: [[sequelize.literal('mes'), 'DESC']],
            limit: 12,
            raw: true
        });

        if (result.length > 0) {
            res.status(200).json({
                message: 'Órdenes por mes',
                data: result
            });
        } else {
            res.status(400).json({
                message: 'No se encontraron datos',
                data: []
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener órdenes por mes',
            error: error.message
        });
    }
});

app.listen(5000, () => {
    console.log('Servidor corriendo en puerto 5000');
});
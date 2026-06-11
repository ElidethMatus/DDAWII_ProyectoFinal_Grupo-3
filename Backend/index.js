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

app.post('/users', async (req, res) => {

    try {
        const usuario = await Usuario.create({
            nombre: req.body.nombre,
            correo: req.body.correo,
            password: req.body.password,
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
        const usuario = await Usuario.findOne({
            where: {
                correo: req.body.correo,
                password: req.body.password
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

app.listen(5000, () => {
    console.log('Servidor corriendo en puerto 5000');
});
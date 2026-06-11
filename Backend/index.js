const express = require('express');
const cors = require('cors');

const sequelize = require('./connection/db');
const Producto = require('./models/producto');
const Usuario = require('./models/usuario');

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
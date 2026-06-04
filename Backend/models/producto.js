const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db');

const Producto = sequelize.define('products', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descripcion: {
        type: DataTypes.TEXT
    },

    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING
    }

}, {
    tableName: 'products',
    timestamps: false
});

module.exports = Producto;
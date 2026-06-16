const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db');

const Usuario = sequelize.define('users', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    rol: {
        type: DataTypes.ENUM('cliente', 'vendedor'),
        defaultValue: 'cliente'
    }

}, {
    tableName: 'users',
    timestamps: false
});

module.exports = Usuario;
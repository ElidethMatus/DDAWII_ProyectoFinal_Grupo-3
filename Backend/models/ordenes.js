const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db');

const Order = sequelize.define('orders', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fecha: {
        type: DataTypes.DATE
    },

    total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }

}, {
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;
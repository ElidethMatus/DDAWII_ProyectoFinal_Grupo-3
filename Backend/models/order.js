const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db');

const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;

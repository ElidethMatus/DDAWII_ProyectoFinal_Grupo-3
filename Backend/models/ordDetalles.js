const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db');

const OrderDetail = sequelize.define('order_details', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }

}, {
    tableName: 'order_details',
    timestamps: false
});

module.exports = OrderDetail;
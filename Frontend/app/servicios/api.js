import axios from 'axios';

export const getProducts = async () => {
    return await axios.get('http://localhost:5000/products');
};

export const getOrders = async (userId) => {
    return await axios.get(
        `http://localhost:5000/orders/${userId}`
    );
};

export const getOrderDetails = async (orderId) => {
    return await axios.get(
        `http://localhost:5000/orders/detail/${orderId}`
    );
};

export const registerUser = async (user) => {
    return await axios.post('http://localhost:5000/users', user);
};

export const loginUser = async (credentials) => {
    return await axios.post('http://localhost:5000/login', credentials);
};

// Metrics functions
export const getTopProducts = async () => {
    return await axios.get('http://localhost:5000/metrics/top-products');
};

export const getSalesByCategory = async () => {
    return await axios.get('http://localhost:5000/metrics/sales-by-category');
};

export const getRevenueByMonth = async () => {
    return await axios.get('http://localhost:5000/metrics/revenue-by-month');
};

export const getOrdersByMonth = async () => {
    return await axios.get('http://localhost:5000/metrics/orders-by-month');
};
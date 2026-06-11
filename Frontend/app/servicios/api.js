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
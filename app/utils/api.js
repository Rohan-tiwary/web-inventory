import axios from 'axios';

const API_BASE = 'https://67f7183e42d6c71cca6403bd.mockapi.io/v1/api/products';

export const getProducts = () => axios.get(API_BASE);
export const addProduct = (product) => axios.post(API_BASE, product);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/${id}`);
export const getProductById = (id) => axios.get(`${API_BASE}/${id}`);

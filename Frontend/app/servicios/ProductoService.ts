import axios from "axios";
import { Producto } from "../models/Producto";

const API_URL = "http://localhost:5000/products";

export const getProductos = async (): Promise<Producto[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const crearProducto = async (
  producto: Omit<Producto, "id">,
): Promise<Producto> => {
  const { data } = await axios.post(API_URL, producto);
  return data;
};

export const actualizarProducto = async (
  id: number,
  producto: Omit<Producto, "id">,
): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, producto);
};

export const eliminarProducto = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

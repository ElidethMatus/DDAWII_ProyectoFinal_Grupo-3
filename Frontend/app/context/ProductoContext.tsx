import React from "react";
import { Producto } from "../models/Producto";

export type ProductoContextType = {
  productos: Producto[];
  carrito: Producto[];
  productoSeleccionado: Producto | null;
  setProductoSeleccionado: (producto: Producto | null) => void;
  showModal: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;
  showCarritoModal: boolean;
  abrirCarritoModal: () => void;
  cerrarCarritoModal: () => void;
  agregarProducto: (producto: Omit<Producto, "id">) => void;
  eliminarProducto: (id: number) => void;
  actualizarProducto: (
    id: number,
    productoActualizado: Omit<Producto, "id">,
  ) => void;
  agregarAlCarrito: (producto: Producto) => void;
  quitarDelCarrito: (id: number) => void;
  limpiarCarrito: () => void;
};

export const ProductoContext = React.createContext<ProductoContextType>({
  productos: [],
  carrito: [],
  productoSeleccionado: null,
  setProductoSeleccionado: () => {},
  showModal: false,
  abrirModal: () => {},
  cerrarModal: () => {},
  showCarritoModal: false,
  abrirCarritoModal: () => {},
  cerrarCarritoModal: () => {},
  agregarProducto: () => {},
  eliminarProducto: () => {},
  actualizarProducto: () => {},
  agregarAlCarrito: () => {},
  quitarDelCarrito: () => {},
  limpiarCarrito: () => {},
});

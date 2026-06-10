"use client";
import { useEffect, useState } from "react";
import { Producto } from "../models/Producto";
import { ProductoContext } from "../context/ProductoContext";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  getProductos,
} from "../services/ProductoService";

export const ProductoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCarritoModal, setShowCarritoModal] = useState(false);

  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => {
    setShowModal(false);
    setProductoSeleccionado(null);
  };
  const abrirCarritoModal = () => setShowCarritoModal(true);
  const cerrarCarritoModal = () => setShowCarritoModal(false);

  const agregarProducto = async (producto: Omit<Producto, "id">) => {
    const nuevo = await crearProducto(producto);
    setProductos([...productos, nuevo]);
  };

  const actualizar = async (
    id: number,
    productoActualizado: Omit<Producto, "id">,
  ) => {
    await actualizarProducto(id, productoActualizado);
    setProductos(
      productos.map((p) => (p.id === id ? { id, ...productoActualizado } : p)),
    );
  };

  const eliminar = async (id: number) => {
    await eliminarProducto(id);
    setProductos(productos.filter((p) => p.id !== id));
  };

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito([...carrito, producto]);
  };

  const quitarDelCarrito = (id: number) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <ProductoContext.Provider
      value={{
        productos,
        agregarProducto,
        actualizarProducto: actualizar,
        eliminarProducto: eliminar,
        carrito,
        agregarAlCarrito: (producto) => setCarrito([...carrito, producto]),
        quitarDelCarrito: (id) =>
          setCarrito(carrito.filter((p) => p.id !== id)),
        limpiarCarrito: () => setCarrito([]),
        productoSeleccionado,
        setProductoSeleccionado,
        showModal,
        abrirModal,
        cerrarModal,
        showCarritoModal,
        abrirCarritoModal,
        cerrarCarritoModal,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};

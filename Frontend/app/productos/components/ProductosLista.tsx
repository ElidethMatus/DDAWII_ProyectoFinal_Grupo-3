'use client';
import React, { useContext, useEffect } from "react";
import { ProductoContext } from "../context/ProductoContext";

export default function ProductosLista() {
  const { productos, agregarAlCarrito } = useContext(ProductoContext);

  useEffect(() => {
    console.log("Productos cargados:", productos);
  }, [productos]);

  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id} style={{ marginBottom: "1rem" }}>
            <strong>{producto.nombre}</strong> - ${producto.precio}
            <br />
            <em>{producto.descripcion}</em>
            <br />
            <button onClick={() => agregarAlCarrito(producto)}>
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

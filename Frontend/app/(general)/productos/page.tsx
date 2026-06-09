import ProductosLista from "@/app/productos/components/ProductosLista";
import { ProductoProvider } from "@/app/productos/providers/ProductoProvider";
import React from "react";

export default function page() {
  return (
    <ProductoProvider>
      <main style={{ padding: "2rem" }}>
        <h1>Módulo de Productos</h1>
        <ProductosLista />
      </main>
    </ProductoProvider>
  );
}

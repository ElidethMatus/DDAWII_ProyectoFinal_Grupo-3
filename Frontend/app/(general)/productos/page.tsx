"use client";
import ProductosLista from "@/app/productos/components/ProductosLista";
import ProductosModal from "@/app/productos/components/ProductosModal";
import { ProductoContext } from "@/app/productos/context/ProductoContext";
import { ProductoProvider } from "@/app/productos/providers/ProductoProvider";
import { useContext } from "react";

function ProductosContent() {
  const { abrirModal } = useContext(ProductoContext);

  return (
    <main style={{ padding: "2rem", marginTop: "4rem" }}>
      <h1>Módulo de Productos</h1>
      <button className="btn btn-primary" onClick={abrirModal}>
        Crear Producto
      </button>
      <ProductosModal />
      <ProductosLista />
    </main>
  );
}

export default function Page() {
  return (
    <ProductoProvider>
      <ProductosContent />
    </ProductoProvider>
  );
}

"use client";
import CarritoModal from "@/app/productos/components/CarritoModal";
import ProductosLista from "@/app/productos/components/ProductosLista";
import ProductosModal from "@/app/productos/components/ProductosModal";
import { ProductoContext } from "@/app/productos/context/ProductoContext";
import { ProductoProvider } from "@/app/productos/providers/ProductoProvider";
import ProtectedRoute from "@/app/context/ProtectedRoute";
import { useContext } from "react";

function ProductosContent() {
  const { abrirModal } = useContext(ProductoContext);
  return (
    <main style={{ padding: "2rem", marginTop: "4rem" }}>
      <h1>Módulo de Productos</h1>
      <button className="btn btn-primary" onClick={abrirModal}>
        Crear Producto
      </button>
      <CarritoModal />
      <ProductosModal />
      <ProductosLista />
    </main>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <ProductoProvider>
        <ProductosContent />
      </ProductoProvider>
    </ProtectedRoute>
  );
}
"use client";
import CarritoModal from "@/app/components/CarritoModal";
import ProductosLista from "../../components/ProductosLista";
import ProductosModal from "../../components/ProductosModal";
import { ProductoContext } from "../../context/ProductoContext";
import { ProductoProvider } from "../../providers/ProductoProvider";
import ProtectedRoute from "@/app/context/ProtectedRoute";
import { useContext } from "react";

function ProductosContent() {
  const { abrirModal } = useContext(ProductoContext);
  return (
    <main style={{ padding: "2rem", marginTop: "4rem" }}>
      <button
  className="btn btn-primary rounded-circle shadow" onClick={abrirModal} style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    fontSize: "28px",
    zIndex: 1000,
  }}> + </button>
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
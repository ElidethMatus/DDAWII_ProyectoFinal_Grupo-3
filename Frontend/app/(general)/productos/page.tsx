"use client";
import CarritoModal from "../../components/CarritoModal";
import ProductosLista from "../../components/ProductosLista";
import ProductosModal from "../../components/ProductosModal";
import { ProductoContext } from "../../context/ProductoContext";
import ProtectedRoute from "../../context/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import { useContext } from "react";

function ProductosContent() {
  const { user } = useAuth();
  const { abrirModal } = useContext(ProductoContext);
  return (
    <main style={{ padding: "2rem", marginTop: "4rem" }}>
      {user?.rol === "vendedor" && (
  <button
    className="btn btn-primary rounded-circle shadow"
    onClick={abrirModal}
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "60px",
      height: "60px",
      fontSize: "28px",
      zIndex: 1000,
    }}> + </button>)}
      {user?.rol !== "vendedor" && <CarritoModal/>}
      <ProductosModal />
      <ProductosLista />
    </main>
  );
}
export default function Page() {
  return (
    <ProtectedRoute>
      <ProductosContent/>
    </ProtectedRoute>
  );
}
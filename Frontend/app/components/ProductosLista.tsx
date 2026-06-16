"use client";
import React, { useContext, useEffect } from "react";
import { ProductoContext } from "../context/ProductoContext";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

export default function ProductosLista() {
  const {
    productos,
    agregarAlCarrito,
    setProductoSeleccionado,
    abrirModal,
    eliminarProducto,
  } = useContext(ProductoContext);

  const { user } = useAuth();

  useEffect(() => {
    console.log("Productos cargados:", productos);
  }, [productos]);

  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  const confirmarEliminar = async (id: number, nombre: string) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: `¿Estás seguro de eliminar "${nombre}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await eliminarProducto(id);
      Swal.fire({
        title: "Eliminado",
        text: "El producto fue eliminado correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Lista de Productos</h2>
      <div className="row g-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100">
              <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="mb-1">
                  <strong>Categoría:</strong> {producto.categoria}
                </p>
                <p className="mb-2">
                  <strong>Stock:</strong> {producto.stock}
                </p>
                <p className="fw-bold fs-5">L. {producto.precio}</p>

                {user?.rol !== "vendedor" && (
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Agregar al carrito
                  </button>
                )}

                {user?.rol === "vendedor" && (
                  <>
                    <button
                      className="btn btn-warning mt-2"
                      onClick={() => {
                        setProductoSeleccionado(producto);
                        abrirModal();
                      }}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => {
                        confirmarEliminar(producto.id, producto.nombre);
                      }}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

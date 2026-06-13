"use client";

import { useContext } from "react";
import { ProductoContext } from "../context/ProductoContext";

export default function CarritoModal() {
  const {
    carrito,
    showCarritoModal,
    cerrarCarritoModal,
    quitarDelCarrito,
    limpiarCarrito,
  } = useContext(ProductoContext);

  if (!showCarritoModal) return null;

  const total = carrito.reduce(
    (acc, producto) => acc + Number(producto.precio),
    0,
  );

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Carrito de Compras</h5>
            <button
              type="button"
              className="btn-close"
              onClick={cerrarCarritoModal}
            />
          </div>
          <div className="modal-body">
            {carrito.length === 0 ? (
              <p className="text-center">No hay productos en el carrito.</p>
            ) : (
              carrito.map((producto) => (
                <div
                  key={producto.id}
                  className="d-flex justify-content-between align-items-center border-bottom py-2"
                >
                  <div>
                    <h6>{producto.nombre}</h6>
                    <p className="mb-0">L. {producto.precio}</p>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => quitarDelCarrito(producto.id)}
                  >
                    Quitar
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="modal-footer">
            <strong className="me-auto">Total: L. {total}</strong>
            <button className="btn btn-secondary" onClick={cerrarCarritoModal}>
              Cerrar
            </button>
            <button className="btn btn-danger" onClick={limpiarCarrito}>
              Vaciar carrito
            </button>
            <button className="btn btn-success">Confirmar pedido</button>
          </div>
        </div>
      </div>
    </div>
  );
}

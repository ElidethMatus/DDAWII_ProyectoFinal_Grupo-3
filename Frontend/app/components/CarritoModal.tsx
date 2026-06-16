"use client";
import { useContext } from "react";
import { ProductoContext } from "../context/ProductoContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../servicios/api";
import Swal from "sweetalert2";

export default function CarritoModal() {
  const {
    carrito,
    showCarritoModal,
    cerrarCarritoModal,
    quitarDelCarrito,
    limpiarCarrito,
  } = useContext(ProductoContext);
    const { user } = useAuth();

  if (!showCarritoModal) return null;

  const total = carrito.reduce(
    (acc, producto) => acc + Number(producto.precio),
    0,
  );



const confirmarPedido = async () => {
  console.log("USER:", user);
  console.log("CARRITO:", carrito);

  try {
    if (!user) {
      Swal.fire("Error", "Debes iniciar sesión", "error");
      return;
    }

    const productos = carrito.map((producto) => ({
      product_id: producto.id,
      cantidad: 1,
    }));

    await createOrder({
      user_id: user.id,
      productos,
    });

    Swal.fire(
      "Éxito",
      "Pedido realizado correctamente",
      "success"
    );

    limpiarCarrito();

    window.location.reload();

  } catch (error) {
    console.error(error);

    Swal.fire(
      "Error",
      "No se pudo registrar el pedido",
      "error"
    );
  }
};

  return (
    <div className="modal show d-block" tabIndex={-1} style={{backgroundColor: "rgba(0, 0, 0, 0.75)",}}>
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
            <button className="btn btn-success" onClick={confirmarPedido}> Confirmar pedido </button>
          </div>
        </div>
      </div>
    </div>
  );
}

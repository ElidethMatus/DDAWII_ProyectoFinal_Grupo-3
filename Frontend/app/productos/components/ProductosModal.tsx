"use client";
import { useState, useContext, useEffect } from "react";
import { ProductoContext } from "../context/ProductoContext";
import { Producto } from "../models/Producto";

export default function ProductModal() {
  const {
    agregarProducto,
    actualizarProducto,
    productoSeleccionado,
    showModal,
    cerrarModal,
  } = useContext(ProductoContext);

  const [form, setForm] = useState<Omit<Producto, "id">>({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    categoria: "",
    imagen: "",
  });

  useEffect(() => {
    if (showModal) {
      if (productoSeleccionado) {
        setForm({
          nombre: productoSeleccionado.nombre,
          descripcion: productoSeleccionado.descripcion,
          precio: productoSeleccionado.precio,
          stock: productoSeleccionado.stock,
          categoria: productoSeleccionado.categoria,
          imagen: productoSeleccionado.imagen,
        });
      } else {
        setForm({
          nombre: "",
          descripcion: "",
          precio: 0,
          stock: 0,
          categoria: "",
          imagen: "",
        });
      }
    }
  }, [showModal, productoSeleccionado]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productoSeleccionado) {
      await actualizarProducto(productoSeleccionado.id, form);
    } else {
      await agregarProducto(form);
    }
    cerrarModal();
  };

  if (!showModal) return null;

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {productoSeleccionado ? "Editar Producto" : "Nuevo Producto"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={cerrarModal}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Nombre del producto"
              />
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Descripción del producto"
              />
              <input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Precio del producto"
              />
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Stock del producto"
              />
              <input
                type="text"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Categoría del producto"
              />
              <input
                type="text"
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="URL de la imagen del producto"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cerrarModal}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-success">
                {productoSeleccionado ? "Guardar cambios" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

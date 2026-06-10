"use client";
import { ProductoContext } from "@/app/productos/context/ProductoContext";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

export default function Navbar() {
  const { carrito, abrirCarritoModal } = useContext(ProductoContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link href="/" className="nav-link active" aria-current="page">
              Home
            </Link>
            <Link href="/productos" className="nav-link">
              Productos
            </Link>
            <Link href="/presupuesto" className="nav-link">
              Presupuesto
            </Link>
            <Link href="/usuarios" className="nav-link">
              Usuarios
            </Link>
          </div>
          <div className="ms-auto">
            <button className="btn btn-outline-primary position-relative" onClick={abrirCarritoModal}>
              <i className="bi bi-cart4"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {carrito.length}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { ProductoContext } from "../../context/ProductoContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { carrito, abrirCarritoModal } = useContext(ProductoContext);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src="/ProyectoDWII.png"
            alt="Pulpería Online"
            width={250}
            height={80}
            priority
            style={{ width: "auto", height: "60px" }}
          />
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

        <div className="navbar-collapse show" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link href="/productos" className="nav-link">
              Productos
            </Link>

            {user?.rol !== "vendedor" && (
              <Link href="/historial" className="nav-link">
                Historial
              </Link>
            )}

            {user?.rol === "vendedor" && (
              <>
                <Link href="/admin/inventario" className="nav-link">
                  Inventario
                </Link>

                <Link href="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </>
            )}
          </div>

          <div className="ms-auto d-flex align-items-center gap-2">
            {user && (
              <>
                {user?.rol !== "vendedor" && (
                  <button
                    className="btn btn-outline-primary position-relative"
                    onClick={abrirCarritoModal}
                  >
                    <i className="bi bi-cart4"></i>

                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {carrito.length}
                    </span>
                  </button>
                )}

                <span className="navbar-text">Hola, {user.nombre}</span>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            )}
            {!user && (
              <>
                <Link href="/iniciar-sesion" className="nav-link">
                  Iniciar sesión
                </Link>

                <Link href="/registro" className="nav-link">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

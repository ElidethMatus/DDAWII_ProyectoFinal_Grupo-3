'use client';
import Link from "next/link";
import React, { useEffect } from "react";

export default function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState } from "react";
import { registrarUsuario } from "../../../servicios/api";

export default function RegisterForm() {
  // guardo los datos del form aqui
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validacion basica
    if (!nombre || !correo || !password) {
      setError("Llena todos los campos");
      return;
    }

    try {
      const respuesta = await registrarUsuario({
        nombre,
        correo,
        password,
        rol: "cliente",
      });

      console.log("respuesta del servidor:", respuesta);

      if (respuesta.id) {
        setExito(true);
        setError("");
      } else {
        setError("Algo salio mal, intentalo de nuevo");
      }
    } catch (err) {
      console.log("error:", err);
      setError("No se pudo conectar");
    }
  };

  return (
    <div className="card p-4 mt-5 mx-auto" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Registro</h3>

      {exito && <p className="text-success">Te registraste correctamente!</p>}
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
      </form>

      <p className="mt-3 small">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
}
"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../servicios/api";

export default function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("cliente");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser({
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        password: password.trim(),
        rol,
      });
      router.push("/iniciar-sesion");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "No se pudo registrar el usuario.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title mb-4">Registro</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo
                  </label>
                  <input
                    id="correo"
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="rol" className="form-label">
                    Tipo de usuario
                  </label>

                  <select
                    id="rol"
                    className="form-select"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value="cliente">Cliente</option>
                    <option value="vendedor">Vendedor</option>
                  </select>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Crear cuenta"}
                </button>
              </form>

              <div className="mt-3 text-center">
                <a href="/iniciar-sesion">¿Ya tienes cuenta? Inicia sesión</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

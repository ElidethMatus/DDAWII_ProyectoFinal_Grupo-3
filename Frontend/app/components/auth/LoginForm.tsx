"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../shared/servicios/api";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        correo: correo.trim().toLowerCase(),
        password: password.trim(),
      });
      login(response.data);
      router.push("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "No se pudo iniciar sesión. Verifica tus datos."
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
              <h1 className="card-title mb-4">Iniciar sesión</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo
                  </label>
                  <input
                    id="correo"
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(event) => setCorreo(event.target.value)}
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
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Conectando..." : "Entrar"}
                </button>
              </form>

              <div className="mt-3 text-center">
                <a href="/registro">¿No tienes cuenta? Regístrate</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

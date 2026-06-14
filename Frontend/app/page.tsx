"use client";
import Navbar from "./components/navbar/Navbar";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="container mt-5">
        {user ? (
          <div className="alert alert-success">
            Bienvenido de nuevo, <strong>{user.nombre}</strong>.
          </div>
        ) : (
          <div className="p-4 rounded shadow-sm bg-light">
            <h1>Bienvenido a la tienda</h1>
            <p>
              Inicia sesión o regístrate para ver más productos y acceder a tu cuenta.
            </p>
            <div>
              <a href="/iniciar-sesion" className="btn btn-primary me-2">
                Iniciar sesión
              </a>
              <a href="/registro" className="btn btn-outline-primary">
                Registrarse
              </a>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

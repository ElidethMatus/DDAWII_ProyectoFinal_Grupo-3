const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// POST /users — Registro
export async function registrarUsuario(datos) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
}

// POST /login — Login
export async function loginUsuario(datos) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
}

// GET /products — Catálogo
export async function obtenerProductos() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // esperamos a que AuthContext cargue el usuario de localStorage
    setCargando(false);
  }, []);

  useEffect(() => {
    if (!cargando && user === null) {
      router.push("/iniciar-sesion");
    }
  }, [cargando, user, router]);

  // mientras carga no hacemos nada
  if (cargando) return null;

  if (!user) return null;

  return <>{children}</>;
}
"use client";

import { ProductoProvider } from "@/app/productos/providers/ProductoProvider";

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProductoProvider>{children}</ProductoProvider>;
}

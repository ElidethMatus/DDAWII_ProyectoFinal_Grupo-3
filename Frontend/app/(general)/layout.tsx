import Navbar from "../shared/components/navbar/Navbar";
import { ProductoProvider } from "@/app/productos/providers/ProductoProvider";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ProductoProvider>
          <Navbar />
          <main>{children}</main>
        </ProductoProvider>
      </body>
    </html>
  );
}

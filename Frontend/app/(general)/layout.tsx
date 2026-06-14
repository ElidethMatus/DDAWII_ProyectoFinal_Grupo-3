import Navbar from "../components/navbar/Navbar";
import { ProductoProvider } from "../productos/providers/ProductoProvider";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductoProvider>
      <Navbar />
      <main>{children}</main>
    </ProductoProvider>
  );
}
import Navbar from "../components/navbar/Navbar";
import { ProductoProvider } from "../providers/ProductoProvider";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductoProvider>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        {children}
      </main>
    </ProductoProvider>
  );
}
import { PRODUCTS } from "../data/ProductData";
import ProductCard from "./ProductCard";

/* ---------------- Product Page ---------------- */
export default function ProductPage() {
  const query = "";
  const filtered = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.cat.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* <Hero /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard data={p}  />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full font-[Karla] text-[#8a7860]">No products match "{query}".</p>
          )}
        </div>
      </div>
    </div>
  );
}
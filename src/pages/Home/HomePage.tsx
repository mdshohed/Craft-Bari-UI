import { Check, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../data/ProductData";
import ProductCard from "../Products/ProductCard";
import { Link } from "react-router-dom";

/* ---------------- Home Page ---------------- */
export default function HomePage() {
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
        <div className="flex items-end justify-between mb-7">
          <div>
            <span className="font-[Karla] text-xs tracking-[0.2em] uppercase text-[#A8823C]">This Month</span>
            <h2 className="font-[Fraunces] text-3xl text-[#2B1D14] mt-1">New Arrivals</h2>
          </div>
          <Link to="/products">
            <span className="font-[Karla] text-sm text-[#A8823C] flex items-center gap-1 cursor-pointer">
              View all <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
          
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard data={p}  />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full font-[Karla] text-[#8a7860]">No products match "{query}".</p>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-10">
        <div className="flex items-end justify-between mb-7">
          <div>
            <span className="font-[Karla] text-xs tracking-[0.2em] uppercase text-[#A8823C]">This Month</span>
            <h2 className="font-[Fraunces] text-3xl text-[#2B1D14] mt-1">Signature Blends</h2>
          </div>
          <span className="font-[Karla] text-sm text-[#A8823C] flex items-center gap-1 cursor-pointer">
            View all <ChevronRight className="w-4 h-4" />
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard data={p} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full font-[Karla] text-[#8a7860]">No products match "{query}".</p>
          )}
        </div>
      </div>
      <div className="bg-[#EFE6D8] border-y border-[#E4D8C4]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 grid sm:grid-cols-3 gap-6 font-[Karla] text-sm text-[#4A3627]">
          <div className="flex items-center gap-3"><Check className="w-5 h-5 text-[#5B6B4F]" /> 100% natural wood, sanded &amp; sealed by hand</div>
          <div className="flex items-center gap-3"><Check className="w-5 h-5 text-[#5B6B4F]" /> 1-year workmanship guarantee</div>
          <div className="flex items-center gap-3"><Check className="w-5 h-5 text-[#5B6B4F]" /> Cash on delivery across Bangladesh</div>
        </div>
      </div>
    </div>
  );
}
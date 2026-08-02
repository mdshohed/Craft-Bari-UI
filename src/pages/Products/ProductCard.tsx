import { Product } from "@/types/types";
import ProductArt from "../Home/ProductArt";
import TreeRingSeal from "../Shared/TreeRingSeal";

interface ProductCardProps {
  p: Product;
  onOpen: (id: number) => void;
  onAdd: (id: number, qty?: number) => void;
}

// export function ProductCard({ p, onOpen, onAdd }: ProductCardProps) {
export function ProductCard({ p, onOpen, onAdd }: ProductCardProps) {

  const pct = Math.round(((p.was - p.price) / p.was) * 100);
  return (
    <div className="group relative bg-white rounded-2xl border border-[#E4D8C4] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div className="relative">
        <button onClick={() => onOpen(p.id)} className="block w-full">
          <ProductArt Icon={p.icon} className="h-44 w-full" />
        </button>
        <span className="absolute top-3 left-3 bg-[#8C3B2E] text-white text-[11px] font-[Karla] font-bold px-2 py-1 rounded-full">
          -{pct}%
        </span>
        <TreeRingSeal size={64} />
      </div>
      <div className="p-4">
        <button onClick={() => onOpen(p.id)} className="text-left block">
          <p className="font-[Karla] text-[#8a7860] text-xs">{p.cat}</p>
          <h3 className="font-[Fraunces] text-[#2B1D14] text-base leading-snug mt-0.5">{p.name}</h3>
          <p className="font-[Karla] text-[#8a7860] text-xs mt-0.5">{p.bn}</p>
        </button>
        <div className="flex items-baseline gap-2 mt-2 font-[Karla]">
          <span className="text-[#A8823C] font-bold text-lg">৳{p.price}</span>
          <span className="text-[#b3a385] text-sm line-through">৳{p.was}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onAdd(p.id)}
            className="flex-1 border border-[#2B1D14] text-[#2B1D14] text-sm font-[Karla] font-semibold py-2 rounded-full hover:bg-[#2B1D14] hover:text-white transition-colors"
          >
            Add to Cart
          </button>
          <button
            onClick={() => onOpen(p.id)}
            className="flex-1 bg-[#A8823C] text-white text-sm font-[Karla] font-semibold py-2 rounded-full hover:bg-[#96742f] transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
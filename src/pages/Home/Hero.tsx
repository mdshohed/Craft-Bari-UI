import { ArrowRight, Clock } from "lucide-react";
import ProductArt from "./ProductArt";

export default function Hero() {
  return (
    <div className="relative bg-[#2B1D14] overflow-hidden">
      <svg className="absolute -right-24 -top-24 opacity-[0.12]" width="520" height="520" viewBox="0 0 520 520">
        {[40, 80, 120, 160, 200, 240].map((r, i) => (
          <circle key={i} cx="260" cy="260" r={r} fill="none" stroke="#C68B4A" strokeWidth="1.4" />
        ))}
      </svg>
      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="font-[Karla] text-[#C68B4A] text-xs tracking-[0.25em] uppercase">Rooted in craft, made at home</span>
          <h1 className="font-[Fraunces] text-[#FAF6EF] text-4xl sm:text-5xl leading-[1.08] mt-3">
            Every grain tells<br /><span className="italic text-[#C68B4A]">a homestead's</span> story.
          </h1>
          <p className="font-[Karla] text-[#D8C7A8] mt-5 max-w-md leading-relaxed">
            Craft Bari brings handcarved wooden clocks, organizers, and keepsakes from
            Bangladeshi workshops straight to your desk — durable, natural, and made to last generations.
          </p>
          <button className="mt-7 inline-flex items-center gap-2 bg-[#C68B4A] hover:bg-[#B87F42] text-[#2B1D14] font-[Karla] font-semibold px-6 py-3 rounded-full transition-colors">
            Shop New Arrivals <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden ring-1 ring-[#4A3627]">
          <ProductArt Icon={Clock} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
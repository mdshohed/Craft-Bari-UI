
import { Facebook, Instagram, Phone } from "lucide-react";

const CATEGORIES: string[] = ["All", "Wall Clocks", "Desk Organizers", "Savings Banks", "Home Decor"];

export default function Footer() {
  return (
    <footer className="bg-[#2B1D14] text-[#D8C7A8] mt-6">
      <div className="max-w-7xl mx-auto py-12 grid sm:grid-cols-3 gap-8 font-[Karla] text-sm">
        <div>
          <span className="font-[Fraunces] text-xl text-[#FAF6EF]">Craft Bari</span>
          <p className="mt-3 leading-relaxed">Handcarved wooden goods from Bangladeshi workshops — built to be handed down, not thrown out.</p>
        </div>
        <div>
          <h4 className="text-[#FAF6EF] font-semibold mb-3">Shop</h4>
          {CATEGORIES.slice(1).map((c) => <p key={c} className="mb-1.5">{c}</p>)}
        </div>
        <div>
          <h4 className="text-[#FAF6EF] font-semibold mb-3">Contact</h4>
          <p className="flex items-center gap-2 mb-2"><Phone className="w-3.5 h-3.5" /> 01700-000000</p>
          <div className="flex gap-3 mt-3">
            <Facebook className="w-4 h-4" /><Instagram className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="text-center text-xs py-4 border-t border-[#4A3627]">© 2026 Craft Bari. All rights reserved.</div>
    </footer>
  );
}
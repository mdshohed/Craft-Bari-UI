
import { Check, Facebook, Instagram, Phone } from "lucide-react";
import footerImg from '../../../src/assets/images/craftbari-image.png'

const CATEGORIES: string[] = ["All", "Wall Clocks", "Desk Organizers", "Savings Banks", "Home Decor"];

export default function Footer() {
  return (
      <div className="">
        <div className="bg-[#EFE6D8] border-y border-[#E4D8C4]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 grid sm:grid-cols-3 gap-6 font-[Karla] text-sm text-[#4A3627]">
            <div className="flex items-center gap-3"><Check className="w-5 h-5 text-[#5B6B4F]" /> 100% natural wood, sanded &amp; sealed by hand</div>
            <div className="flex items-center gap-3"><Check className="w-5 h-5 text-[#5B6B4F]" /> 1-year workmanship guarantee</div>
            <div className="flex items-center gap-3"><Check className="w-5 h-5 text-[#5B6B4F]" /> Cash on delivery across Bangladesh</div>
          </div>
        </div>
        <footer className="bg-[#2B1D14] text-[#D8C7A8] ">
          <div className="max-w-7xl mx-auto px-4 sm:px-10 py-12 grid sm:grid-cols-3 gap-8 font-[Karla] text-sm">
            <div>
              <img 
                src={footerImg} 
                alt="footer-logo"
                className="w-64 lg:w-96"
              ></img>
              <span className="font-[Fraunces] text-xl text-[#FAF6EF]">Craft Bari</span>
              <p className="mt-3 leading-relaxed">Handcarved wooden goods from Bangladeshi workshops — built to be handed down, not thrown out.</p>
            </div>
            <div>
              <h4 className="text-[#FAF6EF] font-semibold mb-3">Shop</h4>
              {CATEGORIES.slice(1).map((c) => <p key={c} className="mb-1.5">{c}</p>)}
            </div>
            <div>
              <h4 className="text-[#FAF6EF] font-semibold mb-3">Contact</h4>
              <p className="flex items-center gap-2 mb-2"><Phone className="w-3.5 h-3.5" />+8801869961011</p>
              <div className="flex gap-3 mt-3">
                <Facebook className="w-4 h-4" /><Instagram className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="text-center text-xs py-4 border-t border-[#4A3627]">© 2026 Craft Bari. All rights reserved.</div>
        </footer>
      </div>
  );
}
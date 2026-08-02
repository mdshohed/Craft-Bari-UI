import React, { useState, useEffect, useId, useRef } from "react";
import logo from '../src/assets/logo/Craftbari.png'
import footerImg from '../src/assets/images/craftbari-image.png'

import {
  Heart, ShoppingBag, User, Phone, MessageCircle,
  ChevronRight, ChevronLeft, Plus, Minus, Facebook, Instagram, Check, Menu,
  LucideIcon, ZoomIn, X
} from "lucide-react";
import { PRODUCTS } from "./pages/data/ProductData";
import { Product } from "./types/types";

/* ---------------- Types ---------------- */
type Page = "home" | "product" | "cart";


interface CartItem {
  id: number;
  qty: number;
}

interface CartItemWithProduct extends CartItem {
  product: Product;
}

/* ---------------- Fonts ---------------- */
function useFonts(): void {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Karla:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
}

const CATEGORIES: string[] = ["All", "Wall Clocks", "Desk Organizers", "Savings Banks", "Home Decor"];

/* ---------------- Signature element: carved wax-seal mark ---------------- */
interface TreeRingSealProps {
  size?: number;
}

function TreeRingSeal({ size = 78 }: TreeRingSealProps) {
  const id = useId().replace(/:/g, "");
  return (
    <div className="tree-ring-seal absolute -top-3 -right-3 z-20 drop-shadow-md" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="47" fill="#A8823C" />
        <circle cx="50" cy="50" r="47" fill="none" stroke="#7A5F2E" strokeWidth="1.5" opacity="0.5" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#FAF6EF" strokeWidth="0.6" opacity="0.55" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#FAF6EF" strokeWidth="0.6" opacity="0.55" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="#FAF6EF" strokeWidth="0.6" opacity="0.55" />
        <path id={id} d="M 50,50 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" fill="none" />
        <text fill="#FAF6EF" fontSize="8.6" letterSpacing="1.5" fontFamily="Karla, sans-serif" fontWeight="700">
          <textPath href={`#${id}`} startOffset="2%">
            HANDCRAFTED • CRAFT BARI •
          </textPath>
        </text>
      </svg>
    </div>
  );
}

/* ---------------- Placeholder product art (grain + icon, swap for real photos) ---------------- */
interface ProductArtProps {
  Icon: LucideIcon;
  className?: string;
}

function ProductArt({ Icon, className = "" }: ProductArtProps) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: "linear-gradient(135deg,#D9A362,#C68B4A 45%,#A8823C)" }}>
      <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <clipPath id={`clip-${id}`}><rect width="200" height="200" /></clipPath>
        </defs>
        <g clipPath={`url(#clip-${id})`} stroke="#2B1D14" fill="none" strokeWidth="1.1">
          {[10, 26, 44, 64, 86, 110, 136, 164].map((r, i) => (
            <ellipse key={i} cx="30" cy="210" rx={r * 1.4} ry={r} opacity={0.35 - i * 0.02} />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#2B1D14]/85 flex items-center justify-center ring-2 ring-[#FAF6EF]/40">
          <Icon className="w-7 h-7 text-[#FAF6EF]" strokeWidth={1.6} />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */
interface HeaderProps {
  cartCount: number;
  onNav: (page: Page) => void;
  onSearch: (query: string) => void;
}

function Header({ cartCount, onNav, onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div className="">
      <div className="bg-[#2B1D14]  text-[#EFE6D8] text-xs px-4 py-2 flex items-center justify-between">
        {/* <div className="flex items-center mx-auto max-w-7xl px-6 sm:px-10"> */}
          <span className="hidden sm:inline">Please call to confirm stock before ordering.</span>
          <span className="sm:hidden">Call to confirm stock</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 "><Phone className="w-3.5 h-3.5" />+8801869961011</span>
            <Facebook className="w-3.5 h-3.5 hidden sm:block" />
            <Instagram className="w-3.5 h-3.5 hidden sm:block" />
          {/* </div> */}
         </div>
      </div>
      <div className="bg-[#FAF6EF] max-w-7xl mx-auto border-b border-[#E4D8C4] px-4 sm:px-4 py-3 flex items-center gap-4">
        <button className="lg:hidden text-[#2B1D14]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <button onClick={() => onNav("home")} className="flex items-center gap-2 shrink-0">
          {/* <svg width="34" height="34" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="19" fill="#2B1D14" />
            <circle cx="20" cy="20" r="14" fill="none" stroke="#C68B4A" strokeWidth="1.1" />
            <circle cx="20" cy="20" r="9" fill="none" stroke="#C68B4A" strokeWidth="1.1" />
            <circle cx="20" cy="20" r="4" fill="#C68B4A" />
          </svg> */}
          <img
              src={logo}
              alt="logo"
              className="w-12 lg:w-20"
            />
          <span className="font-[Fraunces] text-2xl text-[#2B1D14] leading-none">
            Craft <span className="italic text-[#A8823C]">Bari</span>
          </span>
        </button>
        <div className="hidden md:flex flex-1 max-w-xl items-center border border-[#D8C7A8] rounded-full overflow-hidden bg-white ml-4">
          <input
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search for wall clocks, organizers, gifts…"
            className="flex-1 px-4 py-2 text-sm outline-none bg-transparent font-[Karla] text-[#2B1D14] placeholder:text-[#9c8a72]"
          />
          <button className="bg-[#2B1D14] text-[#FAF6EF] px-4 py-2 text-sm font-[Karla] font-semibold">
            Search
          </button>
        </div>
        <div className="flex items-center gap-4 ml-auto text-[#2B1D14]">
          <User className="w-6 h-6 hidden sm:block" />
          <Heart className="w-6 h-6 hidden sm:block" />
          <button onClick={() => onNav("cart")} className="relative">
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#A8823C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-[Karla] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {/* <div className="hidden lg:flex bg-white border-b border-[#E4D8C4] px-8 py-2.5 gap-6 font-[Karla] text-sm text-[#4A3627]">
        {CATEGORIES.map((c) => (
          <span key={c} className="hover:text-[#A8823C] cursor-pointer">{c}</span>
        ))}
      </div> */}
    </div>
  );
}

/* ---------------- Hero ---------------- */
// function Hero() {
//   return (
//     <div className="relative bg-[#2B1D14] overflow-hidden">
//       <svg className="absolute -right-24 -top-24 opacity-[0.12]" width="520" height="520" viewBox="0 0 520 520">
//         {[40, 80, 120, 160, 200, 240].map((r, i) => (
//           <circle key={i} cx="260" cy="260" r={r} fill="none" stroke="#C68B4A" strokeWidth="1.4" />
//         ))}
//       </svg>
//       <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
//         <div>
//           <span className="font-[Karla] text-[#C68B4A] text-xs tracking-[0.25em] uppercase">Rooted in craft, made at home</span>
//           <h1 className="font-[Fraunces] text-[#FAF6EF] text-4xl sm:text-5xl leading-[1.08] mt-3">
//             Every grain tells<br /><span className="italic text-[#C68B4A]">a homestead's</span> story.
//           </h1>
//           <p className="font-[Karla] text-[#D8C7A8] mt-5 max-w-md leading-relaxed">
//             Craft Bari brings handcarved wooden clocks, organizers, and keepsakes from
//             Bangladeshi workshops straight to your desk — durable, natural, and made to last generations.
//           </p>
//           <button className="mt-7 inline-flex items-center gap-2 bg-[#C68B4A] hover:bg-[#B87F42] text-[#2B1D14] font-[Karla] font-semibold px-6 py-3 rounded-full transition-colors">
//             Shop New Arrivals <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>
//         <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden ring-1 ring-[#4A3627]">
//           <ProductArt Icon={Clock} className="w-full h-full" />
//         </div>
//       </div>
//     </div>
//   );
// }

/* ---------------- Product Card ---------------- */
interface ProductCardProps {
  p: Product;
  onOpen: (id: number) => void;
  onAdd: (id: number, qty?: number) => void;
}

function ProductCard({ p, onOpen, onAdd }: ProductCardProps) {
  const pct = Math.round(((p.was - p.price) / p.was) * 100);
  const hasImage = p.images && p.images.length > 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E4D8C4] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div className="relative">
        <button onClick={() => onOpen(p.id)} className="block w-full h-64 overflow-hidden">
          {hasImage ? (
            <img
              src={p.images[0]}
              alt={p.name}
              className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <ProductArt Icon={p.icon} className="h-48 w-full" />
          )}
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
        <div className="flex gap-2 mt-3 ">
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


/* ---------------- Product Image Gallery ---------------- */

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  /** Badges/seals that sit on top of the main image, e.g. discount tag, TreeRingSeal */
  overlay?: React.ReactNode;
  /** Rendered instead of the gallery when `images` is empty (e.g. your icon-based ProductArt) */
  fallback?: React.ReactNode;
}

export function ProductImageGallery({ images, alt, overlay, fallback }: ProductImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) {
    return (
      <div className="relative rounded-2xl overflow-hidden">
        {fallback}
        {overlay}
      </div>
    );
  }

  const active = images[activeIdx];

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = imgWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
  }

  return (
    <div className="w-full">
      {/* Main image */}
      <div
        ref={imgWrapRef}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setLightboxOpen(true)}
        className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[#E4D8C4] bg-[#F4F1EA] cursor-zoom-in group"
      >
        <img src={active} alt={alt} className="w-full h-full object-cover" />

        {overlay}

        {/* magnifier cursor hint */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
          <ZoomIn size={16} className="text-[#2B1D14]" />
        </div>

        {/* hover magnifier panel (desktop only) */}
        {showZoom && (
          <div
            className="hidden md:block absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${active})`,
              backgroundSize: "200%",
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`shrink-0 w-28 h-28 rounded-xl overflow-hidden border-2 transition-colors ${
              idx === activeIdx
                ? "border-[#A8823C]"
                : "border-[#E4D8C4] hover:border-[#c9b48f]"
            }`}
          >
            <img src={img} alt={`${alt} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Fullscreen lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={22} />
          </button>

          <img
            src={active}
            alt={alt}
            className="max-w-full max-h-full object-contain cursor-zoom-out"
            onClick={(e) => e.stopPropagation()}
          />

          {/* thumbnail nav inside lightbox */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 p-2 rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  idx === activeIdx ? "bg-[#A8823C]" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Home Page ---------------- */
interface HomePageProps {
  query: string;
  onOpen: (id: number) => void;
  onAdd: (id: number, qty?: number) => void;
}

function HomePage({ query, onOpen, onAdd }: HomePageProps) {
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
          <span className="font-[Karla] text-sm text-[#A8823C] flex items-center gap-1 cursor-pointer">
            View all <ChevronRight className="w-4 h-4" />
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} onOpen={onOpen} onAdd={onAdd} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full font-[Karla] text-[#8a7860]">No products match "{query}".</p>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-10 ">
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
            <ProductCard key={p.id} p={p} onOpen={onOpen} onAdd={onAdd} />
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

/* ---------------- Product Detail Page ---------------- */
// interface ProductPageProps {
//   id: number;
//   onNav: (page: Page) => void;
//   onAdd: (id: number, qty?: number) => void;
// }

// function ProductPage({ id, onNav, onAdd }: ProductPageProps) {
//   const p: Product = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
//   const [qty, setQty] = useState<number>(1);
//   useEffect(() => setQty(1), [id]);
//   const pct = Math.round(((p.was - p.price) / p.was) * 100);

//   return (
//     <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
//       <button onClick={() => onNav("home")} className="flex items-center gap-1 text-sm font-[Karla] text-[#8a7860] mb-6 hover:text-[#2B1D14]">
//         <ChevronLeft className="w-4 h-4" /> Back to shop
//       </button>
//       <div className="grid md:grid-cols-2 gap-10">
//         <div className="relative rounded-2xl overflow-hidden">
//           <ProductArt Icon={p.icon} className="w-full h-80 sm:h-[420px]" />
//           <span className="absolute top-4 left-4 bg-[#8C3B2E] text-white text-xs font-[Karla] font-bold px-3 py-1.5 rounded-full">
//             -{pct}% OFF
//           </span>
//           <TreeRingSeal size={84} />
//         </div>
//         <div>
//           <p className="font-[Karla] text-xs tracking-[0.2em] uppercase text-[#A8823C]">{p.cat}</p>
//           <h1 className="font-[Fraunces] text-3xl text-[#2B1D14] mt-2">{p.name}</h1>
//           <p className="font-[Karla] text-[#8a7860] mt-1">{p.bn}</p>
//           <div className="flex items-baseline gap-3 mt-5 font-[Karla]">
//             <span className="text-[#A8823C] font-bold text-3xl">৳{p.price}</span>
//             <span className="text-[#b3a385] text-lg line-through">৳{p.was}</span>
//           </div>
//           <p className="flex items-center gap-2 mt-3 text-sm font-[Karla] text-[#5B6B4F]">
//             <span className="w-2 h-2 rounded-full bg-[#5B6B4F] inline-block" /> In stock — ready to ship
//           </p>

//           <div className="flex items-center gap-4 mt-7">
//             <div className="flex items-center border border-[#D8C7A8] rounded-full">
//               <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 text-[#2B1D14]"><Minus className="w-4 h-4" /></button>
//               <span className="w-8 text-center font-[Karla] text-[#2B1D14]">{qty}</span>
//               <button onClick={() => setQty(qty + 1)} className="p-3 text-[#2B1D14]"><Plus className="w-4 h-4" /></button>
//             </div>
//             <button
//               onClick={() => onAdd(p.id, qty)}
//               className="flex-1 bg-[#2B1D14] text-[#FAF6EF] font-[Karla] font-semibold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#4A3627] transition-colors"
//             >
//               <ShoppingBag className="w-4 h-4" /> Add to Cart
//             </button>
//           </div>
//           <button className="w-full mt-3 bg-[#A8823C] text-white font-[Karla] font-semibold py-3 rounded-full hover:bg-[#96742f] transition-colors">
//             Buy Now
//           </button>

//           <div className="grid grid-cols-2 gap-3 mt-3">
//             <button className="flex items-center justify-center gap-2 border border-[#D8C7A8] rounded-full py-2.5 text-sm font-[Karla] text-[#2B1D14]">
//               <Phone className="w-4 h-4" /> Order by Call
//             </button>
//             <button className="flex items-center justify-center gap-2 bg-[#5B6B4F] text-white rounded-full py-2.5 text-sm font-[Karla] font-semibold">
//               <MessageCircle className="w-4 h-4" /> Order on WhatsApp
//             </button>
//           </div>

//           <div className="mt-8 pt-6 border-t border-[#E4D8C4] font-[Karla] text-sm text-[#4A3627] leading-relaxed">
//             <h3 className="font-[Fraunces] text-lg text-[#2B1D14] mb-2">Description</h3>
//             <p>Handcarved from natural wood and finished with a premium, long-lasting seal. A piece that carries the mark of the workshop it came from — every unit is subtly one of a kind.</p>
//             <p className="mt-2">Perfect for gifting, for the office, or for a corner of home that deserves something made by hand rather than a machine.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

interface ProductPageProps {
  id: number;
  onNav: (page: Page) => void;
  onAdd: (id: number, qty?: number) => void;
}

const BUSINESS_PHONE = "+8801869961011";     // used for the "tel:" link — shown in the dialer
const WHATSAPP_NUMBER = "8801869961011";     // used for wa.me — country code, no + no spaces
 
function handleCall() {
  window.location.href = `tel:${BUSINESS_PHONE}`;
}
function handleWhatsApp(p: Product) {
  const message = `আসসালামু আলাইকুম, আমি এই পণ্যটি অর্ডার করতে চাই:\n\n${p.name}\nমূল্য: ৳${p.price}\nলিংক: ${window.location.href}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function ProductPage({ id, onNav, onAdd }: ProductPageProps) {
  const p: Product = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
  const [qty, setQty] = useState<number>(1);
  useEffect(() => setQty(1), [id]);
  const pct = Math.round(((p.was - p.price) / p.was) * 100);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
      <button onClick={() => onNav("home")} className="flex items-center gap-1 text-sm font-[Karla] text-[#8a7860] mb-6 hover:text-[#2B1D14]">
        <ChevronLeft className="w-4 h-4" /> Back to shop
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        {/* --- was: <div className="relative rounded-2xl overflow-hidden"> with a single ProductArt --- */}
        <ProductImageGallery
          images={p.images}
          alt={p.name}
          overlay={
            <>
              <span className="absolute top-4 left-4 bg-[#8C3B2E] text-white text-xs font-[Karla] font-bold px-3 py-1.5 rounded-full">
                -{pct}% OFF
              </span>
              <TreeRingSeal size={84} />
            </>
          }
        />

        <div>
          <p className="font-[Karla] text-xs tracking-[0.2em] uppercase text-[#A8823C]">{p.cat}</p>
          <h1 className="font-[Fraunces] text-3xl text-[#2B1D14] mt-2">{p.name}</h1>
          <p className="font-[Karla] text-[#8a7860] mt-1">{p.bn}</p>
          <div className="flex items-baseline gap-3 mt-5 font-[Karla]">
            <span className="text-[#A8823C] font-bold text-3xl">৳{p.price}</span>
            <span className="text-[#b3a385] text-lg line-through">৳{p.was}</span>
          </div>
          <p className="flex items-center gap-2 mt-3 text-sm font-[Karla] text-[#5B6B4F]">
            <span className="w-2 h-2 rounded-full bg-[#5B6B4F] inline-block" /> In stock — ready to ship
          </p>

          <div className="flex items-center gap-4 mt-7">
            <div className="flex items-center border border-[#D8C7A8] rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 text-[#2B1D14]"><Minus className="w-4 h-4" /></button>
              <span className="w-8 text-center font-[Karla] text-[#2B1D14]">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 text-[#2B1D14]"><Plus className="w-4 h-4" /></button>
            </div>
            <button
              onClick={() => onAdd(p.id, qty)}
              className="flex-1 bg-[#2B1D14] text-[#FAF6EF] font-[Karla] font-semibold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#4A3627] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          </div>
          <button className="w-full mt-3 bg-[#A8823C] text-white font-[Karla] font-semibold py-3 rounded-full hover:bg-[#96742f] transition-colors">
            Buy Now
          </button>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-2 border border-[#D8C7A8] rounded-full py-2.5 text-sm font-[Karla] text-[#2B1D14]"
            >
              <Phone className="w-4 h-4" /> Order by Call
            </button>
            <button
              onClick={() => handleWhatsApp(p)}
              className="flex items-center justify-center gap-2 bg-[#5B6B4F] text-white rounded-full py-2.5 text-sm font-[Karla] font-semibold"
            >
              <MessageCircle className="w-4 h-4" /> Order on WhatsApp
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E4D8C4] font-[Karla] text-sm text-[#4A3627] leading-relaxed">
            <h3 className="font-[Fraunces] text-lg text-[#2B1D14] mb-2">Description</h3>
            <p className="whitespace-pre-line font-[Karla] text-sm text-[#4A3627] leading-relaxed">
              {p.description}
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

/* ---------------- Cart Page ---------------- */
interface CartPageProps {
  cart: CartItem[];
  onNav: (page: Page) => void;
  onQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

function CartPage({ cart, onNav, onQty, onRemove }: CartPageProps) {
  const items: CartItemWithProduct[] = cart.map((c) => ({
    ...c,
    product: PRODUCTS.find((p) => p.id === c.id) as Product,
  }));
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-2  py-12">
      <h1 className="font-[Fraunces] text-3xl text-[#2B1D14] mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-10 h-10 mx-auto text-[#D8C7A8]" />
          <p className="font-[Karla] text-[#8a7860] mt-4">Your cart is empty.</p>
          <button onClick={() => onNav("home")} className="mt-5 bg-[#2B1D14] text-white font-[Karla] font-semibold px-6 py-2.5 rounded-full">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((i) => (
              <div key={i.id} className="flex gap-4 bg-white border border-[#E4D8C4] rounded-2xl p-3">
                <ProductArt Icon={i.product.icon} className="w-20 h-20 rounded-xl shrink-0" />
                <div className="flex-1">
                  <h2 className="font-[Fraunces] text-[#2B1D14]">{i.product.name}</h2>
                  <p className="font-[Karla] text-[#A8823C] font-bold mt-1">৳{i.product.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-[#D8C7A8] rounded-full">
                      <button onClick={() => onQty(i.id, Math.max(1, i.qty - 1))} className="p-1.5 text-[#2B1D14]"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="w-6 text-center text-sm font-[Karla]">{i.qty}</span>
                      <button onClick={() => onQty(i.id, i.qty + 1)} className="p-1.5 text-[#2B1D14]"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                    <button onClick={() => onRemove(i.id)} className="text-xs font-[Karla] text-[#8C3B2E] hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#EFE6D8] rounded-2xl p-6 h-fit font-[Karla]">
            <div className="flex justify-between text-sm text-[#4A3627] mb-2">
              <span>Subtotal</span><span>৳{total}</span>
            </div>
            <div className="flex justify-between text-sm text-[#4A3627] mb-4">
              <span>Delivery</span><span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between font-bold text-[#2B1D14] text-lg border-t border-[#D8C7A8] pt-4 mb-5">
              <span>Total</span><span>৳{total}</span>
            </div>
            <button className="w-full bg-[#A8823C] text-white font-semibold py-3 rounded-full hover:bg-[#96742f] transition-colors">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-[#2B1D14] text-[#D8C7A8] mt-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid sm:grid-cols-3 gap-8 font-[Karla] text-sm">
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
  );
}

/* ---------------- App ---------------- */
export default function App() {
  useFonts();
  const [page, setPage] = useState<Page>("home");
  const [selectedId, setSelectedId] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (id: number, qty: number = 1): void => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c));
      return [...prev, { id, qty }];
    });
  };
  const setQtyFor = (id: number, qty: number): void =>
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty } : c)));
  const removeFromCart = (id: number): void =>
    setCart((prev) => prev.filter((c) => c.id !== id));
  const openProduct = (id: number): void => {
    setSelectedId(id);
    setPage("product");
    window.scrollTo(0, 0);
  };
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <div className="min-h-screen bg-[#FAF6EF] " style={{ fontFamily: "Karla, sans-serif" }}>
      <Header cartCount={cartCount} onNav={(p) => { setPage(p); window.scrollTo(0, 0); }} onSearch={setQuery} />
      {page === "home" && <HomePage query={query} onOpen={openProduct} onAdd={addToCart} />}
      {page === "product" && <ProductPage id={selectedId} onNav={setPage} onAdd={addToCart} />}
      {page === "cart" && <CartPage cart={cart} onNav={setPage} onQty={setQtyFor} onRemove={removeFromCart} />}
      <Footer />
    </div>
  );
}
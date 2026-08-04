import React, { useState, useEffect, useId, useRef } from "react";
import logo from '../src/assets/logo/Craftbari.png'
import footerImg from '../src/assets/images/craftbari-image.png'

import {  ChangeEvent, ReactNode } from "react";
import {  Shield, Truck, RotateCcw, Lock, } from "lucide-react";

import {
  Heart, ShoppingBag, User, Phone, MessageCircle,
  ChevronRight, ChevronLeft, Plus, Minus, Facebook, Instagram, Check, Menu,
  LucideIcon, ZoomIn, X
} from "lucide-react";
import { PRODUCTS } from "./pages/data/ProductData";
import { CartItem, CartItem2, Product } from "./types/types";

/* ---------------- Types ---------------- */
type Page = "home" | "product" | "cart";


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
  onAdd: (id: number, quantity?: number) => void;
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
  onAdd: (id: number, quantity?: number) => void;
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
interface ProductPageProps {
  id: number;
  onNav: (page: Page) => void;
  onAdd: (id: number, quantity?: number) => void;
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
  const [quantity, setquantity] = useState<number>(1);
  useEffect(() => setquantity(1), [id]);
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
              <button onClick={() => setquantity(Math.max(1, quantity - 1))} className="p-3 text-[#2B1D14]"><Minus className="w-4 h-4" /></button>
              <span className="w-8 text-center font-[Karla] text-[#2B1D14]">{quantity}</span>
              <button onClick={() => setquantity(quantity + 1)} className="p-3 text-[#2B1D14]"><Plus className="w-4 h-4" /></button>
            </div>
            <button
              onClick={() => onAdd(p.id, quantity)}
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
  onquantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

function CartPage({ cart, onNav, onquantity, onRemove }: CartPageProps) {
  const items: CartItemWithProduct[] = cart.map((c) => ({
    ...c,
    product: PRODUCTS.find((p) => p.id === c.id) as Product,
  }));
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const [fullName, setFullName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [payment, setPayment] = useState<PaymentMethod>("cash");
  const [item, setItem] = useState<CartItem | null>(initialItem);
  const [errors, setErrors] = useState<FormErrors>({});
  const [placing, setPlacing] = useState<boolean>(false);
  const [placed, setPlaced] = useState<boolean>(false);


  // const updatequantity = (quantity: number) => {
  //   if (quantity < 1) return;
  //   setItem((prev) => (prev ? { ...prev, quantity } : prev));
  // };


  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!fullName.trim()) next.fullName = "Full name is required.";
    if (!/^01[0-9]{9}$/.test(mobile.trim()))
      next.mobile = "Enter a valid 11-digit mobile number.";
    if (!address.trim()) next.address = "Delivery address is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate() || !item) return;
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
    }, 900);
  };

   const handleContinueShopping = () => {
    setPlaced(false);
    setItem(initialItem);
    setFullName("");
    setMobile("");
    setAddress("");
    setNotes("");
    setErrors({});
  };

   if (placed) {
    return <ConfirmationPage onContinueShopping={handleContinueShopping} />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-2 py-6">
      {/* <h1 className="font-[Fraunces] text-3xl text-[#2B1D14] mb-8">Your Cart</h1> */}
      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-10 h-10 mx-auto text-[#D8C7A8]" />
          <p className="font-[Karla] text-[#8a7860] mt-4">Your cart is empty.</p>
          <button onClick={() => onNav("home")} className="mt-5 bg-[#2B1D14] text-white font-[Karla] font-semibold px-6 py-2.5 rounded-full">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6 rounded-xl border border-stone-200 bg-white px-4 py-4 sm:px-8">
            <ol className="flex items-center justify-center gap-2 sm:gap-4">
              {STEPS.map((step, idx) => (
                <li key={step.id} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <span
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                        step.status === "done"
                          ? "bg-stone-900 text-white"
                          : step.status === "current"
                          ? "border-2 border-stone-900 bg-white text-stone-900"
                          : "border-2 border-stone-300 bg-white text-stone-400",
                      ].join(" ")}
                    >
                      {step.status === "done" ? <Check size={16} /> : step.id}
                    </span>
                    <span
                      className={[
                        "text-sm font-medium sm:text-base",
                        step.status === "upcoming" ? "text-stone-400" : "text-stone-900",
                      ].join(" ")}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <span className="mx-2 h-px w-10 bg-stone-300 sm:mx-4 sm:w-24" />
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid md:grid-cols-8 gap-4">
            <div className="space-y-6 md:col-span-5">
              {/* Billing details */}
              <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                <div className="flex items-start gap-3 bg-[#F7F3EA] px-6 py-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">
                    1
                  </span>
                  <div>
                    <h2 className="font-semibold text-stone-900">Billing Details</h2>
                    <p className="text-sm text-stone-500">Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="space-y-4 px-6 py-6">
                  <Field label="Full Name" required error={errors.fullName}>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className={inputClass(!!errors.fullName)}
                    />
                  </Field>

                  <Field label="Mobile Number" required error={errors.mobile}>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setMobile(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className={inputClass(!!errors.mobile)}
                    />
                  </Field>

                  <Field label="Delivery Address" required error={errors.address}>
                    <input
                      type="text"
                      value={address}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                      placeholder="Thana, District, Area"
                      className={inputClass(!!errors.address)}
                    />
                  </Field>

                  <Field label="Order Notes" optional>
                    <textarea
                      value={notes}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                      placeholder="Any special instructions for your order..."
                      rows={3}
                      className={inputClass(false) + " resize-y"}
                    />
                  </Field>
                </div>
              </section>

              {/* Payment method */}
              <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                <div className="flex items-start gap-3 bg-[#F7F3EA] px-6 py-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">
                    2
                  </span>
                  <div>
                    <h2 className="font-semibold text-stone-900">Payment Method</h2>
                    <p className="text-sm text-stone-500">Choose how you want to pay.</p>
                  </div>
                </div>

                <div className="space-y-3 px-6 py-6">
                  <label
                    className={[
                      "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition",
                      payment === "cash"
                        ? "border-stone-900 bg-[#F7F3EA]"
                        : "border-stone-200 hover:border-stone-300",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "cash"}
                      onChange={() => setPayment("cash")}
                      className="h-4 w-4 accent-stone-900"
                    />
                    <span className="font-medium text-stone-800">Cash Account</span>
                  </label>

                  <label
                    className={[
                      "flex cursor-pointer items-center gap-3 rounded-lg border border-dashed px-4 py-3 transition",
                      payment === "other"
                        ? "border-stone-900 bg-[#F7F3EA]"
                        : "border-amber-300 hover:border-amber-400",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "other"}
                      onChange={() => setPayment("other")}
                      className="h-4 w-4 accent-stone-900"
                    />
                    <span className="text-stone-500">Other payment method</span>
                  </label>
                </div>
              </section>
            </div>
            
            <div className="bg-[#EFE6D8] md:col-span-3 rounded-2xl p-6 h-fit font-[Karla]">
              <h2 className="mb-4 text-base font-semibold text-stone-900">Order Summary</h2>
              <div className="border-t border-stone-100" />
              <div className="md:col-span-2 space-y-4 pb-4">
                {items.map((i) => (
                  <div key={i.id} className="flex gap-4 bg-white border border-[#E4D8C4] rounded-2xl p-3">
                    {/* <ProductArt Icon={i.product.icon} className="w-20 h-20 rounded-xl shrink-0" /> */}
                    {i?.product?.images ? (
                      <img
                        src={i.product.images[0]}
                        alt={i.product.name}
                        className="w-20 h-20 rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <ProductArt Icon={i.product.icon} className="w-20 h-20 rounded-xl shrink-0" />
                    )}
                    <div className="flex-1">
                      <h2 className="font-[Fraunces] text-[#2B1D14]">{i.product.name}</h2>
                      <p className="font-[Karla] text-[#A8823C] font-bold mt-1">৳{i.product.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-[#D8C7A8] rounded-full">
                          <button onClick={() => onquantity(i.id, Math.max(1, i.quantity - 1))} className="p-1.5 text-[#2B1D14]"><Minus className="w-3.5 h-3.5" /></button>
                          <span className="w-6 text-center text-sm font-[Karla]">{i.quantity}</span>
                          <button onClick={() => onquantity(i.id, i.quantity + 1)} className="p-1.5 text-[#2B1D14]"><Plus className="w-3.5 h-3.5" /></button>
                        </div>
                        <button onClick={() => onRemove(i.id)} className="text-xs font-[Karla] text-[#8C3B2E] hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t border-[#D8C7A8] pt-4 mb-5 text-sm text-[#4A3627] mb-2">
                <span className="font-medium">Subtotal</span><span className="font-bold">৳{total}</span>
              </div>
              <div className="flex justify-between text-sm text-[#4A3627] mb-4">
                <span className="font-medium">Delivery</span><span className="font-bold">Free</span>
              </div>
              <div className="flex justify-between font-bold text-[#2B1D14] text-lg border-t border-[#D8C7A8] pt-4 mb-5">
                <span>Total</span><span>৳{total}</span>
              </div>
              {/* <button className="w-full bg-[#A8823C] text-white font-semibold py-3 rounded-full hover:bg-[#96742f] transition-colors">
                Place Order
              </button> */}
              <button
                onClick={handlePlaceOrder}
                disabled={!item || placing}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 py-3 font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Lock size={16} />
                {placing ? "Placing order..." : `Place Order — ${total}৳`}
              </button>
              <div className="mt-4 flex items-center justify-center gap-5 border-t border-stone-100 pt-4 text-xs text-emerald-700">
                <span className="flex items-center gap-1">
                  <Shield size={14} /> Secure checkout
                </span>
                <span className="flex items-center gap-1">
                  <Truck size={14} /> Fast delivery
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw size={14} /> Easy returns
                </span>
              </div>
            </div>
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

type StepStatus = "done" | "current" | "upcoming";

interface Step {
  id: number;
  label: string;
  status: StepStatus;
}

const STEPS: Step[] = [
  { id: 1, label: "Cart", status: "done" },
  { id: 2, label: "Checkout", status: "current" },
  { id: 3, label: "Confirmation", status: "upcoming" },
];


const initialItem: CartItem2 = {
  id: 1,
  name: "উমরাহ ব্যাংক - ১ লক্ষ ৫০ হাজার টাকা",
  price: 650,
  quantity: 1,
  image:
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop",
};

type PaymentMethod = "cash" | "other";

interface FormErrors {
  fullName?: string;
  mobile?: string;
  address?: string;
}


interface FieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}

function Field({ label, required, optional, error, children }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-stone-700">
        {label} {required && <span className="text-red-500">*</span>}
        {optional && <span className="ml-1 font-normal text-stone-400">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2",
    hasError
      ? "border-red-300 focus:ring-red-200"
      : "border-stone-200 focus:border-stone-400 focus:ring-stone-200",
  ].join(" ");
}


interface Step {
  id: number;
  label: string;
  status: StepStatus;
}

/* ---------------- Confirmation ---------------- */
export interface ConfirmationPageProps {
  title?: string;
  message?: string;
  onContinueShopping?: () => void;
}

function ConfirmationPage({
  title = "ধন্যবাদ! Your order is confirmed",
  message = "আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করে বিস্তারিত জানিয়ে দিবে।",
  onContinueShopping,
}: ConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-[#F7F3EA] text-stone-800">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        {/* Stepper */}
        <div className="mb-6 rounded-xl border border-stone-200 bg-white px-4 py-4 sm:px-8">
          <ol className="flex items-center justify-center gap-2 sm:gap-4">
            {STEPS.map((step, idx) => (
              <li key={step.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                      step.status === "done"
                        ? "bg-stone-900 text-white"
                        : step.status === "current"
                        ? "border-2 border-stone-900 bg-white text-stone-900"
                        : "border-2 border-stone-300 bg-white text-stone-400",
                    ].join(" ")}
                  >
                    {step.status === "done" ? <Check size={16} /> : step.id}
                  </span>
                  <span
                    className={[
                      "text-sm font-medium sm:text-base",
                      step.status === "upcoming" ? "text-stone-400" : "text-stone-900",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <span className="mx-2 h-px w-10 bg-stone-300 sm:mx-4 sm:w-24" />
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Confirmation card */}
        <div
          className="relative overflow-hidden rounded-xl border border-stone-200 bg-white px-6 py-20 text-center"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 35%, rgba(120,113,108,0.08), transparent 60%)",
          }}
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-stone-900 shadow-lg shadow-stone-900/10">
            <Check size={36} className="text-white" strokeWidth={2.5} />
          </div>

          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">{title}</h2>

          <p className="mx-auto mt-3 max-w-md text-stone-400">{message}</p>

          <button
            onClick={onContinueShopping}
            className="mt-8 rounded-lg border border-stone-300 bg-white px-6 py-2.5 font-medium text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  useFonts();
  const [page, setPage] = useState<Page>("home");
  const [selectedId, setSelectedId] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (id: number, quantity: number = 1): void => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + quantity } : c));
      return [...prev, { id, quantity }];
    });
  };
  const setquantityFor = (id: number, quantity: number): void =>
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, quantity } : c)));
  const removeFromCart = (id: number): void =>
    setCart((prev) => prev.filter((c) => c.id !== id));
  const openProduct = (id: number): void => {
    setSelectedId(id);
    setPage("product");
    window.scrollTo(0, 0);
  };
  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF6EF] " style={{ fontFamily: "Karla, sans-serif" }}>
      <Header cartCount={cartCount} onNav={(p) => { setPage(p); window.scrollTo(0, 0); }} onSearch={setQuery} />
      {page === "home" && <HomePage query={query} onOpen={openProduct} onAdd={addToCart} />}
      {page === "product" && <ProductPage id={selectedId} onNav={setPage} onAdd={addToCart} />}
      {page === "cart" && <CartPage cart={cart} onNav={setPage} onquantity={setquantityFor} onRemove={removeFromCart} />}
      <Footer />
    </div>
  );
}
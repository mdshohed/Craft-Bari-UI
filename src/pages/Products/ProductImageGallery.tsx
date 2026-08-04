import { X, ZoomIn } from "lucide-react";
import { useRef, useState } from "react";

/* ---------------- Product Image Gallery ---------------- */
interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  overlay?: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProductImageGallery({ images, alt, overlay, fallback }: ProductImageGalleryProps) {
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
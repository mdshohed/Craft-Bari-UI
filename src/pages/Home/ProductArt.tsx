import { LucideIcon } from "lucide-react";
import { useId } from "react";

interface ProductArtProps {
  Icon: LucideIcon;
  className?: string;
}

export default function ProductArt({ Icon, className = "" }: ProductArtProps) {
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
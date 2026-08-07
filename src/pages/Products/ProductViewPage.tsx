import { Product } from "@/types/types";
import { PRODUCTS } from "../data/ProductData";
import { useEffect, useState } from "react";
import { ChevronLeft, MessageCircle, Minus, Phone, Plus, ShoppingBag } from "lucide-react";
import ProductImageGallery from "./ProductImageGallery";
import TreeRingSeal from "../shared/TreeRingSeal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/card/cardSlice";

/* ---------------- Product Detail Page ---------------- */
const BUSINESS_PHONE = "+8801869961011";     // used for the "tel:" link — shown in the dialer
const WHATSAPP_NUMBER = "8801869961011";     // used for wa.me — country code, no + no spaces
 
function handleCall() {
  window.location.href = `tel:${BUSINESS_PHONE}`;
}
function handleWhatsApp(data: Product) {
  const message = `আসসালামু আলাইকুম, আমি এই পণ্যটি অর্ডার করতে চাই:\n\n${data?.name}\nমূল্য: ৳${data?.price}\nলিংক: ${window.location.href}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

export default function ProductViewPage() {
  const { id } = useParams();
  const data: Product = PRODUCTS.find((x) => x.id === Number(id)) || PRODUCTS[0];
  const [quantity, setQty] = useState<number>(1);
  useEffect(() => setQty(1), [id]);
  const pct = Math.round(((data?.was - data?.price) / data?.was) * 100);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product: any) => {
    const payload = { product, quantity };
    dispatch(addToCart(payload));
    // toast.success("Added to Card Successfully");
    // setQuantity(1);
  };

  const handleBuyNow = (product: any) => {
    const payload = { product, quantity };
    dispatch(addToCart(payload));
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
      <Link to="/">
        <button className="flex items-center gap-1 text-sm font-[Karla] text-[#8a7860] mb-6 hover:text-[#2B1D14]">
          <ChevronLeft className="w-4 h-4" /> Back to shop
        </button>
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        {/* --- was: <div className="relative rounded-2xl overflow-hidden"> with a single ProductArt --- */}
        <ProductImageGallery
          images={data?.images}
          alt={data?.name}
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
          <p className="font-[Karla] text-xs tracking-[0.2em] uppercase text-[#A8823C]">{data?.cat}</p>
          <h1 className="font-[Fraunces] text-3xl text-[#2B1D14] mt-2">{data?.name}</h1>
          <p className="font-[Karla] text-[#8a7860] mt-1">{data?.bn}</p>
          <div className="flex items-baseline gap-3 mt-5 font-[Karla]">
            <span className="text-[#A8823C] font-bold text-3xl">৳{data?.price}</span>
            <span className="text-[#b3a385] text-lg line-through">৳{data?.was}</span>
          </div>
          <p className="flex items-center gap-2 mt-3 text-sm font-[Karla] text-[#5B6B4F]">
            <span className="w-2 h-2 rounded-full bg-[#5B6B4F] inline-block" /> In stock — ready to ship
          </p>

          <div className="flex items-center gap-4 mt-7">
            <div className="flex items-center border border-[#D8C7A8] rounded-full">
              <button onClick={() => setQty(Math.max(1, quantity - 1))} className="p-3 text-[#2B1D14]"><Minus className="w-4 h-4" /></button>
              <span className="w-8 text-center font-[Karla] text-[#2B1D14]">{quantity}</span>
              <button onClick={() => setQty(quantity + 1)} className="p-3 text-[#2B1D14]"><Plus className="w-4 h-4" /></button>
            </div>
            <button
              onClick={() => handleAddToCart(data)}
              className="flex-1 bg-[#2B1D14] text-[#FAF6EF] font-[Karla] font-semibold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#4A3627] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          </div>
          <button onClick={() => handleBuyNow(data)} className="w-full mt-3 bg-[#A8823C] text-white font-[Karla] font-semibold py-3 rounded-full hover:bg-[#96742f] transition-colors">
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
              onClick={() => handleWhatsApp(data)}
              className="flex items-center justify-center gap-2 bg-[#5B6B4F] text-white rounded-full py-2.5 text-sm font-[Karla] font-semibold"
            >
              <MessageCircle className="w-4 h-4" /> Order on WhatsApp
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E4D8C4] font-[Karla] text-sm text-[#4A3627] leading-relaxed">
            <h3 className="font-[Fraunces] text-lg text-[#2B1D14] mb-2">Description</h3>
            <p className="whitespace-pre-line font-[Karla] text-sm text-[#4A3627] leading-relaxed">
              {data?.description}
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
import { Step } from "@/types/types";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------- Confirmation ---------------- */
export interface ConfirmationPageProps {
  title?: string;
  message?: string;
}

const STEPS: Step[] = [
  { id: 1, label: "Cart", status: "done" },
  { id: 2, label: "Checkout", status: "done" },
  { id: 3, label: "Confirmation", status: "upcoming" },
];

export function ConfirmationPage({
  title = "ধন্যবাদ! Your order is confirmed",
  message = "আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করে বিস্তারিত জানিয়ে দিবে।",
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
          <Link to="/">
            <button
              className="mt-8 rounded-lg border border-stone-300 bg-white px-6 py-2.5 font-medium text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
            >
              Continue Shopping
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
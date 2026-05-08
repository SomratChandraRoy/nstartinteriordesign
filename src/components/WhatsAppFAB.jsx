import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const PHONE = "8801816072106"; // BD format, no plus

export default function WhatsAppFAB() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Residential");

  const message = encodeURIComponent(
    `Hello, I am interested in a consultation for my ${type} space. Could we schedule a brief call?`,
  );
  const link = `https://wa.me/${PHONE}?text=${message}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="glass-strong rounded-2xl p-5 w-[300px]"
          style={{
            animation: "fadeUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="flex items-start justify-between mb-1">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                Direct Line
              </div>
              <div className="font-display text-lg text-[#F8FAFC] mt-1">
                The Architect
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
            >
              <X size={14} className="text-white/70" />
            </button>
          </div>

          <p className="text-xs text-white/60 mt-3 leading-relaxed">
            Tell us a little about your project. Our principal designer will
            respond within the hour during studio hours.
          </p>

          <div className="mt-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/45 mb-2">
              Project Type
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Residential", "Commercial", "Hospitality"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className="px-3 py-1.5 rounded-full text-xs transition-all duration-300"
                  style={{
                    background:
                      type === t
                        ? "rgba(212,175,55,0.18)"
                        : "rgba(255,255,255,0.04)",
                    border:
                      type === t
                        ? "1px solid rgba(212,175,55,0.5)"
                        : "1px solid rgba(255,255,255,0.08)",
                    color: type === t ? "#D4AF37" : "rgba(255,255,255,0.7)",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] text-[#030712] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#1ebe5a] transition-colors"
          >
            <MessageCircle size={14} />
            Open WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="WhatsApp the studio"
        data-cursor=""
        className="relative w-14 h-14 rounded-full glass-strong flex items-center justify-center hover:border-[#D4AF37]/40 transition-all"
        style={{
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,211,102,0.3), transparent 70%)",
            animation: "pulse-gold 2.4s ease-in-out infinite",
          }}
        />
        <MessageCircle size={20} className="relative z-10 text-[#25D366]" />
      </button>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

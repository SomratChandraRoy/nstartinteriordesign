import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";

const NAV = [
  { label: "Studio", href: "/studio" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/#blueprint" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-4 lg:py-3" : "py-8 lg:py-6",
        )}
        style={{
          backdropFilter: scrolled ? "blur(24px) saturate(140%)" : "blur(0)",
          WebkitBackdropFilter: scrolled
            ? "blur(24px) saturate(140%)"
            : "blur(0)",
          background: scrolled ? "rgba(3,7,18,0.7)" : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 flex items-center justify-between">
          <a href="/" data-cursor="" className="flex items-center gap-3 group relative z-10">
            <div
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:rounded-2xl group-hover:rotate-3"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
              }}
            >
              <img 
                src="/n.png" 
                alt="NSID logo" 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            <div className="leading-none flex flex-col justify-center">
              <div className="font-display text-sm lg:text-lg text-[#F8FAFC] tracking-wide font-medium">
                নর্থস্টার ইন্টেরিয়র ডিজাইন
              </div>
              <div className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mt-1 font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                NSID · Dhaka
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor=""
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-300 relative group"
              >
                {item.label}
                <span
                  className="absolute left-4 right-4 bottom-1 h-px bg-[#D4AF37] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  aria-hidden
                />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/contact"
              data-cursor="Book"
              className="btn-magnetic px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] border border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white/90 transition-colors duration-300 relative"
            >
              <span className="relative z-10">Book Consultation</span>
            </a>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="lg:hidden w-11 h-11 rounded-full glass flex items-center justify-center"
          >
            <Menu size={18} className="text-white" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden transition-all duration-700",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        style={{
          background: open ? "rgba(3,7,18,0.96)" : "transparent",
          backdropFilter: open ? "blur(32px)" : "blur(0)",
          WebkitBackdropFilter: open ? "blur(32px)" : "blur(0)",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="flex items-center justify-between px-6 py-8">
          <a href="/" className="font-display text-[#F8FAFC] flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-white/5">
              <img src="/n.png" alt="NSID" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg tracking-wider">NSID</span>
          </a>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="w-12 h-12 rounded-full glass flex items-center justify-center transition-transform hover:rotate-90 active:scale-90"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
        
        <nav className="px-8 pt-16 flex flex-col gap-6">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ease ${i * 0.08}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.08}s`,
              }}
            >
              <span className="text-4xl font-display text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors">
                {item.label}
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#D4AF37]" />
              </div>
            </a>
          ))}
        </nav>

        <div 
            className="absolute bottom-12 left-8 right-8 flex flex-col gap-8"
            style={{
                opacity: open ? 1 : 0,
                transition: "opacity 1s ease 0.5s"
            }}
        >
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-center w-full py-5 rounded-full bg-[#D4AF37] text-[#030712] font-semibold uppercase tracking-widest text-xs transition-transform active:scale-95 shadow-xl shadow-[#D4AF37]/10"
          >
            Book Consultation
          </a>
          <div className="flex justify-between items-center px-2">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                Dhaka · Bangladesh
            </div>
            <div className="flex gap-4">
                <span className="w-8 h-px bg-white/10" />
                <span className="w-8 h-px bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

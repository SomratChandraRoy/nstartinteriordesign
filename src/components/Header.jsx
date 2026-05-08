import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
          scrolled ? "py-3" : "py-6",
        )}
        style={{
          backdropFilter: scrolled ? "blur(24px) saturate(140%)" : "blur(0)",
          WebkitBackdropFilter: scrolled
            ? "blur(24px) saturate(140%)"
            : "blur(0)",
          background: scrolled ? "rgba(3,7,18,0.55)" : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 flex items-center justify-between">
          <a href="/" data-cursor="" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.25), rgba(15,118,110,0.25))",
                border: "1px solid rgba(212,175,55,0.4)",
              }}
            >
              <img src="/n.png" alt="NSID logo" className="w-full h-full object-contain p-1" />
            </div>
            <div className="leading-none">
              <div className="font-display text-base text-[#F8FAFC] tracking-wide">
                নর্থস্টার ইন্টেরিয়র ডিজাইন
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">
                NSID
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
          "fixed inset-0 z-[60] lg:hidden transition-all duration-500",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        style={{
          background: open ? "rgba(3,7,18,0.92)" : "transparent",
          backdropFilter: open ? "blur(28px)" : "blur(0)",
          WebkitBackdropFilter: open ? "blur(28px)" : "blur(0)",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <a href="/" className="font-display text-[#F8FAFC]">
            NSID
          </a>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="w-11 h-11 rounded-full glass flex items-center justify-center"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
        <nav className="px-8 pt-12 flex flex-col gap-2">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-display-lg text-[#F8FAFC] py-3 border-b border-white/8"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.06}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.06}s`,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-8 left-0 right-0 px-8">
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-center w-full py-4 rounded-full bg-[#D4AF37] text-[#030712] font-medium uppercase tracking-wider text-sm"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </>
  );
}

import { useEffect, useRef } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import LiquidHero from "./LiquidHero";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";
import { HERO_IMAGE } from "../data/projects";

export default function Hero() {
  const fadeRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      fadeRef.current?.classList.add("in");
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at top, #0F172A 0%, #030712 70%)",
      }}
    >
      {/* WebGL liquid distorted hero image */}
      <LiquidHero imageUrl={HERO_IMAGE} />

      {/* Vignette + gradient over WebGL */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,7,18,0.4) 0%, rgba(3,7,18,0.1) 30%, rgba(3,7,18,0.6) 75%, #030712 100%)",
        }}
      />

      {/* Top eyebrow row */}
      <div className="absolute top-0 inset-x-0 z-10 pt-28 lg:pt-36 px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px] flex items-start justify-between gap-6">
          <div
            ref={fadeRef}
            className="fade-up inline-flex items-center gap-3 px-4 py-2 rounded-full glass-subtle"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
              style={{ animation: "pulse-gold 2s ease-in-out infinite" }}
            />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
              Now Accepting · 2026 Commissions
            </span>
          </div>

          <div className="hidden md:flex flex-col items-end text-right">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              Studio · 23.79°N
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">
              90.40°E · Dhaka, BD
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1500px] w-full px-6 lg:px-10 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-9">
            <h1 className="text-display-hero font-display text-[#F8FAFC]">
              <SplitText
                text="Designing the"
                mode="word"
                stagger={70}
                delay={100}
              />
              <br />
              <SplitText
                text="future of living."
                mode="word"
                stagger={70}
                delay={400}
                className="italic text-[#D4AF37]"
              />
            </h1>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">
            <p
              className="text-white/65 text-[15px] leading-relaxed max-w-sm fade-up"
              style={{ transitionDelay: "0.9s" }}
              ref={(el) => {
                if (!el) return;
                setTimeout(() => el.classList.add("in"), 900);
              }}
            >
              An interior architecture practice, headquartered in Dhaka,
              designing residences and corporate environments for those who
              notice the unseen.
            </p>

            <div
              className="flex flex-wrap items-center gap-3 fade-up"
              ref={(el) => {
                if (!el) return;
                setTimeout(() => el.classList.add("in"), 1100);
              }}
            >
              <MagneticButton
                href="/portfolio"
                variant="gold"
                data-cursor="View"
              >
                View Portfolio <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton href="/contact" variant="outline">
                Begin a Project
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 border-t border-white/10 pt-8">
          {[
            { value: "142", label: "Completed Commissions" },
            { value: "11", label: "Years in Practice" },
            { value: "4.2M", label: "Square Feet Designed" },
            { value: "7", label: "Industry Awards" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="fade-up"
              ref={(el) => {
                if (!el) return;
                setTimeout(() => el.classList.add("in"), 1400 + i * 120);
              }}
            >
              <div className="font-display text-3xl lg:text-4xl text-[#F8FAFC]">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/45 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
        <div className="text-[10px] uppercase tracking-[0.25em]">Scroll</div>
        <ChevronDown size={14} className="animate-bounce" />
      </div>

      <style>{`
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.6); transform: scale(1); }
          50% { box-shadow: 0 0 0 12px rgba(212, 175, 55, 0); transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "Consultation",
    duration: "2 weeks",
    body: "A private studio visit. We listen, walk your space, and build a written brief covering rituals, light, sound, and hidden constraints.",
    deliverables: ["Site audit", "Written brief", "Mood direction"],
  },
  {
    num: "02",
    title: "3D Render",
    duration: "6–8 weeks",
    body: "Architectural drawings and photoreal renders before a single wall is touched. You walk through your home in VR before signing.",
    deliverables: ["Architectural set", "VR walkthrough", "Material library"],
  },
  {
    num: "03",
    title: "Execution",
    duration: "6–14 months",
    body: "A dedicated project director coordinates 40+ tradespeople, custom millwork, and imported finishes. Weekly photo reports.",
    deliverables: ["Site management", "Quality control", "Weekly reports"],
  },
  {
    num: "04",
    title: "Handover",
    duration: "2 weeks",
    body: "Curated styling, photography, and a leather-bound house manual. Two-year aftercare and seasonal restyling included.",
    deliverables: ["Styling", "House manual", "2-year aftercare"],
  },
];

export default function Blueprint() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? passed / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lineLength = progress;

  return (
    <section
      id="blueprint"
      ref={containerRef}
      className="relative py-32 lg:py-40 px-6 lg:px-10"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-20 lg:mb-28 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              ◆ The Blueprint
            </div>
            <h2 className="text-display-xl font-display text-[#F8FAFC]">
              Four movements,
              <br />
              <span className="italic text-white/55">one inevitability.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-white/55 text-sm leading-relaxed max-w-md">
              A choreographed engagement averaging 14 months from first
              conversation to final candle lit. No surprises, no hidden line
              items, no rushed decisions.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* SVG vertical line that draws on scroll */}
          <svg
            className="absolute left-6 lg:left-1/2 top-0 h-full w-px"
            style={{ transform: "translateX(-50%)", overflow: "visible" }}
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={`${lineLength * 100}%`}
              stroke="#D4AF37"
              strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.45))" }}
            />
          </svg>

          <div className="space-y-20 lg:space-y-32">
            {STEPS.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <BlueprintStep
                  key={step.num}
                  step={step}
                  left={left}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlueprintStep({ step, left, index }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(true);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
    >
      {/* Node */}
      <div
        className="absolute left-6 lg:left-1/2 top-6 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 z-10"
        aria-hidden
      >
        <div
          className="w-4 h-4 rounded-full transition-all duration-700"
          style={{
            background: active ? "#D4AF37" : "#0F172A",
            border: active
              ? "1px solid rgba(212,175,55,0.8)"
              : "1px solid rgba(255,255,255,0.15)",
            boxShadow: active
              ? "0 0 0 4px rgba(212,175,55,0.15), 0 0 20px rgba(212,175,55,0.4)"
              : "none",
          }}
        />
      </div>

      {/* Spacer for left-aligned card */}
      {!left && <div className="hidden lg:block lg:col-span-6" />}

      {/* Card */}
      <div
        className={`pl-16 lg:pl-0 lg:col-span-6 ${left ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}
      >
        <div
          className="glass rounded-2xl p-6 lg:p-8 transition-all duration-700"
          style={{
            opacity: active ? 1 : 0.4,
            transform: active ? "translateY(0)" : "translateY(20px)",
            borderColor: active
              ? "rgba(212,175,55,0.25)"
              : "rgba(255,255,255,0.08)",
          }}
        >
          <div
            className={`flex items-baseline gap-4 ${left ? "lg:justify-end" : ""}`}
          >
            <div className="font-display text-5xl text-[#D4AF37]">
              {step.num}
            </div>
            <div>
              <div className="font-display text-2xl text-[#F8FAFC]">
                {step.title}
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">
                {step.duration}
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm text-white/65 leading-relaxed">
            {step.body}
          </p>

          <div
            className={`mt-6 flex flex-wrap gap-2 ${left ? "lg:justify-end" : ""}`}
          >
            {step.deliverables.map((d) => (
              <span
                key={d}
                className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10 text-white/60"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      {left && <div className="hidden lg:block lg:col-span-6" />}
    </div>
  );
}

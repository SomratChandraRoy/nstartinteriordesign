import { PUBLICATIONS } from "../../data/projects";

export default function MarqueePublications() {
  const items = [...PUBLICATIONS, ...PUBLICATIONS];
  return (
    <section className="relative py-12 border-y border-white/8 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #030712 0%, transparent 8%, transparent 92%, #030712 100%)",
          zIndex: 2,
        }}
      />

      <div className="text-center mb-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Featured In
        </span>
      </div>

      <div className="overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap">
          {items.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-12 px-12 font-display text-2xl lg:text-3xl text-white/30 hover:text-white/70 transition-colors"
            >
              {p}
              <span className="text-[#D4AF37]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

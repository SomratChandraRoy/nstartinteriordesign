import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../data/projects";

/**
 * Pinned horizontal scroll section. Computes scroll progress as the section
 * passes through the viewport and translates the inner track horizontally.
 */
export default function HorizontalPortfolio() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const distance = trackWidth - window.innerWidth;
      const total = rect.height - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? passed / total : 0;
      const x = -progress * Math.max(distance, 0);
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [trackWidth]);

  // Section height: enough to scroll horizontally through all projects
  const sectionHeight = `calc(100vh + ${Math.max(trackWidth - (typeof window !== "undefined" ? window.innerWidth : 1200), 0)}px)`;

  return (
    <section
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-10 mb-10 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-3">
              ◆ Selected Works · 2024–2025
            </div>
            <h2 className="text-display-xl font-display text-[#F8FAFC]">
              The vault.
            </h2>
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
            Scroll → to advance
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 px-10 will-change-transform"
            style={{ transition: "transform 0.05s linear" }}
          >
            {PROJECTS.map((p, i) => (
              <a
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                data-cursor="View"
                className="liquid-card group relative shrink-0 rounded-3xl overflow-hidden"
                style={{
                  width: i % 3 === 0 ? "70vh" : "52vh",
                  height: "70vh",
                }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    "--mx",
                    `${e.clientX - r.left}px`,
                  );
                  e.currentTarget.style.setProperty(
                    "--my",
                    `${e.clientY - r.top}px`,
                  );
                }}
              >
                <img
                  src={p.cover}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i < 2 ? "eager" : "lazy"}
                />
                <div className="liquid-overlay" />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(3,7,18,0.05) 0%, rgba(3,7,18,0.6) 70%, rgba(3,7,18,0.92) 100%)",
                  }}
                />

                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] glass-subtle"
                    style={{ color: p.accent }}
                  >
                    {p.typology}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {p.year}
                  </span>
                </div>

                <div className="absolute top-6 right-6 w-11 h-11 rounded-full glass-subtle flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-[#030712] transition-all duration-500">
                  <ArrowUpRight size={16} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/55 mb-2">
                    {p.location}
                  </div>
                  <h3 className="font-display text-3xl lg:text-4xl text-[#F8FAFC] leading-[1.05]">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm text-white/60 max-w-sm leading-relaxed">
                    {p.summary}
                  </p>
                  <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/45">
                    <span>{p.sqft.toLocaleString()} sqft</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{p.style}</span>
                  </div>
                </div>
              </a>
            ))}

            {/* End cap */}
            <a
              href="/portfolio"
              data-cursor="All"
              className="shrink-0 w-[40vh] h-[70vh] rounded-3xl glass flex flex-col items-center justify-center group"
            >
              <div className="font-display text-3xl text-[#F8FAFC] text-center px-6">
                View
                <br />
                all projects
              </div>
              <div className="mt-6 w-14 h-14 rounded-full bg-[#D4AF37] text-[#030712] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight size={20} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

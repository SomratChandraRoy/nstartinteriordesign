import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../data/projects";

export default function PortfolioMobile() {
  return (
    <section className="relative lg:hidden py-20 px-6">
      <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-3">
        ◆ Selected Works
      </div>
      <h2 className="text-display-lg font-display text-[#F8FAFC] mb-10">
        The vault.
      </h2>
      <div className="space-y-5">
        {PROJECTS.map((p) => (
          <a
            key={p.slug}
            href={`/portfolio/${p.slug}`}
            className="block liquid-card relative rounded-2xl overflow-hidden aspect-[4/5]"
          >
            <img
              src={p.cover}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(3,7,18,0.92) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/55 mb-1">
                {p.location} · {p.year}
              </div>
              <h3 className="font-display text-2xl text-[#F8FAFC]">{p.name}</h3>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass-subtle flex items-center justify-center">
              <ArrowUpRight size={14} className="text-white" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

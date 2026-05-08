import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../data/projects";
import useReveal from "../../hooks/useReveal";

export default function PortfolioMobile() {
  return (
    <section className="relative lg:hidden py-24 px-6 overflow-hidden">
      <div className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-4 font-bold opacity-80">
        ◆ Featured Works
      </div>
      <h2 className="text-display-lg font-display text-[#F8FAFC] mb-12 tracking-tight">
        The vault.
      </h2>
      <div className="space-y-8">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} project={p} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const ref = useReveal();
  return (
    <a
      ref={ref}
      href={`/portfolio/${project.slug}`}
      className="fade-up block group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={project.cover}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        loading="lazy"
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 40%, rgba(3,7,18,0.95) 100%)",
        }}
      />
      
      <div className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full glass-subtle flex items-center justify-center border border-white/10">
        <ArrowUpRight size={16} className="text-[#D4AF37]" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium">
                {project.location} · {project.year}
            </span>
        </div>
        <h3 className="font-display text-3xl text-[#F8FAFC] leading-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
            {project.name}
        </h3>
        <p className="text-xs text-white/40 tracking-wider uppercase">
            {project.typology} · {project.sqft.toLocaleString()} SQFT
        </p>
      </div>
    </a>
  );
}

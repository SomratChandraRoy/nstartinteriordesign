import {
  ArrowUpRight,
  Home,
  Building2,
  TreePine,
  Sofa,
  Paintbrush,
  Ruler,
} from "lucide-react";
import useReveal from "../../hooks/useReveal";

const SERVICES = [
  {
    title: "Residential",
    span: "lg:col-span-6 lg:row-span-2",
    minH: "min-h-[460px]",
    icon: Home,
    body: "Apartments, penthouses, and standalone residences across Dhaka. From a single drawing room to a full duplex rebuild.",
    image:
      "https://raw.createusercontent.com/e2604406-dc3c-41e6-a769-08f5526302f3/",
    accent: "#D4AF37",
    items: [
      "Penthouse design",
      "Whole-home renovation",
      "Bespoke joinery",
      "Furniture procurement",
    ],
  },
  {
    title: "Commercial",
    span: "lg:col-span-3 lg:row-span-1",
    minH: "min-h-[220px]",
    icon: Building2,
    body: "Headquarters, members clubs, and offices designed as hospitality.",
    accent: "#0F766E",
    items: ["HQ design", "Workplace strategy"],
  },
  {
    title: "Hospitality",
    span: "lg:col-span-3 lg:row-span-1",
    minH: "min-h-[220px]",
    icon: Sofa,
    body: "Boutique hotels, restaurants, and lounges. Theatre + comfort.",
    image:
      "https://raw.createusercontent.com/d0c8586f-e4fc-400f-914c-c56e3b25a7b3/",
    accent: "#D4AF37",
    items: ["F&B", "Hotel lobbies"],
  },
  {
    title: "Landscape",
    span: "lg:col-span-3 lg:row-span-1",
    minH: "min-h-[220px]",
    icon: TreePine,
    body: "Rooftop gardens, courtyards, and terraces in collaboration with horticulturists.",
    accent: "#0F766E",
    items: ["Roof gardens", "Courtyards"],
  },
  {
    title: "Art Curation",
    span: "lg:col-span-3 lg:row-span-1",
    minH: "min-h-[220px]",
    icon: Paintbrush,
    body: "Sourcing and commissioning works from South Asian and international artists.",
    accent: "#312E81",
    items: ["Acquisition", "Commissioning"],
  },
  {
    title: "Architectural Consult",
    span: "lg:col-span-6 lg:row-span-1",
    minH: "min-h-[220px]",
    icon: Ruler,
    body: "Working alongside your architect from foundation upwards — informing structural decisions before drywall.",
    accent: "#D4AF37",
    items: ["Pre-construction", "Layout strategy", "Lighting design"],
  },
];

export default function BentoServices() {
  return (
    <section className="relative py-24 lg:py-40 px-6 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 lg:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              ◆ Practice
            </div>
            <h2 className="text-display-xl font-display text-[#F8FAFC]">
              Six disciplines,
              <br />
              <span className="italic text-white/55">one studio.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-white/55 text-sm leading-relaxed max-w-md">
              We work as an integrated team — interior architects, lighting
              designers, landscape consultants, and art curators under one roof
              — so your project never gets lost in translation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:auto-rows-[220px] gap-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay }) {
  const ref = useReveal();
  const Icon = service.icon;
  return (
    <div
      ref={ref}
      data-cursor="View"
      className={`fade-up liquid-card relative ${service.span} ${service.minH} rounded-2xl glass p-7 group flex flex-col justify-between overflow-hidden`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {service.image && (
        <>
          <img
            src={service.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.4 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.85) 100%)",
            }}
          />
        </>
      )}
      <div className="liquid-overlay" />

      <div className="relative z-10 flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${service.accent}40`,
          }}
        >
          <Icon size={18} style={{ color: service.accent }} />
        </div>
        <ArrowUpRight
          size={20}
          className="text-white/40 group-hover:text-[#D4AF37] group-hover:rotate-45 transition-all duration-500"
        />
      </div>

      <div className="relative z-10">
        <h3 className="font-display text-2xl lg:text-3xl text-[#F8FAFC] leading-tight">
          {service.title}
        </h3>
        <p className="mt-3 text-sm text-white/55 leading-relaxed max-w-md">
          {service.body}
        </p>
        {service.items?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {service.items.map((it) => (
              <span
                key={it}
                className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10 text-white/55"
              >
                {it}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

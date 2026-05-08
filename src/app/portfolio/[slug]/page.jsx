import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Ruler,
  Calendar,
  Layers,
} from "lucide-react";
import Layout from "../../../components/Layout";
import SEO, { schemas } from "../../../components/SEO";
import SplitText from "../../../components/SplitText";
import BeforeAfterSlider from "../../../components/BeforeAfterSlider";
import { PROJECTS, TRANSFORMATION } from "../../../data/projects";

export default function PortfolioDetailPage(props) {
  const slug = props?.params?.slug;
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(${1 + Math.min(y, 800) * 0.0003})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Layout>
      <SEO
        title={`${project.name} · ${project.location} | NSID`}
        description={`${project.summary} A ${project.style} ${project.typology.toLowerCase()} project of ${project.sqft.toLocaleString()} sqft in ${project.location}.`}
        canonical={`https://nsid.bd/portfolio/${project.slug}`}
        image={project.cover}
        schema={schemas.project({
          name: project.name,
          description: project.summary,
          image: project.cover,
          location: project.location,
          year: project.year,
        })}
      />

      {/* Immersive hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img
            src={project.cover}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,7,18,0.4) 0%, transparent 25%, rgba(3,7,18,0.3) 60%, #030712 100%)",
          }}
        />

        <div className="absolute inset-x-0 top-32 px-6 lg:px-10">
          <div className="mx-auto max-w-[1500px]">
            <a
              href="/portfolio"
              data-cursor=""
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/65 hover:text-[#D4AF37] transition-colors"
            >
              <ArrowLeft size={14} /> The Vault
            </a>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-16 px-6 lg:px-10 z-10">
          <div className="mx-auto max-w-[1500px]">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] glass-subtle text-white/85">
                {project.typology}
              </span>
              <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] glass-subtle text-white/85">
                {project.year}
              </span>
              <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] glass-subtle text-[#D4AF37] inline-flex items-center gap-1.5">
                <MapPin size={11} /> {project.location}
              </span>
            </div>

            <h1 className="text-display-hero font-display text-[#F8FAFC] leading-[0.95] max-w-5xl">
              <SplitText text={project.name} mode="word" stagger={70} />
            </h1>
            <p className="mt-7 max-w-xl text-white/70 leading-relaxed text-[15px]">
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="relative px-6 lg:px-10 -mt-20 z-20">
        <div className="mx-auto max-w-[1300px]">
          <div className="glass-strong rounded-3xl p-6 lg:p-10 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
            {[
              {
                icon: Ruler,
                label: "Square Footage",
                value: `${project.sqft.toLocaleString()} sqft`,
              },
              { icon: Layers, label: "Design Style", value: project.style },
              { icon: Calendar, label: "Duration", value: project.duration },
              { icon: MapPin, label: "Location", value: project.location },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45 mb-3">
                  <Icon size={12} className="text-[#D4AF37]" />
                  {label}
                </div>
                <div className="font-display text-xl text-[#F8FAFC]">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="relative px-6 lg:px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1300px] grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              ◆ Material Library
            </div>
            <h2 className="text-display-lg font-display text-[#F8FAFC] leading-tight">
              Every surface, sourced
              <br />
              <span className="italic text-white/55">in person.</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.materials.map((m, i) => (
                <div
                  key={m}
                  className="glass rounded-2xl p-6 flex items-start gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display text-sm"
                    style={{
                      background: "rgba(212,175,55,0.1)",
                      color: "#D4AF37",
                      border: "1px solid rgba(212,175,55,0.3)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-display text-lg text-[#F8FAFC]">
                      {m}
                    </div>
                    <div className="text-xs text-white/40 mt-1 uppercase tracking-[0.15em]">
                      Hand-selected
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="relative px-6 lg:px-10 py-12 lg:py-16">
        <div className="mx-auto max-w-[1300px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
            <div className="lg:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
                ◆ Transformation
              </div>
              <h2 className="text-display-lg font-display text-[#F8FAFC]">
                Drag to compare.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm text-white/55 leading-relaxed">
                A representative before-and-after from one of the principal
                living spaces. Photography by the studio's in-house team.
              </p>
            </div>
          </div>

          <BeforeAfterSlider
            before={TRANSFORMATION.before}
            after={TRANSFORMATION.after}
          />
        </div>
      </section>

      {/* Gallery */}
      <section className="relative px-6 lg:px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1300px]">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            ◆ Gallery
          </div>
          <h2 className="text-display-lg font-display text-[#F8FAFC] mb-12">
            Inside the rooms.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className={`relative liquid-card rounded-2xl overflow-hidden ${
                  i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="liquid-overlay" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other projects */}
      <section className="relative px-6 lg:px-10 py-24 border-t border-white/8">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-display-lg font-display text-[#F8FAFC]">
              Continue exploring.
            </h2>
            <a
              href="/portfolio"
              className="text-xs uppercase tracking-[0.25em] text-white/55 hover:text-[#D4AF37]"
            >
              All Projects ↗
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {others.map((p) => (
              <a
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                data-cursor="View"
                className="liquid-card relative aspect-[4/5] rounded-2xl overflow-hidden group"
              >
                <img
                  src={p.cover}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="liquid-overlay" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(3,7,18,0.92) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/55 mb-1">
                    {p.location}
                  </div>
                  <h3 className="font-display text-2xl text-[#F8FAFC]">
                    {p.name}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass-subtle flex items-center justify-center group-hover:bg-[#D4AF37] transition">
                  <ArrowUpRight
                    size={14}
                    className="text-white group-hover:text-[#030712]"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Layout from "../../components/Layout";
import SEO, { schemas } from "../../components/SEO";
import SplitText from "../../components/SplitText";
import { PROJECTS } from "../../data/projects";

const FILTERS = ["All", "Residential", "Corporate", "Hospitality", "Retail"];

export default function PortfolioIndexPage() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.typology === filter);

  return (
    <Layout>
      <SEO
        title="Portfolio | NSID"
        description="Selected residential and corporate interior design projects by NSID across Dhaka."
        canonical="https://nsid.bd/portfolio"
        keywords={[
          "interior design portfolio dhaka",
          "luxury homes dhaka portfolio",
          "corporate office design bangladesh",
          "NSID portfolio",
          "NorthStar Interior Design projects",
          "নর্থস্টার ইন্টেরিয়র ডিজাইন",
          "uttara interior projects",
          "best interior designer in bangladesh",
          "dhaka interior design firm",
        ]}
        schema={schemas.breadcrumb([
          { name: "Home", url: "https://nsid.bd/" },
          { name: "Portfolio", url: "https://nsid.bd/portfolio" },
        ])}
      />

      <section className="relative pt-40 lg:pt-52 pb-12 px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-5">
            ◆ The Vault · {PROJECTS.length} Selected Works
          </div>
          <h1 className="text-display-hero font-display text-[#F8FAFC] leading-[0.95]">
            <SplitText text="Eleven years," mode="word" stagger={50} />
            <br />
            <SplitText
              text="four hundred rooms."
              mode="word"
              stagger={50}
              delay={250}
              className="italic text-white/55"
            />
          </h1>
          <p className="mt-10 max-w-xl text-white/60 leading-relaxed">
            A representative cross-section of completed commissions. Many remain
            unpublished at our patrons' request.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 sticky top-20 z-20 mb-10">
        <div className="mx-auto max-w-[1500px] flex items-center gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300"
              style={{
                background: filter === f ? "#D4AF37" : "rgba(255,255,255,0.04)",
                color: filter === f ? "#030712" : "rgba(255,255,255,0.65)",
                border:
                  filter === f
                    ? "1px solid #D4AF37"
                    : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-[1500px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
          {filtered.map((p, i) => {
            const span =
              i % 5 === 0
                ? "lg:col-span-8"
                : i % 5 === 1
                  ? "lg:col-span-4"
                  : i % 5 === 2
                    ? "lg:col-span-4"
                    : i % 5 === 3
                      ? "lg:col-span-4"
                      : "lg:col-span-4";
            const aspect = i % 5 === 0 ? "aspect-[16/10]" : "aspect-[4/5]";
            return (
              <a
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                data-cursor="View"
                className={`liquid-card relative ${span} ${aspect} rounded-2xl overflow-hidden group`}
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
                      "linear-gradient(180deg, transparent 40%, rgba(3,7,18,0.88) 100%)",
                  }}
                />
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] glass-subtle text-white/85">
                    {p.typology}
                  </span>
                </div>
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full glass-subtle flex items-center justify-center group-hover:bg-[#D4AF37] transition-all">
                  <ArrowUpRight
                    size={14}
                    className="text-white group-hover:text-[#030712]"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/55 mb-1">
                    {p.location} · {p.year}
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl text-[#F8FAFC] leading-[1.05]">
                    {p.name}
                  </h2>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

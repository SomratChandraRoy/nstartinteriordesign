import Layout from "../../components/Layout";
import SEO, { schemas } from "../../components/SEO";
import SplitText from "../../components/SplitText";
import MagneticButton from "../../components/MagneticButton";
import { ArrowUpRight } from "lucide-react";

const TEAM = [
  { name: "Tasnim Iqbal", role: "Principal Designer", tenure: "Founder, 2014" },
  {
    name: "Rafiq Hossain",
    role: "Head of Architecture",
    tenure: "Joined 2016",
  },
  { name: "Mira Ahmed", role: "Material & Art Curator", tenure: "Joined 2019" },
  { name: "Joynal Khan", role: "Project Director", tenure: "Joined 2021" },
];

const VALUES = [
  {
    num: "01",
    title: "Material First",
    body: "No render is signed off until physical samples are approved on site under three lighting conditions.",
  },
  {
    num: "02",
    title: "Slow by Choice",
    body: "We accept fewer than ten commissions per year. Our calendar is the studio's only luxury.",
  },
  {
    num: "03",
    title: "Discretion",
    body: "Many of our projects will never appear in this portfolio. Confidentiality is part of the brief.",
  },
  {
    num: "04",
    title: "In-House Execution",
    body: "From bespoke joinery to upholstery — fabricated by a 35-strong team of master craftspeople.",
  },
];

export default function StudioPage() {
  return (
    <Layout>
      <SEO
        title="The Studio · About NSID"
        description="The story, philosophy, and people behind NorthStar Interior Design (NSID) — Dhaka's luxury interior design studio."
        canonical="https://nsid.bd/studio"
        keywords={[
          "NSID studio",
          "NorthStar Interior Design team",
          "dhaka interior design firm",
          "best interior architecture bangladesh",
          "luxury interior designer",
          "নর্থস্টার ইন্টেরিয়র ডিজাইন",
        ]}
        schema={schemas.organization()}
      />

      <section className="relative pt-40 lg:pt-52 pb-24 px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-5">
            ◆ The Studio · Est. 2014
          </div>
          <h1 className="text-display-hero font-display text-[#F8FAFC] leading-[0.95] max-w-5xl">
            <SplitText text="Eleven years," mode="word" stagger={50} />
            <br />
            <SplitText
              text="one obsession."
              mode="word"
              stagger={50}
              delay={250}
              className="italic text-white/55"
            />
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16">
            <div className="lg:col-span-5">
              <p className="text-white/65 text-base leading-relaxed">
                NSID was founded in 2014 with a
                single conviction — that interior architecture in Bangladesh
                deserved the same rigour, restraint, and respect for craft as
                the studios we admired in Milan, Paris, and Tokyo.
              </p>
              <p className="text-white/55 text-sm leading-relaxed mt-6">
                A decade later, we remain a small, deliberate practice. Eight
                architects, four interior designers, two art curators, and a
                workshop of thirty-five craftspeople — under one roof, on one
                calendar, with one signature.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <img
                src="https://raw.createusercontent.com/d0c8586f-e4fc-400f-914c-c56e3b25a7b3/"
                alt="NSID studio"
                className="w-full rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 lg:px-10 py-24 lg:py-32 border-t border-white/8">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
                ◆ Values
              </div>
              <h2 className="text-display-xl font-display text-[#F8FAFC]">
                Four principles,
                <br />
                <span className="italic text-white/55">never negotiated.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.num}
                className="glass rounded-2xl p-7 lg:p-9 hover:border-[#D4AF37]/25 transition-colors"
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <div className="font-display text-3xl text-[#D4AF37]">
                    {v.num}
                  </div>
                  <div className="font-display text-xl text-[#F8FAFC]">
                    {v.title}
                  </div>
                </div>
                <p className="text-sm text-white/55 leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 lg:px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            ◆ The Team
          </div>
          <h2 className="text-display-xl font-display text-[#F8FAFC] mb-12">
            Senior team.
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map((p) => (
              <div
                key={p.name}
                className="glass rounded-2xl p-6 group hover:border-[#D4AF37]/25 transition-colors"
              >
                <div
                  className="aspect-[4/5] rounded-xl mb-5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(49,46,129,0.4), rgba(15,118,110,0.3))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
                <div className="font-display text-lg text-[#F8FAFC]">
                  {p.name}
                </div>
                <div className="text-xs text-white/55 mt-1">{p.role}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/35 mt-3">
                  {p.tenure}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 lg:px-10 py-24 border-t border-white/8">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="text-display-lg font-display text-[#F8FAFC]">
            Ready to begin?
          </h2>
          <p className="mt-5 text-white/55 max-w-md mx-auto">
            We accept a small number of commissions per year. The studio's
            calendar opens for 2026 in November.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <MagneticButton href="/contact" variant="gold">
              Begin a Project <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </section>
    </Layout>
  );
}

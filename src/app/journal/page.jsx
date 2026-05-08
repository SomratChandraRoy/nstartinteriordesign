import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import SplitText from "../../components/SplitText";
import { ArrowUpRight } from "lucide-react";

const ARTICLES = [
  {
    title: "On Limewash: A Quiet Return",
    category: "Material",
    read: "6 min",
    date: "March 2026",
    excerpt:
      "Why we have stopped specifying matte paint in nearly every Dhaka residence we touch.",
    image:
      "https://raw.createusercontent.com/9eed6c17-c834-4222-b558-965f72a9c67e/",
  },
  {
    title: "The Banani Penthouse: A Year Inside",
    category: "Project Notes",
    read: "12 min",
    date: "February 2026",
    excerpt:
      "Photographing the Banani Penthouse twelve months after handover, in four different lights.",
    image:
      "https://raw.createusercontent.com/00785d2e-5b6d-4334-8dc5-4085206756a8/",
  },
  {
    title: "Designing for the Monsoon",
    category: "Climate",
    read: "8 min",
    date: "January 2026",
    excerpt:
      "How four months of relentless humidity reshape every spec list at the studio.",
    image:
      "https://raw.createusercontent.com/d0c8586f-e4fc-400f-914c-c56e3b25a7b3/",
  },
  {
    title: "Why We No Longer Render Sunset",
    category: "Process",
    read: "4 min",
    date: "December 2025",
    excerpt:
      "A note on the photoreal renders we promise — and the ones we have stopped delivering.",
    image:
      "https://raw.createusercontent.com/e2604406-dc3c-41e6-a769-08f5526302f3/",
  },
];

export default function JournalPage() {
  return (
    <Layout>
      <SEO
        title="The Journal · NSID"
        description="Notes from the studio on materials, process, and the ongoing search for a quieter Bangladeshi interior."
        canonical="https://nsid.bd/journal"
        keywords={[
          "interior design blog dhaka",
          "NSID journal",
          "NorthStar Interior Design",
          "নর্থস্টার ইন্টেরিয়র ডিজাইন",
          "interior design tips bangladesh",
        ]}
      />

      <section className="relative pt-40 lg:pt-52 pb-16 px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-5">
            ◆ The Journal · Field Notes
          </div>
          <h1 className="text-display-hero font-display text-[#F8FAFC] leading-[0.95] max-w-4xl">
            <SplitText text="Notes from" mode="word" stagger={60} />
            <br />
            <SplitText
              text="the workshop floor."
              mode="word"
              stagger={60}
              delay={250}
              className="italic text-white/55"
            />
          </h1>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-[1500px] grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((a, i) => (
            <a
              key={a.title}
              href="#"
              data-cursor="Read"
              className={`liquid-card relative rounded-2xl overflow-hidden group ${
                i === 0 ? "md:col-span-2 aspect-[16/8]" : "aspect-[4/3]"
              }`}
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
                src={a.image}
                alt={a.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="liquid-overlay" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 35%, rgba(3,7,18,0.9) 100%)",
                }}
              />

              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] glass-subtle text-[#D4AF37]">
                  {a.category}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                  {a.read}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/55 mb-2">
                  {a.date}
                </div>
                <h2 className="font-display text-2xl lg:text-3xl text-[#F8FAFC] leading-tight max-w-2xl">
                  {a.title}
                </h2>
                <p className="mt-3 text-sm text-white/60 max-w-xl leading-relaxed">
                  {a.excerpt}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] group-hover:gap-3 transition-all">
                  Read field note <ArrowUpRight size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </Layout>
  );
}

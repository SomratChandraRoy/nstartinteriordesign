import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "They translated our family rituals into a home. The penthouse feels older than us — as though it had always been waiting.",
    author: "M. Rahman",
    role: "Founder, Private Family Office",
    location: "Banani",
  },
  {
    quote:
      "Our employees walk in differently now. The workplace did more for our retention than any HR programme we ran.",
    author: "S. Chowdhury",
    role: "CEO, Meridian Capital",
    location: "Gulshan-2",
  },
  {
    quote:
      "I have worked with studios in Milan and Singapore. None matched this level of detail, on time, on budget. Quietly extraordinary.",
    author: "A. Karim",
    role: "Hotelier",
    location: "Baridhara",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-40 px-6 lg:px-10">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              ◆ Patrons
            </div>
            <h2 className="text-display-xl font-display text-[#F8FAFC]">
              The discreet
              <br />
              <span className="italic text-white/55">verdict.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.author}
              className="glass rounded-2xl p-7 flex flex-col justify-between min-h-[340px] hover:border-[#D4AF37]/25 transition-colors duration-500"
            >
              <Quote size={28} className="text-[#D4AF37]/70" />

              <p className="font-display text-[18px] text-[#F8FAFC] leading-[1.45] flex-1 my-7">
                "{t.quote}"
              </p>

              <div className="border-t border-white/8 pt-4">
                <div className="text-sm text-[#F8FAFC]">{t.author}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">
                  {t.role} · {t.location}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

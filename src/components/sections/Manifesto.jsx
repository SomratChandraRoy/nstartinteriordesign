import useReveal from "../../hooks/useReveal";
import SplitText from "../SplitText";

export default function Manifesto() {
  const ref = useReveal();
  return (
    <section className="relative py-24 lg:py-40 px-6 lg:px-10">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              ◆ Manifesto · 01
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/45">
              On Material
              <br />
              Honesty.
            </div>
          </div>

          <div className="lg:col-span-9" ref={ref}>
            <h2 className="text-display-xl font-display text-[#F8FAFC] leading-[1.05]">
              <SplitText
                text="A space, like a sentence, is judged by its silences."
                mode="word"
                stagger={45}
              />
            </h2>
            <p className="mt-10 text-white/55 max-w-2xl text-[15px] leading-relaxed">
              We design interiors that grow quieter the longer you live in them.
              Materials are chosen for how they age, not how they photograph;
              proportions are weighted to feel inevitable. Every commission
              begins with the same question —{" "}
              <span className="text-[#D4AF37] italic">
                how should this room make you feel at 6:42 in the evening?
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

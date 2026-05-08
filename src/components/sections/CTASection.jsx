import { ArrowUpRight } from "lucide-react";
import SplitText from "../SplitText";
import MagneticButton from "../MagneticButton";

export default function CTASection() {
  return (
    <section className="relative py-32 lg:py-44 px-6 lg:px-10 aurora-bg overflow-hidden">
      <div className="aurora-reactive">
        <div
          className="aurora-blob"
          style={{
            background: "#312E81",
            top: "-30%",
            left: "20%",
            width: "50vw",
            height: "50vw",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            background: "#0F766E",
            bottom: "-30%",
            right: "10%",
            width: "45vw",
            height: "45vw",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1100px] text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
            Five commissions remaining for 2026
          </span>
        </div>

        <h2 className="text-display-xl font-display text-[#F8FAFC]">
          <SplitText text="Begin a space" mode="word" stagger={60} />
          <br />
          <SplitText
            text="that will outlive trends."
            mode="word"
            stagger={60}
            delay={200}
            className="italic text-[#D4AF37]"
          />
        </h2>

        <p className="mt-8 max-w-xl mx-auto text-white/60 text-sm leading-relaxed">
          A discrete first conversation, in the studio or in your home. There is
          no fee, no hard sell, and no obligation beyond mutual curiosity.
        </p>

        <div className="mt-10 flex flex-wrap justify-center items-center gap-3">
          <MagneticButton href="/contact" variant="gold">
            Begin a Project <ArrowUpRight size={16} />
          </MagneticButton>
          <MagneticButton href="/portfolio" variant="glass">
            Browse the Vault
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

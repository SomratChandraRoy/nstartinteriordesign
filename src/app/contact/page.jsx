import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Layout from "../../components/Layout";
import SEO, { schemas } from "../../components/SEO";
import SplitText from "../../components/SplitText";
import ContactWizard from "../../components/ContactWizard";

export default function ContactPage() {
  return (
    <Layout>
      <SEO
        title="Contact · Begin a Project | NSID"
        description="Begin a private interior design consultation with NorthStar Interior Design (NSID)."
        canonical="https://nsid.bd/contact"
        keywords={[
          "interior designer dhaka contact",
          "luxury interior consultation banani",
          "turnkey interior bangladesh",
          "NSID contact number",
          "NorthStar Interior Design address",
          "uttara interior designer",
          "নর্থস্টার ইন্টেরিয়র ডিজাইন",
        ]}
        schema={schemas.organization()}
      />

      <section className="relative pt-40 lg:pt-52 pb-12 px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-5">
              ◆ Begin a Project
            </div>
            <h1 className="text-display-hero font-display text-[#F8FAFC] leading-[0.95]">
              <SplitText text="A first" mode="word" stagger={60} />
              <br />
              <SplitText
                text="conversation."
                mode="word"
                stagger={60}
                delay={250}
                className="italic text-[#D4AF37]"
              />
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-white/60 leading-relaxed text-[15px] max-w-md">
              Tell us a little about your space and your rituals. The principal
              designer reads every brief personally and responds within 24
              hours.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-[1500px] grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <div className="glass-strong rounded-3xl p-7 lg:p-9 space-y-7">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-2">
                  The Studio
                </div>
                <div className="font-display text-2xl text-[#F8FAFC]">
                NSID
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">
                  By Appointment Only
                </div>
              </div>

              <div className="hairline" />

              <ContactRow icon={MapPin} label="Studio Address">
                House #87, Road #15, Sector #11
                <br />
                Uttara, Dhaka -1230
                <br />
                Bangladesh
              </ContactRow>

              <ContactRow icon={Phone} label="Direct Line">
                <a
                  href="tel:+8801816072106"
                  className="hover:text-[#D4AF37] transition"
                >
                  +880 1816-072106
                </a>
              </ContactRow>

              <ContactRow icon={Mail} label="Correspondence">
                <a
                  href="mailto:nstar.interior@gmail.com"
                  className="hover:text-[#D4AF37] transition"
                >
                  nstar.interior@gmail.com
                </a>
              </ContactRow>

              <ContactRow icon={Clock} label="Studio Hours">
                Sunday — Thursday
                <br />
                10:00 — 19:00 BST
              </ContactRow>

              <div className="hairline" />

              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-3">
                  Areas Served
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Rangpur",
                    "Rajshahi",
                    "Chittagong",
                    "Khulna",
                    "Dhaka",
                    "Gazipur",
                    "Sylhet",
                    "Comilla",
                    "Narayanganj",
                    "Barisal",
                  ].map((a) => (
                    <span
                      key={a}
                      className="text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/10 text-white/65"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactWizard />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ContactRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "rgba(212,175,55,0.08)",
          border: "1px solid rgba(212,175,55,0.25)",
        }}
      >
        <Icon size={14} className="text-[#D4AF37]" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-1">
          {label}
        </div>
        <div className="text-sm text-[#F8FAFC] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

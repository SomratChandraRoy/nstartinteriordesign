import { Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 mt-24">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-display-lg font-display text-[#F8FAFC] leading-[1.05]">
              Spaces shaped by quiet
              <br />
              <span className="text-[#D4AF37] italic">obsession.</span>
            </h2>
            <p className="text-white/50 text-sm mt-6 max-w-md leading-relaxed">
              An interior architecture practice rooted in Dhaka, designing for
              clients across the country.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-4">
              Studio
            </div>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <a
                  href="/studio"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/portfolio"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="/journal"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Journal
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-4">
              Practice
            </div>
            <ul className="space-y-3 text-sm text-white/75">
              <li>Residential</li>
              <li>Commercial</li>
              <li>Hospitality</li>
              <li>Landscape</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-4">
              NSID
            </div>
            <address className="not-italic text-sm text-white/75 leading-relaxed">
              House #87, Road #15, Sector #11
              <br />
              Uttara, Dhaka -1230
              <br />
              Bangladesh
            </address>
            <a
              href="tel:+8801816072106"
              className="block text-sm text-white/75 mt-3 hover:text-[#D4AF37] transition-colors"
            >
              +880 1816-072106
            </a>
            <a
              href="mailto:nstar.interior@gmail.com"
              className="block text-sm text-white/75 hover:text-[#D4AF37] transition-colors"
            >
              nstar.interior@gmail.com
            </a>

            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Facebook, href: "https://www.facebook.com/NSID.BD/" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-[#D4AF37]/40 transition"
                  aria-label="social"
                >
                  <Icon size={14} className="text-white/80" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline mt-16 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-white/40">
          <div>
            © {new Date().getFullYear()} নর্থস্টার ইন্টেরিয়র ডিজাইন (NSID). All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70">
              Privacy
            </a>
            <a href="#" className="hover:text-white/70">
              Terms
            </a>
            <a href="/sitemap.xml" className="hover:text-white/70">
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Massive watermark wordmark */}
      <div className="overflow-hidden pointer-events-none select-none">
        <div
          className="font-display text-[#0F172A] leading-none whitespace-nowrap text-center"
          style={{
            fontSize: "clamp(6rem, 22vw, 22rem)",
            letterSpacing: "-0.04em",
            opacity: 0.55,
          }}
        >
          NSID
        </div>
      </div>
    </footer>
  );
}

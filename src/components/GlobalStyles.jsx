export default function GlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --obsidian: #030712;
        --charcoal: #0F172A;
        --indigo-deep: #312E81;
        --teal-emerald: #0F766E;
        --cyber-white: #F8FAFC;
        --champagne: #D4AF37;
      }

      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
      }

      html {
        background: #030712;
        color: #F8FAFC;
      }

      body {
        background: #030712;
        color: #F8FAFC;
        font-family: 'Inter', system-ui, sans-serif;
        overflow-x: hidden;
        min-height: 100vh;
        margin: 0;
      }

      ::selection {
        background: #0F766E;
        color: #FFFFFF;
        text-shadow: none;
      }
      ::-moz-selection {
        background: #0F766E;
        color: #FFFFFF;
      }

      .smooth-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        will-change: transform;
      }

      @media (max-width: 1024px) {
        .smooth-wrapper {
          position: relative;
          overflow: visible;
          transform: none !important;
          width: auto;
          height: auto;
        }
      }

      .text-display-hero {
        font-size: clamp(2.75rem, 9vw, 9rem);
        line-height: 0.95;
        letter-spacing: -0.04em;
        font-weight: 500;
      }
      .text-display-xl {
        font-size: clamp(2.25rem, 6vw, 5.5rem);
        line-height: 1;
        letter-spacing: -0.03em;
        font-weight: 500;
      }
      .text-display-lg {
        font-size: clamp(1.75rem, 4.5vw, 3.75rem);
        line-height: 1.05;
        letter-spacing: -0.025em;
        font-weight: 500;
      }

      .glass {
        background: rgba(15, 23, 42, 0.4);
        backdrop-filter: blur(24px) saturate(140%);
        -webkit-backdrop-filter: blur(24px) saturate(140%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      .glass-strong {
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(32px) saturate(160%);
        -webkit-backdrop-filter: blur(32px) saturate(160%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
      }

      .glass-subtle {
        background: rgba(15, 23, 42, 0.25);
        backdrop-filter: blur(16px) saturate(140%);
        -webkit-backdrop-filter: blur(16px) saturate(140%);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .aurora-reactive {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
      }

      .aurora-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.5;
        will-change: transform;
        transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .btn-magnetic {
        position: relative;
        overflow: hidden;
        isolation: isolate;
      }

      .btn-magnetic::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          120deg,
          transparent 30%,
          rgba(212, 175, 55, 0.4) 50%,
          transparent 70%
        );
        transform: translateX(-110%);
        transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        pointer-events: none;
        z-index: 0;
      }

      .btn-magnetic:hover::before {
        transform: translateX(110%);
      }

      .split-char {
        display: inline-block;
        overflow: hidden;
        line-height: 1.05;
        vertical-align: top;
      }
      .split-char > span {
        display: inline-block;
        transform: translateY(110%);
        transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform;
      }
      .split-char.in > span {
        transform: translateY(0);
      }

      .reveal-mask {
        display: inline-block;
        overflow: hidden;
        vertical-align: bottom;
      }
      .reveal-mask > span {
        display: inline-block;
        transform: translateY(110%);
        transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .reveal-mask.in > span {
        transform: translateY(0);
      }

      .fade-up {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        will-change: opacity, transform;
      }
      .fade-up.in {
        opacity: 1;
        transform: translateY(0);
      }

      @media (hover: hover) and (pointer: fine) {
        .has-custom-cursor,
        .has-custom-cursor * {
          cursor: none !important;
        }
      }

      ::-webkit-scrollbar {
        width: 0;
        background: transparent;
      }

      .liquid-card {
        position: relative;
        overflow: hidden;
        isolation: isolate;
      }
      .liquid-card .liquid-overlay {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          circle at var(--mx, 50%) var(--my, 50%),
          rgba(212, 175, 55, 0.18),
          transparent 40%
        );
        opacity: 0;
        transition: opacity 0.4s ease;
        pointer-events: none;
        z-index: 2;
        mix-blend-mode: screen;
      }
      .liquid-card:hover .liquid-overlay {
        opacity: 1;
      }
      .liquid-card img {
        transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
      }
      .liquid-card:hover img {
        transform: scale(1.06);
        filter: brightness(0.7) saturate(1.1);
      }

      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .marquee-track {
        animation: marquee 50s linear infinite;
      }

      .font-display {
        font-family: 'Syne', system-ui, sans-serif;
        font-weight: 500;
        letter-spacing: -0.02em;
      }
      .font-body {
        font-family: 'Inter', system-ui, sans-serif;
      }

      .hairline {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
      }

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus {
        -webkit-text-fill-color: #F8FAFC;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset;
        transition: background-color 5000s ease-in-out 0s;
      }

      @keyframes pulse-gold {
        0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.6); }
        50% { box-shadow: 0 0 0 16px rgba(212, 175, 55, 0); }
      }
    `}</style>
  );
}

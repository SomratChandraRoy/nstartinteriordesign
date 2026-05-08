import { useEffect, useRef } from "react";

/**
 * Aurora mesh that softly tracks pointer position.
 */
export default function AuroraBackground({ intensity = 1 }) {
  const blob1 = useRef(null);
  const blob2 = useRef(null);
  const blob3 = useRef(null);

  useEffect(() => {
    let raf;
    let mx = 0.5;
    let my = 0.5;
    let cx = 0.5;
    let cy = 0.5;

    const onMove = (e) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };

    const tick = () => {
      cx += (mx - cx) * 0.04;
      cy += (my - cy) * 0.04;
      if (blob1.current) {
        blob1.current.style.transform = `translate3d(${(cx - 0.5) * 80}px, ${(cy - 0.5) * 60}px, 0)`;
      }
      if (blob2.current) {
        blob2.current.style.transform = `translate3d(${-(cx - 0.5) * 60}px, ${-(cy - 0.5) * 80}px, 0)`;
      }
      if (blob3.current) {
        blob3.current.style.transform = `translate3d(${(cx - 0.5) * 40}px, ${-(cy - 0.5) * 40}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="aurora-reactive" aria-hidden style={{ opacity: intensity }}>
      <div
        ref={blob1}
        className="aurora-blob"
        style={{
          background: "#312E81",
          top: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
        }}
      />
      <div
        ref={blob2}
        className="aurora-blob"
        style={{
          background: "#0F766E",
          bottom: "-25%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
        }}
      />
      <div
        ref={blob3}
        className="aurora-blob"
        style={{
          background: "#D4AF37",
          top: "40%",
          left: "40%",
          width: "25vw",
          height: "25vw",
          opacity: 0.18,
        }}
      />
      {/* Noise overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          opacity: 0.05,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

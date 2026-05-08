import { useEffect, useRef } from "react";

/**
 * Adds 'in' class when element enters viewport.
 * Use for split-text, masks, fade-up animations.
 */
export default function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("in");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return ref;
}

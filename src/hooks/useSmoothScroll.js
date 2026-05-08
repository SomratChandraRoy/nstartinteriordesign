import { useEffect, useRef } from "react";

/**
 * Lenis-style smooth scroll using rAF + lerp.
 * Translates a wrapper while body height matches content.
 * Disabled on touch / narrow screens for native performance.
 */
export default function useSmoothScroll() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.innerWidth < 1024;

    if (isTouch || isNarrow) return;

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    let current = 0;
    let target = 0;
    let rafId;
    const ease = 0.085;

    const setBodyHeight = () => {
      document.body.style.height = `${content.offsetHeight}px`;
    };

    const onScroll = () => {
      target = window.scrollY;
    };

    const tick = () => {
      current += (target - current) * ease;
      current = Math.round(current * 100) / 100;
      content.style.transform = `translate3d(0, ${-current}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    setBodyHeight();
    const ro = new ResizeObserver(setBodyHeight);
    ro.observe(content);

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      document.body.style.height = "";
      if (content) content.style.transform = "";
    };
  }, []);

  return { wrapperRef, contentRef };
}

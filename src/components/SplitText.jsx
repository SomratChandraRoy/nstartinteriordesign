import { useEffect, useRef } from "react";
import { cn } from "../utils/cn";

/**
 * Splits text into per-character spans inside masks for a stagger reveal.
 * Mode: 'char' or 'word'.
 */
export default function SplitText({
  text,
  mode = "word",
  delay = 0,
  stagger = 35,
  className = "",
  as = "span",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = el.querySelectorAll(".split-char");
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add("in"), delay + i * stagger);
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger]);

  const Tag = as;
  const tokens = mode === "char" ? Array.from(text) : text.split(" ");

  return (
    <Tag ref={ref} className={cn("inline-block", className)}>
      {tokens.map((tok, i) => (
        <span
          key={i}
          className="split-char"
          style={{ marginRight: mode === "word" ? "0.25em" : 0 }}
        >
          <span>{tok === " " ? "\u00A0" : tok}</span>
        </span>
      ))}
    </Tag>
  );
}

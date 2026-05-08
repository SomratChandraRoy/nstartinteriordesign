import { useEffect, useRef } from "react";
import { cn } from "../utils/cn";

export default function MagneticButton({
  children,
  className = "",
  variant = "gold",
  href,
  onClick,
  type = "button",
  strength = 0.35,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm tracking-wide uppercase transition-colors duration-300 btn-magnetic relative overflow-hidden";

  const styles = {
    gold: "bg-[#D4AF37] text-[#030712] hover:bg-[#e0bf52] font-medium",
    glass: "glass text-[#F8FAFC] hover:border-white/20",
    outline:
      "border border-white/20 text-[#F8FAFC] hover:border-[#D4AF37] hover:text-[#D4AF37]",
  };

  const cls = cn(base, styles[variant], className);

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={cls}
        onClick={onClick}
        data-cursor=""
        style={{
          transition:
            "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s, color 0.3s",
        }}
        {...rest}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={cls}
      style={{
        transition:
          "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s, color 0.3s",
      }}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}

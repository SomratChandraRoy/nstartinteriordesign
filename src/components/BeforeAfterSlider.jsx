import { useEffect, useRef, useState } from "react";
import { GripVertical } from "lucide-react";

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      if (!drag) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.min(100, Math.max(0, x)));
    };
    const onUp = () => setDrag(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [drag]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden select-none glass"
      style={{ touchAction: "none" }}
    >
      <img
        src={after}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      >
        <img
          src={before}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
      </div>

      {/* Labels */}
      <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full glass-subtle text-[10px] uppercase tracking-[0.25em] text-white/80">
        {beforeLabel}
      </div>
      <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] text-[#030712] bg-[#D4AF37]">
        {afterLabel}
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-[#D4AF37]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          aria-label="Drag to compare"
          data-cursor=""
          onMouseDown={() => setDrag(true)}
          onTouchStart={() => setDrag(true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            boxShadow:
              "0 0 0 1px rgba(212,175,55,0.5), 0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <GripVertical size={16} className="text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
}

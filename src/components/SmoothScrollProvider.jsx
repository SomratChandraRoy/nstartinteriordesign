import useSmoothScroll from "../hooks/useSmoothScroll";

export default function SmoothScrollProvider({ children }) {
  const { wrapperRef, contentRef } = useSmoothScroll();
  return (
    <div ref={wrapperRef} className="smooth-wrapper">
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

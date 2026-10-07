"use client";

import { useEffect, useRef, useState } from "react";

/** Counts a value like "14.5K" or "350+" up from zero when it scrolls into view. */
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const m = value.match(/^([\d.]+)(.*)$/);
    const el = ref.current;
    if (!m || !el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = parseFloat(m[1]);
    const decimals = (m[1].split(".")[1] ?? "").length;
    const suffix = m[2];
    setText(`${(0).toFixed(decimals)}${suffix}`);

    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setText(`${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} aria-label={value}>
      {text}
    </span>
  );
}

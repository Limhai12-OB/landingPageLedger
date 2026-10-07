"use client";

import { useEffect } from "react";

/**
 * Adds `data-shown` to every `[data-reveal]` element once it scrolls into view.
 * CSS (v2.module.css) only hides those elements when <html> has the `js` class,
 * so content stays visible if scripts are disabled.
 */
export default function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}


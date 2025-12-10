"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";

export function Reveal({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    };
    const obs = new IntersectionObserver(onIntersect, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

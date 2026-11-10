"use client";

import { useEffect, useRef } from "react";
import styles from "./NameWave.module.css";

const WORDS = ["Sahas", "Timilsina"];

// Width-axis values of the display face (it runs 50 to 150).
const REST = 85;
const SWELL = 62;
const MIN = 50;
const MAX = 150;

/**
 * The name, set edge to edge. Letters near the pointer widen and the
 * rest of the word narrows to make room, so a pulse travels through
 * the name as the pointer moves. It runs once on load, too.
 */
export default function NameWave() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = [...root.querySelectorAll<HTMLElement>("[data-word]")].map((w) => [
      ...w.querySelectorAll<HTMLElement>("[data-letter]"),
    ]);
    const letters = words.flat();
    const widths = letters.map(() => REST);
    let centers: number[] = [];
    let spread = 80;
    let pointerX: number | null = null;
    let sweep: { start: number; from: number; to: number } | null = null;
    let frame = 0;

    const apply = (el: HTMLElement, width: number) => {
      el.style.fontVariationSettings = `"wdth" ${width.toFixed(1)}`;
    };

    // Letter positions are read at rest, so the pulse never chases its own layout changes.
    const measure = () => {
      letters.forEach((l) => l.style.removeProperty("font-variation-settings"));
      const box = root.getBoundingClientRect();
      centers = letters.map((l) => {
        const r = l.getBoundingClientRect();
        return r.left + r.width / 2;
      });
      spread = Math.max(36, box.width * 0.075);
      letters.forEach((l, i) => apply(l, widths[i]));
      return box;
    };

    const tick = (now: number) => {
      frame = 0;
      if (sweep) {
        const t = Math.min(1, (now - sweep.start) / 1600);
        const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        pointerX = sweep.from + (sweep.to - sweep.from) * eased;
        if (t >= 1) {
          sweep = null;
          pointerX = null;
        }
      }

      let moving = sweep !== null;
      let offset = 0;
      for (const word of words) {
        const pull = word.map((_, j) =>
          pointerX === null ? 0 : Math.exp(-((centers[offset + j] - pointerX) ** 2) / (2 * spread * spread)),
        );
        // Subtracting the mean keeps each word's total width roughly constant.
        const mean = pull.reduce((a, b) => a + b, 0) / pull.length;
        word.forEach((el, j) => {
          const i = offset + j;
          const target = Math.min(MAX, Math.max(MIN, REST + SWELL * (pull[j] - mean)));
          widths[i] += (target - widths[i]) * 0.2;
          if (Math.abs(target - widths[i]) < 0.1) widths[i] = target;
          else moving = true;
          apply(el, widths[i]);
        });
        offset += word.length;
      }
      if (moving) frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const box = root.getBoundingClientRect();
      const near = e.clientY > box.top - 90 && e.clientY < box.bottom + 90;
      if (near) sweep = null;
      if (!sweep) pointerX = near ? e.clientX : null;
      wake();
    };

    const onLeave = () => {
      if (!sweep) pointerX = null;
      wake();
    };

    const onTouchEnd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onLeave();
    };

    const observer = new ResizeObserver(() => measure());
    observer.observe(root);

    document.fonts.ready.then(() => {
      const box = measure();
      sweep = { start: performance.now() + 250, from: box.left - spread * 2, to: box.right + spread * 2 };
      wake();
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("pointerup", onTouchEnd, { passive: true });
    window.addEventListener("pointercancel", onTouchEnd, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onTouchEnd);
      window.removeEventListener("pointercancel", onTouchEnd);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <h1 ref={ref} className={styles.name} aria-label={WORDS.join(" ")}>
        {WORDS.map((word) => (
          <span key={word} className={styles.word} data-word aria-hidden="true">
            {word.split("").map((letter, i) => (
              <span key={i} data-letter>
                {letter}
              </span>
            ))}
          </span>
        ))}
      </h1>
    </div>
  );
}

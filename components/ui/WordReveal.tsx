"use client";

import { useEffect, useRef } from "react";

interface WordRevealProps {
  /** The text to split and animate word-by-word */
  text: string;
  /** Extra class names on the wrapper element */
  className?: string;
  /** HTML tag to use as the wrapper (default: "p") */
  as?: keyof JSX.IntrinsicElements;
  /** IntersectionObserver threshold (default: 0.15) */
  threshold?: number;
}

/**
 * WordReveal — splits `text` into individual <span> words and
 * animates them in one-by-one when the element enters the viewport.
 *
 * Relies on the CSS classes `.word-reveal`, `.word-reveal-word`, and
 * `.in-view` that are defined in globals.css.
 */
export default function WordReveal({
  text,
  className = "",
  as: Tag = "p",
  threshold = 0.15,
}: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el); // fire only once
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const words = text.split(" ");

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={ref} className={`word-reveal ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="word-reveal-word">
          {word}
        </span>
      ))}
    </Tag>
  );
}

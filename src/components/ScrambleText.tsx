"use client";
import { useEffect, useState } from "react";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startAnimation = () => {
      clearInterval(interval);
      iteration = 0;
      interval = setInterval(() => {
        setOutput(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        // Controls how fast the actual letters are revealed. Smaller = slower reveal.
        iteration += 1 / 3;
      }, 30);
    };

    startAnimation();

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{output}</span>;
}

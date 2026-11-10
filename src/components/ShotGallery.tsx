"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectShot } from "@/types/projects";
import styles from "./ShotGallery.module.css";

/** One screenshot at a time, with a switcher named after what each one shows. */
export default function ShotGallery({ shots, name }: { shots: ProjectShot[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <figure className={styles.gallery}>
      <div className={styles.frame}>
        {shots.map((shot, i) => (
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={972}
            height={596}
            sizes="(max-width: 900px) 100vw, 720px"
            className={`${styles.shot} ${i === active ? styles.shotActive : ""}`}
            priority={i === 0}
            aria-hidden={i === active ? undefined : true}
          />
        ))}
      </div>
      <figcaption className={styles.tabs} role="group" aria-label={`${name} screenshots`}>
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            className={styles.tab}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            {shot.label}
          </button>
        ))}
      </figcaption>
    </figure>
  );
}

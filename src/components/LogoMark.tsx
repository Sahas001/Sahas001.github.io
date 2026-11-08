import styles from "./LogoMark.module.css";

/**
 * Monogram tile: an "S" with the same chromatic split as the hero name,
 * set on an ink square with a vermilion offset shadow and a blinking cursor.
 * A sibling of the Phasethru block mark.
 */
export default function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span className={styles.tile} style={{ width: size, height: size }} aria-hidden="true">
      <span className={styles.letter}>S</span>
      <span className={styles.cursor} />
    </span>
  );
}

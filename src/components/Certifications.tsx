import type { Certification } from "@/data/certifications";
import styles from "./Certifications.module.css";

function monthDay(date: string) {
  if (/^\d{4}$/.test(date)) return { top: date, bottom: "" };
  const d = new Date(`${date}T00:00:00Z`);
  return {
    top: d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
    bottom: String(d.getUTCFullYear()),
  };
}

const serial = (id?: string) => (id ? id.split("-")[0] : "");

/** Circular rubber stamp; the whole stamp is the verification link. */
function Stamp({ cert }: { cert: Certification }) {
  const year = cert.date.slice(0, 4);
  return (
    <a
      href={cert.verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.stamp}
      aria-label={`Verify ${cert.title} on ${cert.issuer}`}
    >
      <svg viewBox="0 0 140 140" aria-hidden="true">
        <defs>
          <path id="stamp-ring" d="M70,70 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" />
        </defs>
        <circle cx="70" cy="70" r="66" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="70" cy="70" r="38" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text className={styles.stampRing}>
          <textPath href="#stamp-ring" startOffset="0" textLength="312" lengthAdjust="spacing">
            VERIFIED • DEEPLEARNING.AI • VERIFIED •{" "}
          </textPath>
        </text>
        <path
          d="M54 70 l11 11 l22 -24"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="square"
        />
        <text x="70" y="101" textAnchor="middle" className={styles.stampYear}>
          {year}
        </text>
      </svg>
    </a>
  );
}

export default function Certifications({
  featured,
  others,
}: {
  featured: Certification;
  others: Certification[];
}) {
  const fd = monthDay(featured.date);
  return (
    <div className={styles.wrap}>
      <article className={styles.featured}>
        <Stamp cert={featured} />
        <p className={styles.meta}>
          {featured.kind} from {featured.issuer}, {fd.top}, {fd.bottom}
        </p>
        <h3 className={styles.featuredTitle}>{featured.title}</h3>

        {featured.courses && (
          <ol className={styles.track} aria-label={`${featured.courses.length} courses completed`}>
            {featured.courses.map((course, i) => (
              <li key={course}>
                <span className={styles.step} aria-hidden="true">
                  {i + 1}
                </span>
                <span className={styles.course}>{course}</span>
              </li>
            ))}
          </ol>
        )}

        <p className={styles.featuredFoot}>
          <a href={featured.verifyUrl} target="_blank" rel="noopener noreferrer">
            Verify on deeplearning.ai ↗
          </a>
          <span className={styles.serial}>№ {serial(featured.credentialId)}</span>
        </p>
      </article>

      <ul className={styles.list}>
        {others.map((cert) => {
          const d = monthDay(cert.date);
          return (
            <li key={cert.verifyUrl} className={styles.row}>
              <span className={styles.date}>
                {d.top}
                {d.bottom && `, ${d.bottom}`}
              </span>
              <span className={styles.body}>
                <span className={styles.title}>{cert.title}</span>
                <span className={styles.issuer}>
                  {cert.kind}, {cert.issuer}
                  {cert.kind === "Professional registration" && cert.credentialId
                    ? `, no. ${cert.credentialId}`
                    : ""}
                </span>
              </span>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.verify}
                aria-label={`Verify ${cert.title}`}
              >
                Verify ↗
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

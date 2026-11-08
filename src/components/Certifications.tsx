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
          {featured.issuer} <span>/</span> {featured.kind} <span>/</span> {fd.top}, {fd.bottom}
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

        <div className={styles.featuredFoot}>
          <span className={styles.serial}>№ {serial(featured.credentialId)}</span>
          <a href={featured.verifyUrl} target="_blank" rel="noopener noreferrer">
            Verify on deeplearning.ai ↗
          </a>
        </div>
      </article>

      <ul className={styles.stubs}>
        {others.map((cert) => {
          const d = monthDay(cert.date);
          const isRegistration = cert.kind === "Professional registration";
          return (
            <li key={cert.verifyUrl} className={`${styles.stub} ${isRegistration ? styles.stubTeal : ""}`}>
              <div className={styles.stubMain}>
                <p className={styles.stubKind}>{cert.kind}</p>
                <h3 className={styles.stubTitle}>{cert.title}</h3>
                <p className={styles.stubIssuer}>
                  {cert.issuer}
                  {cert.topics && <span> · {cert.topics.join(", ")}</span>}
                </p>
              </div>
              <div className={styles.stubSide}>
                <span className={styles.stubDate}>{d.top}</span>
                {d.bottom && <span className={styles.stubYear}>{d.bottom}</span>}
                <span className={styles.serial}>
                  {isRegistration ? "Reg." : "№"} {serial(cert.credentialId)}
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
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

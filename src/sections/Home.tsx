import Link from "next/link";
import NameWave from "@/components/NameWave";
import TerminalWindow from "@/components/TerminalWindow";
import ContactCommand from "@/components/ContactCommand";
import WorkShowcase from "@/components/WorkShowcase";
import Certifications from "@/components/Certifications";
import PostLink from "@/components/blog/PostLink";
import { socials } from "@/components/SiteFooter";
import { certifications, featuredCertification } from "@/data/certifications";
import { featuredProjects } from "@/data/projects";
import { formatDate } from "@/lib/format";
import type { BlogPostSummary } from "@/types/blogs";
import styles from "./Home.module.css";

export default function Home({ latest }: { latest: BlogPostSummary[] }) {
  return (
    <>
      <section className={`${styles.hero} container-wide`}>
        <NameWave />

        <div className={styles.heroGrid}>
          <div className={styles.intro}>
            <p className={styles.lede}>
              Computer engineer who likes building things and figuring out how they work.
            </p>
            <p className={styles.sub}>
              Most of my work lives in React, Next.js and Go. Lately I&apos;ve been going deep on
              machine learning: neural networks, sequence models and large language models.
            </p>
            <div className={styles.ctas}>
              <Link href="/?tab=projects" className="btn-primary">
                See projects
              </Link>
              <Link href="/blog" className="btn-secondary">
                Read the blog
              </Link>
            </div>
            <ul className={styles.socials}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <TerminalWindow title="sahas@portfolio: ~" className={styles.terminal}>
            <ContactCommand />
          </TerminalWindow>
        </div>
      </section>

      <WorkShowcase projects={featuredProjects} heading="Selected work">
        <Link href="/?tab=projects">All projects</Link>
      </WorkShowcase>

      <div className="container-wide">
        <section className={styles.rail} aria-labelledby="certs-heading">
          <div className={styles.railHead}>
            <h2 id="certs-heading" className={styles.railTitle}>
              Certifications
            </h2>
            <p className={styles.railNote}>
              I&apos;m steering toward AI and deep learning. These are the courses I&apos;ve finished
              so far.
            </p>
          </div>
          <Certifications featured={featuredCertification} others={certifications} />
        </section>

        {latest.length > 0 && (
          <section className={styles.rail} aria-labelledby="writing-heading">
            <div className={styles.railHead}>
              <h2 id="writing-heading" className={styles.railTitle}>
                Writing
              </h2>
              <p className={styles.railNote}>
                Notes on systems and the web. Longer pieces also go out on{" "}
                <a href="https://phasethru.dev" target="_blank" rel="noopener noreferrer">
                  Phasethru ↗
                </a>
              </p>
              <Link href="/blog" className="text-link">
                All posts
              </Link>
            </div>
            <ol className={styles.posts}>
              {latest.map((post) => (
                <li key={post.id}>
                  <PostLink post={post} className={styles.postRow}>
                    <span className={styles.postTitle}>{post.title}</span>
                    <span className={styles.postExcerpt}>{post.description}</span>
                    <span className={styles.postMeta}>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>{post.source ? `on ${post.source} ↗` : post.readingTime}</span>
                    </span>
                  </PostLink>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </>
  );
}

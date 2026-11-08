import Image from "next/image";
import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import TerminalWindow from "@/components/TerminalWindow";
import ContactCommand from "@/components/ContactCommand";
import { socials } from "@/components/SiteFooter";
import Certifications from "@/components/Certifications";
import FeaturedProject from "@/components/FeaturedProject";
import { featuredProject } from "@/data/projects";
import { certifications, featuredCertification } from "@/data/certifications";
import { formatDate } from "@/lib/format";
import PostLink from "@/components/blog/PostLink";
import type { BlogPostSummary } from "@/types/blogs";
import styles from "./Home.module.css";

const skillGroups = [
  { category: "Languages", items: ["TypeScript", "Go", "Python", "C/C++"] },
  { category: "Web", items: ["React", "Next.js", "Tailwind"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "Docker"] },
  { category: "Tools", items: ["Git", "Linux", "Nginx"] },
  { category: "Machine learning", items: ["TensorFlow", "CNNs", "Sequence models", "LLMs"] },
];

export default function Home({ latest }: { latest: BlogPostSummary[] }) {
  return (
    <div className="container-wide">
      <section className={styles.hero}>
        <h1 className={styles.name}>
          <Wordmark size="xl" />
        </h1>

        <div className={styles.heroGrid}>
          <div className={styles.intro}>
            <p className={styles.lede}>
              Computer engineer who likes building things and figuring out how they work.
            </p>
            <p className={styles.sub}>
              Most of my work lives in React, Next.js and Go. Lately I&apos;ve been going deep
              on machine learning: neural networks, sequence models and large language models.
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

      <section className={styles.block} aria-labelledby="featured-heading">
        <div className="section-heading">
          <h2 id="featured-heading">Featured project</h2>
          <Link href="/?tab=projects">All projects ↗</Link>
        </div>
        <FeaturedProject project={featuredProject} />
      </section>

      <section className={styles.block} aria-labelledby="certs-heading">
        <div className="section-heading">
          <h2 id="certs-heading">Certifications</h2>
          <span>Each one links to its verification page</span>
        </div>
        <Certifications featured={featuredCertification} others={certifications} />
      </section>

      <section className={styles.block} aria-labelledby="stack-heading">
        <div className="section-heading">
          <h2 id="stack-heading">What I work with</h2>
        </div>
        <dl className={styles.stack}>
          {skillGroups.map((group) => (
            <div key={group.category} className={styles.stackCol}>
              <dt>{group.category}</dt>
              {group.items.map((item) => (
                <dd key={item}>{item}</dd>
              ))}
            </div>
          ))}
        </dl>
      </section>

      {latest.length > 0 && (
        <section className={styles.block} aria-labelledby="writing-heading">
          <div className="section-heading">
            <h2 id="writing-heading">Latest writing</h2>
            <Link href="/blog">All posts ↗</Link>
          </div>
          <ol className={styles.posts}>
            {latest.map((post) => (
              <li key={post.id}>
                <PostLink post={post} className={styles.postRow}>
                  <time dateTime={post.date} className={styles.postDate}>
                    {formatDate(post.date)}
                  </time>
                  <span className={styles.postBody}>
                    <span className={styles.postTitle}>{post.title}</span>
                    <span className={styles.postExcerpt}>{post.description}</span>
                  </span>
                  <span className={styles.postMeta}>
                    {post.source ? `on ${post.source} ↗` : post.readingTime}
                  </span>
                </PostLink>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className={styles.block}>
        <a
          href="https://phasethru.dev"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.phasethru}
        >
          <Image src="/phasethru-icon.png" alt="" width={44} height={44} />
          <span className={styles.phasethruText}>
            <span className={styles.phasethruTitle}>I also publish on Phasethru</span>
            <span className={styles.phasethruSub}>
              Longer dispatches on systems, web technologies and software craft.
            </span>
          </span>
          <span className={styles.phasethruCta}>phasethru.dev ↗</span>
        </a>
      </section>
    </div>
  );
}

import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { BlogPostSummary } from "@/types/blogs";
import styles from "./CoverStory.module.css";

export default function CoverStory({ post }: { post: BlogPostSummary }) {
  return (
    <section className={styles.hero}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <span className={styles.badge}>Cover story • {post.category}</span>
          <time dateTime={post.date} className={styles.metaRight}>
            {formatDate(post.date)}
          </time>
        </div>

        <h2 className={styles.title}>
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h2>

        {post.description && (
          <div className={styles.notice}>
            <span className={styles.noticeBadge}>[ Highlight ]</span>
            <blockquote className={styles.quote}>&ldquo;{post.description}&rdquo;</blockquote>
          </div>
        )}

        <div className={styles.footerRow}>
          <div className={styles.authorMeta}>
            <span>By {post.author}</span>
            <span className={styles.dot}>•</span>
            <span>{post.readMinutes} min read</span>
          </div>
          <Link href={`/blog/${post.id}`} className="btn-primary">
            Read article →
          </Link>
        </div>
      </div>
    </section>
  );
}

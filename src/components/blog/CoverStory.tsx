import PostLink from "./PostLink";
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
          <PostLink post={post}>{post.title}</PostLink>
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
            {post.readMinutes > 0 && <span>{post.readMinutes} min read</span>}
          </div>
          <PostLink post={post} className="btn-primary">
            {post.source ? `Read on ${post.source} ↗` : "Read article →"}
          </PostLink>
        </div>
      </div>
    </section>
  );
}

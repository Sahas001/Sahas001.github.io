import PostLink from "./PostLink";
import { formatDate } from "@/lib/format";
import type { BlogPostSummary } from "@/types/blogs";
import styles from "./ArticleCard.module.css";

export default function ArticleCard({ post }: { post: BlogPostSummary }) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.category}>{post.category}</span>
        {post.source && (
          <>
            <span className={styles.sep}>•</span>
            <span className={styles.source}>On {post.source}</span>
          </>
        )}
        <span className={styles.sep}>•</span>
        <span>{post.author}</span>
        <span className={styles.sep}>•</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>

      <h3 className={styles.title}>
        <PostLink post={post} className={styles.titleLink}>
          {post.title}
        </PostLink>
      </h3>

      {post.description && <p className={styles.excerpt}>{post.description}</p>}

      <div className={styles.footer}>
        <PostLink post={post} className={styles.readBtn} aria-label={`Read ${post.title}`}>
          {post.source ? `Read on ${post.source} ↗` : "Read article →"}
        </PostLink>
        {post.readMinutes > 0 && <span className={styles.readTime}>{post.readMinutes} min read</span>}
      </div>
    </article>
  );
}

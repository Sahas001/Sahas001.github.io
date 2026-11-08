import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { BlogPostSummary } from "@/types/blogs";
import styles from "./ArticleCard.module.css";

export default function ArticleCard({ post }: { post: BlogPostSummary }) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.category}>{post.category}</span>
        <span className={styles.sep}>•</span>
        <span>{post.author}</span>
        <span className={styles.sep}>•</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>

      <h3 className={styles.title}>
        <Link href={`/blog/${post.id}`} className={styles.titleLink}>
          {post.title}
        </Link>
      </h3>

      {post.description && <p className={styles.excerpt}>{post.description}</p>}

      <div className={styles.footer}>
        <Link href={`/blog/${post.id}`} className={styles.readBtn} aria-label={`Read ${post.title}`}>
          Read article →
        </Link>
        <span className={styles.readTime}>{post.readMinutes} min read</span>
      </div>
    </article>
  );
}

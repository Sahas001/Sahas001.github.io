import PostLink from "./PostLink";
import { formatDate } from "@/lib/format";
import type { BlogPostSummary } from "@/types/blogs";
import styles from "./ArticleCard.module.css";

/** A post in a list: the title does the work. */
export default function ArticleCard({ post }: { post: BlogPostSummary }) {
  return (
    <article className={styles.row}>
      <h3 className={styles.title}>
        <PostLink post={post} className={styles.titleLink}>
          {post.title}
        </PostLink>
      </h3>

      {post.description && <p className={styles.excerpt}>{post.description}</p>}

      <p className={styles.meta}>
        <span>{post.category}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.source ? `on ${post.source} ↗` : `${post.readMinutes} min read`}</span>
      </p>
    </article>
  );
}

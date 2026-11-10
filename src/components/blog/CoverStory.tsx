import PostLink from "./PostLink";
import { formatDate } from "@/lib/format";
import type { BlogPostSummary } from "@/types/blogs";
import styles from "./CoverStory.module.css";

/** The featured post: the one card on the page. */
export default function CoverStory({ post }: { post: BlogPostSummary }) {
  return (
    <article className={styles.card}>
      <p className={styles.meta}>
        <span className={styles.featured}>Featured</span>
        <span>{post.category}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.readMinutes > 0 && <span>{post.readMinutes} min read</span>}
      </p>

      <h2 className={styles.title}>
        <PostLink post={post}>{post.title}</PostLink>
      </h2>

      {post.description && <p className={styles.excerpt}>{post.description}</p>}

      <PostLink post={post} className="btn-primary">
        {post.source ? `Read on ${post.source} ↗` : "Read article"}
      </PostLink>
    </article>
  );
}

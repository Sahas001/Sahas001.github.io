import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { categoryBadgeClass, formatDate } from "@/lib/format";
import { markdownToHtml } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "../../markdown.module.css";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ArticleCard from "@/components/blog/ArticleCard";
import styles from "./page.module.css";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.id }));
}

export default async function BlogPost(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content || "");

  // Same category first, then the newest of the rest.
  const others = getAllPosts().filter((p) => p.id !== post.id);
  const related = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 2);

  return (
    <article>
      <ReadingProgress />

      <header className={styles.postHeader}>
        <div className={styles.headerCard}>
          <Link href="/blog" className={styles.backLink}>
            ← All articles
          </Link>

          <h1 className={styles.title}>{post.title}</h1>

          {post.description && <p className={styles.dek}>{post.description}</p>}

          <div className={styles.metaRow}>
            <span className={styles.avatar} aria-hidden="true">
              {post.author.charAt(0)}
            </span>
            <span className={styles.author}>{post.author}</span>
            <span className={styles.metaDot}>•</span>
            <time dateTime={post.date}>{formatDate(post.date, "long")}</time>
            <span className={styles.metaDot}>•</span>
            <span>{post.readingTime}</span>
          </div>

          <div className={styles.tagsRow}>
            <span className={`tag-badge ${categoryBadgeClass(post.category)}`}>{post.category}</span>
            {post.tags.map((tag) => (
              <span key={tag} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className={`${Markdown.markdown} container-read`} dangerouslySetInnerHTML={{ __html: content }} />

      {related.length > 0 && (
        <section className={`${styles.related} container-read`}>
          <h2 className="section-label">More from the blog</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <ArticleCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

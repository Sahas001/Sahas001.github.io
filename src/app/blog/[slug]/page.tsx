import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { categoryBadgeClass, formatDate } from "@/lib/format";
import { renderPost } from "@/lib/utils";
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

  const { html: content, headings } = await renderPost(post.content || "");
  const sections = headings.filter((h) => h.depth === 2);

  // Same category first, then the newest of the rest.
  const others = getAllPosts().filter((p) => p.id !== post.id);
  const related = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 2);

  const tocList = (
    <ol>
      {sections.map((h) => (
        <li key={h.id}>
          <a href={`#${h.id}`}>{h.text}</a>
        </li>
      ))}
    </ol>
  );

  return (
    <article>
      <ReadingProgress />

      <header className={`${styles.postHeader} container-read`}>
        <Link href="/blog" className={styles.backLink}>
          ← All posts
        </Link>

        <h1 className={styles.title}>{post.title}</h1>

        {post.description && <p className={styles.dek}>{post.description}</p>}

        <p className={styles.metaRow}>
          <span className={styles.author}>{post.author}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime}</span>
        </p>

        <div className={styles.tagsRow}>
          <span className={`tag-badge ${categoryBadgeClass(post.category)}`}>{post.category}</span>
          {post.tags.map((tag) => (
            <span key={tag} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {sections.length >= 4 && (
        <nav className={`${styles.toc} container-read`} aria-label="Contents">
          {/* Two copies, one shown per screen size: always open on wide screens,
              folded away on phones so the article starts sooner. */}
          <div className={styles.tocOpen}>
            <p className={styles.tocLabel}>Contents</p>
            {tocList}
          </div>
          <details className={styles.tocFolded}>
            <summary className={styles.tocLabel}>Contents</summary>
            {tocList}
          </details>
        </nav>
      )}

      <div className={`${Markdown.markdown} container-read`} dangerouslySetInnerHTML={{ __html: content }} />

      {related.length > 0 && (
        <section className={`${styles.related} container-read`}>
          <h2 className={styles.relatedTitle}>More from the blog</h2>
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

"use client";

import { useMemo, useState } from "react";
import type { BlogPostSummary } from "@/types/blogs";
import CoverStory from "./blog/CoverStory";
import ArticleCard from "./blog/ArticleCard";
import styles from "./BlogList.module.css";

export default function BlogList({ posts }: { posts: BlogPostSummary[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  const results = useMemo(() => {
    if (!q) return [];
    return posts.filter((p) =>
      `${p.title} ${p.description} ${p.category} ${p.tags.join(" ")}`.toLowerCase().includes(q),
    );
  }, [posts, q]);

  return (
    <>
      <div className={styles.searchRow}>
        <label htmlFor="blog-search" className={styles.searchPrompt}>
          ~$ grep
        </label>
        <input
          id="blog-search"
          type="search"
          className={styles.searchInput}
          placeholder="Search by title, topic or tag"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </div>

      {q ? (
        <section className={styles.feed} aria-live="polite">
          <div className={styles.sectionHeader}>
            {results.length} {results.length === 1 ? "match" : "matches"} for &ldquo;{query.trim()}&rdquo;
          </div>
          {results.length === 0 ? (
            <p className={styles.empty}>
              No posts match that. Try a broader word, or{" "}
              <button type="button" onClick={() => setQuery("")}>
                clear the search
              </button>
              .
            </p>
          ) : (
            <div className={styles.feedList}>
              {results.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {featured && <CoverStory post={featured} />}
          {rest.length > 0 && (
            <section className={styles.feed}>
              <div className={styles.sectionHeader}>Latest articles in archive ({rest.length})</div>
              <div className={styles.feedList}>
                {rest.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}

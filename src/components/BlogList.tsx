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
      `${p.title} ${p.description} ${p.category} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(q),
    );
  }, [posts, q]);

  return (
    <div className={styles.layout}>
      <div className={styles.side}>
        <div className={styles.searchRow}>
          <label htmlFor="blog-search" className={styles.searchPrompt}>
            ~$ grep
          </label>
          <input
            id="blog-search"
            type="search"
            className={styles.searchInput}
            placeholder="Search posts"
            aria-describedby="blog-search-hint"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
        <p id="blog-search-hint" className={styles.hint}>
          Searches titles, topics and tags.
        </p>
        <a href="/rss.xml" className="text-link">
          Subscribe via RSS
        </a>
      </div>

      <div className={styles.main}>
        {q ? (
          <section className={styles.feed} aria-live="polite">
            <h2 className={styles.sectionHeader}>
              {results.length} {results.length === 1 ? "match" : "matches"} for
              &ldquo;{query.trim()}&rdquo;
            </h2>
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
                <h2 className={styles.sectionHeader}>More posts</h2>
                <div className={styles.feedList}>
                  {rest.map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPost } from "@/types/blogs";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const haystack = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query]);

  return (
    <div className="blog-list">
      <div className="blog-search">
        <input
          className="blog-search-input"
          placeholder="search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="blog-search-count">{filtered.length} results</span>
      </div>
      <div className="blog-list-head">
        <span>date</span>
        <span>title</span>
        <span>flags</span>
      </div>
      {filtered.length === 0 ? (
        <div className="blog-empty">
          <span className="text-[color:var(--accent)]">~$</span>{" "}
          <span className="text-[color:var(--muted)]">no matches</span>
        </div>
      ) : (
        filtered.map((post, index) => (
          <div key={post.id} className="blog-row-anim" style={{ animationDelay: `${index * 40}ms` }}>
            <Link href={`/blog/${post.id}`} className="blog-list-row group">
              <span className="blog-cell" data-label="date">{post.date ? new Date(post.date).toISOString().slice(0, 10) : "-"}</span>
              <span className="blog-cell blog-title" data-label="title">{post.title}</span>
              <span className="blog-cell flex flex-wrap gap-2 items-center" data-label="flags">
                {post.tags.map((t) => (
                  <span 
                    key={t} 
                    className="px-2 py-0.5 text-xs rounded border border-[color:var(--border)] bg-[#0b1117] text-[color:var(--muted)]"
                  >
                    --{t}
                  </span>
                ))}
              </span>
            </Link>
            {index < filtered.length - 1 ? <div className="blog-divider" aria-hidden="true" /> : null}
          </div>
        ))
      )}
    </div>
  );
}

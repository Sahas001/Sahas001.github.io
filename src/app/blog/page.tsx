import TerminalNav from "@/components/TerminalNav";
import TerminalFooter from "@/components/TerminalFooter";
import TerminalHeader from "@/components/TerminalHeader";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Page() {
  const posts = getAllPosts();
  return (
    <div className="min-h-screen p-6 sm:p-10 flex flex-col">
      <TerminalHeader />
      <TerminalNav />
      <div className="flex flex-col mt-4">
        <h1 className="text-2xl sm:text-3xl font-bold mt-5 mb-2">
          <span className="text-[color:var(--accent)]">~$</span>{" "}
          <span className="text-[color:var(--muted)]">ls blog</span>
          <span className="terminal-cursor" aria-hidden="true" />
        </h1>
        <p className="text-sm sm:text-base text-[color:var(--p)] mb-4">
          Notes on systems, web, and things I am learning.
        </p>
      </div>
      <div className="mt-6 flex-1 terminal-output">
        <div className="blog-list">
          <div className="blog-list-head">
            <span>date</span>
            <span>title</span>
            <span>tags</span>
          </div>
          {posts.map((post, index) => (
            <div key={post.id}>
              <Link href={`/blog/${post.id}`} className="blog-list-row">
                <span>{post.date || "-"}</span>
                <span className="blog-title">{post.title}</span>
                <span className="blog-tags">{post.tags.map((t) => `--${t}`).join(" ")}</span>
              </Link>
              {index < posts.length - 1 ? <div className="blog-divider" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>
      </div>
      <TerminalFooter />
    </div>
  );
}

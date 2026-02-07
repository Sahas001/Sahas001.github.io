import TerminalNav from "@/components/TerminalNav";
import TerminalFooter from "@/components/TerminalFooter";
import TerminalHeader from "@/components/TerminalHeader";
import BlogList from "@/components/BlogList";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Page() {
  const posts = getAllPosts();
  return (
    <div className="min-h-screen p-6 sm:p-10 flex flex-col">
      <TerminalHeader />
      <Suspense fallback={null}>
        <TerminalNav />
      </Suspense>
      <div className="flex flex-col mt-4">
        <h1 className="text-2xl sm:text-3xl font-bold mt-5 mb-2">
          <span className="text-[color:var(--accent)]">~$</span>{" "}
          <span className="text-[color:var(--muted)]">ls blog</span>
        </h1>
        <p className="text-sm sm:text-base text-[color:var(--p)] mb-4">
          Notes on systems, web, and things I am learning.
        </p>
      </div>
      <div className="mt-6 flex-1 terminal-output">
        <BlogList posts={posts} />
      </div>
      <TerminalFooter />
    </div>
  );
}

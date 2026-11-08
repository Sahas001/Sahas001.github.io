import BlogList from "@/components/BlogList";
import { getAllWriting } from "@/lib/posts";
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on systems, web, and things Sahas Timilsina is learning.",
};

export default async function Page() {
  const posts = await getAllWriting();
  return (
    <div className="container-read">
      <header className={styles.masthead}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.intro}>
          Notes on systems, the web, and things I&apos;m learning. Longer dispatches also go out on{" "}
          <a href="https://phasethru.dev" target="_blank" rel="noopener noreferrer">
            phasethru.dev
          </a>
          .{" "}
          <a href="/rss.xml">Subscribe via RSS</a>.
        </p>
      </header>
      {posts.length === 0 ? (
        <p className={styles.intro}>No posts yet. The first one is on its way.</p>
      ) : (
        <BlogList posts={posts} />
      )}
    </div>
  );
}

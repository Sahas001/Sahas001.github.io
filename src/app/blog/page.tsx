import BlogList from "@/components/BlogList";
import { getAllPosts } from "@/lib/posts";
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on systems, web, and things Sahas Timilsina is learning.",
};

export default function Page() {
  const posts = getAllPosts();
  return (
    <div className="container-read">
      <header className={styles.masthead}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.intro}>
          Notes on systems, the web, and things I&apos;m learning. Longer dispatches also go out on{" "}
          <a href="https://phasethru.dev" target="_blank" rel="noopener noreferrer">
            phasethru.dev
          </a>
          .
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

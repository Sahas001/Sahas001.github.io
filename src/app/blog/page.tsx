import BlogList from "@/components/BlogList";
import PageHeader from "@/components/PageHeader";
import { getAllWriting } from "@/lib/posts";
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on systems, the web, and things Sahas Timilsina is learning.",
};

export default async function Page() {
  const posts = await getAllWriting();
  return (
    <div className="container-wide">
      <PageHeader title="Blog">
        Notes on systems, the web, and things I&apos;m learning. Longer dispatches also go out on{" "}
        <a href="https://phasethru.dev" target="_blank" rel="noopener noreferrer">
          phasethru.dev
        </a>
        . <a href="/rss.xml">Subscribe via RSS</a>.
      </PageHeader>
      {posts.length === 0 ? (
        <p className={styles.empty}>No posts yet. The first one is on its way.</p>
      ) : (
        <div className={styles.feed}>
          <BlogList posts={posts} />
        </div>
      )}
    </div>
  );
}

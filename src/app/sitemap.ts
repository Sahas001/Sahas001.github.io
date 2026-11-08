import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE = "https://sahastimilsina.com.np";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE}/blog/${post.id}`,
    lastModified: post.date ? new Date(post.date) : undefined,
  }));
  return [
    { url: SITE, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/?tab=projects`, changeFrequency: "monthly" },
    { url: `${SITE}/?tab=about`, changeFrequency: "yearly" },
    { url: `${SITE}/blog`, changeFrequency: "weekly" },
    ...posts,
  ];
}

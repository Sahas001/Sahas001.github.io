import { getAllPosts } from "@/lib/posts";

const SITE = "https://sahastimilsina.com.np";

function escape(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const dynamic = "force-static";

export function GET() {
  const items = getAllPosts()
    .map((post) => {
      const url = `${SITE}/blog/${post.id}`;
      return `
    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ""}
      <description>${escape(post.description)}</description>
      <category>${escape(post.category)}</category>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sahas Timilsina — Blog</title>
    <link>${SITE}/blog</link>
    <description>Notes on systems, the web, and things Sahas Timilsina is learning.</description>
    <language>en-us</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

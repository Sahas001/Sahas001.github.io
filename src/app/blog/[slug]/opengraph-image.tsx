import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post by Sahas Timilsina";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.id }));
}

/** A static cut of the site's display face from Google Fonts; null if it can't be reached. */
async function loadFont(axes: string) {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=Anybody:${axes}`, {
      signal: AbortSignal.timeout(5000),
    }).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url, { signal: AbortSignal.timeout(5000) }).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const [text, title] = await Promise.all([loadFont("wght@500"), loadFont("wdth,wght@110,800")]);
  const fonts = [
    ...(text ? [{ name: "Anybody", data: text, weight: 500 as const }] : []),
    ...(title ? [{ name: "Anybody", data: title, weight: 800 as const }] : []),
  ];

  const ink = "#1a1d20";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f5ee",
          padding: "64px 72px",
          fontFamily: fonts.length ? "Anybody" : undefined,
          color: ink,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 500 }}>
          <span style={{ color: "#d94a38" }}>{post?.category ?? "Blog"}</span>
          <span style={{ color: "#6c7078" }}>{post ? formatDate(post.date) : ""}</span>
        </div>

        <div style={{ display: "flex", fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: -1 }}>
          {post?.title ?? "Sahas Timilsina"}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `4px solid ${ink}`,
            paddingTop: 26,
            fontSize: 28,
          }}
        >
          <span style={{ fontWeight: 800 }}>Sahas Timilsina</span>
          <span style={{ fontWeight: 500, color: "#6c7078" }}>sahastimilsina.com.np/blog</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}

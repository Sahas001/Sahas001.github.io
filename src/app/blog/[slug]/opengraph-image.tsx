import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post by Sahas Timilsina";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.id }));
}

/** Space Mono from Google Fonts; falls back to the default font if offline. */
async function loadFont(weight: 400 | 700) {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=Space+Mono:wght@${weight}`, {
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
  const [regular, bold] = await Promise.all([loadFont(400), loadFont(700)]);
  const fonts = [
    ...(regular ? [{ name: "Space Mono", data: regular, weight: 400 as const }] : []),
    ...(bold ? [{ name: "Space Mono", data: bold, weight: 700 as const }] : []),
  ];

  const ink = "#1a1d20";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f8f5ee",
          padding: 56,
          fontFamily: fonts.length ? "Space Mono" : undefined,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#fffdf7",
            border: `4px solid ${ink}`,
            boxShadow: `12px 12px 0 ${ink}`,
            padding: "48px 56px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#d94a38" }}>
            <span>{(post?.category ?? "Blog").toUpperCase()}</span>
            <span style={{ color: "#6c7078" }}>{post ? formatDate(post.date) : ""}</span>
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, color: ink, lineHeight: 1.1 }}>
            {post?.title ?? "Sahas Timilsina"}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "2px dashed rgba(26,29,32,0.35)",
              paddingTop: 24,
              fontSize: 26,
              color: ink,
            }}
          >
            <span style={{ fontWeight: 700 }}>SAHAS TIMILSINA</span>
            <span style={{ color: "#6c7078" }}>sahastimilsina.com.np/blog</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}

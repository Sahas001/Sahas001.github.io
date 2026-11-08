import type { BlogPostSummary } from "@/types/blogs";

const FEED_URL = "https://phasethru.dev/rss.xml";

function decode(text: string) {
	return text
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, "&")
		.trim();
}

function field(item: string, tag: string) {
	const m = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${tag}>`));
	return m ? decode(m[1] ?? m[2] ?? "") : "";
}

/**
 * Posts from phasethru.dev's RSS feed, refreshed at most hourly.
 * Returns [] if the feed can't be reached, so the blog never breaks
 * because the other site is down.
 */
export async function getPhasethruPosts(): Promise<BlogPostSummary[]> {
	try {
		const res = await fetch(FEED_URL, {
			headers: { Accept: "application/rss+xml" },
			next: { revalidate: 3600 },
			signal: AbortSignal.timeout(8000),
		});
		if (!res.ok) return [];
		const xml = await res.text();
		const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
		return items.map((item) => {
			const url = field(item, "link");
			const date = new Date(field(item, "pubDate"));
			return {
				id: url.split("/").filter(Boolean).pop() ?? url,
				title: field(item, "title"),
				description: field(item, "description"),
				category: field(item, "category") || "Notes",
				author: field(item, "author") || "Sahas Timilsina",
				date: isNaN(date.getTime()) ? "" : date.toISOString(),
				featured: false,
				tags: [],
				readMinutes: 0,
				readingTime: "",
				size: "",
				externalUrl: url,
				source: "Phasethru",
			};
		});
	} catch {
		return [];
	}
}

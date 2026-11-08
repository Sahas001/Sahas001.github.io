import type { BlogPost, BlogPostSummary } from "@/types/blogs";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getPhasethruPosts } from "./phasethru";

const postsDir = path.join(process.cwd(), "src/_posts");

export function getPostSlugs() {
	return fs.readdirSync(postsDir).filter((f) => /\.mdx?$/.test(f));
}

export function getPostBySlug(slug: string): BlogPost | null {
	const validSlug = slug.replace(/\.mdx?$/, "");
	const filePath = path.join(postsDir, `${validSlug}.md`);
	if (!fs.existsSync(filePath)) {
		return null;
	}
	const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));

	const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
	const date = data.date ? String(data.date) : "";
	const wordCount = content.split(/\s+/).filter(Boolean).length;
	const readMinutes = Number(data.readTime) || Math.max(1, Math.ceil(wordCount / 200));
	const sizeBytes = Buffer.byteLength(content, "utf8");
	const size = sizeBytes < 1024 ? `${sizeBytes}B` : `${(sizeBytes / 1024).toFixed(1)}K`;

	return {
		id: validSlug,
		title: data.title ?? validSlug,
		date,
		description: data.description ?? data.excerpt ?? "",
		category: data.category ? String(data.category) : "Notes",
		author: data.author ? String(data.author) : "Sahas Timilsina",
		featured: Boolean(data.featured),
		tags,
		content,
		readMinutes,
		readingTime: `${readMinutes} min read`,
		size,
	};
}

/** Every post, newest first, without bodies. */
export function getAllPosts(): BlogPostSummary[] {
	const posts = getPostSlugs()
		.map((slug) => getPostBySlug(slug))
		.filter((p): p is BlogPost => p !== null)
		.map((post) => {
			const summary: Partial<BlogPost> = { ...post };
			delete summary.content;
			return summary as BlogPostSummary;
		});
	posts.sort((a, b) => {
		const timeA = Date.parse(a.date || "");
		const timeB = Date.parse(b.date || "");
		return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
	});
	return posts;
}

/**
 * Local posts plus Phasethru posts, newest first. A Phasethru post with
 * the same slug as a local one is skipped, so cross-posts appear once.
 */
export async function getAllWriting(): Promise<BlogPostSummary[]> {
	const local = getAllPosts();
	const localIds = new Set(local.map((p) => p.id));
	const remote = (await getPhasethruPosts()).filter((p) => !localIds.has(p.id));
	return [...local, ...remote].sort(
		(a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0),
	);
}

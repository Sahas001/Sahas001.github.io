import type { BlogPost, BlogPostSummary } from "@/types/blogs";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

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
		.map(({ content: _content, ...summary }) => summary);
	posts.sort((a, b) => {
		const timeA = Date.parse(a.date || "");
		const timeB = Date.parse(b.date || "");
		return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
	});
	return posts;
}

import type { BlogPost } from "@/types/blogs";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDir = path.join(process.cwd(), 'src/_posts')

export function getPostSlugs() {
	return fs.readdirSync(postsDir);
}

export function getPostBySlug(slug: string): BlogPost | null {
	const validSlug = slug.replace(/\.md$/, ''); // Remove .md extension if present
	const filePath = path.join(postsDir, `${validSlug}.md`);
	if (!fs.existsSync(filePath)) {
		return null;
	}
	const fileContent = fs.readFileSync(filePath, 'utf-8');

	const { data, content } = matter(fileContent);

	const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
	const date = data.date ? String(data.date) : "";

	return {
		id: validSlug,
		title: data.title ?? validSlug,
		date,
		description: data.description ?? "",
		tags,
		content,
	} as BlogPost;


}

export function getAllPosts() {
	const slugs = getPostSlugs();
	const posts = slugs.map(slug => getPostBySlug(slug)).filter(Boolean) as BlogPost[];
	posts.sort((a, b) => {
		const timeA = Date.parse(a.date || "");
		const timeB = Date.parse(b.date || "");
		return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
	});

	return posts;
}

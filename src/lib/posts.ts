import type { BlogPost } from "@/types/blogs";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDir = path.join(process.cwd(), 'src/_posts')

export function getPostSlugs() {
	return fs.readdirSync(postsDir);
}

export function getPostBySlug(slug: string) {
	const validSlug = slug.replace(/\.md$/, ''); // Remove .md extension if present
	let fileContent: string;
	const filePath = path.join(postsDir, `${validSlug}.md`);
	try {
		fileContent = fs.readFileSync(filePath, 'utf-8');
	} catch (error) {
		throw new Error(`Error reading file at ${filePath}: ${error}`);
	}

	const { data, content } = matter(fileContent);

	return { ...data, content } as BlogPost;


}

export function getAllPosts() {
	const slugs = getPostSlugs();
	const posts = slugs.map(slug => getPostBySlug(slug));

	return posts;
}

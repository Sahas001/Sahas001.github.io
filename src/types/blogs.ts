export interface BlogPost {
	id: string;
	title: string;
	date: string;
	description: string;
	category: string;
	author: string;
	featured: boolean;
	content: string;
	tags: string[];
	readingTime: string;
	readMinutes: number;
	size: string;
}

/** Everything a list or card needs; no article body. */
export type BlogPostSummary = Omit<BlogPost, "content">;

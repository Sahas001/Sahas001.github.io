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
	/** Set for posts published elsewhere (e.g. Phasethru); links out instead of to /blog/[id]. */
	externalUrl?: string;
	source?: string;
}

/** Everything a list or card needs; no article body. */
export type BlogPostSummary = Omit<BlogPost, "content">;

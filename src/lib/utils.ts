import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { remark } from 'remark';
import html from 'remark-html';
import remarkParse from 'remark-parse';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export async function markdownToHtml(content: string) {
	const processedContent = await remark().use(remarkParse).use(html).process(content);
	return processedContent.toString();
}


import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export async function markdownToHtml(content: string) {
	const processedContent = await remark()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrism)
		.use(rehypeStringify)
		.process(content);
	return processedContent.toString();
}

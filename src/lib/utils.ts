import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

type MdNode = { type: string; depth?: number; children?: MdNode[] };

// The post page renders the title itself, so drop a leading `# Title` from the body.
function remarkStripLeadingTitle() {
	return (tree: MdNode) => {
		const first = tree.children?.[0];
		if (first?.type === 'heading' && first.depth === 1) tree.children!.shift();
	};
}

// The post page owns the only <h1>; shift markdown headings down one level (# -> h2).
function remarkShiftHeadings() {
	return (tree: MdNode) => {
		const walk = (node: MdNode) => {
			if (node.type === 'heading' && node.depth) node.depth = Math.min(node.depth + 1, 6);
			node.children?.forEach(walk);
		};
		walk(tree);
	};
}

export async function markdownToHtml(content: string) {
	const processedContent = await remark()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkToc, { heading: 'table of contents|toc' })
		.use(remarkStripLeadingTitle)
		.use(remarkShiftHeadings)
		.use(remarkRehype)
		.use(rehypePrism)
		.use(rehypeStringify)
		.process(content);
	return processedContent.toString();
}

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

// The post page owns the only <h1>, so the body's top-level sections must be <h2>.
// Posts differ: some use `#` for sections, some `##`. Shift every heading by the same
// amount so the shallowest one lands on h2, whichever style the post was written in.
function remarkShiftHeadings() {
	return (tree: MdNode) => {
		const headings: MdNode[] = [];
		const walk = (node: MdNode) => {
			if (node.type === 'heading' && node.depth) headings.push(node);
			node.children?.forEach(walk);
		};
		walk(tree);
		if (headings.length === 0) return;
		const shift = 2 - Math.min(...headings.map((h) => h.depth!));
		for (const h of headings) h.depth = Math.min(Math.max(h.depth! + shift, 2), 6);
	};
}

type HastNode = {
	type: string;
	tagName?: string;
	value?: string;
	properties?: Record<string, unknown>;
	children?: HastNode[];
};

export type Heading = { id: string; text: string; depth: number };

function textOf(node: HastNode): string {
	if (node.type === 'text') return node.value ?? '';
	return (node.children ?? []).map(textOf).join('');
}

function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

// Give h2/h3 stable ids and a "#" link so sections can be linked to, and record them for a contents list.
function rehypeHeadingAnchors(headings: Heading[]) {
	return () => (tree: HastNode) => {
		const used = new Map<string, number>();
		const walk = (node: HastNode) => {
			if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
				const text = textOf(node).trim();
				let id = slugify(text) || 'section';
				const n = used.get(id) ?? 0;
				used.set(id, n + 1);
				if (n) id = `${id}-${n}`;
				node.properties = { ...node.properties, id };
				node.children = [
					...(node.children ?? []),
					{
						type: 'element',
						tagName: 'a',
						properties: { href: `#${id}`, className: ['heading-anchor'], ariaLabel: `Link to ${text}` },
						children: [{ type: 'text', value: '#' }],
					},
				];
				headings.push({ id, text, depth: node.tagName === 'h2' ? 2 : 3 });
				return;
			}
			node.children?.forEach(walk);
		};
		walk(tree);
	};
}

export async function renderPost(content: string): Promise<{ html: string; headings: Heading[] }> {
	const headings: Heading[] = [];
	const processed = await remark()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkToc, { heading: 'table of contents|toc' })
		.use(remarkStripLeadingTitle)
		.use(remarkShiftHeadings)
		.use(remarkRehype)
		.use(rehypePrism)
		.use(rehypeHeadingAnchors(headings))
		.use(rehypeStringify)
		.process(content);
	return { html: processed.toString(), headings };
}

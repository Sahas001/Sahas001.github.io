// Browser-safe helpers shared by server and client components.

/** Category → badge colour, matching phasethru.dev. */
const BADGE_COLORS: Record<string, string> = {
	Design: "vermilion",
	Essays: "vermilion",
	"Sci-Fi": "teal",
	Tech: "mustard",
};

export function categoryBadgeClass(category: string) {
	return `tag-badge--${BADGE_COLORS[category] ?? "teal"}`;
}

export function formatDate(date: string, style: "short" | "long" = "short") {
	const d = new Date(date);
	if (isNaN(d.getTime())) return "";
	return d.toLocaleDateString(
		"en-US",
		style === "long"
			? { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }
			: { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" },
	);
}

/** Where a post lives: its page here, or its page on the other site. */
export function postHref(post: { id: string; externalUrl?: string }) {
	return post.externalUrl ?? `/blog/${post.id}`;
}

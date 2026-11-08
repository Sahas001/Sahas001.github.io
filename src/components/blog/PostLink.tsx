import Link from "next/link";
import type { ReactNode } from "react";
import { postHref } from "@/lib/format";

type Props = {
  post: { id: string; externalUrl?: string };
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/** Links to a post here, or opens it on the site it was published on. */
export default function PostLink({ post, className, children, ...rest }: Props) {
  if (post.externalUrl) {
    return (
      <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={postHref(post)} className={className} {...rest}>
      {children}
    </Link>
  );
}

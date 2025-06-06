import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Page() {
  const posts = getAllPosts();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <ul className="list-disc list-inside">
          {posts.map((post, index) => (
            <li key={index} className="mb-2">
              <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

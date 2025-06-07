import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Page() {
  const posts = getAllPosts();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl text-purple-400 font-bold mt-5 mb-4">Welcome to My Blogs!!🙏</h1>
          <Link href="/">
            <button
              className="text-blue-300 mb-4 hover:underline hover:text-purple-200 transition"
            >
              ←- Go Back
            </button>
          </Link>

        </div>
        <ul>
          {posts.map((post, index) => (
            <li key={index} className="mb-2">
              <Link href={`/blog/${post.id}`}>
                <BlogCard
                  name={post.title}
                  description={post.description}
                  badge={post.tags}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

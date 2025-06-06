import { getPostBySlug } from "@/lib/posts";

export default function DebugPage() {
  const test = getPostBySlug("echoes");
  console.log(test);
  return <pre>{JSON.stringify(test, null, 2)}</pre>;
}


import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { markdownToHtml } from '@/lib/utils';
import { Metadata } from 'next';
import Markdown from '../../markdown.module.css'
import Badge from '@/components/Badge';
import BlogPage from '@/sections/BlogPage';

type Params = {
  params: Promise<{
    slug: string
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  let title = "Not Found";

  if (post) {
    title = post.title;
  }
  return {
    title,
    openGraph: {
      title,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogPost(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  const content = await markdownToHtml(post.content || '');

  if (!post) {
    return <div className="text-center">Post not found</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <article className="prose prose-invert max-w-4xl w-full">
        <BlogPage title={post.title} description={post.description}>
          <time className="text-sm text-muted mb-6 block">{new Date(post.date).toLocaleDateString()}</time>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge name={tag} key={tag} />
            ))}
          </div>
          <div
            className={Markdown['markdown']}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </BlogPage>
      </article>
    </div>
  )
}



import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { markdownToHtml } from '@/lib/utils';
import { Metadata } from 'next';
import Markdown from '../../markdown.module.css'
import Badge from '@/components/Badge';
import TerminalNav from '@/components/TerminalNav';
import TerminalFooter from '@/components/TerminalFooter';
import TerminalHeader from '@/components/TerminalHeader';
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

  if (!post) {
    return <div className="text-center">Post not found</div>;
  }

  const content = await markdownToHtml(post.content || '');

  return (
    <div className="min-h-screen p-6 sm:p-10 flex flex-col">
      <TerminalHeader />
      <TerminalNav />
      <article className="max-w-5xl w-full mt-6 flex-1">
        <BlogPage title={post.title} description={post.description}>
          <time className="text-sm text-[color:var(--muted)] mb-6 block">{new Date(post.date).toLocaleDateString()}</time>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge name={tag} key={tag} variant="flag" />
            ))}
          </div>
          <div
            className={Markdown['markdown']}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </BlogPage>
      </article>
      <TerminalFooter />
    </div>
  )
}

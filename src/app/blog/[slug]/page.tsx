import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { markdownToHtml } from '@/lib/utils';
import { Metadata } from 'next';
import Markdown from '../../markdown.module.css'
import Badge from '@/components/Badge';
import TerminalNav from '@/components/TerminalNav';
import TerminalFooter from '@/components/TerminalFooter';
import TerminalHeader from '@/components/TerminalHeader';
import { Suspense } from 'react';
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

  const posts = getAllPosts();
  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen p-6 sm:p-10 flex flex-col">
      <TerminalHeader />
      <Suspense fallback={null}>
        <TerminalNav />
      </Suspense>
      <article className="max-w-5xl w-full mt-6 flex-1">
        <BlogPage title={post.title} description={post.description}>
          <div className="flex items-center gap-4 text-sm text-[color:var(--muted)] mb-6">
            <time>{new Date(post.date).toLocaleDateString()}</time>
            <span>•</span>
            <span>[ {post.readingTime} ]</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge name={tag} key={tag} variant="flag" />
            ))}
          </div>
          <div
            className={Markdown['markdown']}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-16 p-4 border border-[color:var(--border)] rounded-md bg-[#0b1117] font-mono text-sm">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex-1 text-left">
                {prevPost ? (
                  <>
                    <div className="text-[color:var(--muted)] mb-2">
                      <span className="text-[color:var(--accent)]">~$</span> cat prev_post.md
                    </div>
                    <a href={`/blog/${prevPost.id}`} className="text-[color:var(--accent)] hover:underline block truncate">
                      &lt;- {prevPost.title}
                    </a>
                  </>
                ) : <div className="text-[color:var(--muted)]">/* No older posts */</div>}
              </div>
              
              <div className="flex-1 sm:text-right">
                {nextPost ? (
                  <>
                    <div className="text-[color:var(--muted)] mb-2">
                      <span className="text-[color:var(--accent)]">~$</span> cat next_post.md
                    </div>
                    <a href={`/blog/${nextPost.id}`} className="text-[color:var(--accent)] hover:underline block truncate">
                      {nextPost.title} -&gt;
                    </a>
                  </>
                ) : <div className="text-[color:var(--muted)]">/* No newer posts */</div>}
              </div>
            </div>
          </div>
        </BlogPage>
      </article>
      <TerminalFooter />
    </div>
  )
}

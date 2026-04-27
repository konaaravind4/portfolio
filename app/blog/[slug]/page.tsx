import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar, User, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getBlogPostBySlug(params.slug);
    if (!post) return { title: "Not Found" };
    return {
        title: `${post.title} | Kona Aravind`,
        description: post.excerpt,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: ["Kona Aravind"],
        },
    };
}

export default function BlogPostPage({ params }: Props) {
    const post = getBlogPostBySlug(params.slug);
    if (!post) notFound();

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-28 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                        <Link href="/" className="hover:text-neon-cyan transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/blog" className="hover:text-neon-cyan transition-colors">Blog</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-400 line-clamp-1">{post.title}</span>
                    </div>

                    {/* Header */}
                    <div className="mb-10">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag) => (
                                <span key={tag} className="tag flex items-center gap-1">
                                    <Tag className="w-2.5 h-2.5" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-4">
                            {post.title}
                        </h1>
                        <p className="text-lg text-slate-500 mb-6">{post.excerpt}</p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pb-6 border-b border-white/5">
                            <span className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" />
                                {post.author}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(post.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime}
                            </span>
                        </div>
                    </div>

                    {/* MDX Content */}
                    <article className="prose-dark max-w-none">
                        <div className="
              prose prose-invert prose-sm md:prose-base max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-h1:gradient-text
              prose-h2:text-white prose-h3:text-slate-200
              prose-p:text-slate-400 prose-p:leading-relaxed
              prose-a:text-neon-cyan prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-200
              prose-code:text-neon-cyan prose-code:bg-neon-cyan/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-dark-800 prose-pre:border prose-pre:border-neon-cyan/10 prose-pre:rounded-xl
              prose-blockquote:border-l-neon-cyan prose-blockquote:bg-neon-cyan/5 prose-blockquote:rounded-r-xl
              prose-table:text-slate-400
              prose-th:text-slate-200 prose-th:font-semibold
              prose-hr:border-white/5
              prose-li:text-slate-400
            ">
                            <MDXRemote
                                source={post.content}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkMath],
                                        rehypePlugins: [rehypeKatex],
                                    },
                                }}
                            />
                        </div>
                    </article>

                    {/* Footer nav */}
                    <div className="mt-16 pt-6 border-t border-white/5">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-neon-cyan transition-colors">
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

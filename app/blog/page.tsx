import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/BlogCard";
import { getAllBlogPosts } from "@/lib/blog";
import { BookOpen, Rss } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Kona Aravind — AI & ML Writing",
    description: "Technical writing on RAG pipelines, diffusion models, multi-agent systems, probability, and quantitative methods by Kona Aravind.",
};

const ALL_TAGS = ["All", "RAG", "LLM", "ML", "Generative AI", "Computer Vision", "Math", "Quant", "Systems", "LangChain"];

export default function BlogPage() {
    const posts = getAllBlogPosts();

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-28 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full glass border border-neon-cyan/20 text-xs font-medium text-neon-cyan">
                            <BookOpen className="w-3.5 h-3.5" />
                            Technical Blog
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black font-display gradient-text mb-4">
                            AI Research & Notes
                        </h1>
                        <p className="text-slate-500 text-sm max-w-lg mx-auto">
                            Deep dives into ML systems, mathematical models, RAG pipelines, diffusion theory,
                            and quantitative approaches — with LaTeX and real code.
                        </p>
                    </div>

                    {/* Tag filters (visual only — add router filtering for full interactivity) */}
                    <div className="flex flex-wrap gap-2 mb-10 justify-center">
                        {ALL_TAGS.map((tag) => (
                            <button
                                key={tag}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${tag === "All"
                                        ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan"
                                        : "bg-transparent border-white/10 text-slate-500 hover:border-neon-cyan/30 hover:text-neon-cyan"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-20 text-slate-600">
                            <Rss className="w-10 h-10 mx-auto mb-4 opacity-30" />
                            <p>Blog posts coming soon...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {posts.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

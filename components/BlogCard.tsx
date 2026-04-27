"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type BlogPost } from "@/lib/blog";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

const tagColorMap: Record<string, string> = {
    RAG: "tag",
    LLM: "tag-blue",
    LangChain: "tag-green",
    ML: "tag-blue",
    "Generative AI": "tag-pink",
    "Computer Vision": "tag-violet",
    Math: "tag-violet",
    Probability: "tag-violet",
    DSA: "tag-green",
    Quant: "tag",
    Systems: "tag-blue",
};

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-6 flex flex-col gap-4 group relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-violet/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                    <span key={tag} className={tagColorMap[tag] ?? "tag"}>
                        <Tag className="w-2.5 h-2.5 mr-1" />
                        {tag}
                    </span>
                ))}
            </div>

            {/* Title */}
            <Link href={`/blog/${post.slug}`}>
                <h2 className="font-display font-bold text-lg text-white leading-snug group-hover:text-neon-cyan transition-colors duration-200 line-clamp-2">
                    {post.title}
                </h2>
            </Link>

            {/* Excerpt */}
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{post.excerpt}</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                    </span>
                    <span>·</span>
                    <span>{formatDate(post.date)}</span>
                </div>
                <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-neon-cyan transition-colors group/link"
                >
                    Read
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
            </div>
        </motion.article>
    );
}

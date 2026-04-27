import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    readTime: string;
    content: string;
    author: string;
    published: boolean;
    coverImage?: string;
}

export function getAllBlogPosts(): BlogPost[] {
    if (!fs.existsSync(BLOG_DIR)) return [];
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
    return files
        .map((file) => {
            const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
            const { data, content } = matter(raw);
            const stats = readingTime(content);
            return {
                slug: file.replace(/\.mdx?$/, ""),
                title: data.title ?? "Untitled",
                excerpt: data.excerpt ?? "",
                date: data.date ?? new Date().toISOString(),
                tags: data.tags ?? [],
                readTime: stats.text,
                content,
                author: data.author ?? "Kona Aravind",
                published: data.published !== false,
                coverImage: data.coverImage,
            } as BlogPost;
        })
        .filter((p) => p.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return getAllBlogPosts().find((p) => p.slug === slug);
}

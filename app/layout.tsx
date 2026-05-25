import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Kona Aravind | AI Engineer & ML Researcher",
    description:
        "Portfolio of Kona Aravind — AI Engineer, ML Researcher, and Quant Enthusiast. Building intelligent systems with LLMs, RAG pipelines, diffusion models, and multi-agent architectures.",
    keywords: [
        "AI Engineer",
        "ML Researcher",
        "Kona Aravind",
        "Machine Learning",
        "LangChain",
        "RAG",
        "Multi-Agent Systems",
        "A2A",
        "Next.js Portfolio",
    ],
    authors: [{ name: "Kona Aravind", url: "https://github.com/konaaravind4" }],
    openGraph: {
        title: "Kona Aravind | AI Engineer & ML Researcher",
        description: "AI-powered portfolio showcasing ML projects, research, and intelligent systems.",
        type: "website",
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kona Aravind | AI Engineer",
        description: "AI-powered portfolio showcasing ML projects, research, and intelligent systems.",
    },
    robots: { index: true, follow: true },
    viewport: { width: "device-width", initialScale: 1 },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* Handwriting fonts for notebook aesthetic */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Kalam:wght@300;400;700&family=Patrick+Hand&family=Permanent+Marker&family=JetBrains+Mono:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
                />
            </head>
            <body className="antialiased" style={{ color: 'var(--ink)' }}>
                <div className="main-page-wrapper">
                    {children}
                </div>
            </body>
        </html>
    );
}

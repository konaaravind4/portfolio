import type { Metadata } from "next";
import "./globals.css";
import TargetCursor from "@/components/TargetCursor";
import dynamic from "next/dynamic";






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
        <html lang="en" className="dark scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* Bricolage Grotesque = Brier-style editorial header font */}
                {/* Syne = modern geometric for body / small text */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fira+Code:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
                />
            </head>
            <body className="antialiased" style={{ background: '#FFFFFF', color: 'var(--text-primary)' }}>

                <TargetCursor
                    targetSelector="a, button, [role='button'], .cursor-target"
                    spinDuration={2}
                    hideDefaultCursor
                    parallaxOn
                    hoverDuration={0.2}
                />

                <div className="main-page-wrapper">
                    {children}
                </div>
            </body>
        </html>
    );
}

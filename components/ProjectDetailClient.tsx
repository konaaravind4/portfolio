"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Github, ExternalLink, ChevronRight, BarChart2, Cpu, Calendar, Code2, Info, Copy, Check } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectPageClient({ slug }: { slug: string }) {
    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const [activeTab, setActiveTab] = useState<"overview" | "code">("overview");
    const [copied, setCopied] = useState(false);

    const metricColors: Record<string, { color: string; bg: string; border: string }> = {
        cyan: { color: "#A4DA65", bg: "rgba(164,218,101,0.07)", border: "rgba(164,218,101,0.2)" },
        violet: { color: "#6EE7B7", bg: "rgba(110,231,183,0.07)", border: "rgba(110,231,183,0.2)" },
        blue: { color: "#6EE7B7", bg: "rgba(110,231,183,0.07)", border: "rgba(110,231,183,0.2)" },
        green: { color: "#A4DA65", bg: "rgba(164,218,101,0.07)", border: "rgba(164,218,101,0.2)" },
    };
    const mc = (c?: string) => metricColors[c ?? "cyan"];

    const tabs = [
        { id: "overview" as const, label: "Overview", icon: Info },
        ...(project.codeSnippet ? [{ id: "code" as const, label: "Source Code", icon: Code2 }] : []),
    ];

    const handleCopy = () => {
        if (project.codeSnippet) {
            navigator.clipboard.writeText(project.codeSnippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-28 pb-20" style={{ background: "#09090B" }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs mb-8" style={{ color: "#4B5563" }}>
                        <Link href="/" className="transition-colors hover:text-lime-400" style={{ color: "#6B7280" }}>Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/projects" className="transition-colors hover:text-lime-400" style={{ color: "#6B7280" }}>Projects</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span style={{ color: "#9CA3AF" }} className="truncate max-w-xs">{project.title}</span>
                    </div>

                    {/* Hero card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="rounded-2xl p-8 mb-8 border" style={{ background: "#111827", borderColor: "#1F2937" }}>
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: "#A4DA65" }}>
                                    {project.category}
                                </span>
                                <h1 className="font-display font-black text-3xl md:text-4xl mb-2" style={{ color: "#F9FAFB" }}>
                                    {project.title}
                                </h1>
                                <p className="text-lg" style={{ color: "#9CA3AF" }}>{project.tagline}</p>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                                        <Github className="w-4 h-4" /> Source Code
                                    </a>
                                )}
                                {project.demo && (
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                                        <ExternalLink className="w-4 h-4" /> Open Demo
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs" style={{ color: "#4B5563" }}>
                            <Calendar className="w-3 h-3" />
                            {formatDate(project.date)}
                        </div>
                    </motion.div>

                    {/* Metrics */}
                    <div className="mb-8">
                        <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2" style={{ color: "#F9FAFB" }}>
                            <BarChart2 className="w-5 h-5" style={{ color: "#A4DA65" }} /> Performance Metrics
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {project.metrics.map((m) => {
                                const s = mc(m.color);
                                return (
                                    <motion.div key={m.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                        className="rounded-xl p-4 text-center border"
                                        style={{ background: s.bg, borderColor: s.border }}>
                                        <div className="text-2xl font-bold font-display" style={{ color: s.color }}>{m.value}</div>
                                        <div className="text-xs mt-1" style={{ color: "#6B7280" }}>{m.label}</div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tabs */}
                    {tabs.length > 1 && (
                        <div className="flex gap-1 mb-6 p-1 rounded-xl border" style={{ background: "#0D0D0F", borderColor: "#1F2937" }}>
                            {tabs.map(({ id, label, icon: Icon }) => (
                                <button key={id} onClick={() => setActiveTab(id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={activeTab === id
                                        ? { background: "#1F2937", color: "#A4DA65", border: "1px solid rgba(164,218,101,0.25)" }
                                        : { color: "#4B5563" }}>
                                    <Icon className="w-4 h-4" /> {label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Overview */}
                    {activeTab === "overview" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
                            {[
                                { title: "🎯 Problem Statement", body: project.problemStatement },
                                { title: "📋 Overview", body: project.longDescription },
                            ].map(({ title, body }) => (
                                <div key={title} className="rounded-2xl p-6 border" style={{ background: "#111827", borderColor: "#1F2937" }}>
                                    <h2 className="font-display font-bold text-lg mb-3" style={{ color: "#F9FAFB" }}>{title}</h2>
                                    <p className="leading-relaxed" style={{ color: "#9CA3AF" }}>{body}</p>
                                </div>
                            ))}
                            {project.mathModel && (
                                <div className="rounded-2xl p-6 border" style={{ background: "#111827", borderColor: "rgba(164,218,101,0.15)" }}>
                                    <h2 className="font-display font-bold text-lg mb-3" style={{ color: "#F9FAFB" }}>📐 Mathematical Model</h2>
                                    <div className="rounded-xl p-4 border overflow-x-auto font-mono text-sm"
                                        style={{ background: "#0D0D0F", borderColor: "#1F2937", color: "#A4DA65" }}>
                                        {project.mathModel}
                                    </div>
                                </div>
                            )}
                            <div className="rounded-2xl p-6 border" style={{ background: "#111827", borderColor: "#1F2937" }}>
                                <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2" style={{ color: "#F9FAFB" }}>
                                    <Cpu className="w-5 h-5" style={{ color: "#A4DA65" }} /> System Architecture
                                </h2>
                                <div className="rounded-xl p-4 border" style={{ background: "#0D0D0F", borderColor: "#1F2937" }}>
                                    <p className="text-sm font-mono leading-relaxed" style={{ color: "#9CA3AF" }}>{project.architecture}</p>
                                </div>
                            </div>
                            <div className="rounded-2xl p-6 border" style={{ background: "#111827", borderColor: "#1F2937" }}>
                                <h2 className="font-display font-bold text-lg mb-4" style={{ color: "#F9FAFB" }}>🛠️ Tech Stack</h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="px-3 py-1.5 rounded-lg text-sm font-medium border"
                                            style={{ background: "#1F2937", color: "#D1D5DB", borderColor: "#374151" }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Source Code */}
                    {activeTab === "code" && project.codeSnippet && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#1F2937" }}>
                                <div className="flex items-center justify-between px-5 py-3 border-b"
                                    style={{ background: "#111827", borderColor: "#1F2937" }}>
                                    <div className="flex items-center gap-2 text-sm" style={{ color: "#6B7280" }}>
                                        <Code2 className="w-4 h-4" style={{ color: "#A4DA65" }} />
                                        Core Implementation
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs transition-colors"
                                            style={{ color: copied ? "#A4DA65" : "#4B5563" }}>
                                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                            {copied ? "Copied!" : "Copy"}
                                        </button>
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-xs hover:underline" style={{ color: "#A4DA65" }}>
                                                <Github className="w-3.5 h-3.5" /> Full Repo
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <pre className="p-6 overflow-x-auto text-sm leading-relaxed" style={{ background: "#0D0D0F" }}>
                                    <code className="font-mono whitespace-pre" style={{ color: "#D1FAE5" }}>{project.codeSnippet}</code>
                                </pre>
                            </div>
                            <div className="mt-6 rounded-2xl p-6 border flex flex-col sm:flex-row items-center justify-between gap-4"
                                style={{ background: "#111827", borderColor: "#1F2937" }}>
                                <div>
                                    <p className="text-base font-semibold mb-1" style={{ color: "#F9FAFB" }}>Explore the Full Repository</p>
                                    <p className="text-sm" style={{ color: "#6B7280" }}>Complete source code, setup, and documentation.</p>
                                </div>
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                                        className="btn-secondary whitespace-nowrap text-sm flex items-center gap-2">
                                        <Github className="w-4 h-4" /> View on GitHub
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

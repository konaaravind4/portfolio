"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/lib/projects";
import { ExternalLink, Github, X, Sword, ChevronRight } from "lucide-react";
import { ProjectCardBg } from "@/components/ProjectCardBg";

export default function ProjectCard({ project }: { project: Project }) {
    const [showArchitecture, setShowArchitecture] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="cursor-target flex flex-col gap-4 group relative overflow-hidden h-full corner-ornament"
                style={{
                    background: "rgba(16, 14, 10, 0.75)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    backdropFilter: "blur(12px)",
                    clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                    padding: "1.5rem",
                    transition: "all 0.4s ease",
                }}
                whileHover={{
                    scale: 1.02,
                    filter: "brightness(1.08)",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.45)";
                    e.currentTarget.style.boxShadow = "0 8px 48px rgba(0,0,0,0.7), 0 0 30px rgba(201,168,76,0.12), inset 0 1px 0 rgba(201,168,76,0.1)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            >
                {/* Top gold accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(90deg, transparent, var(--gold-primary), var(--crimson), var(--gold-primary), transparent)" }} />

                {/* Bottom ornament line */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-50"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }} />

                {/* Project-specific animated background */}
                <ProjectCardBg slug={project.slug} />

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <span className="text-xs font-medium uppercase tracking-widest mb-1 block"
                            style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'JetBrains Mono', monospace" }}>
                            {project.category}
                        </span>
                        <h3 className="font-bold text-lg leading-snug transition-colors duration-200"
                            style={{
                                color: "var(--text-primary)",
                                fontFamily: "'Cinzel', serif",
                                textShadow: "0 0 20px rgba(201,168,76,0)"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = "var(--gold-light)";
                                e.currentTarget.style.textShadow = "0 0 12px rgba(201,168,76,0.4)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = "var(--text-primary)";
                                e.currentTarget.style.textShadow = "0 0 20px rgba(201,168,76,0)";
                            }}>
                            {project.title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 mt-1">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="p-2 border transition-all duration-200"
                                style={{
                                    color: "var(--text-muted)",
                                    borderColor: "rgba(201,168,76,0.15)",
                                    background: "transparent",
                                    clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))"
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)"; }}
                                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)"; }}
                                title="Source Code">
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                className="p-2 border transition-all duration-200"
                                style={{
                                    color: "var(--text-muted)",
                                    borderColor: "rgba(201,168,76,0.15)",
                                    background: "transparent",
                                    clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))"
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = "var(--gold-primary)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; }}
                                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)"; }}
                                title="Live Demo">
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "'Inter', sans-serif" }}>
                    {project.tagline}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                    {project.metrics.map((m) => (
                        <div key={m.label} className="text-center py-2 px-3"
                            style={{
                                background: "rgba(201,168,76,0.04)",
                                border: "1px solid rgba(201,168,76,0.12)",
                                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))"
                            }}>
                            <div className="text-xl font-bold gradient-text" style={{ fontFamily: "'Cinzel', serif" }}>
                                {m.value}
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                                {m.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 5).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-xs font-medium"
                            style={{
                                background: "rgba(201,168,76,0.05)",
                                color: "var(--text-muted)",
                                border: "1px solid rgba(201,168,76,0.12)",
                                fontFamily: "'JetBrains Mono', monospace",
                                clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))"
                            }}>
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 5 && (
                        <span className="px-2 py-0.5 text-xs font-medium"
                            style={{
                                background: "rgba(139,0,0,0.08)",
                                color: "rgba(139,0,0,0.8)",
                                border: "1px solid rgba(139,0,0,0.2)",
                                fontFamily: "'JetBrains Mono', monospace"
                            }}>
                            +{project.techStack.length - 5}
                        </span>
                    )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 mt-auto"
                    style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                    <button onClick={() => setShowArchitecture(true)}
                        className="flex items-center gap-1.5 text-xs transition-all duration-200 group/btn cursor-target"
                        style={{ color: "var(--text-muted)", fontFamily: "'Cinzel', serif", letterSpacing: "0.04em" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-primary)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                        <Sword className="w-3.5 h-3.5" />
                        Schematics
                        <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                    {/* If demo URL exists → open it directly; otherwise link to detail page */}
                    {project.demo ? (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 cursor-target"
                            style={{ color: "var(--gold-primary)", fontFamily: "'Cinzel', serif" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-bright)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--gold-primary)")}>
                            ⚡ Invoke Live
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    ) : (
                        <a href={`/projects/${project.slug}`}
                            className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 cursor-target"
                            style={{ color: "var(--gold-primary)", fontFamily: "'Cinzel', serif" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-bright)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--gold-primary)")}>
                            Full Details
                            <ChevronRight className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </motion.div>

            {/* ── Architecture Modal ── */}
            <AnimatePresence>
                {showArchitecture && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowArchitecture(false)}>
                        <div className="absolute inset-0 backdrop-blur-md" style={{ background: "rgba(5,5,7,0.92)" }} />
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 30, rotateX: "5deg" }}
                            animate={{ scale: 1, opacity: 1, y: 0, rotateX: "0deg" }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="relative max-w-2xl w-full z-10 corner-ornament"
                            style={{
                                background: "rgba(16, 14, 10, 0.95)",
                                border: "1px solid rgba(201,168,76,0.35)",
                                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                                padding: "2rem",
                                backdropFilter: "blur(20px)",
                                boxShadow: "0 0 60px rgba(201,168,76,0.15), 0 20px 80px rgba(0,0,0,0.8)"
                            }}
                            onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setShowArchitecture(false)}
                                className="absolute top-4 right-4 p-2 border transition-all cursor-target"
                                style={{
                                    color: "var(--text-muted)",
                                    borderColor: "rgba(201,168,76,0.2)",
                                    clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))"
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = "var(--gold-primary)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; }}
                                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; }}>
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-2 mb-4">
                                <Sword className="w-5 h-5" style={{ color: "var(--gold-primary)" }} />
                                <h3 className="font-bold text-lg gradient-text text-glow-gold"
                                    style={{ fontFamily: "'Cinzel', serif" }}>
                                    System Architecture
                                </h3>
                            </div>

                            <pre className="text-sm font-mono leading-relaxed rounded-none p-4 overflow-x-auto"
                                style={{
                                    color: "var(--gold-primary)",
                                    background: "rgba(5,5,3,0.8)",
                                    border: "1px solid rgba(201,168,76,0.15)",
                                    whiteSpace: "pre-wrap"
                                }}>
                                {project.architecture}
                            </pre>

                            <div className="mt-4">
                                <div className="text-xs font-semibold uppercase tracking-widest mb-2"
                                    style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                                    Problem Statement
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                    {project.problemStatement}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

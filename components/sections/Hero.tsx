"use client";

import { motion } from "framer-motion";
import { Github, FileText, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import WordReveal from "@/components/ui/WordReveal";
import MathDoodle from "@/components/ui/MathDoodle";

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal-up');
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('in-view');
            }),
            { threshold: 0.15 }
        );
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

const STATS = [
    { label: "AI Projects", value: "7+" },
    { label: "Certifications", value: "3" },
    { label: "BLEU Score", value: "34.7" },
    { label: "GPA", value: "6.8/10" },
];

export default function Hero() {
    useReveal();

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ paddingTop: "80px" }}
        >
            {/* Math doodles in margins */}
            <MathDoodle count={10} />

            {/* Left hole punches */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-12 z-[60] pointer-events-none" aria-hidden="true">
                <div className="hole-punch" />
                <div className="hole-punch" />
                <div className="hole-punch" />
            </div>

            {/* Page label */}
            <div className="absolute top-20 right-6 page-label z-10">
                Page 1
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center px-6 sm:px-10 max-w-4xl mx-auto w-full">

                {/* Notebook cover box */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="notebook-page relative p-8 sm:p-12 mb-8 mx-auto max-w-3xl"
                    style={{
                        border: "2px solid rgba(30,27,75,0.18)",
                        boxShadow: "4px 6px 24px rgba(30,27,75,0.08), inset 0 0 0 6px rgba(184,212,232,0.12)",
                    }}
                >
                    {/* Corner annotation */}
                    <span className="ink-annotation" style={{ top: "10px", left: "10px", fontSize: "0.7rem", opacity: 0.6 }}>
                        ★ intro
                    </span>

                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 mb-6"
                        style={{
                            fontFamily: "'Patrick Hand', cursive",
                            fontSize: "0.85rem",
                            color: "var(--pencil)",
                        }}
                    >
                        <span
                            className="animate-pulse-dot"
                            style={{
                                width: "8px", height: "8px", borderRadius: "50%",
                                background: "#22c55e", display: "inline-block",
                                flexShrink: 0,
                            }}
                        />
                        AI Engineer @ GJUST · OCI Certified Data Scientist
                    </motion.div>

                    {/* Name — big Caveat */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.9 }}
                        style={{
                            fontFamily: "'Caveat', cursive",
                            fontWeight: 700,
                            fontSize: "clamp(3.5rem, 10vw, 6rem)",
                            color: "var(--ink)",
                            lineHeight: 1.0,
                            marginBottom: "0.25rem",
                        }}
                    >
                        Kona Aravind
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        style={{
                            fontFamily: "'Kalam', cursive",
                            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                            color: "var(--ink-faded)",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <span className="handwritten-underline">AI Engineer</span>
                        {" & "}
                        <span className="handwritten-underline">ML Researcher</span>
                    </motion.p>

                    {/* Role chips — underlined text style */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mb-6"
                        style={{ fontFamily: "'Caveat', cursive", fontSize: "1rem", color: "var(--pencil)" }}
                    >
                        <span>Quant Enthusiast</span>
                        <span style={{ color: "var(--margin-red)" }}>·</span>
                        <span>Multi-Agent Builder</span>
                        <span style={{ color: "var(--margin-red)" }}>·</span>
                        <span>Diffusion Models</span>
                    </motion.div>

                    {/* Bio paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65 }}
                        className="max-w-xl mx-auto mb-8"
                        style={{
                            fontFamily: "'Kalam', cursive",
                            fontSize: "1rem",
                            lineHeight: 1.75,
                            color: "var(--ink)",
                        }}
                    >
                        <WordReveal
                            text="Building intelligent systems at the intersection of LLMs, multi-agent architectures, and real-time ML pipelines. CS(AI) @ GJUST · Oracle OCI Certified · Google A2A Trained."
                            className="inline"
                            as="span"
                        />
                    </motion.p>

                    {/* Stats — notebook table style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-4 gap-0 mb-8 mx-auto max-w-sm"
                        style={{
                            border: "1.5px solid rgba(184,212,232,0.7)",
                            borderRadius: "3px",
                            overflow: "hidden",
                        }}
                    >
                        {STATS.map(({ label, value }, i) => (
                            <div
                                key={label}
                                style={{
                                    borderRight: i < 3 ? "1px solid rgba(184,212,232,0.7)" : "none",
                                    padding: "0.6rem 0.4rem",
                                    textAlign: "center",
                                    background: i % 2 === 0 ? "rgba(184,212,232,0.08)" : "transparent",
                                }}
                            >
                                <div style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontWeight: 700,
                                    fontSize: "1.5rem",
                                    color: "var(--ink)",
                                    lineHeight: 1,
                                }}>
                                    {value}
                                </div>
                                <div style={{
                                    fontFamily: "'Patrick Hand', cursive",
                                    fontSize: "0.62rem",
                                    color: "var(--pencil)",
                                    marginTop: "2px",
                                }}>
                                    {label}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3"
                    >
                        <Link href="/#projects" className="btn-hand-primary">
                            → see my work
                        </Link>
                        <a
                            href="https://github.com/konaaravind4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-hand"
                        >
                            <Github className="w-4 h-4" /> GitHub
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-hand"
                        >
                            <FileText className="w-4 h-4" /> Resume
                        </a>
                    </motion.div>

                    {/* Hand-drawn border decoration — inner box corners */}
                    <svg
                        className="absolute pointer-events-none"
                        style={{ top: 8, left: 8, width: 30, height: 30 }}
                        viewBox="0 0 30 30"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path d="M2 15 L2 2 L15 2" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                    </svg>
                    <svg
                        className="absolute pointer-events-none"
                        style={{ bottom: 8, right: 8, width: 30, height: 30 }}
                        viewBox="0 0 30 30"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path d="M28 15 L28 28 L15 28" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                    </svg>
                </motion.div>

                {/* Arrow annotation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col items-center gap-1"
                    style={{ fontFamily: "'Caveat', cursive", color: "var(--pencil)", fontSize: "0.9rem" }}
                >
                    <span>↓ see my work ↓</span>
                    <motion.div
                        animate={{ y: [0, 7, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-5 h-5" style={{ color: "var(--margin-red)" }} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

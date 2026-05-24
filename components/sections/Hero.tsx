"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Sparkles, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const TICKER_TEXT = "AI Engineer · ML Researcher · Quant Enthusiast · Multi-Agent Builder · ";

// Scroll-reveal via Intersection Observer
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

export default function Hero() {
    useReveal();

    return (
        <section id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "transparent" }}>

            {/* ── Subtle background glow ── */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(173,248,2,0.04) 0%, transparent 70%)"
            }} />

            {/* ── Stone texture grid ── */}
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* ── Floating accent orbs (anti-gravity) ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {[
                    { size: 200, top: "15%", left: "8%", duration: 8, delay: 0, color: "rgba(173,248,2,0.06)" },
                    { size: 120, top: "25%", right: "12%", duration: 10, delay: 2, color: "rgba(173,248,2,0.04)" },
                    { size: 80, top: "60%", left: "5%", duration: 6, delay: 1, color: "rgba(173,248,2,0.05)" },
                    { size: 160, bottom: "20%", right: "8%", duration: 12, delay: 3, color: "rgba(173,248,2,0.03)" },
                    { size: 60, top: "40%", left: "20%", duration: 7, delay: 4, color: "rgba(173,248,2,0.05)" },
                ].map((orb, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: "absolute",
                            width: orb.size,
                            height: orb.size,
                            borderRadius: "50%",
                            background: orb.color,
                            filter: "blur(40px)",
                            top: orb.top,
                            left: (orb as any).left,
                            right: (orb as any).right,
                            bottom: (orb as any).bottom,
                        }}
                        animate={{
                            y: [0, -30, -15, -35, 0],
                            x: [0, 10, -5, 8, 0],
                            scale: [1, 1.08, 0.95, 1.05, 1],
                        }}
                        transition={{
                            duration: orb.duration,
                            delay: orb.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* ── Marquee ticker ── */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-center overflow-hidden select-none" aria-hidden="true">
                <div className="whitespace-nowrap w-full mb-6 overflow-hidden">
                    <span className="animate-marquee-left inline-block font-black uppercase"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: "clamp(3rem, 8vw, 7rem)",
                            WebkitTextStroke: "1.5px rgba(0,0,0,0.06)",
                            color: "transparent",
                            letterSpacing: "0.1em"
                        }}>
                        {TICKER_TEXT}{TICKER_TEXT}
                    </span>
                </div>
                <div className="whitespace-nowrap w-full overflow-hidden">
                    <span className="animate-marquee-right inline-block font-black uppercase"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: "clamp(3rem, 8vw, 7rem)",
                            WebkitTextStroke: "1px rgba(173,248,2,0.08)",
                            color: "transparent",
                            letterSpacing: "0.1em"
                        }}>
                        {TICKER_TEXT}{TICKER_TEXT}
                    </span>
                </div>
            </div>

            {/* ── Bottom fade ── */}
            <div className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(255,255,255,1), transparent)" }} />

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="inline-flex items-center gap-2 mb-8 px-4 py-2 text-xs font-semibold corner-ornament cursor-target"
                    style={{
                        background: "rgba(173,248,2,0.08)",
                        border: "1px solid rgba(173,248,2,0.3)",
                        color: "#0A0A0A",
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.08em",
                        clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
                    }}>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--gold-primary)" }} />
                    AI Engineer @ GJUST · OCI Certified Data Scientist
                    <span className="w-1.5 h-1.5 rounded-full ml-1 animate-pulse-warm" style={{ background: "var(--gold-primary)" }} />
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.3, duration: 1.0 }}
                    className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4 cursor-target animate-levitate"
                    style={{ fontFamily: "'Cinzel', serif" }}>
                    <span style={{ color: "#0A0A0A" }}>Kona</span>{" "}
                    <span className="gradient-text-shimmer">Aravind</span>
                </motion.h1>

                {/* Role pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base sm:text-lg font-semibold mb-6"
                    style={{ fontFamily: "'Cinzel', serif" }}>
                    <span style={{ color: "#0A0A0A" }}>AI Engineer</span>
                    <span style={{ color: "var(--gold-primary)" }}>·</span>
                    <span style={{ color: "#0A0A0A" }}>ML Researcher</span>
                    <span style={{ color: "var(--gold-primary)" }}>·</span>
                    <span style={{ color: "var(--text-secondary)" }}>Quant Enthusiast</span>
                </motion.div>

                {/* Bio */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
                    style={{ color: "var(--text-secondary)", fontFamily: "'Inter', sans-serif" }}>
                    Building intelligent systems at the intersection of LLMs, multi-agent architectures, and real-time ML pipelines.
                    CS(AI) @ GJUST · Oracle OCI Certified · Google A2A Trained.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                    <Link href="/#projects" className="btn-primary text-base cursor-target shake-on-click">
                        <ChevronRight className="w-4 h-4" /> View My Work
                    </Link>
                    <Link href="/blog" className="btn-secondary text-base cursor-target">
                        <Sparkles className="w-4 h-4" /> Read Blog
                    </Link>
                    <a href="https://github.com/konaaravind4" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border transition-all duration-300 cursor-target nav-link-brush"
                        style={{
                            borderColor: "rgba(0,0,0,0.1)",
                            color: "var(--text-secondary)",
                            background: "transparent",
                            clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
                        }}>
                        <Github className="w-4 h-4" /> GitHub
                    </a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border transition-all duration-300 cursor-target"
                        style={{
                            borderColor: "rgba(173,248,2,0.4)",
                            color: "#0A0A0A",
                            background: "rgba(173,248,2,0.06)",
                            clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
                        }}>
                        <FileText className="w-4 h-4" /> Resume
                    </a>
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }}
                    className="w-full max-w-sm mx-auto mb-6"
                    style={{ transformOrigin: "left" }}>
                    <div className="flex justify-between mb-1">
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.12em" }}>SKILL LEVEL</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--text-faint)", letterSpacing: "0.08em" }}>∞ / ∞</span>
                    </div>
                    <div className="boss-health-bar" style={{ "--health": "88%" } as React.CSSProperties} />
                </motion.div>

                {/* Stats — floating cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-6">
                    {[
                        { label: "AI Projects", value: "7+" },
                        { label: "Certifications", value: "3" },
                        { label: "BLEU Score", value: "34.7" },
                        { label: "GPA", value: "6.8/10" },
                    ].map(({ label, value }, i) => (
                        <motion.div
                            key={label}
                            className="text-center px-6 py-3 gold-trim cursor-target"
                            style={{
                                background: "rgba(255,255,255,0.9)",
                                backdropFilter: "blur(12px)",
                                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
                            }}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
                            <div className="text-2xl font-bold gradient-text"
                                style={{ fontFamily: "'Cinzel', serif" }}>{value}</div>
                            <div className="text-xs mt-0.5 tracking-widest uppercase"
                                style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                style={{ color: "var(--text-muted)" }}>
                <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
                    <ArrowDown className="w-4 h-4" />
                </motion.div>
            </motion.div>
        </section>
    );
}

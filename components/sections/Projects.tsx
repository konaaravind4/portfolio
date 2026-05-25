"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { FlameKindling, ArrowRight } from "lucide-react";
import TextType from "@/components/TextType";

export default function Projects() {
    return (
        <section id="projects" className="py-28 relative" style={{ background: "transparent" }}>
            {/* Subtle accent glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(173,248,2,0.03) 0%, transparent 60%)" }} />
            <div className="absolute inset-0 grid-bg opacity-20" />

            {/* Section top ornament */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(173,248,2,0.3), transparent)" }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-semibold"
                        style={{
                            background: "rgba(173,248,2,0.08)",
                            border: "1px solid rgba(173,248,2,0.25)",
                            color: "#0A0A0A",
                            fontFamily: "'JetBrains Mono', monospace",
                            clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
                        }}>
                        <FlameKindling className="w-3.5 h-3.5" style={{ color: "var(--gold-primary)" }} />
                        Featured Projects
                    </div>

                    <h2 className="section-heading mb-4">
                        <TextType
                            as="span"
                            text="Systems I've Built"
                            typingSpeed={55}
                            initialDelay={200}
                            loop={false}
                            showCursor={false}
                            startOnVisible
                        />
                    </h2>
                    <div className="section-divider max-w-xs mx-auto" />
                    <p className="max-w-xl mx-auto text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)", fontFamily: "'Inter', sans-serif" }}>
                        <TextType
                            as="span"
                            text="Production-grade ML pipelines, multi-agent architectures, and generative AI systems — built with real-world performance benchmarks."
                            typingSpeed={22}
                            initialDelay={1000}
                            loop={false}
                            showCursor
                            cursorCharacter="▋"
                            cursorClassName=""
                            hideCursorWhileTyping={false}
                            startOnVisible
                            style={{ color: "var(--text-muted)" }}
                        />
                    </p>
                </motion.div>

                {/* Project cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <motion.div key={project.slug}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: i * 0.12 }}
                            // Anti-gravity float stagger
                            animate={{ y: [0, -(6 + i * 2), 0] }}
                            style={{ animationDuration: `${5 + i * 0.5}s`, animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>

                {/* View all */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12">
                    <a href="https://github.com/konaaravind4" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm transition-all duration-300 group nav-link-brush"
                        style={{ color: "var(--text-muted)", fontFamily: "'Bricolage Grotesque', sans-serif", letterSpacing: "0.05em" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                        Explore All Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

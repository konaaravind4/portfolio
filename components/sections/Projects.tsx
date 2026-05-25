"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import TechSticker from "@/components/ui/TechSticker";
import MathDoodle from "@/components/ui/MathDoodle";
import { Github, ExternalLink } from "lucide-react";

const TECH_COLORS: Record<string, string> = {
    "Python":           "#fbbf24",
    "PyTorch":          "#f97316",
    "HuggingFace":      "#f59e0b",
    "HuggingFace Transformers": "#f59e0b",
    "LangChain":        "#10b981",
    "Docker":           "#0ea5e9",
    "FastAPI":          "#14b8a6",
    "PostgreSQL":       "#3b82f6",
    "SQLAlchemy":       "#3b82f6",
    "React":            "#06b6d4",
    "Next.js":          "#06b6d4",
    "Redis":            "#ef4444",
    "Kafka":            "#8b5cf6",
    "Apache Kafka":     "#8b5cf6",
    "Apache Flink":     "#f97316",
    "A2A Systems":      "#10b981",
    "Google Gemini":    "#06b6d4",
    "Gemini":           "#06b6d4",
    "Google ADK":       "#06b6d4",
    "GitHub API":       "#1e1b4b",
    "FAISS":            "#10b981",
    "GraphRAG":         "#10b981",
    "Neo4j":            "#10b981",
    "LlamaIndex":       "#fbbf24",
    "OpenAI":           "#10b981",
    "Diffusers":        "#f59e0b",
    "Stable Diffusion 3.5": "#f59e0b",
    "CLIP":             "#f59e0b",
    "Hugging Face":     "#f59e0b",
    "mT5":              "#f97316",
    "SentencePiece":    "#84cc16",
    "NLTK":             "#84cc16",
    "Pandas":           "#0ea5e9",
    "Plotly":           "#8b5cf6",
    "Streamlit":        "#ef4444",
    "WebSocket":        "#06b6d4",
    "Recharts":         "#06b6d4",
    "Tailwind":         "#06b6d4",
    "Flask":            "#84cc16",
    "WandB":            "#f97316",
    "Transformers":     "#f59e0b",
    "xFormers":         "#f59e0b",
    "CUDA":             "#84cc16",
    "WhatsApp Business API": "#10b981",
    "default":          "#84cc16",
};

const PROJECT_MATH: Record<string, string> = {
    "nepali-english-neural-translator":    "BLEU = BP·exp(Σwₙlog pₙ)",
    "whatsapp-appointment-bot":            "P(slot|ctx) = softmax(Wh + b)",
    "stable-diffusion-image-pipeline":     "xₜ₋₁ = (1/√αₜ)(xₜ - β̃ₜ·ε_θ) + σₜz",
    "rag-graphrag-knowledge-engine":       "score(q,d) = λ·cos(q,d) + (1-λ)·PageRank(d)",
    "ai-sql-data-analyst":                 "P(SQL|NL, schema) ∝ LLM(prompt)",
    "realtime-sentiment-dashboard":        "ŷ = softmax(W·RoBERTa(x) + b)",
    "agentic-code-reviewer":               "P(bug|code) = Π P(bugᵢ|contextᵢ)",
};

const CATEGORY_COLORS: Record<string, string> = {
    "NLP":              "#3b82f6",
    "Multi-Agent":      "#10b981",
    "Generative AI":    "#f59e0b",
    "LLM Engineering":  "#8b5cf6",
    "Data Intelligence":"#06b6d4",
    "Real-time ML":     "#ef4444",
    "DevOps AI":        "#f97316",
    "default":          "#84cc16",
};

function getColor(name: string): string {
    return TECH_COLORS[name] ?? TECH_COLORS["default"];
}

function ProjectEntry({ project, pageNum }: { project: typeof projects[0]; pageNum: number }) {
    const math = PROJECT_MATH[project.slug];
    const catColor = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS["default"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="relative"
        >
            {/* Horizontal rule divider */}
            <div
                style={{
                    height: "1px",
                    background: "var(--line-blue)",
                    margin: "0 0 2rem 0",
                }}
            />

            {/* Page label */}
            <div
                className="absolute top-0 right-0 page-label"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
                Page {pageNum}
            </div>

            <div className="flex gap-6">
                {/* Margin note — category */}
                <div className="hidden sm:flex flex-col items-center flex-shrink-0 w-8 pt-1">
                    <span
                        className="margin-note"
                        style={{ color: catColor, fontSize: "0.7rem" }}
                    >
                        {project.category}
                    </span>
                </div>

                {/* Project body */}
                <div className="flex-1 min-w-0 pb-8">
                    {/* Title */}
                    <h3
                        style={{
                            fontFamily: "'Caveat', cursive",
                            fontWeight: 700,
                            fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
                            color: "var(--ink)",
                            marginBottom: "0.25rem",
                            lineHeight: 1.1,
                        }}
                    >
                        <span className="handwritten-underline">{project.title}</span>
                    </h3>

                    {/* Tagline */}
                    <p
                        style={{
                            fontFamily: "'Patrick Hand', cursive",
                            fontSize: "0.9rem",
                            color: "var(--pencil)",
                            marginBottom: "1rem",
                            fontStyle: "italic",
                        }}
                    >
                        → {project.tagline}
                    </p>

                    {/* Problem statement blockquote */}
                    <blockquote className="nb-blockquote mb-4">
                        {project.problemStatement}
                    </blockquote>

                    {/* Description */}
                    <p
                        style={{
                            fontFamily: "'Kalam', cursive",
                            fontSize: "0.95rem",
                            color: "var(--ink)",
                            lineHeight: 1.75,
                            marginBottom: "1rem",
                        }}
                    >
                        {project.description}
                    </p>

                    {/* Architecture flow */}
                    <p
                        style={{
                            fontFamily: "'Patrick Hand', cursive",
                            fontSize: "0.85rem",
                            color: "var(--pencil)",
                            marginBottom: "1rem",
                            background: "rgba(184,212,232,0.15)",
                            borderRadius: "3px",
                            padding: "0.4rem 0.75rem",
                            borderLeft: "3px solid var(--line-blue)",
                        }}
                    >
                        <span style={{ color: "var(--ink)", fontWeight: 700 }}>arch:</span>{" "}
                        {project.architecture}
                    </p>

                    {/* Metrics table */}
                    {project.metrics.length > 0 && (
                        <div style={{ marginBottom: "1rem", overflowX: "auto" }}>
                            <table className="nb-metrics-table">
                                <thead>
                                    <tr>
                                        {project.metrics.map(m => (
                                            <th key={m.label}>{m.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {project.metrics.map(m => (
                                            <td
                                                key={m.label}
                                                style={{
                                                    fontFamily: "'Caveat', cursive",
                                                    fontWeight: 700,
                                                    fontSize: "1rem",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {m.value}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Math model */}
                    {math && (
                        <p
                            style={{
                                fontFamily: "'Kalam', cursive",
                                fontSize: "0.82rem",
                                color: "var(--pencil)",
                                marginBottom: "1rem",
                                opacity: 0.75,
                                fontStyle: "italic",
                            }}
                        >
                            ∫ <em>{math}</em>
                        </p>
                    )}

                    {/* Tech stickers */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech, i) => (
                            <TechSticker
                                key={tech}
                                name={tech}
                                color={getColor(tech)}
                                rotation={[-4, 3, -2, 5, -3, 2][i % 6]}
                                size="sm"
                            />
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-hand"
                                style={{ fontSize: "0.9rem", padding: "0.3rem 0.85rem" }}
                            >
                                <Github className="w-3.5 h-3.5" /> GitHub →
                            </a>
                        )}
                        {project.demo && project.demoType !== "github" && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-hand"
                                style={{ fontSize: "0.9rem", padding: "0.3rem 0.85rem" }}
                            >
                                <ExternalLink className="w-3.5 h-3.5" /> Live Demo →
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="py-16 relative" style={{ background: "transparent" }}>
            <MathDoodle count={5} />

            <div className="max-w-5xl mx-auto px-4 sm:px-8 pl-16 sm:pl-24">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <h2
                        className="section-heading inline-block"
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        Systems I&apos;ve Built 🛠️
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Kalam', cursive",
                            color: "var(--pencil)",
                            fontSize: "0.95rem",
                            fontStyle: "italic",
                            marginTop: "0.25rem",
                        }}
                    >
                        (production-grade ML, multi-agent, and generative AI systems)
                    </p>
                </motion.div>

                {/* Project entries */}
                <div className="space-y-4">
                    {projects.map((project, i) => (
                        <ProjectEntry key={project.slug} project={project} pageNum={3 + i} />
                    ))}
                </div>

                {/* View all */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-center"
                >
                    <a
                        href="https://github.com/konaaravind4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-hand"
                        style={{ fontFamily: "'Caveat', cursive", fontSize: "1rem" }}
                    >
                        → Explore all on GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

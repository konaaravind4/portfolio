"use client";

import { motion } from "framer-motion";
import TechSticker from "@/components/ui/TechSticker";
import MathDoodle from "@/components/ui/MathDoodle";

const ROTATIONS = [-6, 4, -3, 7, -5, 3, -8, 6, -4, 5, -7, 3, -2, 8, -5, 4, -6, 2, -3, 7, -4, 5, -8, 3, -6, 4, -2, 7, -5, 6];

const SKILL_COLORS: Record<string, string> = {
    "Python":           "#fbbf24",
    "PyTorch":          "#f97316",
    "HuggingFace":      "#f59e0b",
    "LangChain":        "#10b981",
    "Docker":           "#0ea5e9",
    "FastAPI":          "#14b8a6",
    "SQL / PostgreSQL": "#3b82f6",
    "React/Next.js":    "#06b6d4",
    "Redis":            "#ef4444",
    "Kafka":            "#8b5cf6",
    "Apache Flink":     "#f97316",
    "A2A Systems":      "#10b981",
    "Gemini API":       "#06b6d4",
    "Tableau":          "#3b82f6",
    "TFX / MLOps":      "#8b5cf6",
    "MCP Protocol":     "#14b8a6",
    "Diffusion Models": "#f59e0b",
    "RAG / GraphRAG":   "#10b981",
    "NumPy":            "#0ea5e9",
    "Pandas":           "#3b82f6",
    "Scikit-learn":     "#f97316",
    "Keras / TF":       "#ef4444",
    "OpenCV":           "#06b6d4",
    "PySpark":          "#f59e0b",
    "MongoDB":          "#10b981",
    "AWS":              "#f97316",
    "Git":              "#f97316",
    "LlamaIndex":       "#fbbf24",
    "Streamlit":        "#ef4444",
    "Plotly":           "#8b5cf6",
    "Jupyter":          "#f59e0b",
    "Probability & Stats": "#3b82f6",
    "default":          "#84cc16",
};

const skills = [
    { name: "Python",           emoji: "🐍" },
    { name: "PyTorch",          emoji: "🔥" },
    { name: "LangChain",        emoji: "🔗" },
    { name: "RAG / GraphRAG",   emoji: "🧠" },
    { name: "HuggingFace",      emoji: "🤗" },
    { name: "Apache Flink",     emoji: "⚡" },
    { name: "FastAPI",          emoji: "🚀" },
    { name: "SQL / PostgreSQL", emoji: "🗄️" },
    { name: "A2A Systems",      emoji: "🤖" },
    { name: "Gemini API",       emoji: "✨" },
    { name: "Tableau",          emoji: "📊" },
    { name: "TFX / MLOps",     emoji: "⚙️" },
    { name: "Docker",           emoji: "🐳" },
    { name: "MCP Protocol",     emoji: "🌐" },
    { name: "Diffusion Models", emoji: "🎨" },
    { name: "Probability & Stats", emoji: "📈" },
    { name: "NumPy",            emoji: "🔢" },
    { name: "Pandas",           emoji: "🐼" },
    { name: "Scikit-learn",     emoji: "🤖" },
    { name: "Keras / TF",       emoji: "🧬" },
    { name: "OpenCV",           emoji: "👁️" },
    { name: "PySpark",          emoji: "🌩️" },
    { name: "Kafka",            emoji: "📨" },
    { name: "MongoDB",          emoji: "🍃" },
    { name: "AWS",              emoji: "☁️" },
    { name: "Git",              emoji: "🌿" },
    { name: "LlamaIndex",       emoji: "🦙" },
    { name: "Streamlit",        emoji: "🖥️" },
    { name: "Plotly",           emoji: "📉" },
    { name: "Jupyter",          emoji: "📓" },
];

const certs = [
    { name: "OCI Data Science Professional", issuer: "Oracle", date: "Oct 2025", emoji: "🏆" },
    { name: "CRM Certification",             issuer: "Upskill",date: "Oct 2025", emoji: "📜" },
    { name: "Google A2A Intensive",          issuer: "Google", date: "Dec 2025", emoji: "⭐" },
];

export default function Skills() {
    return (
        <section id="skills" className="py-20 relative" style={{ background: "transparent" }}>
            {/* Math doodles */}
            <MathDoodle count={6} />

            {/* Page label */}
            <div
                className="absolute top-4 right-6 page-label"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
                Page 2
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-8 pl-20">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <h2
                        className="section-heading handwritten-underline mb-1 inline-block"
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        Tech Arsenal 🧰
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Kalam', cursive",
                            fontSize: "0.95rem",
                            color: "var(--pencil)",
                            marginTop: "0.5rem",
                            fontStyle: "italic",
                        }}
                    >
                        (stuff i actually use)
                    </p>
                </motion.div>

                {/* Sticker board */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-wrap gap-3 mb-14"
                >
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03, type: "spring", stiffness: 200, damping: 18 }}
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                        >
                            <TechSticker
                                name={skill.name}
                                emoji={skill.emoji}
                                color={SKILL_COLORS[skill.name] ?? SKILL_COLORS["default"]}
                                rotation={ROTATIONS[i % ROTATIONS.length]}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Certifications as sticky notes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <p
                        style={{
                            fontFamily: "'Caveat', cursive",
                            fontWeight: 700,
                            fontSize: "1.3rem",
                            color: "var(--ink)",
                            marginBottom: "0.75rem",
                        }}
                    >
                        📌 Certifications
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {certs.map((c, i) => (
                            <motion.div
                                key={c.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                className="sticky-note"
                                style={{
                                    transform: `rotate(${[-2, 1.5, -1][i % 3]}deg)`,
                                }}
                                whileHover={{ scale: 1.03, rotate: 0 }}
                            >
                                <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{c.emoji}</div>
                                <p
                                    style={{
                                        fontFamily: "'Caveat', cursive",
                                        fontWeight: 700,
                                        fontSize: "1rem",
                                        color: "var(--ink)",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {c.name}
                                </p>
                                <p
                                    style={{
                                        fontFamily: "'Patrick Hand', cursive",
                                        fontSize: "0.78rem",
                                        color: "var(--pencil)",
                                        marginTop: "0.25rem",
                                    }}
                                >
                                    {c.issuer} · {c.date}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

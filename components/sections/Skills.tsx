"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import PixelTransition from "@/components/PixelTransition";

/* ── Skill data ── */
const skills = [
    { name: "Python", emoji: "🐍", color: "#C9A84C", docs: "https://docs.python.org/3/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "PyTorch", emoji: "🔥", color: "#E8C96D", docs: "https://pytorch.org/docs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "LangChain", emoji: "🔗", color: "#C9A84C", docs: "https://docs.langchain.com", logo: "https://raw.githubusercontent.com/langchain-ai/langchain/master/docs/static/img/brand/wordmark.png" },
    { name: "RAG / GraphRAG", emoji: "🧠", color: "#E8C96D", docs: "https://microsoft.github.io/graphrag/", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
    { name: "HuggingFace", emoji: "🤗", color: "#C9A84C", docs: "https://huggingface.co/docs", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
    { name: "Apache Flink", emoji: "⚡", color: "#E8C96D", docs: "https://flink.apache.org/docs/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheflink/apacheflink-original.svg" },
    { name: "FastAPI", emoji: "🚀", color: "#C9A84C", docs: "https://fastapi.tiangolo.com/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "SQL / PostgreSQL", emoji: "🗄️", color: "#E8C96D", docs: "https://www.postgresql.org/docs/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "A2A Systems", emoji: "🤖", color: "#C9A84C", docs: "https://google.github.io/A2A/", logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" },
    { name: "Gemini API", emoji: "✨", color: "#E8C96D", docs: "https://ai.google.dev/gemini-api/docs", logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" },
    { name: "Tableau", emoji: "📊", color: "#C9A84C", docs: "https://help.tableau.com/", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
    { name: "TFX / MLOps", emoji: "⚙️", color: "#E8C96D", docs: "https://www.tensorflow.org/tfx/guide", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Docker", emoji: "🐳", color: "#C9A84C", docs: "https://docs.docker.com/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "MCP Protocol", emoji: "🌐", color: "#E8C96D", docs: "https://modelcontextprotocol.io/docs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg" },
    { name: "Diffusion Models", emoji: "🎨", color: "#C9A84C", docs: "https://huggingface.co/docs/diffusers", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
    { name: "Probability & Stats", emoji: "📈", color: "#E8C96D", docs: "https://www.khanacademy.org/math/statistics-probability", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "NumPy", emoji: "🔢", color: "#C9A84C", docs: "https://numpy.org/doc/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Pandas", emoji: "🐼", color: "#E8C96D", docs: "https://pandas.pydata.org/docs/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "Scikit-learn", emoji: "🤖", color: "#C9A84C", docs: "https://scikit-learn.org/stable/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
    { name: "Keras / TF", emoji: "🧬", color: "#E8C96D", docs: "https://keras.io/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg" },
    { name: "OpenCV", emoji: "👁️", color: "#C9A84C", docs: "https://docs.opencv.org/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
    { name: "PySpark", emoji: "🌩️", color: "#E8C96D", docs: "https://spark.apache.org/docs/latest/api/python/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" },
    { name: "Kafka", emoji: "📨", color: "#C9A84C", docs: "https://kafka.apache.org/documentation/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
    { name: "MongoDB", emoji: "🍃", color: "#E8C96D", docs: "https://www.mongodb.com/docs/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "AWS", emoji: "☁️", color: "#C9A84C", docs: "https://docs.aws.amazon.com/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "Git", emoji: "🌿", color: "#E8C96D", docs: "https://git-scm.com/doc", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "LlamaIndex", emoji: "🦙", color: "#C9A84C", docs: "https://docs.llamaindex.ai/", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
    { name: "Streamlit", emoji: "🖥️", color: "#E8C96D", docs: "https://docs.streamlit.io/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
    { name: "Plotly", emoji: "📉", color: "#C9A84C", docs: "https://plotly.com/python/", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/plotly/plotly-original.svg" },
    { name: "Jupyter", emoji: "📓", color: "#E8C96D", docs: "https://jupyter.org/documentation", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
];

const certs = [
    { name: "OCI Data Science Professional", issuer: "Oracle", date: "Oct 2025", hex: "#C9A84C" },
    { name: "CRM Certification", issuer: "Upskill", date: "Oct 2025", hex: "#E8C96D" },
    { name: "Google A2A Intensive", issuer: "Google", date: "Dec 2025", hex: "#C9A84C" },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.82 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: "spring" as const, stiffness: 220, damping: 20 },
    },
};

export default function Skills() {
    return (
        <section id="skills" className="py-28 relative" style={{ background: "transparent" }}>
            {/* Atmospheric glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)" }} />
            <div className="absolute inset-0 grid-bg opacity-20" />

            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-semibold"
                        style={{
                            border: "1px solid rgba(201,168,76,0.3)",
                            color: "var(--gold-primary)",
                            background: "rgba(201,168,76,0.08)",
                            fontFamily: "'JetBrains Mono', monospace",
                            clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
                        }}>
                        <Zap className="w-3.5 h-3.5" />
                        Sacred Arsenal
                    </div>
                    <h2 className="section-heading mb-3 text-glow-gold">Weapons of the Sage</h2>
                    <div className="section-divider max-w-xs mx-auto" />
                    <p className="max-w-lg mx-auto text-sm" style={{ color: "var(--text-muted)" }}>
                        Hover a relic to reveal its true form through pixel sorcery.
                    </p>
                </motion.div>

                {/* Skill grid with PixelTransition */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}>
                    {skills.map((skill, i) => (
                        <motion.a
                            key={skill.name}
                            href={skill.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={cardVariants}
                            // Anti-gravity float with stagger
                            animate={{ y: [0, -(4 + (i % 5) * 2), 0] }}
                            transition={{
                                duration: 4 + (i % 4) * 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.1
                            }}
                            whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                            className="cursor-target"
                        >
                            <PixelTransition
                                gridSize={7}
                                pixelColor={skill.color}
                                animationStepDuration={0.3}
                                className="w-full aspect-square"
                                style={{
                                    border: `1px solid ${skill.color}25`,
                                    background: `${skill.color}08`,
                                    clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))"
                                }}
                                firstContent={
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2"
                                        style={{ background: `${skill.color}08` }}>
                                        <span className="text-2xl leading-none">{skill.emoji}</span>
                                        <span className="text-center font-semibold leading-tight px-1"
                                            style={{ color: skill.color, fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace" }}>
                                            {skill.name}
                                        </span>
                                    </div>
                                }
                                secondContent={
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3"
                                        style={{ background: "rgba(10, 8, 4, 0.95)" }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={skill.logo} alt={skill.name} className="w-8 h-8 object-contain"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                        <span className="text-center font-bold leading-tight px-1"
                                            style={{ color: skill.color, fontSize: "0.56rem", fontFamily: "'Cinzel', serif" }}>
                                            {skill.name}
                                        </span>
                                    </div>
                                }
                            />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4 text-center"
                        style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                        Seals of Mastery
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {certs.map((c, i) => (
                            <motion.div key={c.name}
                                className="cursor-target p-4 border flex items-center gap-3 corner-ornament"
                                style={{
                                    borderColor: `${c.hex}25`,
                                    background: `${c.hex}06`,
                                    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                                    backdropFilter: "blur(8px)"
                                }}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}>
                                <div className="w-2 h-2 flex-shrink-0"
                                    style={{
                                        background: c.hex,
                                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                                        boxShadow: `0 0 8px ${c.hex}80`
                                    }} />
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "'Cinzel', serif" }}>
                                        {c.name}
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                                        {c.issuer} · {c.date}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

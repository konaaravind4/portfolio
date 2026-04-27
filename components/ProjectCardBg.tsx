"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── 1. Nepali Translator ─────────────────────────────────────────── */
const TRANSLATION_PAIRS = [
    { src: "मलाई खाना मन पर्छ", tgt: "I like food" },
    { src: "तपाईलाई कस्तो छ?", tgt: "How are you?" },
    { src: "धन्यवाद", tgt: "Thank you" },
    { src: "नमस्ते", tgt: "Hello" },
];

export function NepaliTranslatorBg() {
    const [idx, setIdx] = useState(0);
    const [phase, setPhase] = useState<"src" | "tgt">("src");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("tgt"), 1600);
        const t2 = setTimeout(() => {
            setPhase("src");
            setIdx((i) => (i + 1) % TRANSLATION_PAIRS.length);
        }, 3400);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [idx]);

    const pair = TRANSLATION_PAIRS[idx];

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${idx}-src`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 0.12, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.5 }}
                    className="font-display font-black text-center"
                    style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "#6EE7B7", letterSpacing: "0.05em" }}
                >
                    {pair.src}
                </motion.div>
            </AnimatePresence>

            <motion.div
                animate={{ scaleX: [0, 1], opacity: [0, 0.15, 0] }}
                transition={{ duration: 0.6, delay: 1.4, ease: "easeInOut" }}
                style={{ height: 1, background: "#A4DA65", width: "40%", borderRadius: 1 }}
            />

            <AnimatePresence mode="wait">
                {phase === "tgt" && (
                    <motion.div
                        key={`${idx}-tgt`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 0.12, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-display font-black text-center"
                        style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "#A4DA65", letterSpacing: "0.08em" }}
                    >
                        {pair.tgt}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── 2. WhatsApp Bot — floating agent nodes ───────────────────────── */
const AGENTS = [
    { label: "Coordinator", x: 50, y: 50, color: "#A4DA65" },
    { label: "Intent", x: 20, y: 25, color: "#6EE7B7" },
    { label: "Availability", x: 80, y: 25, color: "#6EE7B7" },
    { label: "Confirmation", x: 50, y: 80, color: "#6EE7B7" },
];
const EDGES = [
    [0, 1], [0, 2], [0, 3],
];

export function WhatsAppBotBg() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {EDGES.map(([a, b], i) => (
                    <motion.line
                        key={i}
                        x1={AGENTS[a].x} y1={AGENTS[a].y}
                        x2={AGENTS[b].x} y2={AGENTS[b].y}
                        stroke="#A4DA65"
                        strokeWidth="0.5"
                        animate={{ opacity: [0.04, 0.13, 0.04] }}
                        transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
                {AGENTS.map((ag, i) => (
                    <motion.circle
                        key={i}
                        cx={ag.x} cy={ag.y} r="3"
                        fill={ag.color}
                        animate={{ r: [2.5, 3.5, 2.5], opacity: [0.1, 0.22, 0.1] }}
                        transition={{ duration: 1.8, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
            </svg>
        </div>
    );
}

/* ─── 3. Stable Diffusion — noise-dissolve particles ──────────────── */
function useSeed(n: number, seed = 42) {
    return Array.from({ length: n }, (_, i) => {
        const r = Math.sin(seed + i) * 10000;
        return r - Math.floor(r);
    });
}

export function StableDiffusionBg() {
    const rand = useSeed(40);
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {rand.map((r, i) => {
                const x = (Math.sin(i * 2.3) * 0.5 + 0.5) * 100;
                const y = (Math.cos(i * 1.7) * 0.5 + 0.5) * 100;
                const size = 2 + r * 5;
                const delay = r * 3;
                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: `${x}%`, top: `${y}%`,
                            width: size, height: size,
                            background: i % 2 === 0 ? "#A4DA65" : "#6EE7B7",
                        }}
                        animate={{
                            opacity: [0, 0.18, 0],
                            scale: [0.4, 1.2, 0.4],
                        }}
                        transition={{
                            duration: 2.5 + r * 1.5,
                            delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}
        </div>
    );
}

/* ─── 4. RAG / GraphRAG — knowledge graph traversal ──────────────── */
const GRAPH_NODES = [
    { x: 50, y: 50, r: 3.5 },   // center query
    { x: 20, y: 20, r: 2 },
    { x: 75, y: 22, r: 2 },
    { x: 30, y: 75, r: 2 },
    { x: 70, y: 78, r: 2 },
    { x: 12, y: 52, r: 1.5 },
    { x: 88, y: 55, r: 1.5 },
];
const GRAPH_EDGES = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [3, 4]];

export function RAGGraphBg() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {GRAPH_EDGES.map(([a, b], i) => (
                    <motion.line
                        key={i}
                        x1={GRAPH_NODES[a].x} y1={GRAPH_NODES[a].y}
                        x2={GRAPH_NODES[b].x} y2={GRAPH_NODES[b].y}
                        stroke="#6EE7B7" strokeWidth="0.4"
                        animate={{ opacity: [0.04, 0.14, 0.04], pathLength: [0, 1, 1] }}
                        transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
                {GRAPH_NODES.map((n, i) => (
                    <motion.circle
                        key={i}
                        cx={n.x} cy={n.y} r={n.r}
                        fill={i === 0 ? "#A4DA65" : "#6EE7B7"}
                        animate={{ opacity: [0.08, 0.22, 0.08], r: [n.r * 0.8, n.r * 1.3, n.r * 0.8] }}
                        transition={{ duration: 2.2, delay: i * 0.25, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
            </svg>
        </div>
    );
}

/* ─── 5. AI SQL Analyst — SQL tokens typing ───────────────────────── */
const SQL_LINES = [
    "SELECT customer, SUM(revenue)",
    "FROM orders",
    "WHERE month = CURRENT_MONTH",
    "GROUP BY customer",
    "ORDER BY SUM(revenue) DESC",
    "LIMIT 5;",
];

export function AISQLBg() {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        if (visibleLines < SQL_LINES.length) {
            const t = setTimeout(() => setVisibleLines(v => v + 1), 600);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => setVisibleLines(0), 2000);
            return () => clearTimeout(t);
        }
    }, [visibleLines]);

    return (
        <div className="absolute inset-0 flex flex-col justify-center px-4 pointer-events-none overflow-hidden">
            <div className="space-y-0.5">
                {SQL_LINES.map((line, i) => (
                    <motion.div
                        key={`${i}-${visibleLines}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={i < visibleLines ? { opacity: 0.12, x: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-mono text-xs truncate"
                        style={{ color: i === 0 ? "#A4DA65" : i === 5 ? "#6EE7B7" : "#9CA3AF" }}
                    >
                        {line}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ─── 6. Sentiment Dashboard — live emotion bars ─────────────────── */
const EMOTION_LABELS = ["Joy", "Anger", "Fear", "Sadness", "Surprise"];
const EMOTION_COLORS = ["#A4DA65", "#F87171", "#FBBF24", "#6EE7B7", "#818CF8"];

function randVal(seed: number, t: number) {
    return 0.1 + 0.7 * Math.abs(Math.sin(seed * 3.7 + t * 0.8));
}

export function SentimentDashboardBg() {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 900);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="absolute inset-0 flex flex-col justify-center gap-1 px-4 pointer-events-none overflow-hidden">
            {EMOTION_LABELS.map((label, i) => {
                const val = randVal(i + 1, tick);
                return (
                    <div key={label} className="flex items-center gap-2">
                        <span className="text-[9px] font-mono w-12 shrink-0 text-right" style={{ color: EMOTION_COLORS[i], opacity: 0.35 }}>
                            {label}
                        </span>
                        <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.04)" }}>
                            <motion.div
                                className="h-full rounded-full"
                                animate={{ width: `${val * 100}%` }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                                style={{ background: EMOTION_COLORS[i], opacity: 0.18 }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ─── 7. Agentic Code Reviewer — scrolling diff lines ────────────── */
const DIFF_LINES = [
    { sign: "-", text: "  password = request.get('pwd')" },
    { sign: "+", text: "  password = hash(request.get('pwd'))" },
    { sign: " ", text: "  user = db.find(email)" },
    { sign: "-", text: "  query = f\"SELECT * WHERE id={id}\"" },
    { sign: "+", text: "  query = db.prepare('SELECT * WHERE id=?', id)" },
    { sign: " ", text: "  for i in range(n):" },
    { sign: "-", text: "    data = fetch_all()" },
    { sign: "+", text: "    data = fetch_batch(i)" },
];

export function CodeReviewerBg() {
    return (
        <div className="absolute inset-0 flex flex-col justify-center px-3 pointer-events-none overflow-hidden">
            <div className="space-y-0.5">
                {DIFF_LINES.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.11 }}
                        transition={{ delay: i * 0.12, duration: 0.3 }}
                        className="font-mono text-[9px] flex gap-1.5 truncate"
                    >
                        <span style={{
                            color: line.sign === "-" ? "#F87171" : line.sign === "+" ? "#A4DA65" : "#4B5563",
                            fontWeight: 700,
                        }}>
                            {line.sign}
                        </span>
                        <span style={{ color: line.sign === "-" ? "#F87171" : line.sign === "+" ? "#A4DA65" : "#6B7280" }}>
                            {line.text}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ─── Selector ─────────────────────────────────────────────────────── */
const BG_MAP: Record<string, React.FC> = {
    "nepali-english-neural-translator": NepaliTranslatorBg,
    "whatsapp-appointment-bot": WhatsAppBotBg,
    "stable-diffusion-image-pipeline": StableDiffusionBg,
    "rag-graphrag-knowledge-engine": RAGGraphBg,
    "ai-sql-data-analyst": AISQLBg,
    "realtime-sentiment-dashboard": SentimentDashboardBg,
    "agentic-code-reviewer": CodeReviewerBg,
};

export function ProjectCardBg({ slug }: { slug: string }) {
    const Bg = BG_MAP[slug];
    if (!Bg) return null;
    return <Bg />;
}

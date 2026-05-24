"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Cubes = dynamic(() => import("@/components/Cubes"), { ssr: false });

const LEVEL_COLORS = ["#F0F0F0", "#D4EDAA", "#A8D840", "#7DBF10", "#ADF802"];

interface ContribDay { date: string; count: number; level: 0 | 1 | 2 | 3 | 4; }

const COLS = 53;
const ROWS = 7;

function levelToColor(level: number): string { return LEVEL_COLORS[Math.min(level, 4)]; }

export default function GitHubSection() {
    const [cellColors, setCellColors] = useState<string[]>([]);
    const [totalContribs, setTotalContribs] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://github-contributions-api.jogruber.de/v4/konaaravind4?y=last")
            .then(r => r.json())
            .then((data: { contributions: ContribDay[]; total: Record<string, number> }) => {
                const days: ContribDay[] = data.contributions ?? [];
                const firstDay = days[0] ? new Date(days[0].date).getDay() : 0;
                const padded: (ContribDay | null)[] = [...Array(firstDay).fill(null), ...days];
                const colors: string[] = [];
                for (let col = 0; col < COLS; col++) {
                    for (let row = 0; row < ROWS; row++) {
                        const idx = col * ROWS + row;
                        const day = padded[idx] ?? null;
                        colors.push(day ? levelToColor(day.level) : LEVEL_COLORS[0]);
                    }
                }
                setCellColors(colors.slice(0, ROWS * COLS));
                const sum = Object.values(data.total ?? {}).reduce((a, b) => a + b, 0);
                setTotalContribs(sum);
                setLoading(false);
            })
            .catch(() => { setCellColors(Array(ROWS * COLS).fill(LEVEL_COLORS[0])); setLoading(false); });
    }, []);

    return (
        <section id="github" className="py-20 relative" style={{ background: "#FAFAFA" }}>
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl p-8 border" style={{ background: "#FFFFFF", borderColor: "rgba(0,0,0,0.06)" }}>
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                        <Github className="w-5 h-5" style={{ color: "#666" }} />
                        <h2 className="font-display font-bold text-xl" style={{ color: "#0A0A0A" }}>GitHub Contributions</h2>
                        {totalContribs > 0 && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(173,248,2,0.1)", color: "#6B9900", border: "1px solid rgba(173,248,2,0.2)" }}>
                                {totalContribs.toLocaleString()} contributions
                            </span>
                        )}
                        <a href="https://github.com/konaaravind4" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs hover:underline transition-colors" style={{ color: "#ADF802" }}>@konaaravind4</a>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-40 text-sm" style={{ color: "#999" }}>Loading contributions…</div>
                    ) : (
                        <div style={{ width: "100%", aspectRatio: `${COLS} / ${ROWS}`, position: "relative" }}>
                            <Cubes cols={COLS} rows={ROWS} maxAngle={30} radius={4} easing="power3.out" duration={{ enter: 0.25, leave: 0.5 }} cellGap={2} borderStyle="1px solid rgba(0,0,0,0.04)" faceColor={LEVEL_COLORS[0]} shadow={false} autoAnimate rippleOnClick rippleColor="#ADF802" rippleSpeed={3} cellColors={cellColors} />
                        </div>
                    )}

                    <div className="flex items-center gap-2 mt-4 justify-end">
                        <span className="text-xs" style={{ color: "#999" }}>Less</span>
                        {LEVEL_COLORS.map((c, i) => (<div key={i} className="w-3 h-3 rounded-sm" style={{ background: c, border: "1px solid rgba(0,0,0,0.06)" }} />))}
                        <span className="text-xs" style={{ color: "#999" }}>More</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

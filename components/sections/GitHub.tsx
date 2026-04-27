"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Cubes = dynamic(() => import("@/components/Cubes"), { ssr: false });

/* ── Contribution level → cube face colour ─────────────────────────── */
const LEVEL_COLORS = [
    "#1F2937",   // 0 – no contributions
    "#1a3a1a",   // 1 – low
    "#2d6a2d",   // 2 – medium
    "#4aa84a",   // 3 – high
    "#A4DA65",   // 4 – very high
];

/* GitHub contribution levels come from react-github-calendar's data shape.
   We pull the same data via the public contributions API (ghcr proxy). */
interface ContribDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

/* We show the last COLS weeks × 7 days = ROWS*COLS cubes in a grid */
const COLS = 53; // weeks in a year
const ROWS = 7;  // days per week

function levelToColor(level: number): string {
    return LEVEL_COLORS[Math.min(level, 4)];
}

export default function GitHubSection() {
    const [cellColors, setCellColors] = useState<string[]>([]);
    const [totalContribs, setTotalContribs] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /* Fetch from the GitHub contributions proxy used by react-github-calendar */
        fetch("https://github-contributions-api.jogruber.de/v4/konaaravind4?y=last")
            .then(r => r.json())
            .then((data: { contributions: ContribDay[]; total: Record<string, number> }) => {
                const days: ContribDay[] = data.contributions ?? [];

                /* Build a flat ROWS×COLS grid, column-major (week by week) */
                /* Pad front so the grid starts on Sunday */
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
                /* total for last year */
                const sum = Object.values(data.total ?? {}).reduce((a, b) => a + b, 0);
                setTotalContribs(sum);
                setLoading(false);
            })
            .catch(() => {
                /* Fallback: all empty */
                setCellColors(Array(ROWS * COLS).fill(LEVEL_COLORS[0]));
                setLoading(false);
            });
    }, []);

    return (
        <section id="github" className="py-20 relative" style={{ background: "#09090B" }}>
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl p-8 border"
                    style={{ background: "#111827", borderColor: "#1F2937" }}
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                        <Github className="w-5 h-5" style={{ color: "#6B7280" }} />
                        <h2 className="font-display font-bold text-xl" style={{ color: "#F9FAFB" }}>
                            GitHub Contributions
                        </h2>
                        {totalContribs > 0 && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                                style={{ background: "rgba(164,218,101,0.1)", color: "#A4DA65", border: "1px solid rgba(164,218,101,0.2)" }}>
                                {totalContribs.toLocaleString()} contributions
                            </span>
                        )}
                        <a href="https://github.com/konaaravind4" target="_blank" rel="noopener noreferrer"
                            className="ml-auto text-xs hover:underline transition-colors" style={{ color: "#A4DA65" }}>
                            @konaaravind4
                        </a>
                    </div>

                    {/* Cube grid */}
                    {loading ? (
                        <div className="flex items-center justify-center h-40 text-sm" style={{ color: "#4B5563" }}>
                            Loading contributions…
                        </div>
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                /* Keep aspect ratio: COLS cubes wide, ROWS cubes tall */
                                aspectRatio: `${COLS} / ${ROWS}`,
                                position: "relative",
                            }}
                        >
                            <Cubes
                                cols={COLS}
                                rows={ROWS}
                                maxAngle={30}
                                radius={4}
                                easing="power3.out"
                                duration={{ enter: 0.25, leave: 0.5 }}
                                cellGap={2}
                                borderStyle="1px solid rgba(255,255,255,0.06)"
                                faceColor={LEVEL_COLORS[0]}
                                shadow={false}
                                autoAnimate
                                rippleOnClick
                                rippleColor="#A4DA65"
                                rippleSpeed={3}
                                cellColors={cellColors}
                            />
                        </div>
                    )}

                    {/* Legend */}
                    <div className="flex items-center gap-2 mt-4 justify-end">
                        <span className="text-xs" style={{ color: "#4B5563" }}>Less</span>
                        {LEVEL_COLORS.map((c, i) => (
                            <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c, border: "1px solid rgba(255,255,255,0.08)" }} />
                        ))}
                        <span className="text-xs" style={{ color: "#4B5563" }}>More</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

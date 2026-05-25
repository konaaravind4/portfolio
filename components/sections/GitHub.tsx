"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Cubes = dynamic(() => import("@/components/Cubes"), { ssr: false });

const LEVEL_COLORS = ["#f0ede4", "#d4edb4", "#a0d870", "#6bbf28", "#4a9010"];

interface ContribDay { date: string; count: number; level: 0 | 1 | 2 | 3 | 4; }

const COLS = 53;
const ROWS = 7;

function levelToColor(level: number): string {
    return LEVEL_COLORS[Math.min(level, 4)];
}

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
            .catch(() => {
                setCellColors(Array(ROWS * COLS).fill(LEVEL_COLORS[0]));
                setLoading(false);
            });
    }, []);

    return (
        <section
            id="github"
            className="py-16 relative"
            style={{ background: "transparent" }}
        >
            {/* Page label */}
            <div className="absolute top-4 right-6 page-label">
                Page 8
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-8 pl-16 sm:pl-24">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h2
                        className="section-heading inline-block"
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        Commit History 📊
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Kalam', cursive",
                            color: "var(--pencil)",
                            fontSize: "0.9rem",
                            fontStyle: "italic",
                            marginTop: "0.25rem",
                        }}
                    >
                        (every commit is a step toward something real)
                    </p>
                </motion.div>

                {/* Chart wrapped in notebook box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="notebook-page p-6"
                    style={{ border: "1.5px solid rgba(184,212,232,0.7)" }}
                >
                    {/* Chart header */}
                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                        <Github className="w-4 h-4" style={{ color: "var(--pencil)" }} />
                        <span
                            style={{
                                fontFamily: "'Caveat', cursive",
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                color: "var(--ink)",
                            }}
                        >
                            GitHub Contributions
                        </span>
                        {totalContribs > 0 && (
                            <span
                                style={{
                                    fontFamily: "'Patrick Hand', cursive",
                                    fontSize: "0.78rem",
                                    color: "#4a9010",
                                    background: "rgba(74,144,16,0.1)",
                                    border: "1px solid rgba(74,144,16,0.25)",
                                    borderRadius: "999px",
                                    padding: "0.15rem 0.6rem",
                                }}
                            >
                                {totalContribs.toLocaleString()} contributions
                            </span>
                        )}
                        <a
                            href="https://github.com/konaaravind4"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                marginLeft: "auto",
                                fontFamily: "'Kalam', cursive",
                                fontSize: "0.8rem",
                                color: "var(--ink)",
                                textDecoration: "underline",
                                textDecorationColor: "var(--margin-red)",
                            }}
                        >
                            @konaaravind4
                        </a>
                    </div>

                    {loading ? (
                        <div
                            className="flex items-center justify-center h-32"
                            style={{
                                fontFamily: "'Kalam', cursive",
                                color: "var(--pencil)",
                                fontSize: "0.9rem",
                                fontStyle: "italic",
                            }}
                        >
                            Loading contributions…
                        </div>
                    ) : (
                        <div style={{ width: "100%", aspectRatio: `${COLS} / ${ROWS}`, position: "relative" }}>
                            <Cubes
                                cols={COLS}
                                rows={ROWS}
                                maxAngle={25}
                                radius={3}
                                easing="power3.out"
                                duration={{ enter: 0.25, leave: 0.5 }}
                                cellGap={2}
                                borderStyle="1px solid rgba(0,0,0,0.04)"
                                faceColor={LEVEL_COLORS[0]}
                                shadow={false}
                                autoAnimate
                                rippleOnClick
                                rippleColor="#6bbf28"
                                rippleSpeed={3}
                                cellColors={cellColors}
                            />
                        </div>
                    )}

                    {/* Legend */}
                    <div className="flex items-center gap-2 mt-4 justify-end">
                        <span
                            style={{
                                fontFamily: "'Patrick Hand', cursive",
                                fontSize: "0.72rem",
                                color: "var(--pencil)",
                            }}
                        >
                            Less
                        </span>
                        {LEVEL_COLORS.map((c, i) => (
                            <div
                                key={i}
                                style={{
                                    width: "12px",
                                    height: "12px",
                                    borderRadius: "3px",
                                    background: c,
                                    border: "1px solid rgba(0,0,0,0.08)",
                                }}
                            />
                        ))}
                        <span
                            style={{
                                fontFamily: "'Patrick Hand', cursive",
                                fontSize: "0.72rem",
                                color: "var(--pencil)",
                            }}
                        >
                            More
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

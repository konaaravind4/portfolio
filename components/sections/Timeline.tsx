"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen, Briefcase, Award, GraduationCap } from "lucide-react";
import WordReveal from "@/components/ui/WordReveal";

const events = [
    { icon: GraduationCap, type: "Education", title: "B.Tech in CS (Artificial Intelligence)", org: "GJUST — Guru Jambeswar University of Science & Technology", location: "Hisar, Haryana", date: "2022 – May 2026", desc: "Major in Computer Science (AI). Cumulative GPA: 6.8/10. Focusing on machine learning, multi-agent systems, and intelligent pipeline engineering.", color: "#ADF802" },
    { icon: Award, type: "Certification", title: "Google 5-Day A2A Systems Intensive", org: "Google Technical Team", location: "Remote", date: "Dec 2025", desc: "Hands-on training with ADK (Agent Development Kit), Gemini models, and multi-agent orchestration patterns — directly from the Google technical team.", color: "#8BC700" },
    { icon: Award, type: "Certification", title: "OCI Data Science Professional", org: "Oracle Cloud Infrastructure", location: "Remote", date: "Oct 2025", desc: "Certified proficiency in building, training, and deploying machine learning models on Oracle Cloud Infrastructure.", color: "#ADF802" },
    { icon: Award, type: "Certification", title: "CRM Certification", org: "Upskill", location: "Remote", date: "Oct 2025", desc: "Implemented CRM workflows for lead management and customer tracking. Analyzed customer data to improve engagement and retention strategies.", color: "#8BC700" },
    { icon: Briefcase, type: "Experience", title: "Data Analysis Intern", org: "UCL India", location: "Remote", date: "Jun – Aug 2025", desc: "Worked as a Data Analyst at a consumer-based company. Identified business insights using SQL, pandas, and Tableau to boost client companies' growth.", color: "#ADF802" },
    { icon: GraduationCap, type: "Education", title: "Schooling (10th & 12th)", org: "ZPHS Koduru / NRI Kalasala", location: "Visakhapatnam, AP", date: "Jul 2016 – Jul 2022", desc: "Completed 10th and 12th with 95% and 90% passing marks respectively.", color: "#8BC700" },
];

export default function Timeline() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    return (
        <section id="timeline" className="py-28 relative" style={{ background: "transparent" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(173,248,2,0.03) 0%, transparent 60%)" }} />
            <div className="absolute inset-0 grid-bg opacity-15" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(173,248,2,0.3), transparent)" }} />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-semibold" style={{ background: "rgba(173,248,2,0.08)", border: "1px solid rgba(173,248,2,0.25)", color: "#0A0A0A", fontFamily: "'JetBrains Mono', monospace", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                        <BookOpen className="w-3.5 h-3.5" style={{ color: "var(--gold-primary)" }} /> Timeline
                    </div>
                    <h2 className="section-heading mb-4">Education & Experience</h2>
                    <div className="section-divider max-w-xs mx-auto" />
                    <p className="text-sm max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>From academic foundations in AI to real-world internships and professional certifications.</p>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, rgba(173,248,2,0.5), rgba(173,248,2,0.2), transparent)" }} />
                    <div className="space-y-8">
                        {events.map((event, i) => {
                            const Icon = event.icon;
                            const isHovered = hoveredIdx === i;
                            return (
                                <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ type: "spring", stiffness: 55, damping: 18, delay: i * 0.15 }} className="relative flex gap-6" animate={{ y: isHovered ? -4 : 0 }}>
                                    <motion.div className="relative z-10 flex-shrink-0 w-12 h-12 border flex items-center justify-center" style={{ background: `${event.color}14`, borderColor: `${event.color}40`, color: event.color, clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }} animate={{ y: [0, -6, 0] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}>
                                        <Icon className="w-5 h-5" />
                                    </motion.div>
                                    <motion.div className="cursor-target flex-1 p-5 corner-ornament" style={{ background: isHovered ? "rgba(173,248,2,0.04)" : "rgba(255,255,255,0.6)", border: `1px solid ${isHovered ? event.color + '40' : 'rgba(0,0,0,0.06)'}`, backdropFilter: "blur(12px)", clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))", transition: "all 0.35s ease", boxShadow: isHovered ? `0 4px 30px rgba(0,0,0,0.05), 0 0 20px ${event.color}12` : "none" }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                                            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: event.color, fontFamily: "'JetBrains Mono', monospace" }}>{event.type}</span>
                                            <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{event.date}</span>
                                        </div>
                                        <h3 className="font-bold text-base mb-0.5" style={{ color: "var(--text-primary)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>{event.title}</h3>
                                        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{event.org} · {event.location}</p>
                                        <WordReveal
                                            text={event.desc}
                                            className="text-sm leading-relaxed"
                                            as="p"
                                            threshold={0.2}
                                        />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

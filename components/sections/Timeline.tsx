"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award } from "lucide-react";
import WordReveal from "@/components/ui/WordReveal";
import MathDoodle from "@/components/ui/MathDoodle";

const events = [
    {
        icon: GraduationCap,
        type: "Education",
        title: "B.Tech in CS (Artificial Intelligence)",
        org: "GJUST — Guru Jambeswar University of Science & Technology",
        location: "Hisar, Haryana",
        date: "2022 – May 2026",
        desc: "Major in Computer Science (AI). Cumulative GPA: 6.8/10. Focusing on machine learning, multi-agent systems, and intelligent pipeline engineering.",
        color: "#3b82f6",
        emoji: "🎓",
    },
    {
        icon: Award,
        type: "Certification",
        title: "Google 5-Day A2A Systems Intensive",
        org: "Google Technical Team",
        location: "Remote",
        date: "Dec 2025",
        desc: "Hands-on training with ADK (Agent Development Kit), Gemini models, and multi-agent orchestration patterns — directly from the Google technical team.",
        color: "#10b981",
        emoji: "⭐",
    },
    {
        icon: Award,
        type: "Certification",
        title: "OCI Data Science Professional",
        org: "Oracle Cloud Infrastructure",
        location: "Remote",
        date: "Oct 2025",
        desc: "Certified proficiency in building, training, and deploying machine learning models on Oracle Cloud Infrastructure.",
        color: "#10b981",
        emoji: "🏆",
    },
    {
        icon: Award,
        type: "Certification",
        title: "CRM Certification",
        org: "Upskill",
        location: "Remote",
        date: "Oct 2025",
        desc: "Implemented CRM workflows for lead management and customer tracking. Analyzed customer data to improve engagement and retention strategies.",
        color: "#10b981",
        emoji: "📜",
    },
    {
        icon: Briefcase,
        type: "Experience",
        title: "Data Analysis Intern",
        org: "UCL India",
        location: "Remote",
        date: "Jun – Aug 2025",
        desc: "Worked as a Data Analyst at a consumer-based company. Identified business insights using SQL, pandas, and Tableau to boost client companies' growth.",
        color: "#f97316",
        emoji: "💼",
    },
    {
        icon: GraduationCap,
        type: "Education",
        title: "Schooling (10th & 12th)",
        org: "ZPHS Koduru / NRI Kalasala",
        location: "Visakhapatnam, AP",
        date: "Jul 2016 – Jul 2022",
        desc: "Completed 10th and 12th with 95% and 90% passing marks respectively.",
        color: "#3b82f6",
        emoji: "📚",
    },
];

const TYPE_COLORS: Record<string, string> = {
    "Education":     "#3b82f6",
    "Certification": "#10b981",
    "Experience":    "#f97316",
};

export default function Timeline() {
    return (
        <section id="timeline" className="py-16 relative" style={{ background: "transparent" }}>
            <MathDoodle count={4} />

            {/* Page label */}
            <div className="absolute top-4 right-6 page-label">
                Page 8
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pl-16 sm:pl-24">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <h2
                        className="section-heading inline-block"
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        The Journey 📅
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
                        (from where it all started)
                    </p>
                </motion.div>

                {/* Timeline entries */}
                <div className="space-y-6">
                    {events.map((event, i) => {
                        const color = TYPE_COLORS[event.type] ?? "#84cc16";
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="relative flex gap-5"
                            >
                                {/* Left — date column (diary style) */}
                                <div
                                    className="hidden sm:block flex-shrink-0 text-right"
                                    style={{ width: "80px", paddingTop: "0.3rem" }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "'Patrick Hand', cursive",
                                            fontSize: "0.7rem",
                                            color: "var(--pencil)",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {event.date}
                                    </span>
                                </div>

                                {/* Circle bullet */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <div
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            border: `2px solid ${color}`,
                                            background: `${color}22`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "0.7rem",
                                            flexShrink: 0,
                                            marginTop: "0.25rem",
                                        }}
                                    >
                                        {event.emoji}
                                    </div>
                                    {i < events.length - 1 && (
                                        <div
                                            style={{
                                                width: "1px",
                                                flex: 1,
                                                background: `${color}40`,
                                                marginTop: "4px",
                                                minHeight: "30px",
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Entry body */}
                                <div className="flex-1 pb-2">
                                    {/* Type label */}
                                    <span
                                        style={{
                                            fontFamily: "'Patrick Hand', cursive",
                                            fontSize: "0.7rem",
                                            color: color,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                        }}
                                    >
                                        {event.type}
                                    </span>

                                    {/* Date (mobile) */}
                                    <span
                                        className="sm:hidden ml-2"
                                        style={{
                                            fontFamily: "'Patrick Hand', cursive",
                                            fontSize: "0.7rem",
                                            color: "var(--pencil)",
                                        }}
                                    >
                                        · {event.date}
                                    </span>

                                    {/* Title */}
                                    <h3
                                        style={{
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 700,
                                            fontSize: "1.25rem",
                                            color: "var(--ink)",
                                            margin: "0.15rem 0 0.1rem",
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {event.title}
                                    </h3>

                                    {/* Org */}
                                    <p
                                        style={{
                                            fontFamily: "'Kalam', cursive",
                                            fontSize: "0.82rem",
                                            color: "var(--pencil)",
                                            fontStyle: "italic",
                                            marginBottom: "0.4rem",
                                        }}
                                    >
                                        {event.org} · {event.location}
                                    </p>

                                    {/* Description */}
                                    <WordReveal
                                        text={event.desc}
                                        className="text-sm leading-relaxed"
                                        as="p"
                                        threshold={0.2}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

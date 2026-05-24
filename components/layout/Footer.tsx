"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Scroll } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
    { icon: Github, href: "https://github.com/konaaravind4", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/konaaravind", label: "LinkedIn" },
    { icon: Mail, href: "mailto:konaaravind4@gmail.com", label: "Email" },
    { icon: Twitter, href: "https://twitter.com/konaaravind", label: "Twitter" },
];

export default function Footer() {
    return (
        <footer className="relative py-14" style={{ background: "#FAFAFA", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(173,248,2,0.4), transparent)" }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <motion.div className="flex items-center justify-center w-9 h-9 border" style={{ background: "rgba(173,248,2,0.08)", borderColor: "rgba(173,248,2,0.3)", clipPath: "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))" }} animate={{ boxShadow: ["0 0 8px rgba(173,248,2,0.1)", "0 0 20px rgba(173,248,2,0.2)", "0 0 8px rgba(173,248,2,0.1)"] }} transition={{ duration: 3, repeat: Infinity }}>
                            <Scroll className="w-4 h-4" style={{ color: "var(--gold-primary)" }} />
                        </motion.div>
                        <span className="font-bold text-lg" style={{ color: "#0A0A0A", fontFamily: "'Cinzel', serif" }}>Kona Aravind</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="p-2 border transition-all duration-300 cursor-target" style={{ color: "var(--text-muted)", borderColor: "rgba(0,0,0,0.06)", background: "transparent", clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))" }} onMouseEnter={e => { e.currentTarget.style.color = "#0A0A0A"; e.currentTarget.style.borderColor = "rgba(173,248,2,0.4)"; e.currentTarget.style.background = "rgba(173,248,2,0.06)"; }} onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.background = "transparent"; }}>
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>

                    <p className="text-xs" style={{ color: "var(--text-faint)", fontFamily: "'JetBrains Mono', monospace" }}>© 2026 Kona Aravind · Built with Next.js & Three.js</p>
                </div>

                <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                    <p className="text-xs" style={{ color: "rgba(173,248,2,0.4)", fontFamily: "'Cinzel', serif", letterSpacing: "0.15em" }}>✦ · · · THE JOURNEY CONTINUES · · · ✦</p>
                </div>
            </div>
        </footer>
    );
}

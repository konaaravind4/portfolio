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
        <footer className="relative py-14"
            style={{
                background: "rgba(5,5,7,0.95)",
                borderTop: "1px solid rgba(201,168,76,0.2)"
            }}>
            {/* Top ornament */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), rgba(139,0,0,0.3), rgba(201,168,76,0.4), transparent)" }} />

            {/* Subtle ember glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 60%)" }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="flex items-center justify-center w-9 h-9 border"
                            style={{
                                background: "rgba(201,168,76,0.08)",
                                borderColor: "rgba(201,168,76,0.3)",
                                clipPath: "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))"
                            }}
                            animate={{ boxShadow: ["0 0 8px rgba(201,168,76,0.2)", "0 0 20px rgba(201,168,76,0.4)", "0 0 8px rgba(201,168,76,0.2)"] }}
                            transition={{ duration: 3, repeat: Infinity }}>
                            <Scroll className="w-4 h-4" style={{ color: "var(--gold-primary)" }} />
                        </motion.div>
                        <span className="font-bold text-lg gradient-text text-glow-gold"
                            style={{ fontFamily: "'Cinzel', serif" }}>
                            Kona Aravind
                        </span>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-3">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                className="p-2 border transition-all duration-300 cursor-target"
                                style={{
                                    color: "var(--text-muted)",
                                    borderColor: "rgba(201,168,76,0.1)",
                                    background: "transparent",
                                    clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))"
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = "var(--gold-primary)";
                                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                                    e.currentTarget.style.background = "rgba(201,168,76,0.06)";
                                    e.currentTarget.style.boxShadow = "0 0 12px rgba(201,168,76,0.2)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = "var(--text-muted)";
                                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.boxShadow = "none";
                                }}>
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-xs" style={{ color: "var(--text-faint)", fontFamily: "'JetBrains Mono', monospace" }}>
                        © 2026 Kona Aravind · Forged with Next.js & Three.js
                    </p>
                </div>

                {/* Bottom gold trim */}
                <div className="mt-8 pt-6 text-center"
                    style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}>
                    <p className="text-xs" style={{ color: "rgba(201,168,76,0.2)", fontFamily: "'Cinzel', serif", letterSpacing: "0.15em" }}>
                        ✦ · · · THE SAGE'S JOURNEY CONTINUES · · · ✦
                    </p>
                </div>
            </div>
        </footer>
    );
}

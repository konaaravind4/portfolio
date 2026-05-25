"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
    { icon: Github,   href: "https://github.com/konaaravind4",      label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/konaaravind",  label: "LinkedIn" },
    { icon: Mail,     href: "mailto:konaaravind4@gmail.com",         label: "Email" },
];

export default function Footer() {
    return (
        <footer
            className="relative py-10"
            style={{
                borderTop: "1px solid var(--line-blue)",
                background: "rgba(253,248,239,0.9)",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-5">

                    {/* Signature */}
                    <div>
                        <span
                            style={{
                                fontFamily: "'Caveat', cursive",
                                fontWeight: 700,
                                fontSize: "1.8rem",
                                color: "var(--ink)",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Kona Aravind
                        </span>
                        <div
                            style={{
                                height: "2px",
                                background: "var(--margin-red)",
                                borderRadius: "1px",
                                marginTop: "2px",
                                width: "60%",
                                opacity: 0.6,
                            }}
                        />
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-4">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith("mailto") ? undefined : "_blank"}
                                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                aria-label={label}
                                className="flex items-center gap-1.5"
                                style={{
                                    fontFamily: "'Kalam', cursive",
                                    fontSize: "0.85rem",
                                    color: "var(--pencil)",
                                    textDecoration: "none",
                                }}
                                whileHover={{ color: "var(--ink)" }}
                                transition={{ duration: 0.15 }}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p
                        style={{
                            fontFamily: "'Patrick Hand', cursive",
                            fontSize: "0.75rem",
                            color: "var(--pencil)",
                        }}
                    >
                        © 2026 Kona Aravind · Built with Next.js
                    </p>
                </div>

                {/* The End */}
                <div className="mt-6 pt-4 text-center" style={{ borderTop: "1px solid var(--line-blue)" }}>
                    <p
                        style={{
                            fontFamily: "'Permanent Marker', cursive",
                            fontSize: "1rem",
                            color: "var(--pencil)",
                            opacity: 0.6,
                            letterSpacing: "0.05em",
                        }}
                    >
                        The End ✦
                    </p>
                    {/* Small doodle */}
                    <p style={{ fontSize: "1rem", marginTop: "0.25rem", opacity: 0.4 }}>
                        ♡
                    </p>
                </div>
            </div>
        </footer>
    );
}

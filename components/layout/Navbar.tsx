"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import StaggeredMenu, { StaggeredMenuHandle } from "@/components/StaggeredMenu";
import { useRef } from "react";

const NAV_ITEMS = [
    { label: "Projects",  link: "/#projects" },
    { label: "Skills",    link: "/#skills" },
    { label: "Timeline",  link: "/#timeline" },
    { label: "Blog",      link: "/blog" },
    { label: "Contact",   link: "/#contact" },
];

const SOCIAL_ITEMS = [
    { label: "GitHub",   link: "https://github.com/konaaravind4" },
    { label: "LinkedIn", link: "https://linkedin.com/in/konaaravind" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<StaggeredMenuHandle>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleMenuToggle = () => {
        menuRef.current?.toggle();
    };

    return (
        <>
            {/* ── Fixed navbar ── */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-400 ${scrolled ? "py-2" : "py-4"}`}
                style={{
                    background: "rgba(253,248,239,0.95)",
                    backdropFilter: "blur(12px)",
                    borderBottom: `1px solid var(--line-blue)`,
                    boxShadow: scrolled ? "0 2px 16px rgba(30,27,75,0.06)" : "none",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="relative z-[71] group">
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <span
                                style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontWeight: 700,
                                    fontSize: "1.75rem",
                                    color: "var(--ink)",
                                    lineHeight: 1,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                K.A
                            </span>
                            {/* Hand-drawn underline */}
                            <svg
                                style={{
                                    position: "absolute",
                                    bottom: "-3px",
                                    left: "-2px",
                                    width: "calc(100% + 4px)",
                                    height: "6px",
                                    overflow: "visible",
                                }}
                                viewBox="0 0 50 6"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M1,4 Q12,1 25,4 Q38,7 49,3"
                                    fill="none"
                                    stroke="var(--margin-red)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-7">
                        {NAV_ITEMS.map(({ label, link }) => (
                            <Link
                                key={label}
                                href={link}
                                className="nav-link-notebook"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Resume + Hamburger */}
                    <div className="flex items-center gap-3 z-[71] relative">
                        <a
                            href="/resume.pdf"
                            download
                            className="hidden sm:inline-flex items-center gap-1.5 btn-hand"
                            style={{ fontSize: "0.85rem", padding: "0.3rem 0.85rem" }}
                        >
                            <ExternalLink className="w-3 h-3" /> Resume
                        </a>

                        {/* Hamburger */}
                        <button
                            onClick={handleMenuToggle}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            className="relative w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
                            style={{ color: "var(--ink)" }}
                        >
                            {[0, 1, 2].map((i) => (
                                <span
                                    key={i}
                                    className="block rounded-full transition-all duration-300 origin-center"
                                    style={{
                                        width: i === 1 ? "12px" : "20px",
                                        height: "2px",
                                        background: "var(--ink)",
                                        transform: menuOpen
                                            ? i === 0 ? "translateY(7px) rotate(45deg)"
                                                : i === 2 ? "translateY(-7px) rotate(-45deg)"
                                                    : "scaleX(0)"
                                            : "none",
                                        opacity: menuOpen && i === 1 ? 0 : 1,
                                    }}
                                />
                            ))}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ── StaggeredMenu overlay ── */}
            <StaggeredMenu
                ref={menuRef}
                isFixed
                showHeader={false}
                position="right"
                colors={["#fdf8ef", "#e8a0a0"]}
                accentColor="var(--ink)"
                items={NAV_ITEMS}
                socialItems={SOCIAL_ITEMS}
                displaySocials
                displayItemNumbering={false}
                closeOnClickAway
                onMenuOpen={() => setMenuOpen(true)}
                onMenuClose={() => setMenuOpen(false)}
            />
        </>
    );
}

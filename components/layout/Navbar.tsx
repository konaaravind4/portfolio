"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Scroll, ExternalLink } from "lucide-react";
import StaggeredMenu, { StaggeredMenuHandle } from "@/components/StaggeredMenu";

const NAV_ITEMS = [
    { label: "Projects", link: "/#projects" },
    { label: "Skills", link: "/#skills" },
    { label: "Timeline", link: "/#timeline" },
    { label: "Blog", link: "/blog" },
    { label: "Contact", link: "/#contact" },
];

const SOCIAL_ITEMS = [
    { label: "GitHub", link: "https://github.com/konaaravind4" },
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
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
                style={scrolled ? {
                    background: "rgba(5,5,7,0.95)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(201,168,76,0.2)",
                    boxShadow: "0 2px 30px rgba(0,0,0,0.6), 0 0 20px rgba(201,168,76,0.05)",
                } : {
                    background: "transparent",
                    borderBottom: "1px solid transparent",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group z-[71] relative">
                        <motion.div
                            className="flex items-center justify-center w-10 h-10 border transition-all duration-300 cursor-target"
                            style={{
                                background: "rgba(201,168,76,0.08)",
                                borderColor: "rgba(201,168,76,0.3)",
                                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))"
                            }}
                            whileHover={{ scale: 1.05 }}
                            animate={{ boxShadow: ["0 0 8px rgba(201,168,76,0.2)", "0 0 20px rgba(201,168,76,0.4)", "0 0 8px rgba(201,168,76,0.2)"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Scroll className="w-4 h-4" style={{ color: "var(--gold-primary)" }} />
                        </motion.div>
                        <div style={{ fontFamily: "'Cinzel', serif" }}>
                            <span className="gradient-text font-bold text-lg text-glow-gold">Kona</span>
                            <span style={{ color: "var(--text-muted)" }}>.dev</span>
                        </div>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-6">
                        {NAV_ITEMS.map(({ label, link }) => (
                            <Link
                                key={label}
                                href={link}
                                className="text-sm font-medium nav-link-brush transition-colors duration-300 cursor-target"
                                style={{
                                    color: "var(--text-secondary)",
                                    fontFamily: "'Cinzel', serif",
                                    letterSpacing: "0.05em"
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Resume + Hamburger */}
                    <div className="flex items-center gap-4 z-[71] relative">
                        <a href="/resume.pdf" download
                            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 border transition-all duration-300 cursor-target"
                            style={{
                                borderColor: "rgba(201,168,76,0.4)",
                                color: "var(--gold-primary)",
                                background: "rgba(201,168,76,0.08)",
                                fontFamily: "'Cinzel', serif",
                                letterSpacing: "0.05em",
                                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
                                e.currentTarget.style.color = 'var(--gold-bright)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(201,168,76,0.08)';
                                e.currentTarget.style.color = 'var(--gold-primary)';
                            }}>
                            <ExternalLink className="w-3.5 h-3.5" /> Scroll of Deeds
                        </a>

                        {/* Hamburger */}
                        <button
                            onClick={handleMenuToggle}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            className="cursor-target relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] rounded-none transition-colors duration-200"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {[0, 1, 2].map((i) => (
                                <span
                                    key={i}
                                    className="block h-[2px] rounded-full transition-all duration-300 origin-center"
                                    style={{
                                        width: i === 1 ? "14px" : "22px",
                                        background: menuOpen && i !== 1 ? "var(--gold-primary)" : "currentColor",
                                        transform: menuOpen
                                            ? i === 0 ? "translateY(8px) rotate(45deg)"
                                                : i === 2 ? "translateY(-8px) rotate(-45deg)"
                                                    : "scaleX(0)"
                                            : "none",
                                        opacity: menuOpen && i === 1 ? 0 : 1,
                                        boxShadow: menuOpen && i !== 1 ? "0 0 8px rgba(201,168,76,0.6)" : "none"
                                    }}
                                />
                            ))}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ── Wukong-colored StaggeredMenu overlay ── */}
            <StaggeredMenu
                ref={menuRef}
                isFixed
                showHeader={false}
                position="right"
                colors={["#0A0805", "#C9A84C"]}
                accentColor="#C9A84C"
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

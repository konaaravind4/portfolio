"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Floating rock configs
const ROCKS = [
    { size: 6,  left: "8%",  delay: 0,   dur: 9,  rotate: 120 },
    { size: 10, left: "15%", delay: 2,   dur: 12, rotate: -240 },
    { size: 5,  left: "22%", delay: 5,   dur: 7,  rotate: 90 },
    { size: 8,  left: "35%", delay: 1,   dur: 14, rotate: 180 },
    { size: 4,  left: "48%", delay: 3.5, dur: 8,  rotate: -300 },
    { size: 7,  left: "55%", delay: 6,   dur: 11, rotate: 200 },
    { size: 9,  left: "67%", delay: 0.8, dur: 13, rotate: -150 },
    { size: 5,  left: "74%", delay: 4,   dur: 6,  rotate: 270 },
    { size: 11, left: "82%", delay: 2.5, dur: 10, rotate: -90 },
    { size: 6,  left: "90%", delay: 7,   dur: 9,  rotate: 45 },
    { size: 4,  left: "5%",  delay: 1.5, dur: 15, rotate: -180 },
    { size: 8,  left: "60%", delay: 5.5, dur: 8,  rotate: 320 },
];

// ── Golden energy orbs
const ORBS = [
    { size: 60,  left: "10%", top: "70%", driftX: 120, dur: 18, delay: 0 },
    { size: 40,  left: "25%", top: "80%", driftX: -80, dur: 22, delay: 3 },
    { size: 80,  left: "50%", top: "60%", driftX: 60,  dur: 16, delay: 7 },
    { size: 35,  left: "70%", top: "75%", driftX: -100,dur: 20, delay: 1 },
    { size: 55,  left: "85%", top: "65%", driftX: 40,  dur: 25, delay: 5 },
    { size: 45,  left: "40%", top: "85%", driftX: -60, dur: 14, delay: 9 },
];

// ── Lightning crack SVG paths
const CRACKS = [
    { x1: 200, y1: 0,   x2: 185, y2: 80,  x3: 210, y3: 200, delay: 0,   dur: 3.5 },
    { x1: 800, y1: 0,   x2: 810, y2: 120, x3: 790, y3: 280, delay: 1.5, dur: 4.2 },
    { x1: 500, y1: 0,   x2: 520, y2: 150, x3: 495, y3: 300, delay: 0.8, dur: 2.8 },
    { x1: 1100,y1: 0,   x2: 1090,y2: 100, x3: 1115,y3: 220, delay: 2.2, dur: 5   },
    { x1: 300, y1: 40,  x2: 280, y2: 180, x3: 305, y3: 350, delay: 3,   dur: 3.8 },
    { x1: 950, y1: 0,   x2: 970, y2: 90,  x3: 945, y3: 220, delay: 0.4, dur: 4.5 },
];

// ── Audio controller
function useBossAudio() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Royalty-free dark ambience from a CDN
        const audio = new Audio();
        audio.src = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_0625a0f94c.mp3?filename=cinematic-dark-suspense-6285.mp3";
        audio.loop = true;
        audio.volume = 0.2;
        audio.muted = true;
        audioRef.current = audio;

        const unmute = () => {
            audio.muted = false;
            audio.play().catch(() => {});
        };

        // Try autoplay muted
        audio.play().catch(() => {});

        // Unmute on first click
        document.addEventListener("click", unmute, { once: true });

        return () => {
            audio.pause();
            document.removeEventListener("click", unmute);
        };
    }, []);
}

// ── Screen shake hook (attached to btn-primary clicks)
function useScreenShake() {
    useEffect(() => {
        const fn = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (t.closest?.(".btn-primary, .shake-on-click")) {
                document.body.classList.add("screen-shake");
                setTimeout(() => document.body.classList.remove("screen-shake"), 400);
            }
        };
        document.addEventListener("click", fn);
        return () => document.removeEventListener("click", fn);
    }, []);
}

// ── Hit flash on section entry
function useHitFlash() {
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const flash = document.getElementById("boss-hit-flash");
                        if (flash) {
                            flash.style.animation = "none";
                            void flash.offsetHeight; // reflow
                            flash.style.animation = "hitFlash 0.5s ease-out forwards";
                        }
                    }
                }),
                { threshold: 0.3 }
            }
        );
        document.querySelectorAll("section").forEach((s) => obs.observe(s));
        return () => obs.disconnect();
    }, []);
}

// ── Ink wipe reveal on page load
function useInkReveal() {
    useEffect(() => {
        const wipe = document.getElementById("ink-wipe");
        if (!wipe) return;
        // Animate wipe away after 1s
        setTimeout(() => {
            wipe.style.animation = "inkWipeOut 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards";
        }, 800);
        setTimeout(() => {
            wipe.style.display = "none";
        }, 2100);
    }, []);
}

export default function BossArena() {
    useBossAudio();
    useScreenShake();
    useHitFlash();
    useInkReveal();

    return (
        <>
            {/* ══════════════════════════════════════════════════
                INK WIPE PAGE LOAD REVEAL
            ══════════════════════════════════════════════════ */}
            <div
                id="ink-wipe"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9999,
                    background: "#000000",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    pointerEvents: "none",
                }}
            >
                {/* Gold slash line */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #B4833D, #D4A95A, #B4833D, transparent)",
                    boxShadow: "0 0 20px rgba(201,168,76,0.8)",
                    animation: "inkSlash 0.5s ease-out 0.3s both",
                }} />
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(1.5rem, 5vw, 3rem)",
                    color: "#B4833D",
                    letterSpacing: "0.3em",
                    textShadow: "0 0 20px rgba(201,168,76,0.8)",
                    whiteSpace: "nowrap",
                    animation: "fadeInOut 1.5s ease-in-out both",
                }}>
                    ✦ ENTER THE ARENA ✦
                </div>
            </div>

            {/* ══════════════════════════════════════════════════
                HIT FLASH OVERLAY
            ══════════════════════════════════════════════════ */}
            <div
                id="boss-hit-flash"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 98,
                    pointerEvents: "none",
                    background: "rgba(139, 0, 0, 0)",
                }}
            />

            {/* ══════════════════════════════════════════════════
                ATMOSPHERIC BACKGROUND
            ══════════════════════════════════════════════════ */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: -2,
                    overflow: "hidden",
                }}
            >
                {/* Background image — dark mythological forest */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url("https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1920&q=80&fit=crop")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    filter: "brightness(0.25) saturate(0.6) sepia(0.3)",
                }} />

                {/* Dark ink overlay */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(5,5,7,0.72) 0%, rgba(5,5,7,0.55) 40%, rgba(5,5,7,0.8) 100%)",
                }} />

                {/* Stone texture noise */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
                    opacity: 0.6,
                }} />

                {/* ── PULSING VIGNETTE (boss arena edges) ── */}
                <div
                    className="boss-vignette"
                    style={{
                        position: "absolute",
                        inset: 0,
                        boxShadow: "inset 0 0 120px rgba(139,0,0,0.5)",
                        animation: "vignettePulse 2s ease-in-out infinite alternate",
                    }}
                />

                {/* ── BOSS ARENA GROUND GLOW ── */}
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    background: "radial-gradient(ellipse at bottom, rgba(201,168,76,0.12) 0%, rgba(139,0,0,0.06) 40%, transparent 70%)",
                    animation: "groundPulse 4s ease-in-out infinite alternate",
                }} />

                {/* ── BOSS SILHOUETTE — Sun Wukong / Warrior ── */}
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    right: "5%",
                    width: "clamp(300px, 35vw, 600px)",
                    height: "80vh",
                    backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Havoc_in_Heaven_%281961%29_-_Sun_Wukong.png/800px-Havoc_in_Heaven_%281961%29_-_Sun_Wukong.png")`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "bottom center",
                    opacity: 0.1,
                    filter: "sepia(1) hue-rotate(10deg) brightness(0.5) contrast(1.4)",
                    animation: "bossBreath 4s ease-in-out infinite alternate",
                    mixBlendMode: "screen",
                    zIndex: 0,
                }} />

                {/* ── LIGHTNING / ENERGY CRACKS (SVG) ── */}
                <svg
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                    }}
                    viewBox="0 0 1400 900"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <filter id="glow-gold">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                        <filter id="glow-red">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>

                    {CRACKS.map((c, i) => (
                        <g key={i} filter="url(#glow-gold)">
                            <polyline
                                points={`${c.x1},${c.y1} ${c.x2},${c.y2} ${c.x3},${c.y3}`}
                                fill="none"
                                stroke={i % 2 === 0 ? "#B4833D" : "#D4A95A"}
                                strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
                                strokeDasharray="300"
                                strokeDashoffset="300"
                                style={{
                                    animation: `lightningDraw ${c.dur}s ${c.delay}s ease-in-out infinite`,
                                }}
                            />
                            {/* Sub-branch */}
                            <line
                                x1={c.x2} y1={c.y2}
                                x2={c.x2 + 30} y2={c.y2 + 60}
                                stroke="#8B0000"
                                strokeWidth={0.5}
                                strokeDasharray="100"
                                strokeDashoffset="100"
                                style={{
                                    animation: `lightningDraw ${c.dur * 0.7}s ${c.delay + 0.5}s ease-in-out infinite`,
                                }}
                            />
                        </g>
                    ))}

                    {/* Ground energy arcs */}
                    {[200, 500, 900, 1200].map((x, i) => (
                        <ellipse key={i}
                            cx={x} cy={870}
                            rx={80 + i * 20} ry={8}
                            fill="none"
                            stroke="#B4833D"
                            strokeWidth={0.5}
                            opacity={0.3}
                            style={{
                                animation: `groundArc ${3 + i}s ${i * 0.8}s ease-in-out infinite alternate`,
                            }}
                        />
                    ))}
                </svg>

                {/* ── FLOATING ROCKS / DEBRIS ── */}
                <div style={{ position: "absolute", inset: 0 }}>
                    {ROCKS.map((r, i) => (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                bottom: "-10%",
                                left: r.left,
                                width: r.size,
                                height: r.size,
                                background: `linear-gradient(135deg, #3A3028, #1A1008)`,
                                clipPath: i % 3 === 0
                                    ? "polygon(30% 0%, 70% 10%, 100% 40%, 80% 100%, 20% 90%, 0% 50%)"
                                    : i % 3 === 1
                                        ? "polygon(50% 0%, 100% 25%, 90% 75%, 10% 100%, 0% 30%)"
                                        : "polygon(20% 0%, 80% 0%, 100% 60%, 60% 100%, 0% 80%)",
                                boxShadow: `0 0 ${r.size}px rgba(201,168,76,0.3)`,
                                animation: `floatRock ${r.dur}s ${r.delay}s linear infinite`,
                                willChange: "transform",
                                "--rotate-end": `${r.rotate}deg`,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>

                {/* ── GOLDEN ENERGY ORBS ── */}
                <div style={{ position: "absolute", inset: 0 }}>
                    {ORBS.map((orb, i) => (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                left: orb.left,
                                top: orb.top,
                                width: orb.size,
                                height: orb.size,
                                borderRadius: "50%",
                                background: i % 2 === 0
                                    ? "radial-gradient(circle, rgba(201,168,76,0.35), rgba(201,168,76,0))"
                                    : "radial-gradient(circle, rgba(139,0,0,0.25), rgba(139,0,0,0))",
                                filter: "blur(2px)",
                                animation: `orbDrift ${orb.dur}s ${orb.delay}s ease-in-out infinite`,
                                "--drift-x": `${orb.driftX}px`,
                                mixBlendMode: "screen",
                                willChange: "transform",
                            } as React.CSSProperties}
                        />
                    ))}
                </div>

                {/* ── SMOKE / FOG LAYERS ── */}
                {[0, 1, 2].map((i) => (
                    <div key={i} style={{
                        position: "absolute",
                        bottom: 0,
                        left: `${-20 + i * 15}%`,
                        width: "150%",
                        height: "30%",
                        background: `radial-gradient(ellipse at ${30 + i * 20}% 80%, rgba(42,42,42,0.15) 0%, transparent 60%)`,
                        animation: `smokeRise ${8 + i * 3}s ${i * 2}s ease-in-out infinite alternate`,
                        filter: "blur(8px)",
                    }} />
                ))}
            </div>
        </>
    );
}

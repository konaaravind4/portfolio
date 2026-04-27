"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SignatureSection
 *
 * Pins the viewport while the "K. Aravind" signature draws itself
 * stroke-by-stroke, tied 1:1 to scroll position.  Once the final
 * stroke finishes the pin is released and the user continues scrolling
 * down to the Projects section.
 */
export default function SignatureSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = svgRef.current;
        const section = sectionRef.current;
        if (!svg || !section) return;

        const paths = Array.from(
            svg.querySelectorAll<SVGGeometryElement>("path, circle, ellipse")
        );

        /* ── 1. Pre-measure and hide all paths ─────────────────── */
        paths.forEach((p) => {
            const len = p.getTotalLength?.() ?? 30;
            gsap.set(p, {
                strokeDasharray: len,
                strokeDashoffset: len,
            });
        });

        /* ── 2. Build a scrubbed timeline ───────────────────────── */
        const tl = gsap.timeline({ defaults: { ease: "none" } });

        paths.forEach((p) => {
            const len = p.getTotalLength?.() ?? 30;
            tl.to(p, { strokeDashoffset: 0, duration: len / 400 }, "<0.15");
        });

        /* ── 3. Attach ScrollTrigger (pin + scrub) ──────────────── */
        ScrollTrigger.create({
            trigger: section,
            pin: true,
            pinSpacing: true,          // pushes following content down
            start: "top top",
            end: () => `+=${window.innerHeight * 2.5}`, // 2.5× viewport scroll distance
            scrub: 0.6,
            animation: tl,
            anticipatePin: 1,
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            id="signature-section"
            className="relative w-full flex items-center justify-center"
            style={{ height: "100vh", background: "#09090B" }}
        >
            {/* Subtle radial glow behind the signature */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "60vw",
                    height: "40vh",
                    background:
                        "radial-gradient(ellipse at center, rgba(164,218,101,0.07) 0%, transparent 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Signature label */}
            <p
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono tracking-widest uppercase"
                style={{ color: "rgba(164,218,101,0.35)" }}
            >
                K. Aravind
            </p>

            {/* ── The SVG Signature ──────────────────────────────── */}
            <svg
                ref={svgRef}
                viewBox="0 0 900 280"
                fill="none"
                stroke="#A4DA65"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "min(85vw, 800px)", height: "auto", filter: "drop-shadow(0 0 8px #A4DA65aa)" }}
                aria-label="Kona Aravind signature"
            >
                {/* ── K  ─────────────────────────────────── */}
                {/* vertical bar */}
                <path d="M 78,52 C 76,90 74,140 72,195 L 71,228" />
                {/* upper arm */}
                <path d="M 76,148 C 93,128 112,106 135,84 C 145,73 154,63 160,55" />
                {/* lower arm with small curl */}
                <path d="M 76,148 C 95,170 116,193 142,218 C 149,226 158,230 166,226 C 169,224 170,220 167,217" />

                {/* ── Period dot ─────────────────────────── */}
                <ellipse cx="184" cy="222" rx="5" ry="5" />

                {/* ── Large circular A loop ───────────────── */}
                <path d="
                    M 222,210
                    C 202,185 194,152 200,122
                    C 207,88 232,68 268,63
                    C 308,57 348,76 362,112
                    C 374,142 366,176 346,197
                    C 330,213 308,222 284,221
                    C 258,219 236,206 222,192
                " />

                {/* Exit stroke from loop → r */}
                <path d="
                    M 326,215
                    C 345,220 366,217 382,207
                    C 396,197 404,185 406,175
                    C 408,166 403,160 395,163
                    C 387,166 383,177 388,189
                    C 393,202 408,208 424,206
                " />

                {/* a */}
                <path d="
                    M 424,206
                    C 440,206 458,197 465,183
                    C 471,170 466,160 456,161
                    C 446,162 438,173 440,187
                    C 442,201 455,210 470,208
                    C 481,207 488,199 493,190
                " />

                {/* v */}
                <path d="M 493,190 C 502,174 514,158 524,150" />
                <path d="M 524,150 C 531,162 537,177 545,193 C 549,201 554,208 558,210" />

                {/* i  (stem) */}
                <path d="
                    M 558,210
                    C 563,204 565,194 564,184
                    C 563,175 558,170 553,173
                    C 548,176 546,186 548,197
                    C 550,208 558,216 568,215
                " />
                {/* i  dot */}
                <ellipse cx="560" cy="157" rx="4.5" ry="4.5" />

                {/* n */}
                <path d="
                    M 568,215
                    C 576,208 583,196 585,183
                    C 587,172 583,165 576,165
                    C 569,165 563,174 564,188
                    C 565,202 574,214 586,218
                    C 598,222 612,214 619,202
                " />

                {/* d */}
                <path d="
                    M 619,202
                    C 628,186 634,164 630,142
                    C 626,122 611,114 598,121
                    C 585,128 580,147 583,165
                    C 586,182 598,196 614,200
                    C 627,203 638,196 643,183
                    C 647,172 643,160 636,152
                " />

                {/* ── Trailing underline flourish ─────────── */}
                <path d="
                    M 292,248
                    C 370,257 458,256 548,246
                    C 583,242 614,233 638,222
                    C 650,217 657,208 653,202
                " />
            </svg>
        </div>
    );
}

"use client";

import { useEffect, useRef } from "react";
import type { HyperspeedOptions } from "./HyperspeedEngine";
import "./Hyperspeed.css";

interface HyperspeedProps {
    effectOptions?: HyperspeedOptions;
}

export default function Hyperspeed({ effectOptions = {} }: HyperspeedProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let app: import("./HyperspeedEngine").HyperspeedApp | null = null;

        import("./HyperspeedEngine").then(
            ({ HyperspeedApp, buildDistortions, DEFAULT_OPTIONS }) => {
                // Clean up any previous canvas
                while (container.firstChild) container.removeChild(container.firstChild);

                const distortions = buildDistortions();
                const merged = {
                    ...DEFAULT_OPTIONS,
                    ...effectOptions,
                    colors: { ...DEFAULT_OPTIONS.colors, ...effectOptions.colors },
                };
                const key = (merged.distortion as string) in distortions
                    ? (merged.distortion as keyof ReturnType<typeof buildDistortions>)
                    : "turbulentDistortion";
                (merged as any).distortion = distortions[key];

                app = new HyperspeedApp(container, merged);
                app.init();
            }
        );

        return () => {
            app?.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div id="hyperspeed-bg" ref={containerRef} />;
}

"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import './PixelTransition.css';

interface PixelTransitionProps {
    firstContent: React.ReactNode;
    secondContent: React.ReactNode;
    gridSize?: number;
    pixelColor?: string;
    animationStepDuration?: number;
    once?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export default function PixelTransition({
    firstContent,
    secondContent,
    gridSize = 7,
    pixelColor = '#A4DA65',
    animationStepDuration = 0.3,
    once = false,
    className = '',
    style = {},
}: PixelTransitionProps) {
    const pixelGridRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLDivElement>(null);
    const delayedCallRef = useRef<gsap.core.Tween | null>(null);
    const isActiveRef = useRef(false);
    const [isActive, setIsActive] = useState(false);

    /* Build pixel grid on mount / when gridSize changes */
    useEffect(() => {
        const grid = pixelGridRef.current;
        if (!grid) return;
        grid.innerHTML = '';
        const size = 100 / gridSize;
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const px = document.createElement('div');
                px.className = 'pixelated-image-card__pixel';
                px.style.backgroundColor = pixelColor;
                px.style.width = `${size}%`;
                px.style.height = `${size}%`;
                px.style.left = `${col * size}%`;
                px.style.top = `${row * size}%`;
                grid.appendChild(px);
            }
        }
    }, [gridSize, pixelColor]);

    const animate = useCallback((activate: boolean) => {
        isActiveRef.current = activate;
        setIsActive(activate);

        const grid = pixelGridRef.current;
        const active = activeRef.current;
        if (!grid || !active) return;

        const pixels = grid.querySelectorAll<HTMLElement>('.pixelated-image-card__pixel');
        if (!pixels.length) return;

        gsap.killTweensOf(pixels);
        delayedCallRef.current?.kill();

        const stagger = animationStepDuration / pixels.length;

        gsap.set(pixels, { display: 'none' });

        /* Reveal pixels randomly */
        gsap.to(pixels, {
            display: 'block',
            duration: 0,
            stagger: { each: stagger, from: 'random' },
        });

        /* Swap active content halfway through */
        delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
            active.style.display = activate ? 'block' : 'none';
            active.style.pointerEvents = activate ? 'none' : '';
        });

        /* Hide pixels again */
        gsap.to(pixels, {
            display: 'none',
            duration: 0,
            delay: animationStepDuration,
            stagger: { each: stagger, from: 'random' },
        });
    }, [animationStepDuration]);

    const handleEnter = useCallback(() => {
        if (!isActiveRef.current) animate(true);
    }, [animate]);

    const handleLeave = useCallback(() => {
        if (isActiveRef.current && !once) animate(false);
    }, [animate, once]);

    return (
        <div
            className={`pixelated-image-card ${className}`}
            style={style}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            tabIndex={0}
            onFocus={handleEnter}
            onBlur={handleLeave}
        >
            {/* Default content — visible before hover */}
            <div className="pixelated-image-card__default" aria-hidden={isActive}>
                {firstContent}
            </div>

            {/* Active content — revealed after pixel wipe */}
            <div className="pixelated-image-card__active" ref={activeRef} aria-hidden={!isActive}>
                {secondContent}
            </div>

            {/* Pixel grid overlay */}
            <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
        </div>
    );
}

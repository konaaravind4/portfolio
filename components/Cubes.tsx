'use client';

import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cubes.css';

interface CubesProps {
    gridSize?: number;       // ignored when cols+rows are provided
    cols?: number;
    rows?: number;
    cubeSize?: number;
    maxAngle?: number;
    radius?: number;
    easing?: string;
    duration?: { enter: number; leave: number };
    cellGap?: number | { col?: number; row?: number };
    borderStyle?: string;
    faceColor?: string;
    shadow?: boolean | string;
    autoAnimate?: boolean;
    rippleOnClick?: boolean;
    rippleColor?: string;
    rippleSpeed?: number;
    /** per-cell background color override — length must equal gridSize*gridSize */
    cellColors?: string[];
}

const Cubes = ({
    gridSize = 10,
    cols,
    rows,
    cubeSize,
    maxAngle = 45,
    radius = 3,
    easing = 'power3.out',
    duration = { enter: 0.3, leave: 0.6 },
    cellGap,
    borderStyle = '1px solid #fff',
    faceColor = '#060010',
    shadow = false,
    autoAnimate = true,
    rippleOnClick = true,
    rippleColor = '#fff',
    rippleSpeed = 2,
    cellColors,
}: CubesProps) => {
    const numCols = cols ?? gridSize;
    const numRows = rows ?? gridSize;
    const sceneRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const userActiveRef = useRef(false);
    const simPosRef = useRef({ x: 0, y: 0 });
    const simTargetRef = useRef({ x: 0, y: 0 });
    const simRAFRef = useRef<number | null>(null);

    const colGap =
        typeof cellGap === 'number'
            ? `${cellGap}px`
            : (cellGap as { col?: number })?.col !== undefined
                ? `${(cellGap as { col: number }).col}px`
                : '5%';
    const rowGap =
        typeof cellGap === 'number'
            ? `${cellGap}px`
            : (cellGap as { row?: number })?.row !== undefined
                ? `${(cellGap as { row: number }).row}px`
                : '5%';

    const enterDur = duration.enter;
    const leaveDur = duration.leave;

    const tiltAt = useCallback(
        (rowCenter: number, colCenter: number) => {
            if (!sceneRef.current) return;
            sceneRef.current.querySelectorAll<HTMLElement>('.cube').forEach(cube => {
                const r = +cube.dataset.row!;
                const c = +cube.dataset.col!;
                const dist = Math.hypot(r - rowCenter, c - colCenter);
                if (dist <= radius) {
                    const pct = 1 - dist / radius;
                    const angle = pct * maxAngle;
                    gsap.to(cube, {
                        duration: enterDur,
                        ease: easing,
                        overwrite: true,
                        rotateX: -angle,
                        rotateY: angle,
                    });
                } else {
                    gsap.to(cube, {
                        duration: leaveDur,
                        ease: 'power3.out',
                        overwrite: true,
                        rotateX: 0,
                        rotateY: 0,
                    });
                }
            });
        },
        [radius, maxAngle, enterDur, leaveDur, easing]
    );

    const onPointerMove = useCallback(
        (e: PointerEvent) => {
            userActiveRef.current = true;
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

            const rect = sceneRef.current!.getBoundingClientRect();
            const cellW = rect.width / numCols;
            const cellH = rect.height / numRows;
            const colCenter = (e.clientX - rect.left) / cellW;
            const rowCenter = (e.clientY - rect.top) / cellH;

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

            idleTimerRef.current = setTimeout(() => {
                userActiveRef.current = false;
            }, 3000);
        },
        [numCols, numRows, tiltAt]
    );

    const resetAll = useCallback(() => {
        if (!sceneRef.current) return;
        sceneRef.current.querySelectorAll<HTMLElement>('.cube').forEach(cube =>
            gsap.to(cube, { duration: leaveDur, rotateX: 0, rotateY: 0, ease: 'power3.out' })
        );
    }, [leaveDur]);

    const onTouchMove = useCallback(
        (e: TouchEvent) => {
            e.preventDefault();
            userActiveRef.current = true;
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

            const rect = sceneRef.current!.getBoundingClientRect();
            const cellW = rect.width / numCols;
            const cellH = rect.height / numRows;
            const touch = e.touches[0];
            const colCenter = (touch.clientX - rect.left) / cellW;
            const rowCenter = (touch.clientY - rect.top) / cellH;

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

            idleTimerRef.current = setTimeout(() => {
                userActiveRef.current = false;
            }, 3000);
        },
        [numCols, numRows, tiltAt]
    );

    const onTouchStart = useCallback(() => {
        userActiveRef.current = true;
    }, []);

    const onTouchEnd = useCallback(() => {
        resetAll();
    }, [resetAll]);

    const onClick = useCallback(
        (e: MouseEvent) => {
            if (!rippleOnClick || !sceneRef.current) return;
            const rect = sceneRef.current.getBoundingClientRect();
            const cellW = rect.width / numCols;
            const cellH = rect.height / numRows;

            const colHit = Math.floor((e.clientX - rect.left) / cellW);
            const rowHit = Math.floor((e.clientY - rect.top) / cellH);

            const spreadDelay = 0.15 / rippleSpeed;
            const animDuration = 0.3 / rippleSpeed;
            const holdTime = 0.6 / rippleSpeed;

            const rings: Record<number, HTMLElement[]> = {};
            sceneRef.current.querySelectorAll<HTMLElement>('.cube').forEach(cube => {
                const r = +cube.dataset.row!;
                const c = +cube.dataset.col!;
                const dist = Math.hypot(r - rowHit, c - colHit);
                const ring = Math.round(dist);
                if (!rings[ring]) rings[ring] = [];
                rings[ring].push(cube);
            });

            Object.keys(rings)
                .map(Number)
                .sort((a, b) => a - b)
                .forEach(ring => {
                    const delay = ring * spreadDelay;
                    const faces = rings[ring].flatMap(cube =>
                        Array.from(cube.querySelectorAll<HTMLElement>('.cube-face'))
                    );
                    gsap.to(faces, { backgroundColor: rippleColor, duration: animDuration, delay, ease: 'power3.out' });
                    gsap.to(faces, {
                        backgroundColor: faceColor,
                        duration: animDuration,
                        delay: delay + animDuration + holdTime,
                        ease: 'power3.out',
                    });
                });
        },
        [rippleOnClick, numCols, numRows, faceColor, rippleColor, rippleSpeed]
    );

    /* Auto-animate idle wandering */
    useEffect(() => {
        if (!autoAnimate || !sceneRef.current) return;
        simPosRef.current = { x: Math.random() * numCols, y: Math.random() * numRows };
        simTargetRef.current = { x: Math.random() * numCols, y: Math.random() * numRows };
        const speed = 0.02;
        const loop = () => {
            if (!userActiveRef.current) {
                const pos = simPosRef.current;
                const tgt = simTargetRef.current;
                pos.x += (tgt.x - pos.x) * speed;
                pos.y += (tgt.y - pos.y) * speed;
                tiltAt(pos.y, pos.x);
                if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
                    simTargetRef.current = { x: Math.random() * numCols, y: Math.random() * numRows };
                }
            }
            simRAFRef.current = requestAnimationFrame(loop);
        };
        simRAFRef.current = requestAnimationFrame(loop);
        return () => { if (simRAFRef.current != null) cancelAnimationFrame(simRAFRef.current); };
    }, [autoAnimate, numCols, numRows, tiltAt]);

    /* Event listeners */
    useEffect(() => {
        const el = sceneRef.current;
        if (!el) return;
        el.addEventListener('pointermove', onPointerMove);
        el.addEventListener('pointerleave', resetAll);
        el.addEventListener('click', onClick);
        el.addEventListener('touchmove', onTouchMove, { passive: false });
        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchend', onTouchEnd, { passive: true });
        return () => {
            el.removeEventListener('pointermove', onPointerMove);
            el.removeEventListener('pointerleave', resetAll);
            el.removeEventListener('click', onClick);
            el.removeEventListener('touchmove', onTouchMove);
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchend', onTouchEnd);
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [onPointerMove, resetAll, onClick, onTouchMove, onTouchStart, onTouchEnd]);

    const sceneStyle: React.CSSProperties = {
        gridTemplateColumns: cubeSize
            ? `repeat(${numCols}, ${cubeSize}px)`
            : `repeat(${numCols}, 1fr)`,
        gridTemplateRows: cubeSize
            ? `repeat(${numRows}, ${cubeSize}px)`
            : `repeat(${numRows}, 1fr)`,
        columnGap: colGap,
        rowGap: rowGap,
    };

    const wrapperStyle: React.CSSProperties & Record<string, string> = {
        '--cube-face-border': borderStyle,
        '--cube-face-bg': faceColor,
        '--cube-face-shadow':
            shadow === true ? '0 0 6px rgba(0,0,0,.5)' : (shadow as string) || 'none',
        ...(cubeSize
            ? { width: `${numCols * cubeSize}px`, height: `${numRows * cubeSize}px` }
            : {}),
    };

    const rowCells = Array.from({ length: numRows });
    const colCells = Array.from({ length: numCols });

    return (
        <div className="default-animation" style={wrapperStyle}>
            <div ref={sceneRef} className="default-animation--scene" style={sceneStyle}>
                {rowCells.map((_, r) =>
                    colCells.map((__, c) => {
                        const idx = r * numCols + c;
                        const cellBg = cellColors?.[idx] ?? faceColor;
                        return (
                            <div key={`${r}-${c}`} className="cube" data-row={r} data-col={c}>
                                <div className="cube-face cube-face--top" style={{ background: cellBg }} />
                                <div className="cube-face cube-face--bottom" style={{ background: cellBg }} />
                                <div className="cube-face cube-face--left" style={{ background: cellBg }} />
                                <div className="cube-face cube-face--right" style={{ background: cellBg }} />
                                <div className="cube-face cube-face--front" style={{ background: cellBg }} />
                                <div className="cube-face cube-face--back" style={{ background: cellBg }} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Cubes;

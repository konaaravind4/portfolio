"use client";

import React, {
    useCallback, useRef, useState,
    forwardRef, useImperativeHandle, useMemo, useEffect,
} from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

export interface StaggeredMenuItem { label: string; link: string; ariaLabel?: string; }
export interface StaggeredMenuHandle { toggle: () => void; close: () => void; }

interface StaggeredMenuProps {
    position?: 'left' | 'right';
    colors?: string[];
    items?: StaggeredMenuItem[];
    socialItems?: StaggeredMenuItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    className?: string;
    showHeader?: boolean;
    accentColor?: string;
    isFixed?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

const StaggeredMenu = forwardRef<StaggeredMenuHandle, StaggeredMenuProps>(({
    position = 'right',
    colors = ['#1a2310', '#A4DA65'],
    items = [],
    socialItems = [],
    displaySocials = true,
    displayItemNumbering = true,
    className,
    showHeader = true,
    accentColor = '#A4DA65',
    isFixed = false,
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose,
}, ref) => {
    const [open, setOpen] = useState(false);
    const openRef = useRef(false);
    const panelRef = useRef<HTMLElement>(null);

    /* ── Derived prelayer colors ─────────────────────────── */
    const prelayerColors = useMemo(() => {
        const raw = colors?.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
        let arr = [...raw];
        if (arr.length >= 3) { const mid = Math.floor(arr.length / 2); arr.splice(mid, 1); }
        return arr;
    }, [colors]);

    /* ── Body class — drives the page-push CSS transition ─── */
    useEffect(() => {
        if (open) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
        return () => document.body.classList.remove('menu-open');
    }, [open]);

    /* ── Animate items on open ───────────────────────────── */
    useEffect(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

        if (open) {
            // Animate items in after a short delay (CSS transition opens the panel first)
            gsap.set(itemEls, { yPercent: 140, rotate: 10, opacity: 0 });
            gsap.set(numberEls.length ? numberEls : [], { '--sm-num-opacity': 0 } as gsap.TweenVars);
            if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
            gsap.set(socialLinks, { y: 20, opacity: 0 });

            const delay = 0.35; // wait for panel CSS transition
            gsap.to(itemEls, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.7, ease: 'power4.out', stagger: 0.08, delay });
            if (numberEls.length) {
                gsap.to(numberEls, { '--sm-num-opacity': 1, duration: 0.5, ease: 'power2.out', stagger: 0.07, delay: delay + 0.1 } as gsap.TweenVars);
            }
            if (socialTitle) gsap.to(socialTitle, { opacity: 1, duration: 0.4, delay: delay + 0.3 });
            gsap.to(socialLinks, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.07, delay: delay + 0.35 });
        } else {
            // Reset items immediately on close
            gsap.killTweensOf([...itemEls, ...numberEls, ...socialLinks, ...(socialTitle ? [socialTitle] : [])]);
            gsap.set(itemEls, { yPercent: 140, rotate: 10, opacity: 0 });
            if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 } as gsap.TweenVars);
            if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
            gsap.set(socialLinks, { y: 20, opacity: 0 });
        }
    }, [open]);

    /* ── Toggle / close ──────────────────────────────────── */
    const toggleMenu = useCallback(() => {
        const target = !openRef.current;
        openRef.current = target;
        setOpen(target);
        if (target) onMenuOpen?.();
        else onMenuClose?.();
    }, [onMenuOpen, onMenuClose]);

    const closeMenu = useCallback(() => {
        if (!openRef.current) return;
        openRef.current = false;
        setOpen(false);
        onMenuClose?.();
    }, [onMenuClose]);

    useImperativeHandle(ref, () => ({ toggle: toggleMenu, close: closeMenu }));

    /* ── Click-away ──────────────────────────────────────── */
    useEffect(() => {
        if (!closeOnClickAway || !open) return;
        const handler = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) closeMenu();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [closeOnClickAway, open, closeMenu]);

    return (
        <div
            className={[className, 'staggered-menu-wrapper', isFixed ? 'fixed-wrapper' : '', open ? 'is-open' : ''].filter(Boolean).join(' ')}
            style={accentColor ? ({ '--sm-accent': accentColor } as React.CSSProperties) : undefined}
            data-position={position}
        >
            {/* Color pre-layers — animate via CSS transition, staggered by CSS delay */}
            {prelayerColors.map((c, i) => (
                <div key={i} className="sm-prelayer" style={{ background: c, transitionDelay: open ? `${i * 0.06}s` : `${(prelayerColors.length - 1 - i) * 0.04}s` }} />
            ))}

            {/* Sliding panel */}
            <aside ref={panelRef} id="staggered-menu-panel" className="staggered-menu-panel" aria-hidden={!open}>
                <div className="sm-panel-inner">
                    <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
                        {items?.length ? items.map((it, idx) => (
                            <li className="sm-panel-itemWrap" key={it.label + idx}>
                                <a className="sm-panel-item" href={it.link}
                                    data-index={idx + 1} onClick={() => closeMenu()}>
                                    <span className="sm-panel-itemLabel">{it.label}</span>
                                </a>
                            </li>
                        )) : (
                            <li className="sm-panel-itemWrap" aria-hidden="true">
                                <span className="sm-panel-item"><span className="sm-panel-itemLabel">No items</span></span>
                            </li>
                        )}
                    </ul>
                    {displaySocials && socialItems && socialItems.length > 0 && (
                        <div className="sm-socials" aria-label="Social links">
                            <h3 className="sm-socials-title">Socials</h3>
                            <ul className="sm-socials-list" role="list">
                                {socialItems.map((s, i) => (
                                    <li key={s.label + i}>
                                        <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">{s.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
});

StaggeredMenu.displayName = 'StaggeredMenu';
export default StaggeredMenu;

"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const RobotScene = dynamic(() => import("@/components/three/RobotScene"), { ssr: false });

export default function RobotSection() {
    return (
        <section id="robot-scene" className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full glass border border-neon-violet/20 text-xs font-medium text-purple-400">
                        <Bot className="w-3.5 h-3.5" />
                        A Child&apos;s Dream · Three.js Scene
                    </div>
                    <h2 className="section-heading mb-2">Where It All Started</h2>
                    <p className="text-slate-500 text-sm max-w-lg mx-auto">
                        Every AI engineer was once a curious child who dreamed of robots.
                        Here&apos;s mine — drawing robots in a neon world.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="glass-card rounded-2xl overflow-hidden border border-neon-violet/10"
                >
                    <RobotScene />
                </motion.div>
            </div>
        </section>
    );
}

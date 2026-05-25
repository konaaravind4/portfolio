"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, MapPin, Mail, Github, Linkedin, CheckCircle } from "lucide-react";

type FormData = { name: string; email: string; subject: string; message: string; };

const INPUT_STYLE = {
    width: "100%", padding: "0.625rem 1rem",
    background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.1)",
    fontSize: "0.875rem", color: "#0A0A0A", outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s", fontFamily: "'Inter', sans-serif",
    clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
} as const;

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try { await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); setSubmitted(true); reset(); } catch {} finally { setLoading(false); }
    };

    return (
        <section id="contact" className="py-28 relative" style={{ background: "transparent" }}>
            <div className="absolute inset-0 grid-bg opacity-15" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(173,248,2,0.03) 0%, transparent 60%)" }} />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(173,248,2,0.3), transparent)" }} />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-semibold" style={{ background: "rgba(173,248,2,0.08)", border: "1px solid rgba(173,248,2,0.25)", color: "#0A0A0A", fontFamily: "'JetBrains Mono', monospace", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                        <Mail className="w-3.5 h-3.5" style={{ color: "var(--gold-primary)" }} /> Get In Touch
                    </div>
                    <h2 className="section-heading mb-4">Contact Me</h2>
                    <div className="section-divider max-w-xs mx-auto" />
                    <p className="text-sm max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>Open to research collaborations, internship opportunities, and interesting AI projects. Reach out — I respond within 24 hours.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 flex flex-col gap-6">
                        <div className="p-6 corner-ornament" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)", backdropFilter: "blur(12px)", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}>
                            <div className="space-y-5">
                                {[
                                    { Icon: Mail, label: "Email", content: <a href="mailto:konaaravind4@gmail.com" className="text-sm transition-colors" style={{ color: "var(--text-secondary)" }} onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")} onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>konaaravind4@gmail.com</a> },
                                    { Icon: MapPin, label: "Location", content: <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Hisar, Haryana, India</p> },
                                ].map(({ Icon, label, content }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <div className="w-9 h-9 border flex items-center justify-center" style={{ background: "rgba(173,248,2,0.08)", borderColor: "rgba(173,248,2,0.25)", clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))" }}>
                                            <Icon className="w-4 h-4" style={{ color: "var(--gold-primary)" }} />
                                        </div>
                                        <div>
                                            <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>{label}</p>
                                            {content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)", backdropFilter: "blur(12px)", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}>
                            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>Social Links</p>
                            {[
                                { Icon: Github, label: "GitHub", href: "https://github.com/konaaravind4", sub: "@konaaravind4" },
                                { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/konaaravind", sub: "Kona Aravind" },
                            ].map(({ Icon, label, href, sub }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-transparent transition-all duration-300 group mb-1" style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(173,248,2,0.25)"; e.currentTarget.style.background = "rgba(173,248,2,0.04)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; }}>
                                    <Icon className="w-4 h-4 transition-colors" style={{ color: "var(--text-muted)" }} />
                                    <div>
                                        <p className="text-sm transition-colors" style={{ color: "var(--text-secondary)" }}>{label}</p>
                                        <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>{sub}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-3">
                        {submitted ? (
                            <div className="p-10 border flex flex-col items-center justify-center text-center gap-4 h-full corner-ornament" style={{ background: "rgba(255,255,255,0.9)", borderColor: "rgba(173,248,2,0.3)", clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}>
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                                    <CheckCircle className="w-14 h-14" style={{ color: "var(--gold-primary)" }} />
                                </motion.div>
                                <h3 className="font-bold text-xl" style={{ color: "#0A0A0A", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Message Sent!</h3>
                                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>I&apos;ll respond within 24 hours.</p>
                                <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm cursor-target">Send Another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="p-6 border space-y-4" style={{ background: "rgba(255,255,255,0.8)", borderColor: "rgba(0,0,0,0.06)", clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))", backdropFilter: "blur(12px)" }}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs mb-1.5 block" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>Name</label>
                                        <input {...register("name", { required: true })} placeholder="Your Name" style={INPUT_STYLE} onFocus={e => { e.target.style.borderColor = "rgba(173,248,2,0.6)"; e.target.style.boxShadow = "0 0 12px rgba(173,248,2,0.1)"; }} onBlur={e => { e.target.style.borderColor = "rgba(0,0,0,0.1)"; e.target.style.boxShadow = "none"; }} />
                                        {errors.name && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>Required</p>}
                                    </div>
                                    <div>
                                        <label className="text-xs mb-1.5 block" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>Email</label>
                                        <input {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })} type="email" placeholder="you@example.com" style={INPUT_STYLE} onFocus={e => { e.target.style.borderColor = "rgba(173,248,2,0.6)"; e.target.style.boxShadow = "0 0 12px rgba(173,248,2,0.1)"; }} onBlur={e => { e.target.style.borderColor = "rgba(0,0,0,0.1)"; e.target.style.boxShadow = "none"; }} />
                                        {errors.email && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>Valid email required</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs mb-1.5 block" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>Subject</label>
                                    <input {...register("subject", { required: true })} placeholder="Collaboration on AI research..." style={INPUT_STYLE} onFocus={e => { e.target.style.borderColor = "rgba(173,248,2,0.6)"; e.target.style.boxShadow = "0 0 12px rgba(173,248,2,0.1)"; }} onBlur={e => { e.target.style.borderColor = "rgba(0,0,0,0.1)"; e.target.style.boxShadow = "none"; }} />
                                </div>
                                <div>
                                    <label className="text-xs mb-1.5 block" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>Message</label>
                                    <textarea {...register("message", { required: true })} rows={5} placeholder="Tell me about your project..." style={{ ...INPUT_STYLE, resize: "none" } as React.CSSProperties} onFocus={e => { e.target.style.borderColor = "rgba(173,248,2,0.6)"; e.target.style.boxShadow = "0 0 12px rgba(173,248,2,0.1)"; }} onBlur={e => { e.target.style.borderColor = "rgba(0,0,0,0.1)"; e.target.style.boxShadow = "none"; }} />
                                </div>
                                <button type="submit" disabled={loading} className="btn-primary w-full justify-center cursor-target">
                                    {loading ? (<span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Sending...</span>) : (<><Send className="w-4 h-4" /> Send Message</>)}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

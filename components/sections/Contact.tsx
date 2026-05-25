"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, MapPin, Mail, Github, Linkedin, CheckCircle } from "lucide-react";
import MathDoodle from "@/components/ui/MathDoodle";

type FormData = { name: string; email: string; subject: string; message: string; };

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            setSubmitted(true);
            reset();
        } catch { /* silent */ } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-16 relative" style={{ background: "transparent" }}>
            <MathDoodle count={4} />

            {/* Torn paper edge */}
            <div className="relative torn-top" />

            {/* Page label */}
            <div className="absolute top-4 right-6 page-label">
                Page 9
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-8 pl-16 sm:pl-24">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <h2
                        className="section-heading inline-block"
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        Drop me a note ✉️
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Kalam', cursive",
                            color: "var(--pencil)",
                            fontSize: "0.9rem",
                            fontStyle: "italic",
                            marginTop: "0.25rem",
                        }}
                    >
                        (open to research collabs, internships, and interesting AI projects)
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Left — contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Contact info list */}
                        <div>
                            <p
                                style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
                                    color: "var(--ink)",
                                    marginBottom: "0.75rem",
                                    borderBottom: "1px solid var(--line-blue)",
                                    paddingBottom: "0.4rem",
                                }}
                            >
                                📍 Find me here
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { Icon: Mail, label: "Email", content: "konaaravind4@gmail.com", href: "mailto:konaaravind4@gmail.com" },
                                    { Icon: MapPin, label: "Location", content: "Hisar, Haryana, India", href: null },
                                ].map(({ Icon, label, content, href }) => (
                                    <li
                                        key={label}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "0.6rem",
                                            marginBottom: "0.75rem",
                                        }}
                                    >
                                        <Icon
                                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                                            style={{ color: "var(--margin-red)" }}
                                        />
                                        <div>
                                            <span
                                                style={{
                                                    fontFamily: "'Patrick Hand', cursive",
                                                    fontSize: "0.72rem",
                                                    color: "var(--pencil)",
                                                    display: "block",
                                                }}
                                            >
                                                {label}
                                            </span>
                                            {href ? (
                                                <a
                                                    href={href}
                                                    style={{
                                                        fontFamily: "'Kalam', cursive",
                                                        fontSize: "0.9rem",
                                                        color: "var(--ink)",
                                                        textDecoration: "underline",
                                                        textDecorationColor: "var(--line-blue)",
                                                    }}
                                                >
                                                    {content}
                                                </a>
                                            ) : (
                                                <span
                                                    style={{
                                                        fontFamily: "'Kalam', cursive",
                                                        fontSize: "0.9rem",
                                                        color: "var(--ink)",
                                                    }}
                                                >
                                                    {content}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social links */}
                        <div>
                            <p
                                style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
                                    color: "var(--ink)",
                                    marginBottom: "0.75rem",
                                    borderBottom: "1px solid var(--line-blue)",
                                    paddingBottom: "0.4rem",
                                }}
                            >
                                🔗 Socials
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { Icon: Github, label: "GitHub", sub: "@konaaravind4", href: "https://github.com/konaaravind4" },
                                    { Icon: Linkedin, label: "LinkedIn", sub: "Kona Aravind", href: "https://linkedin.com/in/konaaravind" },
                                ].map(({ Icon, label, sub, href }) => (
                                    <li key={label} style={{ marginBottom: "0.6rem" }}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                                fontFamily: "'Kalam', cursive",
                                                fontSize: "0.9rem",
                                                color: "var(--ink)",
                                                textDecoration: "underline",
                                                textDecorationColor: "var(--margin-red)",
                                                textDecorationStyle: "dashed",
                                            }}
                                        >
                                            <Icon className="w-3.5 h-3.5" style={{ color: "var(--margin-red)" }} />
                                            {label}
                                            <span style={{ color: "var(--pencil)", fontSize: "0.8rem" }}>
                                                {sub}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        {submitted ? (
                            <div
                                className="notebook-page p-10 flex flex-col items-center justify-center text-center gap-4"
                                style={{ minHeight: "300px" }}
                            >
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                >
                                    <CheckCircle
                                        className="w-14 h-14"
                                        style={{ color: "#10b981" }}
                                    />
                                </motion.div>
                                <h3
                                    style={{
                                        fontFamily: "'Caveat', cursive",
                                        fontWeight: 700,
                                        fontSize: "1.8rem",
                                        color: "var(--ink)",
                                    }}
                                >
                                    Note received! 📬
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "'Kalam', cursive",
                                        fontSize: "0.95rem",
                                        color: "var(--pencil)",
                                        fontStyle: "italic",
                                    }}
                                >
                                    I&apos;ll respond within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="btn-hand"
                                    style={{ marginTop: "0.5rem" }}
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            style={{
                                                display: "block",
                                                fontFamily: "'Patrick Hand', cursive",
                                                fontSize: "0.75rem",
                                                color: "var(--pencil)",
                                                marginBottom: "0.3rem",
                                            }}
                                        >
                                            Name
                                        </label>
                                        <input
                                            {...register("name", { required: true })}
                                            placeholder="Your Name"
                                            className="nb-input"
                                        />
                                        {errors.name && (
                                            <p style={{ fontSize: "0.72rem", color: "#DC2626", fontFamily: "'Kalam', cursive" }}>
                                                Required
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                display: "block",
                                                fontFamily: "'Patrick Hand', cursive",
                                                fontSize: "0.75rem",
                                                color: "var(--pencil)",
                                                marginBottom: "0.3rem",
                                            }}
                                        >
                                            Email
                                        </label>
                                        <input
                                            {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                                            type="email"
                                            placeholder="you@example.com"
                                            className="nb-input"
                                        />
                                        {errors.email && (
                                            <p style={{ fontSize: "0.72rem", color: "#DC2626", fontFamily: "'Kalam', cursive" }}>
                                                Valid email required
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            fontFamily: "'Patrick Hand', cursive",
                                            fontSize: "0.75rem",
                                            color: "var(--pencil)",
                                            marginBottom: "0.3rem",
                                        }}
                                    >
                                        Subject
                                    </label>
                                    <input
                                        {...register("subject", { required: true })}
                                        placeholder="Collaboration on AI research..."
                                        className="nb-input"
                                    />
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            fontFamily: "'Patrick Hand', cursive",
                                            fontSize: "0.75rem",
                                            color: "var(--pencil)",
                                            marginBottom: "0.3rem",
                                        }}
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        {...register("message", { required: true })}
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        className="nb-input"
                                        style={{ resize: "none" }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-hand-primary w-full justify-center"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span
                                                className="w-4 h-4 border-2 rounded-full animate-spin"
                                                style={{ borderColor: "var(--ink)", borderTopColor: "transparent" }}
                                            />
                                            Sending...
                                        </span>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" /> Send Note →
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

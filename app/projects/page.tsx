import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { Cpu } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Kona Aravind — AI Engineer",
    description: "AI, ML, and multi-agent projects by Kona Aravind — neural translation, diffusion pipelines, RAG systems, and more.",
};

export default function ProjectsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-28 pb-20" style={{ background: "#09090B" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border text-xs font-medium"
                            style={{ background: "rgba(164,218,101,0.08)", borderColor: "rgba(164,218,101,0.25)", color: "#A4DA65" }}>
                            <Cpu className="w-3.5 h-3.5" />
                            All Projects
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black font-display gradient-text mb-4">
                            AI Systems Portfolio
                        </h1>
                        <p className="text-sm max-w-lg mx-auto" style={{ color: "#6B7280" }}>
                            Production-grade ML pipelines, multi-agent architectures, and generative AI systems.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

import { projects } from "@/lib/projects";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import type { Metadata } from "next";
import { getProjectBySlug } from "@/lib/projects";

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProjectBySlug(params.slug);
    if (!project) return { title: "Not Found" };
    return {
        title: `${project.title} | Kona Aravind`,
        description: project.tagline,
        openGraph: {
            title: project.title,
            description: project.tagline,
            type: "website",
        },
    };
}

export default function ProjectPage({ params }: Props) {
    return <ProjectDetailClient slug={params.slug} />;
}

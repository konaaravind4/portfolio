import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import GitHubSection from "@/components/sections/GitHub";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Projects />
                <Skills />
                <Timeline />
                <GitHubSection />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

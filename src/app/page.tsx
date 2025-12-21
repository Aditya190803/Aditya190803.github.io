import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About, { Skills } from "@/components/About";
import Certifications from "@/components/Certifications";

const Projects = dynamic(() => import("@/components/Projects"));
const Experience = dynamic(() => import("@/components/Experience"));
const Research = dynamic(() => import("@/components/Experience").then(mod => mod.Research));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Research />
      <Experience />
      <Contact />
    </main>
  );
}

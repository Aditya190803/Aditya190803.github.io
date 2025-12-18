import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About, { Skills } from "@/components/About";
import Projects from "@/components/Projects";
import Experience, { Research } from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Experience />
      <Contact />
    </main>
  );
}

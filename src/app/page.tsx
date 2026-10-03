import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work, { Products } from "@/components/Work";
import { Process, ResearchBand } from "@/components/Process";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Products />
        <Process />
        <ResearchBand />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

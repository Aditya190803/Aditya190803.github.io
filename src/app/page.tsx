import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Flier from "@/components/Flier";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Flier />
        <Services />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

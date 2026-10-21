import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Featured from "@/components/Featured";
import Work from "@/components/Work";
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
        <Statement />
        <Featured />
        <Work />
        <About />
        <Services />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

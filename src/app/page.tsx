import { Contact } from "@/components/Contact";
import { About, Faq, Hero, Projects, Research, Services, Work } from "@/components/Home";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Projects />
      <Services />
      <About />
      <Research />
      <Faq />
      <Contact />
    </>
  );
}

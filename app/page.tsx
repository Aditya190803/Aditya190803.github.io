import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ResumeSection from "@/components/resume-section"
import PublicationsSection from "@/components/publications-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <ResumeSection />
      <PublicationsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  )
}

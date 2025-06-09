"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react"

export default function HeroSection() {  const handleResumeView = () => {
    // Open resume in new tab for viewing
    window.open("/resume.pdf", "_blank", "noopener,noreferrer")
    console.log("Opening resume in new tab")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-bounce delay-300" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-primary/30 rounded-full animate-bounce delay-700" />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-primary/20 rounded-full animate-bounce delay-1000" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-primary/30 rounded-full animate-bounce delay-500" />
      </div>

      <div className="container relative z-10 py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Main Heading with Animation */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-1000">
              Aditya Mer
            </h1>
            <h2 className="text-xl md:text-3xl font-medium text-muted-foreground animate-in slide-in-from-bottom-4 duration-1000 delay-200">
              ML/DL Engineer & Gen AI Developer
            </h2>
            <p className="text-lg md:text-2xl text-primary font-medium animate-in slide-in-from-bottom-4 duration-1000 delay-400">
              Creating innovative AI solutions for a smarter tomorrow.
            </p>
          </div>

          {/* Personal Info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                22 years old
              </span>
              <span className="hidden md:inline">•</span>
              <span>📍 Mumbai, India</span>
              <span className="hidden md:inline">•</span>
              <a href="mailto:adityamer.work@gmail.com" className="hover:text-primary transition-colors">
                ✉️ adityamer.work@gmail.com
              </a>
            </div>
          </div>

          {/* Availability Status */}
          <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Open to freelancing opportunities
              </span>
            </div>
          </div>          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-8 animate-in slide-in-from-bottom-4 duration-1000 delay-800">
            <Button size="lg" className="group relative overflow-hidden" onClick={handleResumeView}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transition-transform group-hover:scale-105" />
              <span className="relative flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Resume
              </span>
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="group hover:scale-110 transition-transform" asChild>
                <a href="https://github.com/aditya190803" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="group hover:scale-110 transition-transform" asChild>
                <a
                  href="https://www.linkedin.com/in/adityamer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="group hover:scale-110 transition-transform" asChild>
                <a href="mailto:adityamer.work@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

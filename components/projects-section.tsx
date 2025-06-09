import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Star, Download, Package } from "lucide-react"

export default function ProjectsSection() {  const projects = [
    {
      name: "Fast Write",
      description:
        "AI-powered Python module for documentation generation with intelligent code analysis and automated documentation creation.",
      technologies: ["Python", "AI", "PyPI", "Documentation"],
      stats: "13k+ downloads on PyPI",
      github: "https://github.com/Aditya190803/fastwrite",
      pypi: "https://pypi.org/project/fastwrite/",      keyFeatures: [
        "Repository, function & inline documentation generation with context-aware understanding",
        "Multiple LLM support (OpenAI, Groq, Gemini, OpenRouter, Ollama)",
        "BLEU score comparison for documentation quality measurement"
      ],
      featured: true,
    },    {
      name: "OSFM-Net",
      description:
        "A powerful Python module designed for network system management, operating in both Server and Client modes for comprehensive IT infrastructure management.",
      technologies: ["Python", "Network Management", "Remote Desktop", "System Administration"],
      github: "https://github.com/Aditya190803/osfm/tree/osfm-net",
      pypi: "https://pypi.org/project/osfm/",
      keyFeatures: [
        "Dual-mode operation (Server and Client)",
        "Remote Desktop Access",
        "Application Management via Winget",
        "User Account Control",
        "Network Access Management",
        "Centralized System Administration"
      ],
    },{
      name: "Application Tracking System",
      description:
        "Gemini AI–based ATS resume scanner with intelligent matching and comprehensive analysis capabilities.",
      technologies: ["Gemini AI", "Streamlit", "Python", "NLP"],
      github: "https://github.com/Aditya190803/ATS-System",
      demo: "http://adityamer.live/Application-Tracking-System/",
      keyFeatures: [
        "AI-powered resume scanning and analysis",
        "Job description matching algorithms",
        "Skill gap identification",
        "ATS compatibility scoring",
        "Real-time feedback and suggestions"
      ],
    },    {
      name: "VerifiNews",
      description:
        "Advanced misinformation detection tool supporting multiple media types including text, images, audio, and video.",
      technologies: ["React", "AI", "Computer Vision", "NLP"],
      github: "https://github.com/Aditya190803/VerifiNews",
      keyFeatures: [
        "Multi-media misinformation detection",
        "Text, image, audio, and video analysis",
        "Real-time fact-checking capabilities",
        "AI-powered content verification",
        "Comprehensive reporting system"
      ],
      featured: true,
    },    {
      name: "AI Research Agent",
      description: "Autonomous literature review assistant powered by CrewAI for comprehensive research automation.",
      technologies: ["CrewAI", "Python", "Research", "Automation"],
      github: "https://github.com/Aditya190803/AI-Research-Agent",
      keyFeatures: [
        "Autonomous literature review generation",
        "Multi-agent research coordination",
        "Academic paper analysis and summarization",
        "Research trend identification",
        "Automated citation management"
      ],
    },    {
      name: "Chat With PDF",
      description:
        "Intelligent PDF interaction system combining Gemini AI and Langchain for natural document conversations.",
      technologies: ["Gemini", "Langchain", "Streamlit", "RAG"],
      github: "https://github.com/Aditya190803/Chat-with-PDF",
      demo: "https://adityamer.live/Chat-with-PDF/",
      keyFeatures: [
        "Natural language PDF interaction",
        "Context-aware document Q&A",
        "Multi-document conversation support",
        "RAG-based information retrieval",
        "Real-time document analysis"
      ],
    },    {
      name: "Chat with Website",
      description:
        "RAG-based website chatbot leveraging ChatGroq for intelligent web content interaction and analysis.",
      technologies: ["RAG", "ChatGroq", "Streamlit", "Web Scraping"],
      github: "https://github.com/Aditya190803/Chat-with-Website",
      demo: "https://adityamer.live/Chat-with-Website",
      keyFeatures: [
        "Real-time website content scraping",
        "Intelligent web content Q&A",
        "RAG-powered information retrieval",
        "Multi-page website analysis",
        "Context-aware conversational AI"
      ],
    },
  ]

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-muted/20">
        <div className="absolute inset-0 bg-gradient-to-bl from-background via-muted/10 to-background" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A showcase of innovative AI solutions and cutting-edge applications I've developed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`group flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-0 ${
                project.featured ? "ring-2 ring-primary/20 bg-gradient-to-br from-card to-primary/5" : ""
              }`}
            >
              <CardHeader className="relative">
                {project.featured && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground p-1 rounded-full">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                )}
                <CardTitle className="group-hover:text-primary transition-colors flex items-center gap-2">
                  {project.name}
                  {project.stats && <Download className="h-4 w-4 text-muted-foreground" />}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
              </CardHeader>              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {project.keyFeatures && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-foreground">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1 text-xs">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.stats && (
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Star className="h-4 w-4 fill-current" />
                    {project.stats}
                  </div>
                )}
              </CardContent>              <CardFooter className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1 group/btn" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                    GitHub
                  </a>
                </Button>
                {project.pypi && (
                  <Button variant="outline" size="sm" className="flex-1 group/btn" asChild>
                    <a href={project.pypi} target="_blank" rel="noopener noreferrer">
                      <Package className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      PyPI
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button variant="outline" size="sm" className="flex-1 group/btn" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

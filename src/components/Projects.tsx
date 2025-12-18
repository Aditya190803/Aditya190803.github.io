"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, ArrowUpRight, X, Package } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "GenAI", "ML", "Research", "Web"];
const categoryColors: Record<string, string> = {
  GenAI: "bg-coral",
  ML: "bg-mint",
  Research: "bg-purple text-white",
  Web: "bg-yellow",
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filteredProjects = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section id="projects" className="section-padding bg-white relative">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className=""
            >
              <SectionHeader icon={<Package size={24} />} iconBg="bg-coral" label="Selected Work" title="Projects" />
            </motion.div>
          </div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2 text-sm font-bold transition-all duration-300 border-3 border-black",
                  activeCategory === cat
                    ? "bg-black text-white"
                    : "bg-white hover:bg-black hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Projects List - Horizontal cards */}
      <div className="container mx-auto px-6">
        <motion.div layout className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group cursor-pointer"
              >
                <div className={cn(
                  "flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8 border-3 border-black transition-all duration-300",
                  hoveredIdx === idx ? "bg-black text-white" : "bg-white"
                )}>


                  {/* Category Tag */}
                  <div className={cn(
                    "pill shrink-0",
                    categoryColors[project.category] || "bg-cream"
                  )}>
                    {project.category}
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl font-black mb-1 flex items-center gap-3">
                      {project.title}
                      {project.featured && (
                        <Star size={18} className="text-yellow fill-yellow shrink-0" />
                      )}
                    </h3>
                    <p className={cn(
                      "text-sm line-clamp-1 transition-colors",
                      hoveredIdx === idx ? "text-white/70" : "text-black/60"
                    )}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Preview */}
                  <div className="hidden lg:flex gap-2 shrink-0">
                    {project.technologies.slice(0, 2).map((tech: string) => (
                      <span
                        key={tech}
                        className={cn(
                          "px-3 py-1 text-xs font-bold border-2 transition-colors",
                          hoveredIdx === idx ? "border-white/30 text-white/70" : "border-black/20 text-black/60"
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    size={32}
                    className={cn(
                      "shrink-0 transition-all duration-300",
                      hoveredIdx === idx ? "text-coral rotate-0" : "text-black/30 -rotate-45"
                    )}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal - Slide from right */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white z-[101] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b-3 border-black p-6 flex items-center justify-between z-10">
                <div className={cn("pill", categoryColors[selectedProject.category] || "bg-cream")}>
                  {selectedProject.category}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-coral transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  {selectedProject.featured && (
                    <span className="pill bg-yellow text-black">
                      <Star size={12} className="fill-black mr-1" /> Featured
                    </span>
                  )}
                </div>

                <h3 className="text-4xl md:text-5xl font-black mb-6">{selectedProject.title}</h3>
                <p className="text-lg text-black/70 mb-10 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Stats */}
                {selectedProject.stats && (
                  <div className="p-6 bg-mint mb-10 border-3 border-black">
                    <span className="text-xs font-bold uppercase tracking-widest block mb-1">Impact</span>
                    <span className="text-3xl font-black">{selectedProject.stats}</span>
                  </div>
                )}

                {/* Features */}
                <div className="mb-10">
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {selectedProject.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-coral text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-black/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-10">
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string) => (
                      <span key={tech} className="px-4 py-2 bg-cream border-2 border-black/10 text-sm font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-black text-white font-bold text-center flex items-center justify-center gap-3 hover:bg-coral transition-colors"
                  >
                    <Github size={20} /> View on GitHub
                  </a>
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 border-3 border-black font-bold text-center flex items-center justify-center gap-3 hover:bg-yellow transition-colors"
                    >
                      <ExternalLink size={20} /> Live Demo
                    </a>
                  )}
                  {selectedProject.pypi && (
                    <a
                      href={selectedProject.pypi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 border-3 border-black font-bold text-center flex items-center justify-center gap-3 hover:bg-mint transition-colors"
                    >
                      <Package size={20} /> PyPI Package
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

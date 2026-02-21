"use client";

import { motion } from "framer-motion";
import { Printer, Download, ArrowLeft, Mail, Phone, MapPin, Globe, Github, Linkedin, Copy, Check } from "lucide-react";
import { profile, education, experience, projects, skills, research } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";

export default function ResumePage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white text-black p-4 md:p-8 lg:p-12 print:p-0">
      {/* Navigation / Actions */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 border-3 border-black font-bold hover:bg-cream transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#000]"
        >
          <ArrowLeft size={20} />
          Back to Portfolio
        </Link>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white font-bold hover:bg-coral transition-all border-3 border-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#000]"
          >
            <Printer size={20} />
            Print Resume
          </button>
          <a
            href={profile.resumeUrl}
            download
            className="flex items-center gap-2 px-4 py-2 border-3 border-black font-bold hover:bg-yellow transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#000]"
          >
            <Download size={20} />
            Download PDF
          </a>
        </div>
      </div>

      {/* Resume Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white border-3 border-black shadow-brutal p-8 md:p-12 print:shadow-none print:border-none print:p-0"
      >
        {/* Header */}
        <header className="border-b-3 border-black pb-8 mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl font-bold text-coral mb-6">
            {profile.title}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm md:text-base">
            <div className="flex items-center gap-2 group">
              <Mail size={16} className="shrink-0" />
              <a href={`mailto:${profile.email}`} className="hover:underline font-medium">{profile.email}</a>
              <button
                onClick={copyEmail}
                className="ml-2 p-1 hover:bg-cream border border-transparent hover:border-black transition-all print:hidden"
                title="Copy Email"
              >
                {copied ? <Check size={14} className="text-mint" /> : <Copy size={14} />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} className="shrink-0" />
              <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">adityamer.live</a>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin size={16} className="shrink-0" />
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">linkedin.com/in/adityamer</a>
            </div>
            <div className="flex items-center gap-2">
              <Github size={16} className="shrink-0" />
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">github.com/aditya190803</a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0" />
              <span className="font-medium">{profile.location}</span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-black uppercase tracking-widest mb-4 bg-mint inline-block px-2 py-1 border-2 border-black">
            Professional Summary
          </h2>
          <p className="text-black/80 leading-relaxed font-medium">
            {profile.bio}
          </p>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="text-xl font-black uppercase tracking-widest mb-6 bg-yellow inline-block px-2 py-1 border-2 border-black">
            Work Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-3 border-black/10">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black rounded-full" />
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-black">{exp.role}</h3>
                    <p className="font-bold text-black/60">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{exp.period}</p>
                    <p className="text-xs font-bold text-black/40 uppercase">{exp.location}</p>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-black/70 font-medium">
                  {exp.highlights.map((highlight, j) => (
                    <li key={j} className="pl-2 -indent-5 ml-5">{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-10">
          <h2 className="text-xl font-black uppercase tracking-widest mb-6 bg-purple text-white inline-block px-2 py-1 border-2 border-black">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div key={i} className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <h3 className="text-lg font-black">{edu.degree}</h3>
                  <p className="font-bold text-black/60">{edu.institution}</p>
                </div>
                <p className="font-bold text-sm">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h2 className="text-xl font-black uppercase tracking-widest mb-6 bg-coral text-white inline-block px-2 py-1 border-2 border-black">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-black uppercase tracking-wider text-black/40 mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-cream border-2 border-black/10 text-xs font-bold hover:border-black hover:bg-white transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research */}
        <section className="mb-10">
          <h2 className="text-xl font-black uppercase tracking-widest mb-6 bg-blue text-white inline-block px-2 py-1 border-2 border-black">
            Research & Publications
          </h2>
          <div className="space-y-6">
            {research.papers.map((paper, i) => (
              <div key={i}>
                <h3 className="text-lg font-black mb-1">{paper.title}</h3>
                <p className="font-bold text-coral text-sm mb-2">{paper.venue} ({paper.year})</p>
                <p className="text-sm text-black/70 mb-3 italic">{paper.abstract}</p>
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 border border-black/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects */}
        <section>
          <h2 className="text-xl font-black uppercase tracking-widest mb-6 bg-black text-white inline-block px-2 py-1 border-2 border-black">
            Selected Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.filter(p => p.featured).map((project, i) => (
              <div key={i} className="p-4 border-2 border-black border-dashed flex flex-col">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h3 className="text-lg font-black leading-tight">{project.title}</h3>
                  <div className="flex gap-2 shrink-0 print:hidden">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black transition-colors" title="GitHub">
                        <Github size={16} />
                      </a>
                    )}
                    {(project.demo || project.pypi) && (
                      <a href={project.demo || project.pypi} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black transition-colors" title="Live Link">
                        <Globe size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-black/70 mb-3 line-clamp-2 md:line-clamp-3 lg:line-clamp-2 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="text-[10px] font-bold px-1.5 py-0.5 bg-black/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t-2 border-black border-dashed text-center text-xs font-bold text-black/30 uppercase tracking-widest">
          Generated from adityamer.live • Last Updated Dec 2025
        </footer>
      </motion.div>

      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
          }
          .section-padding {
            padding: 0 !important;
          }
          @page {
            margin: 2cm;
          }
        }
      `}</style>
    </main>
  );
}

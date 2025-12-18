"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience, education, research, profile } from "@/lib/data";
import { MapPin, Calendar, ArrowRight, ExternalLink, GraduationCap, Briefcase, FileText } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

export default function Experience() {
  const [activeTab, setActiveTab] = useState<"career" | "education">("career");

  return (
    <>
      {/* Experience Section with Toggle */}
      <section id="experience" className="section-padding bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cream/50 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Header with Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionHeader
              icon={activeTab === "career" ? <Briefcase size={24} /> : <GraduationCap size={24} />}
              iconBg="bg-coral"
              label={activeTab === "career" ? "Career Journey" : "Academic Background"}
              title={activeTab === "career" ? "Experience" : "Education"}
            />

            {/* Toggle Buttons */}
            <div className="inline-flex border-3 border-black">
              <button
                onClick={() => setActiveTab("career")}
                className={cn(
                  "px-6 py-3 font-bold text-sm flex items-center gap-2 transition-all duration-300",
                  activeTab === "career"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-cream"
                )}
              >
                <Briefcase size={18} />
                Work Experience
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={cn(
                  "px-6 py-3 font-bold text-sm flex items-center gap-2 transition-all duration-300 border-l-3 border-black",
                  activeTab === "education"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-cream"
                )}
              >
                <GraduationCap size={18} />
                Education
              </button>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {activeTab === "career" ? (
              <motion.div
                key="career"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-black/10 md:-translate-x-px" />

                  {/* Experience Items */}
                  <div className="space-y-12">
                    {experience.map((exp, idx) => (
                      <motion.div
                        key={exp.company + exp.role}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative grid md:grid-cols-2 gap-8 ${idx % 2 === 0 ? '' : 'md:direction-rtl'}`}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-coral border-4 border-white shadow-lg rounded-full -translate-x-1/2 mt-2 z-10" />

                        {/* Content Card */}
                        <div className={`ml-16 md:ml-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'}`}>
                          <div className="group p-6 bg-cream border-3 border-black hover:bg-black hover:text-white transition-all duration-300">
                            {/* Period Badge */}
                            <div className={`inline-flex items-center gap-2 px-3 py-1 bg-coral text-white text-xs font-bold mb-4 ${idx % 2 === 0 ? 'md:ml-auto' : ''}`}>
                              <Calendar size={12} />
                              {exp.period}
                            </div>
                            
                            <h3 className="text-xl font-black mb-1">{exp.role}</h3>
                            <p className="text-sm font-bold text-coral group-hover:text-coral mb-2">{exp.company}</p>
                            
                            <div className={`flex items-center gap-2 text-xs opacity-60 mb-4 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                              <MapPin size={12} />
                              {exp.location}
                            </div>

                            <ul className={`space-y-2 ${idx % 2 === 0 ? 'md:text-left' : ''}`}>
                              {exp.highlights.slice(0, 2).map((highlight, i) => (
                                <li key={i} className="text-xs opacity-70 flex items-start gap-2">
                                  <ArrowRight size={12} className="mt-0.5 shrink-0 text-mint group-hover:text-mint" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Empty space for alternating layout */}
                        <div className="hidden md:block" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Education Timeline - Same UI as Work Experience */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-black/10 md:-translate-x-px" />

                  {/* Education Items */}
                  <div className="space-y-12">
                    {education.map((edu, idx) => (
                      <motion.div
                        key={edu.degree}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative grid md:grid-cols-2 gap-8 ${idx % 2 === 0 ? '' : 'md:direction-rtl'}`}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-coral border-4 border-white shadow-lg rounded-full -translate-x-1/2 mt-2 z-10" />

                        {/* Content Card */}
                        <div className={`ml-16 md:ml-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'}`}>
                          <div className="group p-6 bg-cream border-3 border-black hover:bg-black hover:text-white transition-all duration-300">
                            {/* Period Badge */}
                            <div className={`inline-flex items-center gap-2 px-3 py-1 bg-coral text-white text-xs font-bold mb-4 ${idx % 2 === 0 ? 'md:ml-auto' : ''}`}>
                              <Calendar size={12} />
                              {edu.period}
                            </div>
                            
                            <h3 className="text-xl font-black mb-1">{edu.degree}</h3>
                            <p className="text-sm font-bold text-coral group-hover:text-coral mb-2">{edu.institution}</p>
                          </div>
                        </div>

                        {/* Empty space for alternating layout */}
                        <div className="hidden md:block" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

export function Research() {
  return (
    <section id="research" className="section-padding bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <SectionHeader icon={<FileText size={24} />} iconBg="bg-purple" label="Academic Work" title="Research & Publications" />
        </motion.div>
        
        {/* Papers */}
        <div className="space-y-8">
          {research.papers.map((paper, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="p-8 bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-shadow">
                {/* Paper Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-mint text-black text-xs font-bold">
                        {paper.status}
                      </span>
                      <span className="text-sm font-bold text-black/50">
                        {paper.venueShort} • {paper.year}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black leading-tight">
                      {paper.title}
                    </h3>
                  </div>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold hover:bg-coral transition-colors shrink-0"
                  >
                    View Paper
                    <ExternalLink size={16} />
                  </a>
                </div>

                {/* Venue */}
                <p className="text-lg font-medium text-black/70 mb-4 flex items-center gap-2">
                  <MapPin size={16} />
                  {paper.venue}
                </p>

                {/* Abstract */}
                <p className="text-black/60 mb-6 leading-relaxed">
                  {paper.abstract}
                </p>

                {/* Authors */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm font-bold text-black/50">Authors:</span>
                  {paper.authors.map((author: any, i: number) => {
                    const name = typeof author === 'string' ? author : author.name;
                    const url = typeof author === 'string' ? undefined : author.url;
                    const isMe = name.trim().toLowerCase() === profile.name.trim().toLowerCase();
                    const comma = i < paper.authors.length - 1 ? ',' : '';
                    const baseClass = `text-sm font-medium ${isMe ? 'text-coral font-bold' : 'text-black/70'}`;
                    return url ? (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${baseClass} hover:underline`}
                      >
                        {name}{comma}
                      </a>
                    ) : (
                      <span key={i} className={baseClass}>
                        {name}{comma}
                      </span>
                    );
                  })}
                </div>

                {/* Key Highlights */}
                <div className="border-t-2 border-black/10 pt-6">
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-black/50">
                    Key Contributions
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {paper.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 bg-cream border border-black/10"
                      >
                        <span className="w-6 h-6 bg-coral text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-black/70">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-black/5 text-xs font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

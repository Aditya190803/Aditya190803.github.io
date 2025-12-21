"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience, education, research } from "@/lib/data";
import { GraduationCap, Briefcase, FileText } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ExperienceItem from "@/components/ExperienceItem";
import ResearchCard from "@/components/ResearchCard";
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
                aria-label="Show Work Experience"
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
                aria-label="Show Education"
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
                      <ExperienceItem key={exp.company + exp.role} item={exp} idx={idx} />
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
                      <ExperienceItem key={edu.degree} item={edu} idx={idx} />
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
            <ResearchCard key={idx} paper={paper} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

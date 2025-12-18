"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { profile, skills } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Large decorative text */}
      <div className="absolute top-20 -left-20 text-[20rem] font-black text-black/[0.02] leading-none pointer-events-none select-none">
        ABOUT
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Asymmetric Grid */}
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column - Large Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="sticky top-20 md:top-32">
                <span className="pill bg-coral text-white mb-6">Who am I?</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[0.9]">
                  ML Engineer
                  <br />
                  <span className="text-stroke-thin">& Builder</span>
                </h2>
                
                {/* Stats as stickers */}
                <div className="flex gap-4 mt-12">
                  <div className="sticker bg-yellow px-6 py-4">
                    <span className="text-4xl font-black block">4+</span>
                    <span className="text-xs font-bold uppercase">Internships</span>
                  </div>
                  <div className="sticker bg-mint px-6 py-4 rotate-3">
                    <span className="text-4xl font-black block">10+</span>
                    <span className="text-xs font-bold uppercase">Projects</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              {/* Bio with pull quote style */}
              <div className="border-l-[6px] border-coral pl-8 mb-16">
                <p className="text-2xl md:text-3xl font-medium leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* What I Do - Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-8 bg-cream border-3 border-black group hover:bg-black hover:text-white transition-all duration-300 card-hover">
                  <span className="text-6xl font-black text-coral group-hover:text-coral">01</span>
                  <h3 className="text-xl font-bold mt-4 mb-2">Machine Learning</h3>
                  <p className="text-sm opacity-70 group-hover:opacity-90">Building ML models from prototype to production</p>
                </div>
                <div className="p-8 bg-cream border-3 border-black group hover:bg-black hover:text-white transition-all duration-300 card-hover">
                  <span className="text-6xl font-black text-mint group-hover:text-mint">02</span>
                  <h3 className="text-xl font-bold mt-4 mb-2">Generative AI</h3>
                  <p className="text-sm opacity-70 group-hover:opacity-90">LLM applications, RAG, agents, and more</p>
                </div>
                <div className="p-8 bg-cream border-3 border-black group hover:bg-black hover:text-white transition-all duration-300 card-hover">
                  <span className="text-6xl font-black text-yellow group-hover:text-yellow">03</span>
                  <h3 className="text-xl font-bold mt-4 mb-2">Research</h3>
                  <p className="text-sm opacity-70 group-hover:opacity-90">NLP, misinformation detection, CV</p>
                </div>
                <div className="p-8 bg-cream border-3 border-black group hover:bg-black hover:text-white transition-all duration-300 card-hover">
                  <span className="text-6xl font-black text-purple group-hover:text-purple">04</span>
                  <h3 className="text-xl font-bold mt-4 mb-2">Full Stack Dev</h3>
                  <p className="text-sm opacity-70 group-hover:opacity-90">React, Next.js, and modern web tech</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const skillCategories = Object.entries(skills);
  
  return (
    <section id="skills" className="py-20 bg-cream relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0a0a0a 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader icon={<Code size={24} />} iconBg="bg-coral" label="What I Work With" title="Skills & Tech Stack" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Grid layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map(([category, items], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="p-6 bg-white border-3 border-black hover:bg-black hover:text-white transition-all duration-300">
                  <span className="text-coral text-sm font-bold uppercase tracking-widest">0{idx + 1}</span>
                  <h3 className="text-xl font-bold mt-2 mb-6">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-cream text-xs font-medium border border-black/10 group-hover:bg-white/10 group-hover:border-white/20 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { type Experience, type Education } from "@/lib/data";

interface ExperienceItemProps {
  item: Experience | Education;
  idx: number;
}

export default function ExperienceItem({ item, idx }: ExperienceItemProps) {
  const isExperience = 'role' in item;
  
  return (
    <motion.div
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
        <div className="group p-6 bg-white border-3 border-black hover:bg-black hover:text-white transition-all duration-300">
          {/* Period Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 bg-coral text-white text-xs font-bold mb-4 ${idx % 2 === 0 ? 'md:ml-auto' : ''}`}>
            <Calendar size={12} />
            {item.period}
          </div>
          
          <h3 className="text-xl font-black mb-1">{isExperience ? item.role : item.degree}</h3>
          <p className="text-sm font-bold text-coral group-hover:text-coral mb-2">{isExperience ? item.company : item.institution}</p>
          
          {isExperience && (
            <div className={`flex items-center gap-2 text-xs opacity-60 mb-4 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
              <MapPin size={12} />
              {item.location}
            </div>
          )}

          {isExperience && item.highlights && (
            <ul className={`space-y-2 ${idx % 2 === 0 ? 'md:text-left' : ''}`}>
              {item.highlights.slice(0, 2).map((highlight, i) => (
                <li key={i} className="text-xs opacity-70 flex items-start gap-2">
                  <ArrowRight size={12} className="mt-0.5 shrink-0 text-mint group-hover:text-mint" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Empty space for alternating layout */}
      <div className="hidden md:block" />
    </motion.div>
  );
}

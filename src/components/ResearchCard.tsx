"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { type ResearchPaper, type Author, profile } from "@/lib/data";

interface ResearchCardProps {
  paper: ResearchPaper;
  idx: number;
}

export default function ResearchCard({ paper, idx }: ResearchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="group"
    >
      <div className="p-8 bg-cream border-3 border-black shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
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
            className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold hover:bg-coral transition-all shrink-0 border-3 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            aria-label={`View paper: ${paper.title}`}
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
          {paper.authors.map((author: Author, i: number) => {
            const name = author.name;
            const url = author.url;
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
  );
}

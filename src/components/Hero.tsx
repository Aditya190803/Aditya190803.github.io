"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, FileText } from "lucide-react";
import { profile } from "@/lib/data";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-cream relative overflow-hidden">

      {/* Floating Stickers */}
      <motion.div
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 1, rotate: -8 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-32 right-[15%] hidden lg:block"
      >
        <div className="sticker px-6 py-3 bg-yellow">
          <span className="font-black text-sm uppercase tracking-wider">Open to Work</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 1, rotate: 5 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute bottom-40 left-[10%] hidden lg:block"
      >
        <div className="sticker px-5 py-2 bg-mint">
          <span className="font-bold text-sm">ML/DL Engineer</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute top-[45%] right-[8%] hidden lg:block"
      >
        <div className="w-20 h-20 bg-coral blob" />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-center items-center text-center">
        <div className="max-w-5xl">
          {/* Name with mixed typography */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(3rem,15vw,12rem)] font-black leading-[0.85] tracking-tighter mb-6">
              <span className="block">Aditya</span>
              <span className="block text-stroke">Mer</span>
            </h1>
          </motion.div>

          {/* Tagline with highlight */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed"
          >
            Building <span className="funky-underline font-bold">scalable ML & GenAI systems</span> from research to production.
          </motion.p>

          {/* CTA Buttons - Asymmetric layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-16 justify-center"
          >
            <a
              href="#projects"
              className="group px-6 py-3 md:px-8 md:py-4 bg-black text-white font-bold text-base md:text-lg inline-flex items-center gap-3 hover:bg-coral transition-all border-3 border-black shadow-[6px_6px_0_0_#000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
            >
              See my work
              <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </a>
            <Link
              href="/resume"
              className="px-6 py-3 md:px-8 md:py-4 bg-white border-3 border-black font-bold text-base md:text-lg inline-flex items-center gap-3 hover:bg-yellow transition-all shadow-[6px_6px_0_0_#000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
            >
              <FileText size={20} />
              Interactive Resume
            </Link>
          </motion.div>

          {/* Social Links - Horizontal strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-6 justify-center"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-black/50">Connect</span>
            <div className="flex gap-3 items-center">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-3 border-black flex items-center justify-center bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                aria-label="GitHub Profile"
              >
                <Github size={22} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-3 border-black flex items-center justify-center bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={22} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-12 h-12 border-3 border-black flex items-center justify-center bg-white hover:bg-mint transition-all shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                aria-label="Email Me"
              >
                <Mail size={22} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-black text-white py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 text-lg font-bold uppercase tracking-widest">
              • ML Engineer • GenAI Developer • Research • Full Stack •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

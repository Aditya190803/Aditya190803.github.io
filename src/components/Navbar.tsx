"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Research", href: "#research" },
  { name: "Experience", href: "#experience" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-white border-b-3 border-black" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16 md:h-20">
            <div className="flex items-center flex-1 md:w-1/3">
              <a href="/" className="flex items-center gap-3" aria-label="Home">
                <Image
                  src="/logo.png"
                  alt="Aditya Mer logo"
                  width={48}
                  height={48}
                  priority
                  className="h-10 w-10 md:h-12 md:w-12 rounded-lg border-2 border-black bg-white shadow-[4px_4px_0_0_#0f0f0f]"
                />
              </a>
            </div>

            {/* Center - Nav (pill) */}
            <div className="flex-1 md:w-1/3 flex items-center justify-center">
              <div className="hidden md:flex items-center">
                <div className="flex items-center bg-black rounded-full px-2 py-2">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-5 py-2 text-sm font-bold text-white hover:bg-white hover:text-black rounded-full transition-all duration-200"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - CTA & Mobile */}
            <div className="flex-1 md:w-1/3 flex items-center justify-end gap-4">
              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden md:block px-6 py-3 bg-yellow border-3 border-black font-bold text-sm hover:bg-mint transition-colors"
              >
                Let's Talk
              </motion.a>

              <button
                className="md:hidden w-10 h-10 md:w-12 md:h-12 bg-black text-white flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black text-white hover:text-coral transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-12 px-10 py-4 bg-coral text-white font-bold text-xl"
            >
              Let's Talk →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

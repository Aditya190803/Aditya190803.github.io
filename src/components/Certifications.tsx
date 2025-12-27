"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/lib/data";

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="pill bg-purple text-white mb-4">Validation</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase">
                Certifications
              </h2>
            </div>
            <p className="text-sm font-bold uppercase tracking-widest opacity-50">
              Industry Recognized
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-white border-3 border-black hover:bg-black hover:text-white transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-purple/10 group-hover:bg-purple/20 flex items-center justify-center mb-6 transition-colors">
                    <Award className="w-6 h-6 text-purple" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-medium opacity-70 mb-2">
                    {cert.issuer} • {cert.date}
                  </p>
                  
                  {cert.credentialId && (
                    <p className="text-[10px] font-mono opacity-50 mb-4 group-hover:opacity-80">
                      ID: {cert.credentialId}
                    </p>
                  )}

                  {cert.skills && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cert.skills.map((skill, sIndex) => (
                        <span 
                          key={sIndex}
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-black/5 group-hover:bg-white/10 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple hover:underline"
                    >
                      Verify Certificate <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Decorative background number */}
                <span className="absolute -bottom-4 -right-4 text-8xl font-black text-black/[0.03] group-hover:text-white/[0.05] transition-colors pointer-events-none">
                  0{index + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

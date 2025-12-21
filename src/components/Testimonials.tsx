"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionHeader from "./SectionHeader";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <SectionHeader 
            icon={<Quote size={24} />} 
            iconBg="bg-yellow" 
            label="Kind Words" 
            title="Testimonials" 
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-cream border-3 border-black shadow-brutal relative"
            >
              <Quote className="absolute top-6 right-8 text-black/10" size={48} />
              <p className="text-lg font-bold mb-8 relative z-10">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-coral border-2 border-black rounded-full flex items-center justify-center text-white font-black">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black">{testimonial.name}</h4>
                  <p className="text-xs font-bold text-black/50 uppercase">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

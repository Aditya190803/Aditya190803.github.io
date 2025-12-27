"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, ArrowUpRight, CheckCircle, Loader2 } from "lucide-react";
import { profile } from "@/lib/data";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0a0a0a 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-12 bg-coral text-white flex items-center justify-center">
              <Mail size={24} />
            </span>
            <span className="text-sm font-bold uppercase tracking-widest">Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[0.9] tracking-tight">
            Let's
            <br />
            <span className="text-stroke-thin"> Connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-8 bg-white border-3 border-black shadow-brutal">
              <h3 className="text-2xl font-black mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border-3 border-black bg-white focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border-3 border-black bg-white focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 border-3 border-black bg-white focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group w-full px-6 py-3 md:px-8 md:py-4 bg-black text-white font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:bg-coral transition-all disabled:opacity-50 disabled:cursor-not-allowed border-3 border-black shadow-[6px_6px_0_0_#000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                  aria-label={status === "loading" ? "Sending message" : "Send message"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="text-danger text-sm text-center">Something went wrong. Please try again or email directly.</p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Column - Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Direct Email */}
            <div className="p-8 bg-coral text-white border-3 border-black shadow-brutal">
              <h3 className="text-xl font-black mb-4">Prefer Email?</h3>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 text-lg font-bold hover:underline"
              >
                {profile.email}
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            {/* Social Links */}
            <div className="p-8 bg-white border-3 border-black shadow-brutal">
              <h3 className="text-xl font-black mb-6">Find Me Online</h3>
              <div className="space-y-4">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 border-3 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                >
                  <Github size={24} />
                  <div className="flex-1">
                    <span className="font-bold block">GitHub</span>
                    <span className="text-xs opacity-60">Check out my code</span>
                  </div>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 border-3 border-black bg-white hover:bg-mint hover:text-black transition-all shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                >
                  <Linkedin size={24} />
                  <div className="flex-1">
                    <span className="font-bold block">LinkedIn</span>
                    <span className="text-xs opacity-60">Let's connect professionally</span>
                  </div>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-yellow border-3 border-black text-center">
                <span className="text-3xl font-black block">24h</span>
                <span className="text-xs font-bold opacity-70">Response Time</span>
              </div>
              <div className="p-6 bg-mint border-3 border-black text-center">
                <span className="text-3xl font-black block">100%</span>
                <span className="text-xs font-bold opacity-70">Commitment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

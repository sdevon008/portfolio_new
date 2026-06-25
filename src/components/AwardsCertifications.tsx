import React from "react";
import { Award, ShieldAlert, Star, ShieldCheck, Flame, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { PortfolioData } from "../types";

interface AwardsCertificationsProps {
  portfolio: PortfolioData;
}

export default function AwardsCertifications({ portfolio }: AwardsCertificationsProps) {
  // Helper to choose relevant icon for awards
  const getAwardIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("service") || t.includes("years")) {
      return <Star className="h-5 w-5 text-amber-400" />;
    }
    if (t.includes("catch") || t.includes("hazard")) {
      return <ShieldAlert className="h-5 w-5 text-emerald-400" />;
    }
    if (t.includes("sop") || t.includes("video")) {
      return <Flame className="h-5 w-5 text-orange-400" />;
    }
    return <Award className="h-5 w-5 text-brand-accent" />;
  };

  return (
    <section id="awards" className="relative py-20 bg-[#06080d] border-t border-slate-900 lg:py-28">
      {/* Background glowing gradients */}
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full radial-glow-subtle opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          
          {/* Awards column */}
          <div className="space-y-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-bold block mb-2">
                HONORS & MERITS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Corporate Awards & Wins
              </h2>
              <p className="mt-2 text-slate-400 font-sans text-sm">
                A track record of recognition for exceptional floor safety, proactive catch vigilance, and corporate training media excellence at SanDisk.
              </p>
            </div>

            <div className="space-y-5">
              {portfolio.awards.map((award, index) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-5 rounded-xl border border-slate-800/60 bg-[#0d101a]/70 p-6 transition-all duration-300 hover:border-brand-primary/30 hover:bg-[#111526]/80"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#080a11] border border-slate-800">
                    {getAwardIcon(award.title)}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans text-base font-bold text-white">
                      {award.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications & Education column */}
          <div className="space-y-12">
            
            {/* Certifications Block */}
            <div className="space-y-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-bold block mb-2">
                  CREDENTIALS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Industry Certifications
                </h2>
                <p className="mt-2 text-slate-400 font-sans text-sm">
                  Global manufacturing safety, manual handling, and human leadership programs certified.
                </p>
              </div>

              <div className="space-y-5">
                {portfolio.certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-5 rounded-xl border border-slate-800/60 bg-[#0d101a]/70 p-6 transition-all duration-300 hover:border-brand-primary/30 hover:bg-[#111526]/80"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#080a11] border border-slate-800 text-teal-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-bold text-white">
                        {cert.title}
                      </h3>
                      <p className="mt-0.5 font-mono text-[10px] text-brand-accent uppercase font-bold tracking-wider">
                        Issuer: {cert.issuer}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Academic Foundation Block - Bento Grid style */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0d101a]/70 p-8 shadow-xl"
            >
              {/* Decorative top lights */}
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-brand-primary/10 blur-xl"></div>
              
              <div className="relative z-10 space-y-5">
                <div className="flex items-center space-x-3 text-brand-accent">
                  <GraduationCap className="h-6 w-6" />
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                    Academic Foundation
                  </span>
                </div>
                
                <div>
                  <h4 className="font-sans text-lg font-bold text-white">
                    {portfolio.education.degree}
                  </h4>
                  <p className="mt-1 font-sans text-sm text-slate-400">
                    {portfolio.education.school} • {portfolio.education.location}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between font-mono text-[10px] text-slate-500 border-t border-slate-900 pt-4">
                  <span>Standard Major: Science / General Math</span>
                  <span className="text-brand-accent font-bold">Nepalese Board</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}

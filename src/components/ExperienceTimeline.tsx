import React, { useState } from "react";
import { Briefcase, Calendar, MapPin, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioData } from "../types";

interface ExperienceTimelineProps {
  portfolio: PortfolioData;
}

export default function ExperienceTimeline({ portfolio }: ExperienceTimelineProps) {
  const [activeTab, setActiveTab] = useState<string>(portfolio.experience[0]?.id || "");
  const [viewMode, setViewMode] = useState<"all" | "tabs">("all"); // Default to "all" (Recruiter Mode) so nothing is hidden on first scroll!

  return (
    <section id="experience" className="relative py-20 bg-[#06080d] border-t border-slate-900 lg:py-28">
      {/* Background ambient lighting */}
      <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full radial-glow-subtle opacity-40 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div className="text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-bold block mb-2">
              CAREER JOURNEY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Professional Experience
            </h2>
            <p className="mt-2 text-slate-400 font-sans text-sm max-w-xl">
              A proven history of operational leadership and engineering excellence inside SanDisk & Western Digital's advanced facilities.
            </p>
          </div>

          {/* Toggle View Mode Control */}
          <div className="flex justify-center md:justify-end">
            <div className="inline-flex rounded-lg bg-[#0d101a] p-1 border border-slate-800/80">
              <button
                id="view-mode-all"
                onClick={() => setViewMode("all")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  viewMode === "all"
                    ? "bg-brand-primary text-white shadow-md shadow-purple-500/15"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                List All (Recruiter Mode)
              </button>
              <button
                id="view-mode-tabs"
                onClick={() => setViewMode("tabs")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  viewMode === "tabs"
                    ? "bg-brand-primary text-white shadow-md shadow-purple-500/15"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Interactive Tabs
              </button>
            </div>
          </div>
        </div>

        {viewMode === "all" ? (
          /* Recruiter Mode: Full-Width Vertical Chronological Timeline */
          <div className="relative border-l border-slate-800/80 ml-4 md:ml-6 pl-6 md:pl-10 space-y-10">
            {portfolio.experience.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Pulsing Node */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 flex h-[18px] w-[18px] md:h-6 md:w-6 items-center justify-center rounded-full bg-[#06080d] border border-brand-primary shadow-lg shadow-purple-500/30">
                  <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-brand-accent animate-pulse"></div>
                </div>

                <div className="bg-[#0d101a]/70 border border-slate-800/80 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl transition-all duration-300 hover:border-slate-700/50 hover:bg-[#0d101a]/90">
                  {/* Job Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-900 pb-5 mb-5">
                    <div>
                      <h3 className="font-sans text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                        <Briefcase className="h-5 w-5 text-brand-accent flex-shrink-0" />
                        {item.role}
                      </h3>
                      <span className="block font-sans text-sm font-semibold text-slate-300 mt-1">
                        {item.company}
                      </span>
                    </div>

                    <div className="mt-3 sm:mt-0 flex flex-wrap gap-2.5 font-mono text-[11px] text-slate-400">
                      <span className="inline-flex items-center gap-1.5 bg-[#080a11] px-2.5 py-1 rounded-full border border-slate-800/60">
                        <Calendar className="h-3.5 w-3.5 text-brand-accent flex-shrink-0" />
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-[#080a11] px-2.5 py-1 rounded-full border border-slate-800/60">
                        <MapPin className="h-3.5 w-3.5 text-brand-accent flex-shrink-0" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                      Core Accomplishments & Duties
                    </h4>
                    <ul className="space-y-3">
                      {item.highlights.map((highlight, hIndex) => (
                        <li
                          key={hIndex}
                          className="flex items-start space-x-3.5 text-slate-300"
                        >
                          <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-950/40 text-brand-accent border border-brand-primary/20">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="font-sans text-sm leading-relaxed text-slate-300">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Interactive Tab Mode: Side-by-side layout with left scrollable tabs */
          <div className="grid gap-10 lg:grid-cols-12">
            
            {/* Timeline tabs (Left side for desktop) */}
            <div className="lg:col-span-4">
              <div className="mb-3 block lg:hidden font-sans text-xs text-brand-accent font-medium text-center bg-[#0d101a] border border-slate-800/50 py-2 px-3 rounded-lg animate-pulse">
                ← Swipe horizontally to view other roles →
              </div>
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-4 lg:pb-0 scrollbar-none">
                {portfolio.experience.map((item) => (
                  <button
                    key={item.id}
                    id={`experience-tab-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex-shrink-0 lg:flex-shrink text-left rounded-xl p-5 transition-all duration-300 w-[290px] lg:w-full border ${
                      activeTab === item.id
                        ? "bg-[#0d101a] border-brand-primary/50 text-white shadow-lg shadow-purple-500/5"
                        : "border-slate-900 bg-[#080a11]/40 text-slate-400 hover:text-white hover:bg-[#0d101a]/30 hover:border-slate-800"
                    }`}
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-brand-accent">
                      {item.period}
                    </span>
                    <span className="block font-sans text-base font-bold mt-1 text-white">
                      {item.role}
                    </span>
                    <span className="block font-sans text-xs text-slate-400 mt-0.5">
                      {item.company}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline details (Right side for desktop) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {portfolio.experience.map((item) => {
                  if (item.id !== activeTab) return null;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#0d101a]/70 border border-slate-800/80 rounded-2xl p-6 sm:p-10 shadow-xl"
                    >
                      {/* Job Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-900 pb-6 mb-6">
                        <div>
                          <h3 className="font-sans text-xl font-bold text-white flex items-center gap-2.5">
                            <Briefcase className="h-5 w-5 text-brand-accent flex-shrink-0" />
                            {item.role}
                          </h3>
                          <span className="block font-sans text-sm font-semibold text-slate-300 mt-1">
                            {item.company}
                          </span>
                        </div>

                        <div className="mt-3 sm:mt-0 flex flex-wrap gap-3 font-mono text-[11px] text-slate-400">
                          <span className="inline-flex items-center gap-1.5 bg-[#080a11] px-2.5 py-1 rounded-full border border-slate-800/60">
                            <Calendar className="h-3.5 w-3.5 text-brand-accent flex-shrink-0" />
                            {item.period}
                          </span>
                          <span className="inline-flex items-center gap-1.5 bg-[#080a11] px-2.5 py-1 rounded-full border border-slate-800/60">
                            <MapPin className="h-3.5 w-3.5 text-brand-accent flex-shrink-0" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Highlights Bullet List */}
                      <div className="space-y-4">
                        <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                          Core Accomplishments & Duties
                        </h4>
                        <ul className="space-y-4">
                          {item.highlights.map((highlight, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.08 }}
                              className="flex items-start space-x-3.5 text-slate-300"
                            >
                              <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-950/40 text-brand-accent border border-brand-primary/20">
                                <Check className="h-3 w-3" />
                              </div>
                              <span className="font-sans text-sm leading-relaxed text-slate-300">
                                {highlight}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

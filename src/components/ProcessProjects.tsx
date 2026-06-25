import React from "react";
import { TrendingUp, AlertTriangle, Film, Layers, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { PortfolioData } from "../types";

interface ProcessProjectsProps {
  portfolio: PortfolioData;
}

export default function ProcessProjects({ portfolio }: ProcessProjectsProps) {
  const getProjectIcon = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("efficiency") || t.includes("process")) {
      return <TrendingUp className="h-5 w-5 text-brand-accent" />;
    }
    if (t.includes("downtime") || t.includes("trouble")) {
      return <AlertTriangle className="h-5 w-5 text-brand-accent" />;
    }
    if (t.includes("media") || t.includes("video") || t.includes("training")) {
      return <Film className="h-5 w-5 text-brand-accent" />;
    }
    return <Layers className="h-5 w-5 text-brand-accent" />;
  };

  return (
    <section id="projects" className="relative py-20 bg-[#080a11] border-t border-slate-900 lg:py-28">
      {/* Background radial glow */}
      <div className="absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full radial-glow-subtle opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14">
          <div className="text-center sm:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-bold block mb-2">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Selected Initiatives & Projects
            </h2>
            <p className="mt-2 text-slate-400 font-sans text-sm max-w-xl">
              Key floor developments and process enhancements that directly improved performance, training, and equipment uptime.
            </p>
          </div>
          
          <a
            href="#experience"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-accent hover:text-white transition-colors duration-200"
          >
            <span>View Timeline History</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Projects Grid matching "Selected Projects" from the reference image */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between rounded-xl border border-slate-800/60 bg-[#0d101a]/75 p-8 overflow-hidden transition-all duration-300 hover:border-brand-primary/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] hover:-translate-y-1"
            >
              {/* Giant background number overlay like the reference design */}
              <div className="absolute right-6 top-4 font-serif text-[110px] font-extrabold text-slate-900/10 select-none group-hover:text-brand-primary/5 transition-all duration-300">
                0{index + 1}
              </div>

              <div className="relative z-10 space-y-6">
                {/* Tag & Icon Row */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-purple-950/40 border border-brand-primary/20 px-3 py-1 font-mono text-[10px] font-bold text-brand-accent uppercase">
                    {project.tag}
                  </span>
                  
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 border border-slate-800">
                    {getProjectIcon(project.tag)}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-sans text-lg font-bold text-white group-hover:text-brand-accent transition-colors duration-200 leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 font-sans text-sm text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Quantified Impact Footer Section precisely modeled with a custom glow accent */}
              {project.impact && (
                <div className="relative z-10 mt-8 pt-6 border-t border-slate-900">
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500 font-extrabold mb-2">
                    QUANTIFIED IMPACT & METRIC
                  </span>
                  <div className="flex items-center space-x-2 font-sans text-xs font-bold text-white bg-brand-primary/10 border border-brand-primary/25 rounded-lg p-3 shadow-inner shadow-purple-500/5 group-hover:bg-brand-primary/20 group-hover:border-brand-primary/40 transition-all duration-300">
                    <Sparkles className="h-4 w-4 text-brand-accent animate-pulse" />
                    <span>{project.impact}</span>
                  </div>
                </div>
              )}

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

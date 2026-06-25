import React from "react";
import { Cpu, HardDrive, ShieldCheck, Microscope, Zap, Settings, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { PortfolioData } from "../types";

interface MachineGridProps {
  portfolio: PortfolioData;
}

export default function MachineGrid({ portfolio }: MachineGridProps) {
  // Map icons dynamically depending on category keywords with a premium purple theme
  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("die")) return <Cpu className="h-6 w-6 text-brand-accent animate-pulse" />;
    if (cat.includes("wire")) return <Zap className="h-6 w-6 text-brand-accent" />;
    if (cat.includes("mold")) return <HardDrive className="h-6 w-6 text-brand-accent" />;
    if (cat.includes("cure")) return <Settings className="h-6 w-6 text-brand-accent animate-[spin_8s_linear_infinite]" />;
    if (cat.includes("quality") || cat.includes("inspect")) return <Microscope className="h-6 w-6 text-brand-accent" />;
    return <ShieldCheck className="h-6 w-6 text-brand-accent" />;
  };

  return (
    <section id="machines" className="relative py-20 bg-[#080a11] border-t border-slate-900 lg:py-28">
      {/* Background radial glow */}
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full radial-glow-subtle opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching the reference style */}
        <div className="text-center md:text-left mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-bold block mb-2">
            SERVICES & EXPERTISE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Technical Domains & Systems
          </h2>
          <p className="mt-2 text-slate-400 font-sans text-sm max-w-xl">
            Certified expert handling high-precision automated systems in a world-class cleanroom environment.
          </p>
        </div>

        {/* Categories Grid - Matching "What I Do" layout exactly */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.machines.map((machine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col justify-between rounded-xl border border-slate-800/60 bg-[#0d101a]/70 p-8 transition-all duration-300 hover:border-brand-primary/40 hover:bg-[#111526]/80 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-1"
            >
              <div className="space-y-6">
                
                {/* Icon wrapper - purple colored, glowing, rounded border */}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/40 border border-brand-primary/20 group-hover:border-brand-primary/50 group-hover:bg-purple-900/40 shadow-inner shadow-purple-500/10 transition-colors duration-300">
                  {getCategoryIcon(machine.category)}
                </div>

                {/* Card Title */}
                <div>
                  <h3 className="font-sans text-lg font-bold text-white group-hover:text-brand-accent transition-colors duration-200">
                    {machine.category}
                  </h3>
                  
                  {/* Model Chips list */}
                  <div className="mt-4 space-y-1.5">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
                      Certified Systems & Standards
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {machine.models.split(/[,&]/).map((model, i) => {
                        const trimmed = model.trim();
                        if (!trimmed) return null;
                        return (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-md bg-[#080a11]/80 border border-slate-800/80 px-2.5 py-1 font-mono text-xs font-medium text-slate-300 group-hover:border-brand-primary/20 group-hover:text-white transition-colors"
                          >
                            {trimmed}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

              {/* Card Footer matching the "Learn More" links with arrow right from reference image */}
              <div className="mt-8 pt-6 border-t border-slate-900 flex items-center justify-between">
                <span className="inline-flex items-center text-xs font-semibold text-brand-accent group-hover:text-white transition-colors duration-200">
                  <span>Standard Specifications</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[9px] text-emerald-400 font-bold">
                  Certified
                </span>
              </div>

            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

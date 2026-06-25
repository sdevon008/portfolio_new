import React from "react";
import { Plane, Globe, MessageCircle, Shield, Globe2, Compass } from "lucide-react";
import { motion } from "motion/react";
import { PortfolioData } from "../types";

interface MobilityLanguagesProps {
  portfolio: PortfolioData;
}

export default function MobilityLanguages({ portfolio }: MobilityLanguagesProps) {
  return (
    <section id="mobility" className="relative py-20 bg-[#080a11] border-t border-slate-900 lg:py-28">
      {/* Background radial glow */}
      <div className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full radial-glow-subtle opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* International Mobility Profile */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-800 bg-[#0d101a]/70 p-6 sm:p-10 shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/40 border border-brand-primary/20 text-brand-accent">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold text-white">
                  Global Mobility Profile
                </h3>
                <p className="font-mono text-[10px] text-brand-accent uppercase tracking-wider font-bold">
                  International Deployment Ready
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-900 font-sans text-sm">
              <div className="flex justify-between py-4">
                <span className="text-slate-400">Nationality</span>
                <span className="font-bold text-white">{portfolio.mobility.nationality}</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-slate-400">Passport Status</span>
                <span className="font-bold text-brand-accent">{portfolio.mobility.passport}</span>
              </div>
              <div className="flex flex-col py-4 space-y-2">
                <span className="text-slate-400">Relocation Flexibility</span>
                <span className="text-xs text-slate-300 bg-[#080a11] border border-slate-900 p-3 rounded-lg leading-relaxed font-medium">
                  {portfolio.mobility.relocation}
                </span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-slate-400">Professional References</span>
                <span className="font-bold text-slate-300">{portfolio.mobility.references}</span>
              </div>
            </div>
          </motion.div>

          {/* Languages Section */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-800 bg-[#0d101a]/70 p-6 sm:p-10 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/40 border border-brand-primary/20 text-brand-accent">
                  <Globe2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold text-white">
                    Language Proficiencies
                  </h3>
                  <p className="font-mono text-[10px] text-brand-accent uppercase tracking-wider font-bold">
                    Multilingual Shift Coordination
                  </p>
                </div>
              </div>

              {/* Language Chips grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {portfolio.languages.map((lang, index) => (
                  <motion.div
                    key={lang.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-xl border border-slate-900 bg-[#080a11]/60 p-4 transition duration-300 hover:border-brand-primary/20"
                  >
                    <span className="block font-sans text-base font-bold text-white">
                      {lang.language}
                    </span>
                    <span className="mt-2 inline-flex items-center rounded-full bg-purple-950/40 border border-brand-primary/20 px-2.5 py-0.5 font-mono text-[10px] text-brand-accent font-bold">
                      {lang.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Note about Cleanroom Communication */}
            <div className="mt-8 flex items-start space-x-3.5 rounded-xl bg-[#080a11]/40 p-4 border border-slate-900">
              <MessageCircle className="h-5 w-5 text-brand-accent flex-shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Demonstrated team alignment capabilities in highly diverse international cleanroom environments. Successfully managed floor teams consisting of up to 20+ operators of various backgrounds under high pressure daily.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

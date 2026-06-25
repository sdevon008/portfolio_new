import React from "react";
import { Mail, Phone, MapPin, Award, Download, ArrowRight, MousePointer } from "lucide-react";
import { motion } from "motion/react";
import { PortfolioData } from "../types";

interface HeroProps {
  portfolio: PortfolioData;
}

export default function Hero({ portfolio }: HeroProps) {
  const handleDownload = (filePath: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="home" className="relative bg-[#080a11] text-white overflow-hidden">
      {/* Background radial ambient lights for that premium cosmic feel */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full radial-glow opacity-60 pointer-events-none"></div>
      <div className="absolute -left-10 top-1/3 h-[500px] w-[500px] rounded-full radial-glow-subtle opacity-40 pointer-events-none"></div>
      
      {/* Grid pattern overlays */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column - Information & Copy - order-2 on mobile, order-1 on desktop */}
          <div className="lg:col-span-8 space-y-6 order-2 lg:order-1">
            
            {/* "Hello, I'm" subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2"
            >
              <span className="h-[2px] w-6 bg-brand-primary"></span>
              <span className="font-mono text-sm tracking-wider text-brand-accent uppercase font-semibold">
                Hello, I'm
              </span>
            </motion.div>

            {/* Big Serif Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
            >
              {portfolio.name}
            </motion.h1>

            {/* Professional Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-sans text-lg sm:text-xl md:text-2xl font-light text-slate-300 tracking-wide"
            >
              {portfolio.title}
            </motion.h2>

            {/* Paragraph Summary */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-sm sm:text-base leading-relaxed text-slate-400 max-w-xl"
            >
              {portfolio.summary}
            </motion.p>

            {/* Unified Actions & Contacts - Structured for mobile-first responsiveness and desktop alignment */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="space-y-4 pt-4"
            >
              {/* Core Call to Actions: Stacked on mobile, side-by-side on larger screens */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* 1. Primary button: View My Work */}
                <a
                  href="#machines"
                  className="inline-flex items-center justify-center space-x-1.5 rounded-lg bg-brand-primary hover:bg-brand-accent text-white px-4 py-3 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <span>View My Expertise</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>

                {/* 2. Download Certificates button */}
                <button
                  onClick={() => handleDownload(portfolio.certBundleFile.path, portfolio.certBundleFile.name)}
                  className="inline-flex items-center justify-center space-x-1.5 rounded-lg bg-[#0d101a]/80 border border-slate-800/80 hover:border-brand-primary/40 hover:bg-[#111526]/80 px-4 py-3 sm:py-2.5 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-purple-500/5 whitespace-nowrap"
                >
                  <span>Download Certificates</span>
                  <Award className="h-3.5 w-3.5 text-brand-accent" />
                </button>

                {/* 3. Secondary button: Download CV */}
                <button
                  onClick={() => handleDownload(portfolio.cvFile.path, portfolio.cvFile.name)}
                  className="inline-flex items-center justify-center space-x-1.5 rounded-lg bg-[#0d101a]/80 border border-slate-800/80 hover:border-brand-primary/40 hover:bg-[#111526]/80 px-4 py-3 sm:py-2.5 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-purple-500/5 whitespace-nowrap"
                >
                  <span>Download CV</span>
                  <Download className="h-3.5 w-3.5 text-brand-accent" />
                </button>
              </div>

              {/* Contact & Location Badges: Stacked/grid on mobile, inline-flex wrap on larger screens */}
              <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
                {/* Contact Badge: Email */}
                <a
                  href={`mailto:${portfolio.email}`}
                  className="inline-flex items-center justify-center sm:justify-start space-x-1.5 rounded-lg bg-[#0d101a]/80 border border-slate-800/80 hover:border-brand-primary/40 hover:bg-[#111526]/80 px-3.5 py-2.5 sm:py-2 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-purple-500/5"
                >
                  <Mail className="h-3.5 w-3.5 text-brand-accent flex-shrink-0" />
                  <span className="truncate">{portfolio.email}</span>
                </a>

                {/* Contact Badge: Phone (linking to WhatsApp) */}
                <a
                  href={portfolio.socials?.whatsapp || "https://wa.me/9779808848817"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start space-x-1.5 rounded-lg bg-[#0d101a]/80 border border-slate-800/80 hover:border-brand-primary/40 hover:bg-[#111526]/80 px-3.5 py-2.5 sm:py-2 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-purple-500/5"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-accent flex-shrink-0" />
                  <span>{portfolio.phone}</span>
                </a>

                {/* Info Badge: Location */}
                <div className="inline-flex items-center justify-center sm:justify-start space-x-1.5 rounded-lg bg-[#0d101a]/40 border border-slate-900 px-3.5 py-2.5 sm:py-2 text-slate-400 text-xs sm:text-sm font-medium">
                  <MapPin className="h-3.5 w-3.5 text-brand-accent flex-shrink-0" />
                  <span>{portfolio.location}</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column - Custom Framed Portrait with Circular Glowing Halo - order-1 on mobile, order-2 on desktop */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              {/* Outer spinning ornamental circle from the design */}
              <div className="absolute inset-0 rounded-full border border-purple-500/10 animate-[spin_40s_linear_infinite]"></div>
              
              {/* Secondary cosmic glow circle */}
              <div className="absolute inset-6 rounded-full border border-dashed border-brand-primary/20 animate-[spin_25s_linear_infinite_reverse]"></div>

              {/* Glowing halo surrounding the portrait */}
              <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-brand-primary/25 via-transparent to-brand-accent/25 blur-xl"></div>

              {/* Main portrait container inside circle */}
              <div className="absolute inset-10 rounded-full bg-[#0c0f1a] border border-slate-800/80 p-2 overflow-hidden shadow-2xl flex items-center justify-center">
                <img
                  src={portfolio.profilePic}
                  alt={portfolio.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultAvatarSvg;
                  }}
                />
              </div>
            </motion.div>
          </div>

        </div>



      </div>

      {/* ==============================================================================
          ABOUT ME SECTION
          Integrated here to match the beautiful bento structure of the reference image
          ============================================================================== */}
      <section id="about" className="relative border-t border-slate-900 bg-[#06080d] py-20 lg:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            
            {/* Left section info */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-bold block">
                ABOUT ME
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                I lead high-precision manufacturing that drives high yields.
              </h3>
            </div>

            {/* Right section info */}
            <div className="lg:col-span-7">
              <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed">
                Safety-first Production Leader with 7+ years of dedicated experience in high-volume semiconductor manufacturing at SanDisk and Western Digital. Expert in cleanroom operations and 6S methodology, managing 120+ micro-electronic production machines simultaneously. Proven track record of improving processing efficiency by 15% and reducing mechanical downtime through advanced technical troubleshooting of specialized bonding, molding, and X-ray equipment.
              </p>
            </div>

          </div>

          {/* Interactive Statistics Row precisely modeled after the reference image's stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-slate-900 pt-16 sm:grid-cols-4">
            
            {/* Stat 1 */}
            <div className="text-center sm:text-left space-y-1 group">
              <span className="block font-serif text-4xl sm:text-5xl font-extrabold text-brand-primary transition-all duration-300 group-hover:scale-105 group-hover:text-brand-accent">
                7+
              </span>
              <span className="block font-sans text-xs tracking-wide text-slate-400 font-medium uppercase">
                Years of Experience
              </span>
            </div>

            {/* Stat 2 */}
            <div className="text-center sm:text-left space-y-1 group">
              <span className="block font-serif text-4xl sm:text-5xl font-extrabold text-brand-primary transition-all duration-300 group-hover:scale-105 group-hover:text-brand-accent">
                120+
              </span>
              <span className="block font-sans text-xs tracking-wide text-slate-400 font-medium uppercase">
                Machines Managed
              </span>
            </div>

            {/* Stat 3 */}
            <div className="text-center sm:text-left space-y-1 group">
              <span className="block font-serif text-4xl sm:text-5xl font-extrabold text-brand-primary transition-all duration-300 group-hover:scale-105 group-hover:text-brand-accent">
                20+
              </span>
              <span className="block font-sans text-xs tracking-wide text-slate-400 font-medium uppercase">
                Shift Floor Team
              </span>
            </div>

            {/* Stat 4 */}
            <div className="text-center sm:text-left space-y-1 group">
              <span className="block font-serif text-4xl sm:text-5xl font-extrabold text-brand-primary transition-all duration-300 group-hover:scale-105 group-hover:text-brand-accent">
                +15%
              </span>
              <span className="block font-sans text-xs tracking-wide text-slate-400 font-medium uppercase">
                Efficiency Boosted
              </span>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

const defaultAvatarSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="%231e293b"/><path d="M50 20a15 15 0 1 0 0 30 15 15 0 0 0 0-30zM22 80c0-15 12-25 28-25s28 10 28 25" stroke="%238b5cf6" stroke-width="4" stroke-linecap="round"/></svg>`;


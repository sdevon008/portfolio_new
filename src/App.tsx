import React, { useState, useEffect } from "react";
import { Lock, Mail, Shield, CheckCircle2, Award, Download, FileText, MessageCircle, Linkedin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MachineGrid from "./components/MachineGrid";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProcessProjects from "./components/ProcessProjects";
import AwardsCertifications from "./components/AwardsCertifications";
import MobilityLanguages from "./components/MobilityLanguages";
import AdminPanel from "./components/AdminPanel";
import { PortfolioData } from "./types";
import { fallbackPortfolio } from "./data";
import {
  getPortfolioFromFirebase,
  savePortfolioToFirebase,
  checkAdminPassword,
  uploadFileToFirebase,
  updateAdminPasswordInFirebase
} from "./lib/firebase";

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Admin session states
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_session_auth") === "true";
  });

  // Fetch portfolio data from Firebase with seamless local fallback
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPortfolioFromFirebase(fallbackPortfolio);
      setPortfolio(data);
    } catch (err: any) {
      console.warn("Firebase not reachable. Seamlessly loaded local fallback dataset.", err);
      setPortfolio(fallbackPortfolio);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Admin login trigger via Firestore password validation
  const handleLogin = async (password: string): Promise<boolean> => {
    try {
      const isAuthorized = await checkAdminPassword(password);
      if (isAuthorized) {
        setIsAdminLoggedIn(true);
        sessionStorage.setItem("admin_session_auth", "true");
        return true;
      }
      return false;
    } catch (err) {
      console.error("Authentication error via Firebase", err);
      return false;
    }
  };

  // Admin logout trigger
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem("admin_session_auth");
  };

  // Synchronize entire portfolio text structure directly to Firebase Firestore
  const handleUpdatePortfolio = async (updatedPortfolio: PortfolioData): Promise<boolean> => {
    try {
      const success = await savePortfolioToFirebase(updatedPortfolio);
      if (success) {
        setPortfolio(updatedPortfolio);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to sync portfolio via Firebase", err);
      return false;
    }
  };

  const handleDownload = (filePath: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#080a11] px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-900 border-t-brand-primary"></div>
        <span className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 font-semibold animate-pulse">
          Loading Portfolio Database...
        </span>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#080a11] px-4 text-center">
        <div className="rounded-full bg-red-950/40 p-4 text-red-400 border border-red-900/30 mb-4">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="font-sans text-base font-bold text-white">Database Connection Failed</h3>
        <p className="mt-1 font-sans text-sm text-slate-400 max-w-md leading-relaxed">{error}</p>
        <button
          onClick={fetchPortfolio}
          className="mt-6 inline-flex items-center space-x-1 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-accent transition"
        >
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a11] flex flex-col justify-between selection:bg-brand-primary/40 selection:text-white">
      
      {/* Top sticky Navbar */}
      <Navbar
        portfolio={portfolio}
        onOpenAdmin={() => setShowAdminPanel(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Segment */}
        <Hero portfolio={portfolio} />

        {/* Technical Machine Grid */}
        <MachineGrid portfolio={portfolio} />

        {/* Interactive Experience Timeline */}
        <ExperienceTimeline portfolio={portfolio} />

        {/* Process Projects */}
        <ProcessProjects portfolio={portfolio} />

        {/* Awards, Certifications & Academic Block */}
        <AwardsCertifications portfolio={portfolio} />

        {/* Global Mobility & Languages */}
        <MobilityLanguages portfolio={portfolio} />

        {/* ==============================================================================
            LET'S WORK TOGETHER - CTA SECTION
            Perfectly styled to replicate the glowing horizontal banner from reference design
            ============================================================================== */}
        <section id="contact" className="relative py-16 bg-[#080a11] border-t border-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/40 to-[#0e111d] border border-brand-primary/20 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
            >
              {/* Outer decorative ambient blur behind CTA */}
              <div className="absolute left-10 top-0 h-32 w-32 rounded-full bg-brand-primary/10 blur-2xl"></div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                {/* Paper plane glowing round-square icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-primary/20 border border-brand-primary/40 text-brand-accent shadow-lg shadow-purple-500/10">
                  <svg className="h-7 w-7 rotate-45 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                    Let's Work Together
                  </h3>
                  <p className="mt-1.5 font-sans text-sm text-slate-400">
                    Have a project in mind or looking for international talent? Let's create something amazing.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex-shrink-0">
                <a
                  href={`mailto:${portfolio.socials?.email || "devendrashah@outlook.my"}`}
                  className="inline-flex items-center space-x-2 rounded-lg bg-brand-primary hover:bg-brand-accent text-white px-6 py-3.5 text-sm font-semibold shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>Get In Touch</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer Section - Beautifully aligned with footer of reference design */}
      <footer className="bg-[#05060a] border-t border-slate-900/60 text-slate-400 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Top row of footer */}
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 mb-12 pb-12 border-b border-slate-900/60">
            
            {/* Column 1: Logo & Statement */}
            <div className="space-y-4">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                DS<span className="text-brand-primary">.</span>
              </span>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                Precision Operations Leader & Semiconductor Specialist with international deployment flexibility. Driving high-volume floor excellence and safety compliance.
              </p>
              
              {/* Social shortcuts exactly like the bottom-left footer in image */}
              <div className="flex items-center gap-3.5 pt-2">
                <a
                  href={portfolio.socials?.linkedin || "https://www.linkedin.com/in/devendra-kumar-shah-sonar"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={portfolio.socials?.whatsapp || "https://wa.me/9779808848817"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${portfolio.socials?.email || "devendrashah@outlook.my"}`}
                  className="text-slate-500 hover:text-white transition-colors"
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li><a href="#home" className="text-slate-500 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-slate-500 hover:text-white transition-colors">About</a></li>
                <li><a href="#machines" className="text-slate-500 hover:text-white transition-colors">Machines</a></li>
                <li><a href="#experience" className="text-slate-500 hover:text-white transition-colors">Experience</a></li>
              </ul>
            </div>

            {/* Column 3: Contact details */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Contact Info
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-500 leading-relaxed">
                <li>Email: <a href={`mailto:${portfolio.email}`} className="hover:text-white transition-colors">{portfolio.email}</a></li>
                <li>Phone: <a href={`tel:${portfolio.phone}`} className="hover:text-white transition-colors">{portfolio.phone}</a></li>
                <li>Location: {portfolio.location}</li>
                <li>Passport: Valid & Current</li>
              </ul>
            </div>

            {/* Column 4: Quick Downloads */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Files & Downloads
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    onClick={() => handleDownload(portfolio.cvFile.path, portfolio.cvFile.name)}
                    className="inline-flex items-center space-x-1.5 text-slate-500 hover:text-white transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5 text-brand-accent" />
                    <span>Download CV Profile</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDownload(portfolio.certBundleFile.path, portfolio.certBundleFile.name)}
                    className="inline-flex items-center space-x-1.5 text-slate-500 hover:text-white transition-colors"
                  >
                    <Award className="h-3.5 w-3.5 text-brand-accent" />
                    <span>Certificates Bundle</span>
                  </button>
                </li>
                {portfolio.additionalFiles && portfolio.additionalFiles.map((file, fileIdx) => (
                  <li key={fileIdx}>
                    <button
                      onClick={() => handleDownload(file.path, file.name)}
                      className="inline-flex items-center space-x-1.5 text-slate-500 hover:text-white transition-colors text-left"
                      title={file.name}
                    >
                      <FileText className="h-3.5 w-3.5 text-brand-accent flex-shrink-0" />
                      <span className="truncate max-w-[160px]">{file.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom row of footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-slate-900/60 pt-6 mt-6">
            <p className="text-slate-600">
              © {new Date().getFullYear()} Devendra Kumar Shah Sonar. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {/* WhatsApp, LinkedIn, Email Icons */}
              <div className="flex items-center space-x-3 text-slate-500">
                <a
                  href={portfolio.socials?.whatsapp || "https://wa.me/9779808848817"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-[#0d101a]/80 border border-slate-800/80 hover:border-brand-primary/40 hover:bg-[#111526]/80 text-slate-400 hover:text-white transition-all duration-300"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </a>
                <a
                  href={portfolio.socials?.linkedin || "https://www.linkedin.com/in/devendra-kumar-shah-sonar"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-[#0d101a]/80 border border-slate-800/80 hover:border-brand-primary/40 hover:bg-[#111526]/80 text-slate-400 hover:text-white transition-all duration-300"
                  title="LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`mailto:${portfolio.socials?.email || "devendrashah@outlook.my"}`}
                  className="p-1.5 rounded-full bg-[#0d101a]/80 border border-slate-800/80 hover:border-brand-primary/40 hover:bg-[#111526]/80 text-slate-400 hover:text-white transition-all duration-300"
                  title="Email"
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>

              <span className="hidden sm:inline text-slate-800 h-4 w-[1px]"></span>

              <button
                onClick={() => setShowAdminPanel(true)}
                className="inline-flex items-center space-x-1 text-slate-600 hover:text-brand-accent transition"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>{isAdminLoggedIn ? "Admin Panel" : "Sign In Panel"}</span>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Live Admin Dashboard Overlay Dialog */}
      {showAdminPanel && (
        <AdminPanel
          portfolio={portfolio}
          onClose={() => setShowAdminPanel(false)}
          onUpdatePortfolio={handleUpdatePortfolio}
          isAdminLoggedIn={isAdminLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onUploadFile={uploadFileToFirebase}
          onChangePassword={updateAdminPasswordInFirebase}
        />
      )}

    </div>
  );
}

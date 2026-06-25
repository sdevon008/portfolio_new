import React from "react";
import { Shield, FileText, Award, Download, UserCheck, Menu, X } from "lucide-react";
import { PortfolioData } from "../types";

interface NavbarProps {
  portfolio: PortfolioData;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export default function Navbar({ portfolio, onOpenAdmin, isAdminLoggedIn }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleDownload = (filePath: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Machines", href: "#machines" },
    { label: "Experience", href: "#experience" },
    { label: "Awards & CV", href: "#awards" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-900/60 bg-[#080a11]/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo / Name */}
        <div className="flex items-center space-x-3">
          <a href="#home" className="flex items-center space-x-2 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-white transition duration-200">
              DS<span className="text-brand-primary">.</span>
            </span>
            <div className="hidden lg:block h-6 w-[1px] bg-slate-800"></div>
            <div className="hidden lg:block text-left">
              <span className="block font-mono text-[9px] tracking-widest text-slate-400 uppercase font-semibold leading-none">
                SEMICONDUCTOR OPERATIONS
              </span>
              <span className="block font-sans text-[10px] text-teal-400 font-bold leading-none mt-1">
                LEADER
              </span>
            </div>
          </a>
        </div>

        {/* Navigation Links - Perfect match to the image design */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-wider text-slate-300 hover:text-white transition duration-200 uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-brand-primary after:transition-all after:duration-200 hover:after:w-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Admin Panel Trigger */}
          <button
            onClick={onOpenAdmin}
            className={`inline-flex items-center space-x-1 rounded-full px-4 py-1.5 text-xs font-semibold transition duration-200 ${
              isAdminLoggedIn
                ? "bg-purple-950/40 text-brand-accent hover:bg-purple-900/40 border border-brand-primary/30"
                : "bg-brand-primary hover:bg-brand-accent text-white shadow-lg shadow-purple-500/10"
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>{isAdminLoggedIn ? "Admin Panel" : "Sign In"}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/60"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-[#080a11] border-b border-slate-900">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-slate-300 hover:text-white uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="h-[1px] bg-slate-900 my-2"></div>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => {
                  handleDownload(portfolio.cvFile.path, portfolio.cvFile.name);
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-300"
              >
                <FileText className="h-3.5 w-3.5 text-brand-accent" />
                <span>Download CV</span>
              </button>
              <button
                onClick={() => {
                  handleDownload(portfolio.certBundleFile.path, portfolio.certBundleFile.name);
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-300"
              >
                <Award className="h-3.5 w-3.5 text-teal-400" />
                <span>Certificates</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


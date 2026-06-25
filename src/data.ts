import { PortfolioData } from "./types";

const defaultAvatarSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="%231e293b"/><path d="M50 20a15 15 0 1 0 0 30 15 15 0 0 0 0-30zM22 80c0-15 12-25 28-25s28 10 28 25" stroke="%2338bdf8" stroke-width="4" stroke-linecap="round"/></svg>`;

export const fallbackPortfolio: PortfolioData = {
  name: "DEVENDRA KUMAR SHAH SONAR",
  title: "Manufacturing Production Leader & Semiconductor Operations Specialist",
  email: "devendrashah@outlook.my",
  phone: "+977-9808848817",
  location: "Nepal",
  summary: "Safety-first Production Leader with 7+ years of dedicated experience in high-volume semiconductor manufacturing at SanDisk and Western Digital. Expert in cleanroom operations and 6S methodology, managing 120+ micro-electronic production machines simultaneously. Proven track record of improving processing efficiency by 15% and reducing mechanical downtime through advanced technical troubleshooting of specialized bonding, molding, and X-ray equipment. Actively seeking to leverage international semiconductor production expertise within a dynamic manufacturing environment.",
  profilePic: defaultAvatarSvg,
  cvFile: {
    name: "Devendra_Shah_CV.pdf",
    path: "/uploads/Devendra_Shah_CV.pdf",
    size: "185 KB",
    uploadedAt: "Default CV"
  },
  certBundleFile: {
    name: "Certificates_Bundle.pdf",
    path: "/uploads/Certificates_Bundle.pdf",
    size: "420 KB",
    uploadedAt: "Default Certificates"
  },
  machines: [
    {
      category: "Die Bonding",
      models: "Fasford Technology (DB700 / DB800 / DB830+)"
    },
    {
      category: "Wire Bonding",
      models: "Rapid Mem & Iconn Plus"
    },
    {
      category: "Molding Systems",
      models: "Towa Mold Machine (PMC / YPS)"
    },
    {
      category: "Curing Equipment",
      models: "PMC Oven (Cure C-Sun)"
    },
    {
      category: "Quality & Inspection",
      models: "Plasma Cleaning Machine (VSP-88D Pro), X-ray Machine (Phoenix Microme)"
    },
    {
      category: "Specialized Skills",
      models: "Cleanroom Operations, 6S (Safety-First Compliance), GMP, OCAP, SOP, SAP/ERP, FIFO"
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Production Leader, Manufacturing",
      company: "SanDisk Storage Malaysia (Western Digital)",
      location: "Penang, Malaysia",
      period: "October 2019 – February 2024",
      highlights: [
        "Led and managed a high-performing floor team of 20+ operators to consistently exceed daily production targets and quality KPIs.",
        "Oversaw the continuous operation and parameters of 120+ automated production machines in a high-pressure cleanroom environment.",
        "Improved overall manufacturing line efficiency by 15% through strategic process optimization and safety-focused 6S implementation.",
        "Reduced equipment downtime by 20% via advanced technical troubleshooting and proactive preventive maintenance scheduling.",
        "Trained plant operators on Standard Operating Procedures (SOPs), GMP guidelines, and strict safety standards to mitigate error rates.",
        "Managed floor inventory records, shift performance reporting, and 6S standards to maintain elite operational excellence."
      ]
    },
    {
      id: "exp-2",
      role: "Operator 3, Manufacturing",
      company: "SanDisk Storage Malaysia",
      location: "Penang, Malaysia",
      period: "May 2017 – October 2019",
      highlights: [
        "Operated 15+ high-precision semiconductor manufacturing machines, including Die Bond, Wire Bond, and Molding systems.",
        "Maintained continuous automated production flow utilizing FIFO methodologies and standard material handling protocols.",
        "Performed rapid technical troubleshooting on specialized equipment to safely minimize micro-electronic line stops.",
        "Conducted rigorous quality control and structural integrity inspections using specialized X-ray and plasma cleaning protocols."
      ]
    }
  ],
  awards: [
    {
      id: "aw-1",
      title: "5 Years Long Service Award",
      description: "Recognized for sustained professional dedication, reliable performance, and loyalty at SanDisk Storage Malaysia."
    },
    {
      id: "aw-2",
      title: "Good Catch Award",
      description: "Awarded for proactive hazard identification, exceptional situational awareness, and floor safety contributions."
    },
    {
      id: "aw-3",
      title: "SOP Video Competition Winner",
      description: "Honored for corporate excellence in demonstrating and documenting standardized operational procedures."
    },
    {
      id: "aw-4",
      title: "EHS Video Competition Winner",
      description: "Awarded for creating impactful instructional content promoting workplace Environment, Health, and Safety compliance."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Leadership Training: \"Be The Leader You Wish You Had\"",
      issuer: "Impact Volution"
    },
    {
      id: "cert-2",
      title: "Health and Safety Awareness Training",
      issuer: "IOSH Registered"
    },
    {
      id: "cert-3",
      title: "Operational Safety: Manual Handling Training",
      issuer: "CPD Certified"
    }
  ],
  education: {
    degree: "High School Diploma (+2)",
    school: "Janata Campus, Rangeli",
    location: "Morang, Nepal"
  },
  languages: [
    { id: "lang-1", language: "English", level: "Professional Working" },
    { id: "lang-2", language: "Malay", level: "Conversational" },
    { id: "lang-3", language: "Hindi", level: "Fluent" },
    { id: "lang-4", language: "Nepali", level: "Native" }
  ],
  mobility: {
    nationality: "Nepalese",
    passport: "Valid / Current",
    relocation: "Yes (Fully open to international deployment and visa sponsorship)",
    references: "Professional references available upon request"
  },
  projects: [
    {
      id: "proj-1",
      title: "6S Manufacturing Line Optimization",
      description: "Redesigned floor material flow and cleanroom tool storage parameters to improve accessibility and safety.",
      tag: "Process Improvement",
      impact: "15% efficiency increase across active shifts"
    },
    {
      id: "proj-2",
      title: "Proactive Preventive Troubleshooting Program",
      description: "Created structured daily inspection guides and scheduled machine status audits for automated molding and curing ovens.",
      tag: "Downtime Reduction",
      impact: "20% reduction in mechanical downtime"
    },
    {
      id: "proj-3",
      title: "Standard Operating Procedures (SOP) Media Project",
      description: "Produced and edited standardized operational and health training videos used plant-wide for rapid operator onboarding.",
      tag: "Training & EHS",
      impact: "Won 1st place in Corporate SOP & EHS Video Competition"
    }
  ],
  socials: {
    whatsapp: "https://wa.me/9779808848817",
    linkedin: "https://www.linkedin.com/in/devendra-kumar-shah-sonar",
    email: "devendrashah@outlook.my"
  },
  additionalFiles: []
};

export interface MachineCategory {
  category: string;
  models: string; // Comma separated or string list
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  impact?: string;
}

export interface FileInfo {
  name: string;
  path: string;
  size?: string;
  uploadedAt?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  profilePic: string; // Base64 or local URL path
  cvFile: FileInfo;
  certBundleFile: FileInfo;
  machines: MachineCategory[];
  experience: ExperienceItem[];
  awards: AwardItem[];
  certifications: CertificationItem[];
  education: {
    degree: string;
    school: string;
    location: string;
  };
  languages: LanguageItem[];
  mobility: {
    nationality: string;
    passport: string;
    relocation: string; // e.g., "Yes (Fully open to international...)"
    references: string;
  };
  projects: ProjectItem[];
  socials?: {
    whatsapp?: string;
    linkedin?: string;
    email?: string;
  };
  additionalFiles?: FileInfo[];
}

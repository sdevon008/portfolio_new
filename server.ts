import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Setup standard paths
const PUBLIC_DIR = path.join(process.cwd(), "public");
const UPLOADS_DIR = path.join(PUBLIC_DIR, "uploads");
const DATA_FILE = path.join(UPLOADS_DIR, "portfolio.json");

// Ensure directories exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Default profile picture (Base64 SVG to show on initial load)
const defaultAvatarSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="%231e293b"/><path d="M50 20a15 15 0 1 0 0 30 15 15 0 0 0 0-30zM22 80c0-15 12-25 28-25s28 10 28 25" stroke="%2338bdf8" stroke-width="4" stroke-linecap="round"/></svg>`;

// Default portfolio structure populated with Devendra's real CV details
const defaultPortfolio = {
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

// Write default dataset if it does not exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaultPortfolio, null, 2), "utf8");
}

// Create placeholder files for CV and Cert Bundle on first boot so download works immediately!
const placeholderCvPath = path.join(UPLOADS_DIR, "Devendra_Shah_CV.pdf");
const placeholderCertPath = path.join(UPLOADS_DIR, "Certificates_Bundle.pdf");

if (!fs.existsSync(placeholderCvPath)) {
  fs.writeFileSync(placeholderCvPath, "This is a placeholder for Devendra Kumar Shah Sonar's Professional CV PDF. Please log in to the admin panel to upload the actual document.", "utf8");
}
if (!fs.existsSync(placeholderCertPath)) {
  fs.writeFileSync(placeholderCertPath, "This is a placeholder for Devendra Kumar Shah Sonar's Professional Certificates Bundle. Please log in to the admin panel to upload the actual bundle.", "utf8");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set default admin password
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  // Body parsers
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API: Get portfolio details
  app.get("/api/portfolio", (req, res) => {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        return res.json(JSON.parse(data));
      }
      return res.json(defaultPortfolio);
    } catch (error: any) {
      return res.status(500).json({ error: "Failed to read portfolio data", details: error.message });
    }
  });

  // API: Login
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      // Return simple token (just password for demonstration, simple and robust)
      return res.json({ success: true, token: "authorized_admin_session" });
    }
    return res.status(401).json({ success: false, error: "Incorrect password" });
  });

  // Simple Auth Middleware
  const checkAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader === "Bearer authorized_admin_session") {
      return next();
    }
    return res.status(403).json({ error: "Unauthorized access" });
  };

  // API: Save portfolio text details
  app.post("/api/portfolio", checkAuth, (req, res) => {
    try {
      const updatedData = req.body;
      fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2), "utf8");
      return res.json({ success: true, message: "Portfolio successfully updated!" });
    } catch (error: any) {
      return res.status(500).json({ error: "Failed to save portfolio data", details: error.message });
    }
  });

  // API: Upload files (Base64 handler)
  app.post("/api/upload", checkAuth, (req, res) => {
    try {
      const { fileName, fileType, fileData } = req.body;
      
      if (!fileName || !fileData) {
        return res.status(400).json({ error: "Missing filename or file data" });
      }

      // Sanitize fileName to prevent directory traversal
      const safeName = path.basename(fileName);
      const filePath = path.join(UPLOADS_DIR, safeName);

      // Decode base64
      const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;

      if (matches && matches.length === 3) {
        buffer = Buffer.from(matches[2], "base64");
      } else {
        buffer = Buffer.from(fileData, "base64");
      }

      // Write to public uploads folder
      fs.writeFileSync(filePath, buffer);

      // Format size
      const stats = fs.statSync(filePath);
      const sizeInKb = Math.round(stats.size / 1024);
      const sizeStr = sizeInKb > 1024 ? `${(sizeInKb / 1024).toFixed(1)} MB` : `${sizeInKb} KB`;

      // Update the current local database references depending on fileType
      if (fs.existsSync(DATA_FILE)) {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
        const webPath = `/uploads/${safeName}`;

        if (fileType === "profile") {
          // If it's an image, create clean data url or local path. Since we are serving public directory as web root, "/uploads/photo.jpg" works perfectly.
          data.profilePic = webPath;
        } else if (fileType === "cv") {
          data.cvFile = {
            name: safeName,
            path: webPath,
            size: sizeStr,
            uploadedAt: new Date().toLocaleDateString()
          };
        } else if (fileType === "certs") {
          data.certBundleFile = {
            name: safeName,
            path: webPath,
            size: sizeStr,
            uploadedAt: new Date().toLocaleDateString()
          };
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
        return res.json({
          success: true,
          message: "File uploaded and portfolio updated successfully!",
          path: webPath,
          size: sizeStr,
          data
        });
      }

      return res.json({ success: true, path: `/uploads/${safeName}`, size: sizeStr });
    } catch (error: any) {
      return res.status(500).json({ error: "Failed to upload file", details: error.message });
    }
  });

  // Serve static assets from standard public directory (like uploaded files)
  app.use(express.static(PUBLIC_DIR));

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
});

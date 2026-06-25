import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  Lock,
  FileText,
  Award,
  Image,
  CheckCircle,
  Plus,
  Trash2,
  Save,
  LogOut,
  AlertCircle
} from "lucide-react";
import { PortfolioData, MachineCategory, ExperienceItem, AwardItem, CertificationItem, ProjectItem, LanguageItem } from "../types";

interface AdminPanelProps {
  portfolio: PortfolioData;
  onClose: () => void;
  onUpdatePortfolio: (updated: PortfolioData) => Promise<boolean>;
  isAdminLoggedIn: boolean;
  onLogin: (password: string) => Promise<boolean>;
  onLogout: () => void;
  onUploadFile?: (file: File | Blob, fileName: string, fileType: string) => Promise<{ url: string; sizeStr: string }>;
  onChangePassword?: (newPassword: string) => Promise<boolean>;
}

export default function AdminPanel({
  portfolio,
  onClose,
  onUpdatePortfolio,
  isAdminLoggedIn,
  onLogin,
  onLogout,
  onUploadFile,
  onChangePassword
}: AdminPanelProps) {
  // Authentication states
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Password change states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Form states (cloned from original portfolio data)
  const [formData, setFormData] = useState<PortfolioData>({ ...portfolio });
  const [activeTab, setActiveTab] = useState<"general" | "machines" | "experience" | "projects" | "files">("general");
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [isSaving, setIsSaving] = useState(false);

  // File uploading states
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: string }>({});
  const cvInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);
  const picInputRef = useRef<HTMLInputElement>(null);
  const [additionalUploadProgress, setAdditionalUploadProgress] = useState<string>("");
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  // Handle Admin Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmittingLogin(true);
    const success = await onLogin(password);
    setIsSubmittingLogin(false);
    if (success) {
      setPassword("");
      setFormData({ ...portfolio });
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  // Handle Changing Admin Password
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      setPasswordChangeStatus({ type: "error", message: "Password cannot be empty" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordChangeStatus({ type: "error", message: "Passwords do not match" });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordChangeStatus({ type: "error", message: "Password must be at least 6 characters long" });
      return;
    }

    try {
      setIsChangingPassword(true);
      setPasswordChangeStatus({ type: null, message: "" });
      if (onChangePassword) {
        const success = await onChangePassword(newPassword);
        if (success) {
          setPasswordChangeStatus({ type: "success", message: "Password updated successfully!" });
          setNewPassword("");
          setConfirmPassword("");
        } else {
          setPasswordChangeStatus({ type: "error", message: "Failed to update password. Try again." });
        }
      } else {
        setPasswordChangeStatus({ type: "error", message: "Password update is not available in local mode." });
      }
    } catch (err) {
      setPasswordChangeStatus({ type: "error", message: "An error occurred while updating the password." });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Sync state if portfolio updates externally
  React.useEffect(() => {
    if (isAdminLoggedIn) {
      setFormData({ ...portfolio });
    }
  }, [portfolio, isAdminLoggedIn]);

  // Handle basic input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Nested object handlers
  const handleMobilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      mobility: {
        ...prev.mobility,
        [name]: value
      }
    }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [name]: value
      }
    }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socials: {
        whatsapp: "https://wa.me/9779808848817",
        linkedin: "https://www.linkedin.com/in/devendra-kumar-shah-sonar",
        email: "devendrashah@outlook.my",
        ...prev.socials,
        [name]: value
      }
    }));
  };

  // Array item helpers (Machines, Experience, Projects)
  const handleMachineChange = (index: number, value: string) => {
    const updated = [...formData.machines];
    updated[index].models = value;
    setFormData((prev) => ({ ...prev, machines: updated }));
  };

  const handleMachineCategoryNameChange = (index: number, value: string) => {
    const updated = [...formData.machines];
    updated[index].category = value;
    setFormData((prev) => ({ ...prev, machines: updated }));
  };

  const handleAddMachineCategory = () => {
    const updated = [
      ...formData.machines,
      { category: "NEW MACHINE CATEGORY", models: "" }
    ];
    setFormData((prev) => ({ ...prev, machines: updated }));
  };

  const handleRemoveMachineCategory = (index: number) => {
    const updated = formData.machines.filter((_, idx) => idx !== index);
    setFormData((prev) => ({ ...prev, machines: updated }));
  };

  const handleExperienceChange = (id: string, field: keyof ExperienceItem, value: any) => {
    const updated = formData.experience.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    setFormData((prev) => ({ ...prev, experience: updated }));
  };

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: "New Role",
      company: "Company Name",
      location: "City, Country",
      period: "Period (e.g. Month Year - Month Year)",
      highlights: ["Accomplishment detail here"]
    };
    setFormData((prev) => ({ ...prev, experience: [...prev.experience, newItem] }));
  };

  const handleRemoveExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id)
    }));
  };

  const handleExperienceHighlightChange = (expId: string, highlightIdx: number, value: string) => {
    const updated = formData.experience.map((exp) => {
      if (exp.id === expId) {
        const highlights = [...exp.highlights];
        highlights[highlightIdx] = value;
        return { ...exp, highlights };
      }
      return exp;
    });
    setFormData((prev) => ({ ...prev, experience: updated }));
  };

  const handleAddHighlight = (expId: string) => {
    const updated = formData.experience.map((exp) => {
      if (exp.id === expId) {
        return { ...exp, highlights: [...exp.highlights, ""] };
      }
      return exp;
    });
    setFormData((prev) => ({ ...prev, experience: updated }));
  };

  const handleRemoveHighlight = (expId: string, highlightIdx: number) => {
    const updated = formData.experience.map((exp) => {
      if (exp.id === expId) {
        return { ...exp, highlights: exp.highlights.filter((_, idx) => idx !== highlightIdx) };
      }
      return exp;
    });
    setFormData((prev) => ({ ...prev, experience: updated }));
  };

  const handleProjectChange = (id: string, field: keyof ProjectItem, value: string) => {
    const updated = formData.projects.map((proj) => {
      if (proj.id === id) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    setFormData((prev) => ({ ...prev, projects: updated }));
  };

  const handleAddProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: "New Process Improvement",
      description: "Description of floor project",
      tag: "Process Optimization",
      impact: "Quantified metric (e.g. 10% decrease)"
    };
    setFormData((prev) => ({ ...prev, projects: [...prev.projects, newItem] }));
  };

  const handleRemoveProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id)
    }));
  };

  // File Upload base64 helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fileType: "cv" | "certs" | "profile") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress((prev) => ({ ...prev, [fileType]: "Processing..." }));

    if (onUploadFile) {
      try {
        const res = await onUploadFile(file, file.name, fileType);
        setUploadProgress((prev) => ({ ...prev, [fileType]: "Completed Successfully!" }));
        
        setFormData((prev) => {
          const data = { ...prev };
          const webPath = res.url;
          const sizeStr = res.sizeStr;

          if (fileType === "profile") {
            data.profilePic = webPath;
          } else if (fileType === "cv") {
            data.cvFile = {
              name: file.name,
              path: webPath,
              size: sizeStr,
              uploadedAt: new Date().toLocaleDateString()
            };
          } else if (fileType === "certs") {
            data.certBundleFile = {
              name: file.name,
              path: webPath,
              size: sizeStr,
              uploadedAt: new Date().toLocaleDateString()
            };
          }
          return data;
        });

        setTimeout(() => {
          setUploadProgress((prev) => {
            const updated = { ...prev };
            delete updated[fileType];
            return updated;
          });
        }, 3000);
      } catch (error: any) {
        setUploadProgress((prev) => ({ ...prev, [fileType]: `Upload failed: ${error.message}` }));
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        
        // Post base64 payload to Server Upload API
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer authorized_admin_session"
          },
          body: JSON.stringify({
            fileName: file.name,
            fileType,
            fileData: base64Data
          })
        });

        const resJson = await response.json();
        if (response.ok && resJson.success) {
          setUploadProgress((prev) => ({ ...prev, [fileType]: "Completed Successfully!" }));
          
          // Inject updated file information directly in formData
          setFormData(resJson.data || formData);
          
          setTimeout(() => {
            setUploadProgress((prev) => {
              const updated = { ...prev };
              delete updated[fileType];
              return updated;
            });
          }, 3000);
        } else {
          setUploadProgress((prev) => ({ ...prev, [fileType]: `Upload failed: ${resJson.error || "Unknown error"}` }));
        }
      } catch (error: any) {
        setUploadProgress((prev) => ({ ...prev, [fileType]: `Upload failed: ${error.message}` }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdditionalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAdditionalUploadProgress("Processing additional file...");

    if (onUploadFile) {
      try {
        const res = await onUploadFile(file, file.name, "additional");
        setAdditionalUploadProgress("File uploaded successfully!");
        
        const newFile = {
          name: file.name,
          path: res.url,
          size: res.sizeStr || "Unknown size",
          uploadedAt: new Date().toLocaleDateString()
        };
        
        setFormData((prev) => ({
          ...prev,
          additionalFiles: [...(prev.additionalFiles || []), newFile]
        }));

        setTimeout(() => {
          setAdditionalUploadProgress("");
        }, 3000);
      } catch (error: any) {
        setAdditionalUploadProgress(`Upload failed: ${error.message}`);
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer authorized_admin_session"
          },
          body: JSON.stringify({
            fileName: file.name,
            fileType: "additional",
            fileData: base64Data
          })
        });

        const resJson = await response.json();
        if (response.ok && resJson.success) {
          setAdditionalUploadProgress("File uploaded successfully!");
          
          const newFile = {
            name: file.name,
            path: resJson.path,
            size: resJson.size || "Unknown size",
            uploadedAt: new Date().toLocaleDateString()
          };
          
          setFormData((prev) => ({
            ...prev,
            additionalFiles: [...(prev.additionalFiles || []), newFile]
          }));

          setTimeout(() => {
            setAdditionalUploadProgress("");
          }, 3000);
        } else {
          setAdditionalUploadProgress(`Upload failed: ${resJson.error || "Unknown error"}`);
        }
      } catch (error: any) {
        setAdditionalUploadProgress(`Upload failed: ${error.message}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAdditionalFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalFiles: (prev.additionalFiles || []).filter((_, idx) => idx !== index)
    }));
  };

  // Form Save Portfolio Details
  const handleSaveDetails = async () => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });
    const success = await onUpdatePortfolio(formData);
    setIsSaving(false);
    if (success) {
      setSaveStatus({ type: "success", message: "Portfolio successfully synchronized!" });
      setTimeout(() => setSaveStatus({ type: null, message: "" }), 4000);
    } else {
      setSaveStatus({ type: "error", message: "Failed to synchronize portfolio. Try again." });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 flex flex-col max-h-[90vh]">
        
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6 bg-slate-50 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans text-lg font-bold text-slate-950">
                Portfolio Admin Center
              </h2>
              <p className="font-mono text-[10px] text-teal-600 uppercase tracking-wider font-semibold">
                Manage professional files & database live
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!isAdminLoggedIn ? (
            /* Secure Login Screen */
            <div className="mx-auto max-w-md py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600 mb-4">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="font-sans text-lg font-bold text-slate-900">Admin Authentication Required</h3>
              <p className="font-sans text-sm text-slate-500 mt-1 mb-6">
                Please enter the administrator credentials to manage professional files (CV PDF, Certificates, Photo) and edit the text contents.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                    Admin Access Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                {loginError && (
                  <div className="flex items-center space-x-2 text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingLogin}
                  className="w-full inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-slate-800 disabled:opacity-50 transition"
                >
                  {isSubmittingLogin ? "Verifying..." : "Authenticate Session"}
                </button>
              </form>

              <div className="mt-8 border-t border-slate-100 pt-6 text-left bg-slate-50 rounded-xl p-4">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400 font-extrabold mb-1">
                  Developer Setup Prompt
                </span>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  Default credentials are configured as: <code className="bg-slate-200 px-1 rounded font-mono text-[11px] text-slate-700">admin123</code>. You can customize the environment variable <code className="bg-slate-200 px-1 rounded font-mono text-[11px] text-slate-700">ADMIN_PASSWORD</code> in your secrets configuration anytime.
                </p>
              </div>
            </div>
          ) : (
            /* Authorized Administration View */
            <div className="space-y-6">
              {/* Tab Selector bar */}
              <div className="flex border-b border-slate-200 overflow-x-auto pb-px scrollbar-thin">
                {(["general", "machines", "experience", "projects", "files"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap pb-3 px-4 font-sans text-xs sm:text-sm font-semibold border-b-2 transition ${
                      activeTab === tab
                        ? "border-teal-600 text-teal-600"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Status Banner */}
              {saveStatus.type && (
                <div
                  className={`flex items-center space-x-2 text-xs font-semibold p-3.5 rounded-lg border ${
                    saveStatus.type === "success"
                      ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                      : "text-rose-700 bg-rose-50 border-rose-100"
                  }`}
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>{saveStatus.message}</span>
                </div>
              )}

              {/* TAB: General Details */}
              {activeTab === "general" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Nationality</label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.mobility.nationality}
                        onChange={handleMobilityChange}
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Professional Summary</label>
                    <textarea
                      name="summary"
                      rows={4}
                      value={formData.summary}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900 leading-relaxed"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Passport Status</label>
                      <input
                        type="text"
                        name="passport"
                        value={formData.mobility.passport}
                        onChange={handleMobilityChange}
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Relocation Profile</label>
                      <input
                        type="text"
                        name="relocation"
                        value={formData.mobility.relocation}
                        onChange={handleMobilityChange}
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Social Contact Links */}
                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-teal-600 font-bold mb-3">
                      Social Contact Links (Footer shortcuts)
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">WhatsApp Link</label>
                        <input
                          type="text"
                          name="whatsapp"
                          value={formData.socials?.whatsapp || ""}
                          onChange={handleSocialChange}
                          placeholder="e.g., https://wa.me/9779808848817"
                          className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">LinkedIn Link</label>
                        <input
                          type="text"
                          name="linkedin"
                          value={formData.socials?.linkedin || ""}
                          onChange={handleSocialChange}
                          placeholder="e.g., https://www.linkedin.com/in/..."
                          className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Contact Email</label>
                        <input
                          type="text"
                          name="email"
                          value={formData.socials?.email || ""}
                          onChange={handleSocialChange}
                          placeholder="e.g., devendrashah@outlook.my"
                          className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Panel */}
                  <div className="border-t border-slate-100 pt-4 mt-4">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-teal-600 font-bold mb-3 flex items-center space-x-1">
                      <Lock className="h-3 w-3" />
                      <span>Security & Admin Credentials</span>
                    </h4>
                    <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-150">
                      <p className="text-xs text-slate-500 mb-3">
                        Change the current login credentials. Your password is stored safely in Firestore.
                      </p>
                      
                      <div className="grid gap-4 sm:grid-cols-2 mb-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">New Password</label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Confirm New Password</label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                          />
                        </div>
                      </div>

                      {passwordChangeStatus.message && (
                        <div className={`text-xs p-2.5 rounded-lg mb-3 flex items-center space-x-1.5 ${
                          passwordChangeStatus.type === "success" 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-150" 
                            : "bg-rose-50 text-rose-700 border border-rose-150"
                        }`}>
                          <span className="font-semibold">
                            {passwordChangeStatus.type === "success" ? "✓" : "⚠"}
                          </span>
                          <span>{passwordChangeStatus.message}</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handlePasswordChange}
                        disabled={isChangingPassword}
                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 px-4 py-2 rounded-lg transition"
                      >
                        {isChangingPassword ? (
                          <>
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-white"></div>
                            <span>Updating...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="h-3.5 w-3.5" />
                            <span>Update Password</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Technical Skills & Machines */}
              {activeTab === "machines" && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-500 font-sans leading-relaxed mb-4">
                    List specific silicon and hardware systems operated. Ensure list is comma-separated for proper presentation formatting on the portfolio page.
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-500">Configure machine categories and models</span>
                    <button
                      type="button"
                      onClick={handleAddMachineCategory}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 px-3 py-1.5 rounded-lg transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Machine Category</span>
                    </button>
                  </div>

                  {formData.machines.map((machine, idx) => (
                    <div key={idx} className="border border-slate-150 rounded-xl p-4 bg-slate-50/40 space-y-3 relative">
                      <button
                        type="button"
                        onClick={() => handleRemoveMachineCategory(idx)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-600 transition"
                        title="Delete category"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="max-w-[85%]">
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Category Title</label>
                        <input
                          type="text"
                          value={machine.category}
                          onChange={(e) => handleMachineCategoryNameChange(idx, e.target.value)}
                          placeholder="E.g. DIE BONDING"
                          className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900 font-sans font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Machine Models (separated by commas or slash)</label>
                        <textarea
                          rows={2}
                          value={machine.models}
                          onChange={(e) => handleMachineChange(idx, e.target.value)}
                          placeholder="E.g. Fasford DB800, Towa PMC"
                          className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900 font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: Professional Experience */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Configure corporate history and achievements</span>
                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 px-3 py-1.5 rounded-lg transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  {formData.experience.map((exp, expIdx) => (
                    <div key={exp.id} className="border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3 relative bg-slate-50/20">
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-600 transition"
                        title="Delete corporate history"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Role Title</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleExperienceChange(exp.id, "role", e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => handleExperienceChange(exp.id, "period", e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                          />
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Highlights & Achievements</label>
                          <button
                            type="button"
                            onClick={() => handleAddHighlight(exp.id)}
                            className="text-[10px] font-bold text-teal-600 hover:underline flex items-center space-x-0.5"
                          >
                            <Plus className="h-3 w-3" />
                            <span>Add Bullet</span>
                          </button>
                        </div>

                        {exp.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={highlight}
                              onChange={(e) => handleExperienceHighlightChange(exp.id, hIdx, e.target.value)}
                              className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveHighlight(exp.id, hIdx)}
                              className="text-slate-400 hover:text-rose-500 p-1"
                              title="Delete highlight"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: Projects */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Manage floor projects and quantified results</span>
                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 px-3 py-1.5 rounded-lg transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {formData.projects.map((proj) => (
                    <div key={proj.id} className="border border-slate-200 rounded-xl p-4 sm:p-5 relative space-y-3 bg-slate-50/20">
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(proj.id)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-600 transition"
                        title="Delete floor project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleProjectChange(proj.id, "title", e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Tag</label>
                          <input
                            type="text"
                            value={proj.tag}
                            onChange={(e) => handleProjectChange(proj.id, "tag", e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => handleProjectChange(proj.id, "description", e.target.value)}
                          className="w-full rounded-lg border border-slate-200 p-2 text-sm text-slate-900 leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Quantified Impact</label>
                        <input
                          type="text"
                          value={proj.impact || ""}
                          onChange={(e) => handleProjectChange(proj.id, "impact", e.target.value)}
                          placeholder="E.g. 15% efficiency increase"
                          className="w-full rounded-lg border border-slate-200 p-2 text-sm text-teal-700 font-semibold bg-teal-50/20"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: Professional File Uploads (CV, Profile Photo, Certificate Bundle) */}
              {activeTab === "files" && (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-500 font-sans leading-relaxed">
                    Easily manage the live downloadable documents and portrait for recruiters. Selecting any new file updates and synchronizes the downloadable link in real time.
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {/* CV PDF Upload */}
                    <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between h-56 shadow-sm">
                      <div>
                        <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                          <FileText className="h-4 w-4 text-teal-600" />
                          <span>Curriculum Vitae</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Upload updated Professional CV (PDF format recommended)</p>
                        
                        <div className="mt-4 text-xs font-mono text-slate-500">
                          <div className="truncate font-semibold text-slate-700">{formData.cvFile.name}</div>
                          <div className="mt-0.5">Size: {formData.cvFile.size || "185 KB"}</div>
                          <div className="text-[10px] text-slate-400">Date: {formData.cvFile.uploadedAt || "Original"}</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          ref={cvInputRef}
                          onChange={(e) => handleFileUpload(e, "cv")}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => cvInputRef.current?.click()}
                          className="w-full inline-flex items-center justify-center space-x-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 p-2 text-xs font-semibold text-slate-700 transition"
                        >
                          <Upload className="h-3.5 w-3.5 text-teal-600" />
                          <span>{uploadProgress["cv"] || "Upload PDF"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Certificate Bundle Upload */}
                    <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between h-56 shadow-sm">
                      <div>
                        <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                          <Award className="h-4 w-4 text-amber-500" />
                          <span>Certifications</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Upload a compiled PDF bundle or Zip with all IOSH & CPD training papers</p>
                        
                        <div className="mt-4 text-xs font-mono text-slate-500">
                          <div className="truncate font-semibold text-slate-700">{formData.certBundleFile.name}</div>
                          <div className="mt-0.5">Size: {formData.certBundleFile.size || "420 KB"}</div>
                          <div className="text-[10px] text-slate-400">Date: {formData.certBundleFile.uploadedAt || "Original"}</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <input
                          type="file"
                          accept=".pdf,.zip"
                          ref={certInputRef}
                          onChange={(e) => handleFileUpload(e, "certs")}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => certInputRef.current?.click()}
                          className="w-full inline-flex items-center justify-center space-x-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 p-2 text-xs font-semibold text-slate-700 transition"
                        >
                          <Upload className="h-3.5 w-3.5 text-amber-600" />
                          <span>{uploadProgress["certs"] || "Upload Bundle"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Profile Picture Upload */}
                    <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between h-56 shadow-sm">
                      <div>
                        <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                          <Image className="h-4 w-4 text-blue-600" />
                          <span>Profile Picture</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Upload professional portrait (JPG, PNG, or SVG)</p>
                        
                        <div className="mt-3 flex items-center space-x-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <img
                            src={formData.profilePic}
                            alt="Preview"
                            className="h-10 w-10 rounded-full object-cover border border-slate-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="%231e293b"/><path d="M50 20a15 15 0 1 0 0 30 15 15 0 0 0 0-30zM22 80c0-15 12-25 28-25s28 10 28 25" stroke="%2338bdf8" stroke-width="4" stroke-linecap="round"/></svg>`;
                            }}
                          />
                          <div className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                            {formData.profilePic.startsWith("data:") ? "SVG Technical Silhouette" : "Uploaded Picture Link"}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <input
                          type="file"
                          accept="image/*"
                          ref={picInputRef}
                          onChange={(e) => handleFileUpload(e, "profile")}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => picInputRef.current?.click()}
                          className="w-full inline-flex items-center justify-center space-x-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 p-2 text-xs font-semibold text-slate-700 transition"
                        >
                          <Upload className="h-3.5 w-3.5 text-blue-600" />
                          <span>{uploadProgress["profile"] || "Upload Photo"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Additional Recruiter Files */}
                    <div className="col-span-full border-t border-slate-200/80 pt-6 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">Additional Recruiter Files</h4>
                          <p className="text-xs text-slate-400">Upload supplemental records, safety certifications, or additional portfolio documents</p>
                        </div>
                        <div>
                          <input
                            type="file"
                            ref={additionalFileInputRef}
                            onChange={handleAdditionalFileUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => additionalFileInputRef.current?.click()}
                            className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 px-3.5 py-2 rounded-lg transition shadow-sm"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add New File</span>
                          </button>
                        </div>
                      </div>

                      {additionalUploadProgress && (
                        <div className="mb-4 text-xs font-semibold text-teal-600 bg-teal-50 border border-teal-100 rounded-lg p-2.5 animate-pulse">
                          {additionalUploadProgress}
                        </div>
                      )}

                      {(!formData.additionalFiles || formData.additionalFiles.length === 0) ? (
                        <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center text-xs text-slate-400 font-sans">
                          No additional documents uploaded yet. Click "Add New File" to enrich your portfolio.
                        </div>
                      ) : (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {formData.additionalFiles.map((f, fileIdx) => (
                            <div key={fileIdx} className="border border-slate-150 rounded-xl p-3 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between group transition">
                              <div className="min-w-0 flex-1 pr-2">
                                <div className="text-xs font-bold text-slate-700 truncate" title={f.name}>
                                  {f.name}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                  Size: {f.size || "Unknown"} | {f.uploadedAt}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveAdditionalFile(fileIdx)}
                                className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition"
                                title="Remove file"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions Footer bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-5 mt-8 gap-4">
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1 text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-lg transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Exit Session</span>
                </button>

                <div className="flex w-full sm:w-auto gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/2 sm:w-auto inline-flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-slate-100 px-4 py-2.5 rounded-lg transition"
                  >
                    Close Panel
                  </button>
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleSaveDetails}
                    className="w-1/2 sm:w-auto inline-flex items-center justify-center space-x-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 px-4 py-2.5 rounded-lg shadow-sm transition disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

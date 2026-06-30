import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Settings, X, Palette, FileJson, User, Terminal, Cpu, 
  Plus, Trash2, Check, Copy, Sliders, RefreshCw, LayoutTemplate
} from "lucide-react";
import { PortfolioConfig, Skill } from "../portfolioData";
import { Project } from "../types";

export type PortfolioVariant = "DevPro" | "Aceternity" | "LeeRobinson" | "Sidefolio";

interface CustomizerPanelProps {
  config: PortfolioConfig;
  onConfigChange: (newConfig: PortfolioConfig) => void;
  activeVariant: PortfolioVariant;
  onVariantChange: (variant: PortfolioVariant) => void;
}

export default function CustomizerPanel({ 
  config, 
  onConfigChange, 
  activeVariant, 
  onVariantChange 
}: CustomizerPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"variant" | "edit-profile" | "edit-skills" | "export">("variant");
  const [copied, setCopied] = useState(false);

  // Individual Form fields states to prevent laggy typing
  const [name, setName] = useState(config.personalInfo.fullName);
  const [username, setUsername] = useState(config.personalInfo.username);
  const [bio, setBio] = useState(config.personalInfo.bio);
  const [newRole, setNewRole] = useState("");
  const [newTech, setNewTech] = useState("");

  const handleUpdateProfile = () => {
    onConfigChange({
      ...config,
      personalInfo: {
        ...config.personalInfo,
        fullName: name,
        username: username,
        bio: bio
      }
    });
  };

  const handleAddRole = () => {
    if (!newRole.trim()) return;
    onConfigChange({
      ...config,
      personalInfo: {
        ...config.personalInfo,
        roles: [...config.personalInfo.roles, newRole.trim()]
      }
    });
    setNewRole("");
  };

  const handleRemoveRole = (index: number) => {
    onConfigChange({
      ...config,
      personalInfo: {
        ...config.personalInfo,
        roles: config.personalInfo.roles.filter((_, i) => i !== index)
      }
    });
  };

  const handleAddSkill = (name: string, category: "frontend" | "backend" | "tools") => {
    if (!name.trim()) return;
    const newSkill: Skill = {
      name: name.trim(),
      level: "Expert",
      category
    };
    onConfigChange({
      ...config,
      skills: [...config.skills, newSkill]
    });
  };

  const handleRemoveSkill = (skillName: string) => {
    onConfigChange({
      ...config,
      skills: config.skills.filter((s) => s.name !== skillName)
    });
  };

  const handleCopyJson = () => {
    const dataStr = JSON.stringify({ activeVariant, config }, null, 2);
    navigator.clipboard.writeText(dataStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetToDefaults = () => {
    if (window.confirm("Reset all customizations to standard template parameters?")) {
      window.location.reload();
    }
  };

  return (
    <>
      {/* Floating Gear Customizer Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-bold rounded-full shadow-[0_4px_20px_rgba(52,211,153,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 group"
          id="customizer-open-trigger"
        >
          <Settings className="w-5 h-5 animate-spin duration-[10s] group-hover:rotate-180" />
          <span className="font-mono text-xs tracking-wider">PORTFOLIO DEPLOYER</span>
        </button>
      </div>

      {/* Floating Customizer Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" id="customizer-drawer-overlay">
            {/* Backdrop blur click wrapper */}
            <div 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)} 
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between"
              id="customizer-drawer-container"
            >
              
              {/* Header */}
              <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-xs tracking-wider text-slate-200 uppercase">PORTFOLIO CUSTOMIZER NODE</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs Navigation */}
              <div className="grid grid-cols-4 border-b border-slate-800/80 p-1 bg-slate-950/40 text-center">
                <button
                  onClick={() => setActiveTab("variant")}
                  className={`py-2.5 text-[10px] font-mono tracking-wider uppercase border-b-2 flex flex-col items-center gap-1 transition-all ${
                    activeTab === "variant" ? "border-amber-400 text-amber-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  LAYOUTS
                </button>
                <button
                  onClick={() => setActiveTab("edit-profile")}
                  className={`py-2.5 text-[10px] font-mono tracking-wider uppercase border-b-2 flex flex-col items-center gap-1 transition-all ${
                    activeTab === "edit-profile" ? "border-amber-400 text-amber-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  PROFILE
                </button>
                <button
                  onClick={() => setActiveTab("edit-skills")}
                  className={`py-2.5 text-[10px] font-mono tracking-wider uppercase border-b-2 flex flex-col items-center gap-1 transition-all ${
                    activeTab === "edit-skills" ? "border-amber-400 text-amber-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  SKILLS
                </button>
                <button
                  onClick={() => setActiveTab("export")}
                  className={`py-2.5 text-[10px] font-mono tracking-wider uppercase border-b-2 flex flex-col items-center gap-1 transition-all ${
                    activeTab === "export" ? "border-amber-400 text-amber-400 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <FileJson className="w-3.5 h-3.5" />
                  EXPORT
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6" id="customizer-content-scroll">
                
                {/* 1. LAYOUTS TAB */}
                {activeTab === "variant" && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Choose from premium layout variations inspired by Aceternity UI, Lee Robinson, and modern technical portfolios. Each variant overrides typography, margins, shadows, and accents instantly.
                    </p>

                    <div className="grid grid-cols-1 gap-3.5">
                      {/* Variant 1: DevPro */}
                      <button
                        onClick={() => onVariantChange("DevPro")}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          activeVariant === "DevPro"
                            ? "bg-slate-950/80 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.1)]"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-sans text-sm font-bold text-white">Variant 1: DevPro Terminal</span>
                          {activeVariant === "DevPro" && <span className="text-[10px] bg-amber-400/10 border border-amber-400/20 text-amber-400 px-2 py-0.5 rounded font-mono">ACTIVE</span>}
                        </div>
                        <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                          Cyberpunk code-editor theme. Uses Space Grotesk typography, deep slate colors, and responsive neon amber & emerald syntax spotlights.
                        </p>
                      </button>

                      {/* Variant 2: Aceternity */}
                      <button
                        onClick={() => onVariantChange("Aceternity")}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          activeVariant === "Aceternity"
                            ? "bg-slate-950/80 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-sans text-sm font-bold text-white">Variant 2: Aceternity Minimalist</span>
                          {activeVariant === "Aceternity" && <span className="text-[10px] bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 px-2 py-0.5 rounded font-mono">ACTIVE</span>}
                        </div>
                        <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                          Ultra-sleek modern interface. Deep charcoal canvas featuring striking cyan/purple color fields, extra large heading styles, and futuristic card borders.
                        </p>
                      </button>

                      {/* Variant 3: Lee Robinson */}
                      <button
                        onClick={() => onVariantChange("LeeRobinson")}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          activeVariant === "LeeRobinson"
                            ? "bg-slate-950/80 border-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-sans text-sm font-bold text-white">Variant 3: Robinson Editorial</span>
                          {activeVariant === "LeeRobinson" && <span className="text-[10px] bg-white/10 border border-white/20 text-white px-2 py-0.5 rounded font-mono">ACTIVE</span>}
                        </div>
                        <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                          Sophisticated typography-first layout. Absolute dark background with paired luxury serif display titles, elegant silver details, and wide negative space.
                        </p>
                      </button>

                      {/* Variant 4: Sidefolio */}
                      <button
                        onClick={() => onVariantChange("Sidefolio")}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          activeVariant === "Sidefolio"
                            ? "bg-slate-950/80 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-sans text-sm font-bold text-white">Variant 4: Sidefolio Classic</span>
                          {activeVariant === "Sidefolio" && <span className="text-[10px] bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 px-2 py-0.5 rounded font-mono">ACTIVE</span>}
                        </div>
                        <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                          Clean structured dashboard feel. Highlighted by solid grids, bright emerald green accents, and a highly organized visual flow.
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. EDIT PROFILE TAB */}
                {activeTab === "edit-profile" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1.5">FULL_NAME</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          onConfigChange({
                            ...config,
                            personalInfo: { ...config.personalInfo, fullName: e.target.value }
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 font-mono text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1.5">USERNAME_HANDLE</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          onConfigChange({
                            ...config,
                            personalInfo: { ...config.personalInfo, username: e.target.value }
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 font-mono text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1.5">BIO_SUMMARY</label>
                      <textarea
                        rows={4}
                        value={bio}
                        onChange={(e) => {
                          setBio(e.target.value);
                          onConfigChange({
                            ...config,
                            personalInfo: { ...config.personalInfo, bio: e.target.value }
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                      />
                    </div>

                    {/* Roles Tag clouds editor */}
                    <div>
                      <label className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1.5">TYPING_ROLES_ARRAY</label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          placeholder="Add new typing role..."
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 font-mono text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                        <button
                          onClick={handleAddRole}
                          className="px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center justify-center transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {config.personalInfo.roles.map((role, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1.5 bg-slate-950 border border-slate-850 rounded-lg font-mono text-[10px] text-slate-300 flex items-center gap-1.5"
                          >
                            {role}
                            <button
                              onClick={() => handleRemoveRole(idx)}
                              className="text-slate-500 hover:text-red-400 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. SKILLS MATRIX EDITOR TAB */}
                {activeTab === "edit-skills" && (
                  <div className="space-y-6">
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Add, remove, or change skills in the cloud matrix instantly. Your Bento skillset tags will render the updates in real-time.
                    </p>

                    {/* Frontend Add */}
                    <div className="space-y-3">
                      <label className="block font-mono text-[10px] text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-1.5">
                        FRONTEND_DEVELOPMENT_COMPOSITION
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="frontend-skill-input"
                          placeholder="Add library/framework..."
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 font-mono text-xs text-white focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddSkill((e.target as HTMLInputElement).value, "frontend");
                              (e.target as HTMLInputElement).value = "";
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById("frontend-skill-input") as HTMLInputElement;
                            handleAddSkill(input.value, "frontend");
                            input.value = "";
                          }}
                          className="px-4 bg-emerald-400/10 hover:bg-emerald-400/20 border border-emerald-400/30 text-emerald-400 rounded-xl flex items-center justify-center transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Render frontend skills currently */}
                      <div className="flex flex-wrap gap-1.5">
                        {config.skills.filter((s) => s.category === "frontend").map((skill) => (
                          <span
                            key={skill.name}
                            className="px-2 py-1 bg-slate-950 border border-slate-850 rounded-lg font-mono text-[10px] text-slate-400 flex items-center gap-1"
                          >
                            {skill.name}
                            <button
                              onClick={() => handleRemoveSkill(skill.name)}
                              className="text-slate-600 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Backend Add */}
                    <div className="space-y-3">
                      <label className="block font-mono text-[10px] text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-1.5">
                        BACKEND_DATA_INFRASTRUCTURE
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="backend-skill-input"
                          placeholder="Add DB/server framework..."
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 font-mono text-xs text-white focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddSkill((e.target as HTMLInputElement).value, "backend");
                              (e.target as HTMLInputElement).value = "";
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById("backend-skill-input") as HTMLInputElement;
                            handleAddSkill(input.value, "backend");
                            input.value = "";
                          }}
                          className="px-4 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-400 rounded-xl flex items-center justify-center transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Render backend skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {config.skills.filter((s) => s.category === "backend").map((skill) => (
                          <span
                            key={skill.name}
                            className="px-2 py-1 bg-slate-950 border border-slate-850 rounded-lg font-mono text-[10px] text-slate-400 flex items-center gap-1"
                          >
                            {skill.name}
                            <button
                              onClick={() => handleRemoveSkill(skill.name)}
                              className="text-slate-600 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. EXPORT CONFIG JSON */}
                {activeTab === "export" && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      This is the complete, compiled, object-driven configuration code representing your customized developer portfolio. Copy this JSON to easily load your setup into popular repositories like <code className="font-mono text-amber-400">said7388</code> or <code className="font-mono text-amber-400">namanbarkiya</code>!
                    </p>

                    <div className="relative">
                      <pre className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[10px] text-slate-300 overflow-x-auto max-h-[300px] whitespace-pre-wrap select-all">
                        {JSON.stringify({ activeVariant, config }, null, 2)}
                      </pre>
                      
                      <button
                        onClick={handleCopyJson}
                        className="absolute top-3 right-3 p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all flex items-center gap-1.5"
                        id="btn-copy-json"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="font-mono text-[9px]">{copied ? "COPIED!" : "COPY"}</span>
                      </button>
                    </div>

                    <button
                      onClick={handleResetToDefaults}
                      className="w-full py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl font-mono text-[11px] tracking-wider text-red-400 hover:text-red-300 flex items-center justify-center gap-2 transition-all mt-4"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      RESET TO STANDARD CONFIG
                    </button>
                  </div>
                )}

              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>SYSTEM_COMPILE: OK</span>
                <span>v1.2.0-customizer</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

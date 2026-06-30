import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, ShieldAlert, Cpu, TerminalSquare, Database, Plus, Trash2, Edit3, 
  CheckCircle, BarChart3, Mail, RefreshCw, Layers, Sliders, Palette, LogOut, Code, User, ExternalLink
} from "lucide-react";
import { Project } from "../types";
import { PortfolioConfig, Skill } from "../portfolioData";
import { PortfolioVariant } from "./CustomizerPanel";
import { 
  getAccentTextColor, 
  getAccentBgColor, 
  getAccentHoverBgColor, 
  getAccentBorderColor, 
  getAccentGradient 
} from "../lib/colorUtils";

interface AdminPanelProps {
  config: PortfolioConfig;
  onConfigChange: (newConfig: PortfolioConfig) => void;
  activeVariant: PortfolioVariant;
  onVariantChange: (variant: PortfolioVariant) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ 
  config, 
  onConfigChange, 
  activeVariant, 
  onVariantChange, 
  isOpen, 
  onClose 
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "styles" | "skills">("overview");
  
  // Local states for Form actions
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState<"frontend" | "backend" | "tools">("frontend");
  const [newSkillLevel, setNewSkillLevel] = useState<"Expert" | "Advanced" | "Intermediate" | "Beginner">("Expert");

  // Form states for project add/edit
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: "",
    title: "",
    subtitle: "",
    category: "Full-Stack",
    image: "",
    description: "",
    tags: [],
    client: "General Client",
    duration: "2 Months",
    demoUrl: "",
    githubUrl: "",
    features: [],
    tools: []
  });

  const [formTagsString, setFormTagsString] = useState("");
  const [formToolsString, setFormToolsString] = useState("");
  const [formFeaturesString, setFormFeaturesString] = useState("");

  // Load submissions from localStorage
  useEffect(() => {
    const loadSubmissions = () => {
      const stored = localStorage.getItem("outbound_telemetry");
      if (stored) {
        try {
          setMessages(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    };
    if (isOpen) {
      loadSubmissions();
    }
  }, [isOpen]);

  // Handle message deletion
  const handleDeleteMessage = (index: number) => {
    const updated = [...messages];
    updated.splice(index, 1);
    setMessages(updated);
    localStorage.setItem("outbound_telemetry", JSON.stringify(updated));
  };

  // Color options
  const colorOptions = [
    { name: "Emerald", value: "emerald" },
    { name: "Cyan", value: "cyan" },
    { name: "Amber", value: "amber" },
    { name: "Indigo", value: "indigo" },
    { name: "Fuchsia", value: "fuchsia" },
    { name: "Rose", value: "rose" },
    { name: "Blue", value: "blue" },
    { name: "Orange", value: "orange" }
  ];

  // Accent helper
  const accent = config.accentColor || "emerald";

  // Change customizer colors
  const handleAccentChange = (color: string) => {
    const updated = { ...config, accentColor: color };
    onConfigChange(updated);
    localStorage.setItem("portfolio_config", JSON.stringify(updated));
  };

  // Change layouts
  const handleLayoutChange = (variant: PortfolioVariant) => {
    onVariantChange(variant);
    localStorage.setItem("portfolio_variant", variant);
  };

  // Open Project Form for Edit
  const handleStartEdit = (project: Project) => {
    setEditingProject(project);
    setProjectForm(project);
    setFormTagsString(project.tags.join(", "));
    setFormToolsString(project.tools.join(", "));
    setFormFeaturesString(project.features.join(", "));
    setIsAddingProject(false);
  };

  // Open Project Form for Add
  const handleStartAdd = () => {
    setIsAddingProject(true);
    setEditingProject(null);
    setProjectForm({
      id: "project-" + Date.now().toString().slice(-4),
      title: "",
      subtitle: "ENTER SERVICE BLOCK TYPE",
      category: "Full-Stack",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      description: "",
      tags: ["React"],
      client: "New Workspace Client",
      duration: "1 Month",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com/sadafbibi",
      features: ["Modular layout", "Custom UI schema"],
      tools: ["Vite", "Tailwind CSS"]
    });
    setFormTagsString("React, Tailwind CSS");
    setFormToolsString("Vite, Tailwind CSS");
    setFormFeaturesString("Modular responsive screen, Dynamic schema parameters");
  };

  // Save Project Form
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.id) return;

    // Process comma separated lists
    const tags = formTagsString.split(",").map(t => t.trim()).filter(Boolean);
    const tools = formToolsString.split(",").map(t => t.trim()).filter(Boolean);
    const features = formFeaturesString.split(",").map(t => t.trim()).filter(Boolean);

    const completeProject: Project = {
      ...(projectForm as Project),
      tags,
      tools,
      features
    };

    let updatedProjects = [...config.projects];
    if (editingProject) {
      updatedProjects = updatedProjects.map(p => p.id === editingProject.id ? completeProject : p);
    } else {
      // Add new
      updatedProjects.push(completeProject);
    }

    const updatedConfig = { ...config, projects: updatedProjects };
    onConfigChange(updatedConfig);
    localStorage.setItem("portfolio_config", JSON.stringify(updatedConfig));

    // Reset forms
    setIsAddingProject(false);
    setEditingProject(null);
  };

  // Delete Project
  const handleDeleteProject = (projectId: string) => {
    if (!confirm("Are you sure you want to remove this project?")) return;
    const updatedProjects = config.projects.filter(p => p.id !== projectId);
    const updatedConfig = { ...config, projects: updatedProjects };
    onConfigChange(updatedConfig);
    localStorage.setItem("portfolio_config", JSON.stringify(updatedConfig));
  };

  // Add Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      name: newSkillName.trim(),
      level: newSkillLevel,
      category: newSkillCategory
    };

    const updatedSkills = [...config.skills, newSkill];
    const updatedConfig = { ...config, skills: updatedSkills };
    onConfigChange(updatedConfig);
    localStorage.setItem("portfolio_config", JSON.stringify(updatedConfig));
    setNewSkillName("");
  };

  // Remove Skill
  const handleRemoveSkill = (skillName: string) => {
    const updatedSkills = config.skills.filter(s => s.name !== skillName);
    const updatedConfig = { ...config, skills: updatedSkills };
    onConfigChange(updatedConfig);
    localStorage.setItem("portfolio_config", JSON.stringify(updatedConfig));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/95 backdrop-blur-md overflow-y-auto" id="admin-panel-overlay">
      <div 
        className="w-full max-w-5xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col my-8 h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        id="admin-panel-modal"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Cpu className={`w-5 h-5 ${getAccentTextColor(accent)} animate-pulse`} />
            <span className="font-extrabold tracking-widest text-white uppercase">SYSTEM_ADMIN_PORTAL_v2.0</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-300 hover:text-rose-400 transition-all"
            id="close-admin-btn"
          >
            <X className="w-4 h-4" />
            CLOSE TERMINAL
          </button>
        </div>

        {/* Sidebar + Main content split layout */}
        <div className="flex flex-1 overflow-hidden" id="admin-split-layout">
          
          {/* Left Navigation Rails */}
          <div className="w-16 md:w-56 bg-slate-950 border-r border-slate-900/80 p-3 flex flex-col justify-between" id="admin-sidebar">
            <div className="space-y-2 font-mono text-xs">
              
              <p className="hidden md:block text-[9px] tracking-[0.2em] text-slate-600 px-3 py-2">SYSTEM FUNCTIONS</p>
              
              {/* Overview Tab */}
              <button
                onClick={() => { setActiveTab("overview"); setIsAddingProject(false); setEditingProject(null); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === "overview" 
                    ? `bg-slate-900 text-white border-l-2 border-${accent}-400` 
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden md:inline">Console Dashboard</span>
              </button>

              {/* Projects Tab */}
              <button
                onClick={() => setActiveTab("projects")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === "projects" 
                    ? `bg-slate-900 text-white border-l-2 border-${accent}-400` 
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span className="hidden md:inline">Manage Projects ({config.projects.length})</span>
              </button>

              {/* Styles Customizer Tab */}
              <button
                onClick={() => { setActiveTab("styles"); setIsAddingProject(false); setEditingProject(null); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === "styles" 
                    ? `bg-slate-900 text-white border-l-2 border-${accent}-400` 
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                <Palette className="w-4 h-4" />
                <span className="hidden md:inline">Colors & Layouts</span>
              </button>

              {/* Skills Tab */}
              <button
                onClick={() => { setActiveTab("skills"); setIsAddingProject(false); setEditingProject(null); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === "skills" 
                    ? `bg-slate-900 text-white border-l-2 border-${accent}-400` 
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span className="hidden md:inline">Manage Skills</span>
              </button>
            </div>

            {/* Admin Profile indicator */}
            <div className="border-t border-slate-900 pt-4 p-2 hidden md:block">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-${accent}-400/10 border border-${accent}-400/20 flex items-center justify-center`}>
                  <User className={`w-4 h-4 ${getAccentTextColor(accent)}`} />
                </div>
                <div className="font-mono text-[10px]">
                  <p className="text-white font-bold leading-none">Admin Mode</p>
                  <p className="text-emerald-400 font-semibold mt-1">Sadaf Ameer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Space */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-900" id="admin-main-stage">
            
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Console Dashboard Overview */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  key="overview-pane"
                >
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <div>
                      <h3 className="font-sans text-xl md:text-2xl font-bold text-white">System Logs Overview</h3>
                      <p className="text-slate-400 text-xs mt-1">Read visitor entries, telemetry signals, and server metrics.</p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 rounded-md">
                      ONLINE // PORT_3000
                    </span>
                  </div>

                  {/* Grid of Mock Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[9px] text-slate-500 uppercase">SYS_LOAD_CAPABILITY</p>
                        <h4 className="font-sans text-xl font-black text-white mt-1">98.4%</h4>
                      </div>
                      <Cpu className="w-5 h-5 text-indigo-400" />
                    </div>
                    
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[9px] text-slate-500 uppercase">TOTAL_PROJECTS_ACTIVE</p>
                        <h4 className="font-sans text-xl font-black text-white mt-1">{config.projects.length}</h4>
                      </div>
                      <Database className="w-5 h-5 text-amber-400" />
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[9px] text-slate-500 uppercase">CONTACTS_RECEIVED</p>
                        <h4 className="font-sans text-xl font-black text-white mt-1">{messages.length}</h4>
                      </div>
                      <Mail className="w-5 h-5 text-emerald-400" />
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[9px] text-slate-500 uppercase">MOCK_PING_LATENCY</p>
                        <h4 className="font-sans text-xl font-black text-white mt-1">12 ms</h4>
                      </div>
                      <TerminalSquare className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>

                  {/* Dynamic Messages Box */}
                  <div className="rounded-xl border border-slate-850 bg-slate-950/40 p-4 space-y-4">
                    <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center justify-between">
                      <span>OUTBOUND_TELEMETRY_SHELL_INCOMING (Contact Form Submissions)</span>
                      <span className="text-emerald-400 text-[9px]">STORAGE: LOCAL_PRESERVATION</span>
                    </h4>

                    {messages.length === 0 ? (
                      <div className="text-center py-12 font-mono text-xs text-slate-500">
                        <Mail className="w-8 h-8 mx-auto mb-3 opacity-20" />
                        NO INCOMING TRANSMISSIONS DETECTED.
                        <p className="text-[10px] mt-1 text-slate-600">Fill the Contact Form on the page to register real telemetry here.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {messages.map((msg, index) => (
                          <div key={index} className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-slate-300">
                            <div className="space-y-1.5 max-w-xl">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded bg-${accent}-400/10 border border-${accent}-400/20 text-white font-bold`}>
                                  {msg.subject || "PROJECT_SPECTRUM"}
                                </span>
                                <span className="text-[11px] text-white font-extrabold">{msg.name}</span>
                                <span className="text-slate-500">({msg.email})</span>
                              </div>
                              <p className="text-slate-400 font-light text-xs leading-relaxed">{msg.message}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteMessage(index)}
                              className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-400 hover:text-white rounded-lg flex items-center justify-center gap-1.5 transition-all text-[11px] font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              DELETE
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </motion.div>
              )}

              {/* Tab 2: Projects Management Pane */}
              {activeTab === "projects" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  key="projects-pane"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-slate-800 gap-4">
                    <div>
                      <h3 className="font-sans text-xl md:text-2xl font-bold text-white">Dynamic Project Ledger</h3>
                      <p className="text-slate-400 text-xs mt-1">Register new creations or tweak parameters for active items.</p>
                    </div>
                    {!isAddingProject && !editingProject && (
                      <button
                        onClick={handleStartAdd}
                        className={`px-4 py-2 bg-gradient-to-r ${getAccentGradient(accent)} text-slate-950 font-bold font-mono text-xs tracking-wider rounded-xl flex items-center gap-2 shadow-lg hover:scale-101 transition-all`}
                      >
                        <Plus className="w-4 h-4" />
                        ADD NEW WORK
                      </button>
                    )}
                  </div>

                  {/* nested Project Editor form */}
                  {(isAddingProject || editingProject) ? (
                    <form onSubmit={handleSaveProject} className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3 font-mono text-[10px] text-slate-400">
                        <span className="font-bold uppercase text-amber-400">
                          {editingProject ? `EDITING: ${editingProject.title.toUpperCase()}` : "DRAFTING NEW PROJECT REGISTRY"}
                        </span>
                        <button
                          type="button"
                          onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                          className="text-slate-500 hover:text-white transition-all"
                        >
                          ABORT COMPOSITION
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                        {/* ID */}
                        <div>
                          <label className="block text-slate-500 mb-2">PROJECT_RECORD_ID (Unique)</label>
                          <input
                            type="text"
                            required
                            disabled={!!editingProject}
                            value={projectForm.id}
                            onChange={(e) => setProjectForm({ ...projectForm, id: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 disabled:opacity-40"
                          />
                        </div>

                        {/* Title */}
                        <div>
                          <label className="block text-slate-500 mb-2">PROJECT_TITLE</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Markazz Footwear Store"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        {/* Subtitle */}
                        <div>
                          <label className="block text-slate-500 mb-2">PROJECT_SUBTITLE (Slogan)</label>
                          <input
                            type="text"
                            placeholder="e.g. PREMIUM SHOE CATALOG"
                            value={projectForm.subtitle}
                            onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        {/* Category */}
                        <div>
                          <label className="block text-slate-500 mb-2">SPECTRUM_CATEGORY</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                          >
                            <option value="Full-Stack">Full-Stack System</option>
                            <option value="Frontend">Frontend Interface</option>
                            <option value="Backend">Backend / API Engine</option>
                            <option value="AI & Web3">AI & Web3 Workspace</option>
                          </select>
                        </div>

                        {/* Client */}
                        <div>
                          <label className="block text-slate-500 mb-2">CLIENT_NAME</label>
                          <input
                            type="text"
                            value={projectForm.client}
                            onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                          />
                        </div>

                        {/* Duration */}
                        <div>
                          <label className="block text-slate-500 mb-2">DEVELOPMENT_DURATION</label>
                          <input
                            type="text"
                            value={projectForm.duration}
                            onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                          />
                        </div>

                        {/* Image URL */}
                        <div className="sm:col-span-2">
                          <label className="block text-slate-500 mb-2">THUMBNAIL_IMAGE_URL</label>
                          <input
                            type="text"
                            value={projectForm.image}
                            onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                          />
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                          <label className="block text-slate-500 mb-2">SYSTEM_INTEGRATION_DESCRIPTION</label>
                          <textarea
                            rows={3}
                            required
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white resize-none"
                          />
                        </div>

                        {/* Demo URL */}
                        <div>
                          <label className="block text-slate-500 mb-2">LIVE_DEMO_WEB_URL</label>
                          <input
                            type="url"
                            required
                            placeholder="https://..."
                            value={projectForm.demoUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                          />
                        </div>

                        {/* Github URL */}
                        <div>
                          <label className="block text-slate-500 mb-2">GITHUB_CODEBASE_URL</label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={projectForm.githubUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                          />
                        </div>

                        {/* Comma separated listings */}
                        <div className="sm:col-span-2">
                          <label className="block text-slate-500 mb-1">TAGS (Comma separated list)</label>
                          <input
                            type="text"
                            placeholder="React, Redux, Node, MongoDB"
                            value={formTagsString}
                            onChange={(e) => setFormTagsString(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white mb-4"
                          />

                          <label className="block text-slate-500 mb-1">TOOLS USED (Comma separated list)</label>
                          <input
                            type="text"
                            placeholder="Vite, Tailwind, Express, Mongoose"
                            value={formToolsString}
                            onChange={(e) => setFormToolsString(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white mb-4"
                          />

                          <label className="block text-slate-500 mb-1">FEATURES DELIVERED (Comma separated list)</label>
                          <input
                            type="text"
                            placeholder="Dynamic footwear listings, direct order messaging, shopping cart"
                            value={formFeaturesString}
                            onChange={(e) => setFormFeaturesString(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white"
                          />
                        </div>
                      </div>

                      {/* Triggers */}
                      <div className="flex gap-3 justify-end pt-4 border-t border-slate-850">
                        <button
                          type="button"
                          onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-all font-mono text-xs"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className={`px-6 py-2.5 bg-gradient-to-r ${getAccentGradient(accent)} text-slate-950 font-bold font-mono text-xs tracking-wider rounded-xl transition-all`}
                        >
                          SAVE WORK LEDGER
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Project table grid lists */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {config.projects.map((project) => (
                        <div key={project.id} className="p-4 rounded-xl bg-slate-950 border border-slate-850 flex items-start gap-4 justify-between group">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-16 h-12 object-cover rounded-lg border border-slate-800"
                            />
                            <div>
                              <span className="font-mono text-[9px] text-slate-500 tracking-wider block uppercase">{project.category}</span>
                              <h4 className="font-sans text-sm font-extrabold text-white">{project.title}</h4>
                              <a 
                                href={project.demoUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="font-mono text-[10px] text-emerald-400 flex items-center gap-1 hover:underline mt-1"
                              >
                                {project.demoUrl.slice(0, 30)}...
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => handleStartEdit(project)}
                              className="p-1.5 hover:bg-slate-900 border border-transparent hover:border-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
                              title="Edit specifications"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-1.5 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-all"
                              title="Delete project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Tab 3: Styles Customizer Pane */}
              {activeTab === "styles" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  key="styles-pane"
                >
                  <div className="pb-4 border-b border-slate-800">
                    <h3 className="font-sans text-xl md:text-2xl font-bold text-white">Visual Core Controller</h3>
                    <p className="text-slate-400 text-xs mt-1">Fine-tune button color presets, glow modules, and structural variants.</p>
                  </div>

                  {/* Button Palette Options */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-4">
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Palette className="w-4 h-4 text-amber-400" />
                      BUTTON ACCENT COLOR PALETTE ("es ka button ka color change kr do")
                    </h4>
                    <p className="text-slate-400 font-light text-xs max-w-xl leading-relaxed">
                      Choose your favorite core visual anchor. This instantly changes all buttons, checkboxes, glowing gradients, and visual anchors across the entire portfolio:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {colorOptions.map((opt) => {
                        const isSelected = accent === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleAccentChange(opt.value)}
                            className={`p-3.5 rounded-xl border font-mono text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all relative ${
                              isSelected 
                                ? `border-${opt.value}-500 bg-slate-900 shadow-md scale-[1.03]` 
                                : "border-slate-850 bg-slate-950 hover:bg-slate-900"
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full bg-${opt.value}-500 block shadow-[0_0_10px_rgba(16,185,129,0.3)]`} />
                            <span className={isSelected ? `text-white` : "text-slate-400"}>
                              {opt.name.toUpperCase()}
                            </span>
                            {isSelected && (
                              <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white`} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Structural Variants */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-4">
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      STRUCTURAL ARCHITECTURE LAYOUTS
                    </h4>
                    <p className="text-slate-400 font-light text-xs max-w-xl leading-relaxed">
                      Select a structural visual theme preset. This updates background colors and core spacing:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {[
                        { id: "DevPro", desc: "Cybernetic High Contrast" },
                        { id: "Aceternity", desc: "Ethereal Neon Canvas" },
                        { id: "LeeRobinson", desc: "Sleek Ultra Minimalist" },
                        { id: "Sidefolio", desc: "Emerald Green Developer Rails" }
                      ].map((variant) => {
                        const isSelected = activeVariant === variant.id;
                        return (
                          <button
                            key={variant.id}
                            onClick={() => handleLayoutChange(variant.id as PortfolioVariant)}
                            className={`p-4 rounded-xl border text-center transition-all flex flex-col justify-between h-28 relative ${
                              isSelected 
                                ? `border-slate-100 bg-slate-900 scale-[1.03] shadow-lg` 
                                : "border-slate-850 bg-slate-950 hover:bg-slate-900"
                            }`}
                          >
                            <span className="font-mono text-xs font-bold text-white block">
                              {variant.id.toUpperCase()}
                            </span>
                            <span className="text-[10px] text-slate-500 font-light leading-snug">
                              {variant.desc}
                            </span>
                            {isSelected && (
                              <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-${accent}-400`} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </motion.div>
              )}

              {/* Tab 4: Skills Core Pane */}
              {activeTab === "skills" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  key="skills-pane"
                >
                  <div className="pb-4 border-b border-slate-800">
                    <h3 className="font-sans text-xl md:text-2xl font-bold text-white">Skills Matrix Controller</h3>
                    <p className="text-slate-400 text-xs mt-1">Audit or inject tech stacks representing your capabilities.</p>
                  </div>

                  {/* Add skill form */}
                  <form onSubmit={handleAddSkill} className="p-5 rounded-2xl bg-slate-950 border border-slate-850 grid grid-cols-1 md:grid-cols-4 gap-4 items-end font-mono text-xs">
                    <div>
                      <label className="block text-slate-500 mb-2">SKILL_NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Next.js"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 mb-2">SKILL_SPECTRUM</label>
                      <select
                        value={newSkillCategory}
                        onChange={(e) => setNewSkillCategory(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                      >
                        <option value="frontend">Frontend Stack</option>
                        <option value="backend">Backend & Database</option>
                        <option value="tools">DevOps & Tools</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-500 mb-2">PROFICIENCY_LEVEL</label>
                      <select
                        value={newSkillLevel}
                        onChange={(e) => setNewSkillLevel(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                      >
                        <option value="Expert">Expert</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Beginner">Beginner</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className={`py-2.5 bg-gradient-to-r ${getAccentGradient(accent)} text-slate-950 font-bold tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all h-10`}
                    >
                      <Plus className="w-4 h-4" />
                      INJECT SKILL
                    </button>
                  </form>

                  {/* Skills lists by categories */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(["frontend", "backend", "tools"] as const).map((cat) => {
                      const list = config.skills.filter(s => s.category === cat);
                      return (
                        <div key={cat} className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 space-y-3">
                          <h4 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-2">
                            {cat === "frontend" ? "FRONTEND_MATRIX" : cat === "backend" ? "BACKEND_CORE" : "DEV_TOOLS"}
                          </h4>
                          <div className="space-y-2 h-[250px] overflow-y-auto scrollbar-none">
                            {list.map((skill) => (
                              <div key={skill.name} className="flex justify-between items-center p-2.5 bg-slate-950 border border-slate-900 rounded-lg text-xs font-mono text-slate-300">
                                <div>
                                  <span className="text-white font-bold block">{skill.name}</span>
                                  <span className={`text-[9px] text-emerald-400 font-semibold`}>{skill.level.toUpperCase()}</span>
                                </div>
                                <button
                                  onClick={() => handleRemoveSkill(skill.name)}
                                  className="p-1 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-slate-500 hover:text-rose-400 rounded transition-all"
                                  title="Remove skill"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </div>

        {/* Footer verification system stamp */}
        <div className="px-6 py-3.5 bg-slate-950 text-[10px] font-mono text-slate-500 border-t border-slate-800 flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            ADMIN ENCRYPTION SECURE: DIRECT WORKSPACE PORT_3000 PERSISTENCE OK
          </span>
          <span>ADMIN_TERMINAL_v2.0_SYS_STAMP</span>
        </div>

      </div>
    </div>
  );
}

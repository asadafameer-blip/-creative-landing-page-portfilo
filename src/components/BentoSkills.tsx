import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Cpu, Award, Zap } from "lucide-react";
import { PortfolioConfig } from "../portfolioData";
import { PortfolioVariant } from "./CustomizerPanel";

interface BentoSkillsProps {
  config: PortfolioConfig;
  activeVariant: PortfolioVariant;
}

export default function BentoSkills({ config, activeVariant }: BentoSkillsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "tools">("all");

  const frontendSkills = config.skills.filter((s) => s.category === "frontend");
  const backendSkills = config.skills.filter((s) => s.category === "backend");
  const toolsSkills = config.skills.filter((s) => s.category === "tools");

  const getFilteredSkills = () => {
    switch (activeTab) {
      case "frontend": return frontendSkills;
      case "backend": return backendSkills;
      case "tools": return toolsSkills;
      default: return config.skills;
    }
  };

  // Aesthetic styling configurations per layout variant
  const getBoxBorderClass = () => {
    switch (activeVariant) {
      case "LeeRobinson": return "border-slate-800 hover:border-slate-200 bg-black";
      case "Aceternity": return "border-cyan-500/10 hover:border-cyan-400/20 bg-zinc-950";
      case "Sidefolio": return "border-emerald-500/10 hover:border-emerald-400/20 bg-slate-900";
      default: return "border-slate-900 hover:border-amber-400/20 bg-slate-900/40";
    }
  };

  const getAccentText = () => {
    switch (activeVariant) {
      case "Aceternity": return "text-cyan-400";
      case "LeeRobinson": return "text-slate-300";
      case "Sidefolio": return "text-emerald-400";
      default: return "text-amber-400";
    }
  };

  const getMetricGradient = () => {
    switch (activeVariant) {
      case "Aceternity": return "from-cyan-400 to-indigo-400";
      case "LeeRobinson": return "from-slate-200 to-slate-400";
      case "Sidefolio": return "from-emerald-400 to-teal-400";
      default: return "from-amber-400 to-emerald-400";
    }
  };

  const getTabPillActiveClasses = () => {
    switch (activeVariant) {
      case "Aceternity": return "bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 font-bold";
      case "LeeRobinson": return "bg-white text-black font-bold";
      case "Sidefolio": return "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20 font-bold";
      default: return "bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-bold";
    }
  };

  return (
    <section 
      className="py-16 px-4 md:py-24 md:px-8 border-t border-slate-900/60 bg-slate-950 text-slate-100 theme-transition" 
      id="skills"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 md:mb-16" id="skills-section-header">
          <p className={`font-mono text-[10px] md:text-xs tracking-[0.2em] mb-3 uppercase ${getAccentText()}`}>
            EXPERTISE & ARCHITECTURE
          </p>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Bento Skillset Matrix
          </h2>
          <p className="text-slate-400 font-light text-xs md:text-sm mt-3 leading-relaxed px-2">
            A comprehensive overview of my capabilities, experience vectors, and the technical ecosystems I deploy.
          </p>
        </div>

        {/* 3-Column Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch" id="bento-grid-root">
          
          {/* BOX 1: Years of Experience / Key Metrics (Col-span-4) */}
          <div 
            className={`lg:col-span-4 rounded-2xl p-5 md:p-8 border flex flex-col justify-between relative overflow-hidden group transition-all duration-500 ${getBoxBorderClass()}`} 
            id="bento-experience-box"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/2 rounded-full filter blur-2xl pointer-events-none" />
            <div>
              <div className={`flex items-center gap-2 mb-4 md:mb-6 font-mono text-[9px] md:text-[10px] uppercase tracking-widest ${getAccentText()}`}>
                <Award className="w-4 h-4" />
                <span>EXP_VECTOR_METRICS</span>
              </div>
              
              {/* Giant Metric Counter - responsive text size */}
              <div className="mb-4">
                <h3 className={`font-sans text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r leading-none ${getMetricGradient()}`}>
                  3+
                </h3>
                <p className="text-slate-200 text-sm font-semibold mt-2 tracking-wide">Years of Active Development</p>
                <p className="text-slate-400 font-light text-[11px] md:text-xs mt-1 leading-relaxed">
                  Crafting MERN web layouts, working with agile teams, and shipping polished user experiences.
                </p>
              </div>
            </div>

            {/* Structured Stats list - responsive text */}
            <div className="pt-4 md:pt-6 border-t border-slate-800/60 space-y-3 md:space-y-4" id="bento-stats-matrix">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] md:text-xs text-slate-500 uppercase">PROJ_COMPLETED</span>
                <span className={`font-mono text-[10px] md:text-xs font-semibold ${getAccentText()}`}>24+ SHIPPED</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] md:text-xs text-slate-500 uppercase">SYS_SAT_INDEX</span>
                <span className="font-mono text-[10px] md:text-xs font-semibold text-slate-300">99.9% MATCH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] md:text-xs text-slate-500 uppercase">COMMITS_LOGGED</span>
                <span className="font-mono text-[10px] md:text-xs font-semibold text-slate-400">1,200+ GIT</span>
              </div>
            </div>
          </div>

          {/* BOX 2: Technologies Tag Cloud / Categorized Selector (Col-span-5) */}
          <div 
            className={`lg:col-span-5 rounded-2xl p-5 md:p-8 border flex flex-col justify-between relative overflow-hidden group transition-all duration-500 ${getBoxBorderClass()}`} 
            id="bento-skills-tag-cloud"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/2 rounded-full filter blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className={`flex items-center gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-widest ${getAccentText()}`}>
                  <Cpu className="w-4 h-4" />
                  <span>TECH_STACK_DOCK</span>
                </div>
                <span className="text-[8px] md:text-[9px] font-mono text-slate-500 uppercase tracking-wider">TAG CLOUD</span>
              </div>

              {/* Tag Categories Segment Selector - responsive pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 border border-white/5 rounded-xl mb-4 md:mb-6 flex-wrap" id="skills-category-pills">
                {(["all", "frontend", "backend", "tools"] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2 py-1 md:px-3 md:py-1.5 text-[9px] md:text-[10px] font-mono tracking-wider uppercase rounded-lg transition-all ${
                        isActive
                          ? getTabPillActiveClasses()
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Tag Cloud List - responsive items */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 max-h-[220px] overflow-y-auto" id="skills-tag-cloud-wrapper">
                {getFilteredSkills().map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="px-2 py-1.5 md:px-3 md:py-2 bg-slate-950 border border-white/5 rounded-xl text-[10px] md:text-xs font-mono font-medium tracking-wide flex items-center gap-1.5 hover:border-white/10 hover:scale-[1.03] transition-all cursor-default"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse`} />
                    <span className="text-slate-300">{skill.name}</span>
                    <span className="text-[8px] md:text-[9px] text-slate-500 font-normal">({skill.level})</span>
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="mt-6 md:mt-8 pt-3 md:pt-4 border-t border-slate-800/60 flex items-center justify-between text-[8px] md:text-[9px] font-mono text-slate-500">
              <span>ACTIVE_COMPILERS: VITE_ESBUILD</span>
              <span className={getAccentText()}>TYPES_COMPLIANT</span>
            </div>
          </div>

          {/* BOX 3: Current Focus & Live status indicator (Col-span-3) */}
          <div 
            className={`lg:col-span-3 rounded-2xl p-5 md:p-8 border flex flex-col justify-between relative overflow-hidden group transition-all duration-500 ${getBoxBorderClass()}`} 
            id="bento-focus-box"
          >
            <div>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className={`flex items-center gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-widest ${getAccentText()}`}>
                  <Zap className="w-4 h-4" />
                  <span>CURRENT_FOCUS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                  </span>
                  <span className="font-mono text-[8px] md:text-[9px] text-slate-400">LIVE</span>
                </div>
              </div>

              {/* Main learning/focus items - responsive padding */}
              <div className="space-y-3 md:space-y-4">
                <div className="p-3 md:p-4 bg-slate-950 border border-white/5 rounded-xl">
                  <p className="font-mono text-[8px] md:text-[9px] text-slate-500 uppercase tracking-widest">EXPLORING</p>
                  <h4 className="font-sans text-xs font-bold text-white mt-1">Next.js 15 & Server Components</h4>
                  <p className="text-slate-400 text-[10px] md:text-[11px] font-light mt-1 leading-relaxed">
                    Maximizing backend performance, nested layouts, and edge server-side render strategies.
                  </p>
                </div>

                <div className="p-3 md:p-4 bg-slate-950 border border-white/5 rounded-xl">
                  <p className="font-mono text-[8px] md:text-[9px] text-slate-500 uppercase tracking-widest">SYSTEM BUILDER</p>
                  <h4 className="font-sans text-xs font-bold text-white mt-1">AI Agent Integration APIs</h4>
                  <p className="text-slate-400 text-[10px] md:text-[11px] font-light mt-1 leading-relaxed">
                    Connecting deep language model outputs to relational real-time telemetry systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 pt-3 md:pt-4 border-t border-slate-800/60 flex flex-col gap-1 text-[8px] md:text-[9px] font-mono text-slate-500">
              <div className="flex justify-between">
                <span>FOCUS_METRIC_MATCH:</span>
                <span className="text-emerald-400">97.8% EFFICIENCY</span>
              </div>
              <div className="flex justify-between">
                <span>CURRENT_DEPLOYMENT:</span>
                <span className="text-slate-400">CLOUD_RUN</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
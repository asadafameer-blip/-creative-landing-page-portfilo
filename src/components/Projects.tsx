import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, FolderOpen, Layers, Cpu, Code, Sparkles } from "lucide-react";
import { Project, CategoryFilter } from "../types";
import { PortfolioConfig } from "../portfolioData";
import { PortfolioVariant } from "./CustomizerPanel";
import { 
  getAccentTextColor, 
  getAccentGradient, 
  getAccentHoverBorderColor,
  getAccentBorderColor,
  getAccentHoverBgColor,
  getAccentTextColor as getAccentHoverTextColor 
} from "../lib/colorUtils";

interface ProjectsProps {
  onProjectSelect: (project: Project) => void;
  config: PortfolioConfig;
  activeVariant: PortfolioVariant;
}

export default function Projects({ onProjectSelect, config, activeVariant }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  const categories: CategoryFilter[] = ["All", "Full-Stack", "Frontend", "Backend"];

  const filteredProjects = selectedCategory === "All"
    ? config.projects
    : config.projects.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Full-Stack": return <Layers className="w-3.5 h-3.5" />;
      case "Frontend": return <Code className="w-3.5 h-3.5" />;
      case "Backend": return <Cpu className="w-3.5 h-3.5" />;
      case "AI & Web3": return <Sparkles className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  // Aesthetic adjustments per layout variant
  const getAccentText = () => {
    if (config.accentColor) {
      return getAccentTextColor(config.accentColor);
    }
    switch (activeVariant) {
      case "Aceternity": return "text-cyan-400";
      case "LeeRobinson": return "text-slate-300";
      case "Sidefolio": return "text-emerald-400";
      default: return "text-amber-400";
    }
  };

  const getFilterButtonActiveClasses = () => {
    if (config.accentColor) {
      return `text-slate-950 font-bold bg-gradient-to-r ${getAccentGradient(config.accentColor)}`;
    }
    switch (activeVariant) {
      case "Aceternity": return "text-slate-950 font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400";
      case "LeeRobinson": return "text-black font-bold bg-white";
      case "Sidefolio": return "text-slate-950 font-bold bg-gradient-to-r from-emerald-400 to-teal-400";
      default: return "text-slate-950 font-bold bg-gradient-to-r from-amber-400 to-emerald-400";
    }
  };

  const getCardBorderClasses = () => {
    const customAccentHoverBorder = config.accentColor 
      ? getAccentHoverBorderColor(config.accentColor) 
      : "";
    switch (activeVariant) {
      case "LeeRobinson": return "border-slate-800 hover:border-slate-200 bg-black";
      case "Aceternity": return "border-cyan-500/10 hover:border-cyan-400/20 bg-zinc-950";
      case "Sidefolio": return "border-emerald-500/10 hover:border-emerald-400/20 bg-slate-900";
      default: return `border-slate-900 ${customAccentHoverBorder || "hover:border-amber-400/30"} bg-slate-900/40`;
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 border-t border-slate-900/60 bg-slate-950 theme-transition" id="projects">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6" id="projects-section-header">
          <div className="max-w-xl">
            <p className={`font-mono text-xs tracking-[0.2em] mb-3 uppercase ${getAccentText()}`}>SELECTED DIGITAL WORK</p>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Featured Systems
            </h2>
            <p className="text-slate-400 font-light text-xs md:text-sm mt-3 leading-relaxed">
              Explore dynamic web systems, full-stack tools, and premium layouts with a clean syntax-first aesthetic.
            </p>
          </div>

          {/* Filtering bar */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 border border-white/5 p-1.5 rounded-2xl overflow-x-auto scrollbar-none" id="projects-category-filter-bar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 text-xs font-mono tracking-wider rounded-xl transition-all duration-350 flex items-center gap-2 ${
                    isActive ? getFilterButtonActiveClasses() : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-1.5 relative z-10">
                    {getCategoryIcon(cat)}
                    {cat.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Responsive Projects Grid - Compact 3 Columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-3column-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group"
                id={`project-card-wrapper-${project.id}`}
              >
                <div className={`h-full rounded-2xl overflow-hidden border shadow-2xl relative flex flex-col justify-between transition-all duration-500 ${getCardBorderClasses()}`}>
                  
                  {/* Thumbnail Image Section */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950 border-b border-white/5" id={`project-img-frame-${project.id}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-10" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover scale-[1.01] transition-transform duration-1000 ease-out group-hover:scale-104"
                      referrerPolicy="no-referrer"
                      id={`project-image-view-${project.id}`}
                    />

                    {/* Category Label Overlay */}
                    <div className={`absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-slate-950/85 backdrop-blur-md rounded-lg border border-white/10 font-mono text-[9px] ${getAccentText()} font-semibold`}>
                      {getCategoryIcon(project.category)}
                      <span className="tracking-widest uppercase">{project.category}</span>
                    </div>

                    {/* Floating titles overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col">
                      <span className={`font-mono text-[9px] tracking-[0.25em] ${getAccentText()} mb-1`}>
                        {project.subtitle}
                      </span>
                      <h3 className="font-sans text-lg text-white font-extrabold tracking-tight transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Details Card Content */}
                  <div className="p-5 flex flex-col justify-between flex-1 bg-slate-950/30" id={`project-card-body-${project.id}`}>
                    <p className="text-slate-400 font-light text-xs leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 mb-4" id={`project-tags-cloud-${project.id}`}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-950 border border-white/5 rounded-md font-mono text-[9px] text-slate-400 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Buttons Group (Details modal & Github/Demo link) */}
                    <div className="flex items-center gap-2 pt-4 border-t border-white/5" id={`project-buttons-panel-${project.id}`}>
                      <button
                        onClick={() => onProjectSelect(project)}
                        className={`flex-1 px-3 py-2 bg-slate-950 border border-white/10 text-[10px] font-mono tracking-wider text-slate-300 hover:text-white ${config.accentColor ? `hover:border-${config.accentColor}-400/30` : ""} rounded-xl flex items-center justify-center gap-1 transition-all`}
                        id={`btn-details-${project.id}`}
                      >
                        <FolderOpen className="w-3 h-3" />
                        SPECS
                      </button>

                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-slate-900 border border-white/10 text-[10px] font-mono tracking-wider text-slate-400 hover:text-white rounded-xl flex items-center justify-center gap-1 transition-all"
                        id={`btn-github-${project.id}`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        DEMO
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

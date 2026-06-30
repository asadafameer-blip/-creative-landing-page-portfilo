import { motion } from "motion/react";
import { X, Calendar, User, Briefcase, CheckCircle2, ShieldCheck, Cpu, Github, ExternalLink } from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto"
      id="project-lightbox-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative flex flex-col my-8"
        id="project-lightbox-card"
        onClick={(e) => e.stopPropagation()} // Prevent closure inside card click
      >
        
        {/* Header Telemetry marking & Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950 font-mono text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>RECORD_ID_SPEC // {project.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-300 hover:text-amber-400 hover:border-amber-400/20 transition-all"
            id="close-lightbox-btn"
          >
            <X className="w-4 h-4" />
            CLOSE
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto max-h-[80vh] md:max-h-[70vh]" id="lightbox-scrollable-container">
          
          {/* Banner mockup illustration */}
          <div className="relative w-full aspect-[21/9] md:aspect-[16/6] overflow-hidden bg-slate-950 border-b border-slate-800/80">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-80" />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover scale-[1.01]"
              referrerPolicy="no-referrer"
              id="lightbox-main-banner"
            />
          </div>

          {/* Grid Metadata details layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8" id="lightbox-details-grid">
            
            {/* Left Column details (col-span-7) */}
            <div className="lg:col-span-7 space-y-6" id="lightbox-left-pane">
              <div>
                <span className="font-mono text-[9px] tracking-[0.25em] text-emerald-400 block mb-1 uppercase">
                  {project.subtitle}
                </span>
                <h3 className="font-sans text-2xl md:text-3xl text-white font-extrabold tracking-tight">
                  {project.title}
                </h3>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-slate-400 font-light text-xs md:text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project features checklist list */}
              <div className="pt-6 border-t border-slate-850">
                <h4 className="font-mono text-[10px] tracking-wider text-slate-500 uppercase mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  PROJECT_SYSTEM_FEATURES_DELIVERED
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="lightbox-features-grid">
                  {project.features.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-slate-300 font-light leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column technical stats (col-span-5) */}
            <div className="lg:col-span-5 space-y-6" id="lightbox-right-pane">
              
              {/* Client specs panel */}
              <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-850 space-y-4" id="lightbox-client-stats-card">
                <h4 className="font-mono text-[10px] tracking-wider text-slate-400 uppercase border-b border-slate-850 pb-2">
                  METRICS_SYSTEM_INTEGRITY
                </h4>

                <div className="space-y-3.5 font-mono text-xs">
                  {/* Client */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-900/50">
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <User className="w-4 h-4 text-amber-400" />
                      CLIENT
                    </span>
                    <span className="text-slate-200 font-medium text-right">{project.client}</span>
                  </div>
                  
                  {/* Category */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-900/50">
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      SPECTRUM
                    </span>
                    <span className="text-amber-400 font-semibold">{project.category.toUpperCase()}</span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-900/50">
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      DURATION
                    </span>
                    <span className="text-slate-300">{project.duration}</span>
                  </div>
                </div>
              </div>

              {/* Technologies list */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-850" id="lightbox-tools-card">
                <h4 className="font-mono text-[10px] tracking-wider text-slate-400 uppercase mb-4 pb-2 border-b border-slate-850">
                  STACK_ENGINE_COMPOSITION
                </h4>
                <div className="flex flex-wrap gap-2" id="lightbox-tools-tags">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[10px] text-emerald-400 font-semibold"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close / Action triggers */}
              <div className="flex gap-4">
                <button
                  onClick={() => alert(`Launching fully simulated sandbox compiler environment for "${project.title}"...`)}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-bold font-mono text-[11px] tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(52,211,153,0.15)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  LIVE DEMO
                </button>
              </div>

            </div>

          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}

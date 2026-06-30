import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, Cpu, Sparkles, FolderGit, MessageSquare, TerminalSquare, ChevronDown } from "lucide-react";
import { PortfolioConfig } from "../portfolioData";
import { PortfolioVariant } from "./CustomizerPanel";
import { 
  getAccentTextColor, 
  getAccentBgColor, 
  getAccentGradient, 
  getAccentGlow 
} from "../lib/colorUtils";

interface HeroProps {
  config: PortfolioConfig;
  activeVariant: PortfolioVariant;
}

export default function Hero({ config, activeVariant }: HeroProps) {
  const roles = config.personalInfo.roles.length > 0 
    ? config.personalInfo.roles 
    : ["Web Developer", "MERN Stack Enthusiast"];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Restart role index if roles change
  useEffect(() => {
    setRoleIndex(0);
    setDisplayText("");
    setIsDeleting(false);
  }, [config.personalInfo.roles]);

  useEffect(() => {
    if (roles.length === 0) return;
    let timer: NodeJS.Timeout;
    const currentFullRole = roles[roleIndex] || "";

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setTypingSpeed(30);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => currentFullRole.slice(0, prev.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentFullRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setTypingSpeed(100);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  // Accent helper maps
  const getGradientTextClasses = () => {
    if (config.accentColor) {
      return `text-transparent bg-clip-text bg-gradient-to-r ${getAccentGradient(config.accentColor)}`;
    }
    switch (activeVariant) {
      case "Aceternity": return "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-500";
      case "LeeRobinson": return "text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400";
      case "Sidefolio": return "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400";
      default: return "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400";
    }
  };

  const getSubtextGlow = () => {
    switch (activeVariant) {
      case "Aceternity": return "rgba(34,211,238,0.15)";
      case "LeeRobinson": return "rgba(255,255,255,0.05)";
      case "Sidefolio": return "rgba(52,211,153,0.15)";
      default: return "rgba(251,191,36,0.15)";
    }
  };

  const getSubtextColor = () => {
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

  const getCtaButtonClasses = () => {
    if (config.accentColor) {
      return `bg-gradient-to-r ${getAccentGradient(config.accentColor)} text-slate-950 font-bold ${getAccentGlow(config.accentColor)} hover:scale-101`;
    }
    switch (activeVariant) {
      case "Aceternity": return "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 hover:shadow-[0_4px_30px_rgba(34,211,238,0.3)]";
      case "LeeRobinson": return "bg-white hover:bg-slate-100 text-black font-semibold border border-slate-200 shadow-none";
      case "Sidefolio": return "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold";
      default: return "bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 hover:shadow-[0_4px_30px_rgba(251,191,36,0.4)]";
    }
  };

  const getContainerGlows = () => {
    switch (activeVariant) {
      case "LeeRobinson": return null;
      case "Aceternity":
        return (
          <>
            <div className="absolute top-1/4 left-10 w-60 h-60 md:w-80 md:h-80 bg-cyan-500/5 rounded-full filter blur-[100px] md:blur-[120px] pointer-events-none -z-10 animate-pulse duration-[6000ms]" />
            <div className="absolute bottom-1/4 right-10 w-72 h-72 md:w-[400px] md:h-[400px] bg-fuchsia-500/5 rounded-full filter blur-[120px] md:blur-[150px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />
          </>
        );
      case "Sidefolio":
        return (
          <>
            <div className="absolute top-1/3 left-10 w-64 h-64 md:w-[350px] md:h-[350px] bg-emerald-500/5 rounded-full filter blur-[100px] md:blur-[130px] pointer-events-none -z-10 animate-pulse" />
          </>
        );
      default:
        return (
          <>
            <div className="absolute top-1/4 left-10 w-60 h-60 md:w-80 md:h-80 bg-amber-500/10 rounded-full filter blur-[100px] md:blur-[120px] pointer-events-none -z-10 animate-pulse duration-[6000ms]" />
            <div className="absolute bottom-1/4 right-10 w-72 h-72 md:w-[400px] md:h-[400px] bg-emerald-500/10 rounded-full filter blur-[120px] md:blur-[150px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />
          </>
        );
    }
  };

  return (
    <section
      className={`relative min-h-[100dvh] flex items-center pt-28 pb-16 overflow-hidden px-4 md:px-8 transition-all duration-500 ${
        activeVariant === "LeeRobinson" ? "bg-black" : activeVariant === "Aceternity" ? "bg-zinc-950" : "bg-slate-950"
      }`}
      id="home"
    >
      {/* Custom blink keyframes for cursor */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>

      {/* Background ambient light fields */}
      {getContainerGlows()}

      {/* Grid lines layout overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.05] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center text-center"
          id="hero-intro-column"
        >
          {/* Availability Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4 md:mb-6" id="hero-badge-status">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-duration-[2s]"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-mono text-[8px] md:text-[9px] tracking-widest text-slate-400 uppercase whitespace-nowrap">
              {config.personalInfo.availableForHire ? "AVAILABLE FOR CONTRACT WORK" : "BUSY ON SYSTEMS"}
            </span>
          </div>

          {/* Main Hero Header Title - Responsive text size */}
          <h1 className={`font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-slate-100 dark:text-white font-extrabold tracking-tight leading-[0.9] ${activeVariant === "LeeRobinson" ? "font-serif italic" : ""}`} id="hero-main-heading">
            <span className={getGradientTextClasses()}>
              {config.personalInfo.fullName}
            </span>
          </h1>
          
          {/* Dynamic typing role animation with aria-live */}
          <div className="mt-4 md:mt-5 mb-4 md:mb-6 flex items-center justify-center h-8" id="hero-subheading">
            <span 
              className={`font-mono text-base sm:text-lg md:text-2xl font-bold ${getSubtextColor()}`} 
              style={{ textShadow: `0 0 10px ${getSubtextGlow()}` }}
              aria-live="polite"
            >
              {displayText}
              <span className="animate-blink ml-1 opacity-75">_</span>
            </span>
          </div>

          {/* Bio sentence paragraph */}
          <p className="text-slate-400 max-w-2xl text-xs sm:text-sm font-light leading-relaxed mb-6 md:mb-8 mx-auto text-center px-2" id="hero-bio-para">
            {config.personalInfo.bio}
          </p>

          {/* Interactive CTAs buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 w-full sm:w-auto" id="hero-action-buttons">
            <a
              href="#projects"
              className={`px-5 md:px-6 py-3 md:py-3.5 font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm md:text-base ${getCtaButtonClasses()}`}
              id="hero-view-work-btn"
              aria-label="View Portfolio"
            >
              <FolderGit className="w-4 h-4" />
              VIEW PORTFOLIO
            </a>
            
            <a
              href="#contact"
              className="px-5 md:px-6 py-3 md:py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-300 text-sm md:text-base"
              id="hero-get-in-touch-btn"
              aria-label="Contact me"
            >
              <MessageSquare className="w-4 h-4" />
              SEND SIGNAL
            </a>
          </div>

          {/* Core framework badges row */}
          <div className="mt-10 md:mt-12 pt-4 md:pt-6 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-2 md:gap-3" id="hero-tag-badges">
            <span className="text-[8px] md:text-[9px] font-mono text-slate-500 uppercase tracking-widest">SYSTEM_STACK_COMPOSITION:</span>
            {config.personalInfo.coreTechStack.map((tech) => (
              <span
                key={tech}
                className="px-2 md:px-2.5 py-1 bg-white/5 border border-white/5 text-slate-400 font-mono text-[8px] md:text-[9px] rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>

        </motion.div>

        {/* Right Terminal Console Screen Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center"
          id="hero-terminal-column"
        >
          <div className={`w-full max-w-[450px] bg-slate-950/90 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-500`} id="fake-developer-terminal">
            {/* Terminal Window Header controls */}
            <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 bg-slate-900 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="font-mono text-[7px] md:text-[9px] text-slate-500 flex items-center gap-1.5">
                <TerminalSquare className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>guest@{config.personalInfo.fullName.toLowerCase().replace(/\s+/g, "")}:~</span>
              </div>
              <div className="w-8 md:w-10" />
            </div>

            {/* Terminal Console Log feeds - responsive text and spacing */}
            <div className="p-4 md:p-6 font-mono text-[10px] md:text-[11px] space-y-3 md:space-y-4 text-slate-300 select-none overflow-x-auto" id="terminal-content-area">
              
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-slate-100">whoami</span>
                </div>
                <div className="text-amber-400 mt-1 font-semibold text-[10px] md:text-[11px]">{config.personalInfo.username}</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-slate-100">pwd</span>
                </div>
                <div className="text-slate-400 mt-1 text-[10px] md:text-[11px]">/home/{config.personalInfo.username.replace("@", "")}/portfolio</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-slate-100">neofetch --minimal</span>
                </div>
                <div className="mt-1.5 md:mt-2 space-y-0.5 md:space-y-1 text-[9px] md:text-[10px] text-slate-400 border-l border-white/10 pl-3">
                  <p><span className="text-amber-400 font-semibold">NAME:</span> {config.personalInfo.fullName}</p>
                  <p><span className="text-amber-400 font-semibold">CURRENT_VIBE:</span> {activeVariant.toUpperCase()}</p>
                  <p><span className="text-amber-400 font-semibold">CORE_STACK:</span> {config.personalInfo.coreTechStack.slice(0, 4).join(", ")}</p>
                  <p><span className="text-amber-400 font-semibold">DEPLOY_PORT:</span> localhost:3000</p>
                  <p><span className="text-amber-400 font-semibold">STABLE_RELEASE:</span> v1.2.0-clean</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="w-2 h-3.5 bg-amber-400 animate-blink" />
              </div>

            </div>

            {/* Bottom Status bar panel */}
            <div className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-900/40 text-[8px] md:text-[9px] font-mono text-slate-600 flex justify-between border-t border-white/5">
              <span>NODE_METRICS: DEPLOYED</span>
              <span className="text-emerald-400 font-semibold">SYS_AESTHETIC_MATCH</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll down indicator (mobile friendly) */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 animate-bounce">
        <span className="text-[8px] md:text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
      </div>
    </section>
  );
}
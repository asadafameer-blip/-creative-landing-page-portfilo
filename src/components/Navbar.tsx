import { motion } from "motion/react";
import { Sun, Moon, Menu, X, Terminal, Sparkles } from "lucide-react";
import { useState, MouseEvent } from "react";
import { PortfolioConfig } from "../portfolioData";
import { PortfolioVariant } from "./CustomizerPanel";
import { getAccentTextColor, getAccentGradient } from "../lib/colorUtils";

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  config: PortfolioConfig;
  activeVariant: PortfolioVariant;
  onOpenAdmin: () => void;
}

export default function Navbar({ isDarkMode, onToggleTheme, config, activeVariant, onOpenAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Accent helper based on layout variants
  const getGradientClasses = () => {
    if (config.accentColor) {
      return getAccentGradient(config.accentColor);
    }
    switch (activeVariant) {
      case "Aceternity": return "from-cyan-400 to-fuchsia-400";
      case "LeeRobinson": return "from-slate-200 to-slate-400";
      case "Sidefolio": return "from-emerald-400 to-teal-400";
      default: return "from-amber-400 to-emerald-400";
    }
  };

  const getAccentText = () => {
    if (config.accentColor) {
      return `group-hover:${getAccentTextColor(config.accentColor)}`;
    }
    switch (activeVariant) {
      case "Aceternity": return "group-hover:text-cyan-400";
      case "LeeRobinson": return "group-hover:text-white";
      case "Sidefolio": return "group-hover:text-emerald-400";
      default: return "group-hover:text-amber-400";
    }
  };

  const getBorderClasses = () => {
    switch (activeVariant) {
      case "LeeRobinson": return "border-slate-800 bg-black/90";
      case "Aceternity": return "border-cyan-500/10 bg-zinc-950/80";
      case "Sidefolio": return "border-emerald-500/10 bg-slate-900/80";
      default: return "border-white/5 bg-slate-900/80";
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 theme-transition"
      id="fixed-navbar"
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 border shadow-2xl backdrop-blur-md transition-all duration-300 ${getBorderClasses()}`}>
        
        {/* Left: Branding */}
        <a 
          href="#home" 
          onClick={(e) => handleScroll(e, "home")} 
          className="flex items-center gap-2 group animate-fade-in" 
          id="navbar-branding-logo"
        >
          <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${getGradientClasses()} p-[1px]`}>
            <div className="w-full h-full bg-[#0f172a] rounded-[7px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-slate-200" />
            </div>
          </div>
          <span className={`font-sans text-base font-bold tracking-tight text-slate-100 dark:text-white light:text-slate-900 transition-colors duration-300 ${getAccentText()}`}>
            {config.personalInfo.fullName}
          </span>
          <span className="font-mono text-[10px] text-slate-400 hidden sm:inline px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">
            {config.personalInfo.username}
          </span>
        </a>

        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center gap-8" id="navbar-desktop-menu">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href.slice(1))}
              className="text-sm font-medium tracking-wide text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white transition-colors duration-200 relative py-1 group"
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r ${getGradientClasses()} transition-all duration-300 group-hover:w-full`} />
            </a>
          ))}
        </nav>

        {/* Right: Theme Toggle & Mobile Menu button */}
        <div className="flex items-center gap-3 md:gap-4" id="navbar-actions-panel">
          {/* Active Preset Tag visual confirmation */}
          {/* <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] text-slate-400 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
            <span>Preset: {activeVariant}</span>
          </span> */}

          {/* Admin Console Entry Button */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-900/95 hover:bg-slate-800/90 border border-white/10 text-[10px] font-mono font-extrabold tracking-widest hover:text-white rounded-xl transition-all duration-300 shadow-md ${getAccentText()}`}
            title="Launch Admin & Developer Console"
            id="admin-console-trigger-btn"
          >
            <Terminal className={`w-3.5 h-3.5 ${getAccentTextColor(config.accentColor)}`} />
            <span className="hidden sm:inline">CONSOLE</span>
          </button>

          {/* Theme Switch Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white shadow-sm transition-all duration-300"
            aria-label="Toggle Theme"
            id="theme-switcher-btn"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quick Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className={`hidden sm:inline-flex items-center gap-1 px-4 py-2.5 bg-gradient-to-r ${getGradientClasses()} hover:opacity-95 font-mono text-[11px] font-extrabold tracking-wider text-slate-950 rounded-xl transition-all duration-300 shadow-lg`}
            id="cta-hire-me"
          >
            HIRE ME
          </a>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white border border-white/5 bg-slate-950/40"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden mt-2 px-4"
          id="mobile-dropdown-menu"
        >
          <div className="glass-panel rounded-2xl p-4 space-y-3 flex flex-col border border-white/5 shadow-2xl backdrop-blur-lg">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href.slice(1))}
                className="px-4 py-2 text-sm font-medium rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => { setIsOpen(false); onOpenAdmin(); }}
              className="w-full text-center py-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs rounded-xl"
            >
              [CONSOLE]
            </button>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className={`mt-2 w-full text-center py-2.5 bg-gradient-to-r ${getGradientClasses()} text-slate-950 font-bold text-xs rounded-xl`}
            >
              HIRE ME
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

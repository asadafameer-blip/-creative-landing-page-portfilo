import { ArrowUp, Github, Linkedin, Facebook, Cpu } from "lucide-react";
import { PortfolioConfig } from "../portfolioData";
import { PortfolioVariant } from "./CustomizerPanel";

interface FooterProps {
  config: PortfolioConfig;
  activeVariant: PortfolioVariant;
}

export default function Footer({ config, activeVariant }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getAccentText = () => {
    switch (activeVariant) {
      case "Aceternity": return "text-cyan-400";
      case "LeeRobinson": return "text-slate-300";
      case "Sidefolio": return "text-emerald-400";
      default: return "text-amber-400";
    }
  };

  const getSocialHoverClass = () => {
    switch (activeVariant) {
      case "Aceternity": return "hover:border-cyan-400/30 hover:text-cyan-400";
      case "LeeRobinson": return "hover:border-white hover:text-white";
      case "Sidefolio": return "hover:border-emerald-400/30 hover:text-emerald-400";
      default: return "hover:border-amber-400/30 hover:text-amber-400";
    }
  };

  const socialLinks = [
    { label: "GitHub", href: config.socials.github, icon: <Github className="w-4 h-4" /> },
    { label: "LinkedIn", href: config.socials.linkedin, icon: <Linkedin className="w-4 h-4" /> },
    { label: "Facebook", href: config.socials.facebook, icon: <Facebook className="w-4 h-4" /> },
  ].filter(link => link.href);

  return (
    <footer className="bg-slate-950 border-t border-slate-900/60 py-12 px-4 md:px-8 relative overflow-hidden theme-transition" id="footer-section">
      
      {/* Ambient backdrop glow */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/2 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-8">
        
        {/* Left Side: Branding, Copyright & telemetry signals */}
        <div className="space-y-4" id="footer-copyright-branding">
          <div className="flex items-center gap-2">
            <span className="font-sans text-sm tracking-[0.05em] font-bold text-white">
              {config.personalInfo.fullName}
            </span>
            <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-600">
              <Cpu className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              <span>SADAFA_STATION_ONLINE</span>
            </div>
          </div>
          
          <div className="space-y-1 font-mono text-[9px] text-slate-500 tracking-wider uppercase">
            <p>© {currentYear} {config.personalInfo.fullName.toUpperCase()} ({config.personalInfo.username}). ALL SYSTEMS OPERATIONAL.</p>
            <p>DESIGNED & ENGINEERED IN COGNITIVE ALIGNMENT WITH CLEAN CODING STANDARDS.</p>
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex flex-wrap items-center gap-4" id="footer-social-icons">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`w-9 h-9 rounded-xl bg-slate-950 border border-white/5 text-slate-400 flex items-center justify-center transition-all duration-300 ${getSocialHoverClass()}`}
              aria-label={social.label}
              id={`footer-social-${social.label.toLowerCase()}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Right Side: Back to Top */}
        <div className="flex items-center justify-start md:justify-end" id="footer-back-to-top">
          <button
            onClick={handleScrollTop}
            className={`flex items-center gap-2 px-4 py-2 bg-slate-950 border border-white/5 rounded-xl font-mono text-[10px] tracking-wider text-slate-400 hover:text-white transition-all duration-300`}
            id="btn-footer-back-to-top"
          >
            SCROLL TO TOP
            <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>

      </div>
    </footer>
  );
}

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoSkills from "./components/BentoSkills";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import ProjectModal from "./components/ProjectModal";
import Footer from "./components/Footer";
import CustomizerPanel, { PortfolioVariant } from "./components/CustomizerPanel";
import AdminPanel from "./components/AdminPanel";
import { initialPortfolioConfig, PortfolioConfig } from "./portfolioData";
import { Project } from "./types";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("is_dark_mode");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [activeVariant, setActiveVariant] = useState<PortfolioVariant>("DevPro");
  const [config, setConfig] = useState<PortfolioConfig>(initialPortfolioConfig);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Load state from localStorage on startup
  useEffect(() => {
    const savedConfig = localStorage.getItem("portfolio_config");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error(e);
      }
    }
    const savedVariant = localStorage.getItem("portfolio_variant");
    if (savedVariant) {
      setActiveVariant(savedVariant as PortfolioVariant);
    }
  }, []);

  // Sync isDarkMode to standard document HTML root
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("is_dark_mode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div 
      className={`relative min-h-screen font-sans selection:bg-blue-400/30 selection:text-white theme-transition transition-colors duration-500 ${
        isDarkMode 
          ? (activeVariant === "LeeRobinson" 
              ? "bg-black text-slate-100" 
              : activeVariant === "Aceternity" 
                ? "bg-zinc-950 text-slate-100" 
                : "bg-slate-950 text-slate-100")
          : "bg-slate-50 text-slate-900"
      }`} 
      id="portfolio-app-root"
    >
      
      {/* Dynamic Data-Driven Navigation Bar with layout presets info */}
      <Navbar 
        isDarkMode={isDarkMode} 
        onToggleTheme={handleToggleTheme} 
        config={config} 
        activeVariant={activeVariant} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Page Sections content */}
      <main className="relative" id="main-content">
        
        {/* Dynamic Hero Section */}
        <Hero 
          config={config} 
          activeVariant={activeVariant} 
        />

        {/* Dynamic Bento Grid Skills matrix */}
        <BentoSkills 
          config={config} 
          activeVariant={activeVariant} 
        />

        {/* Dynamic Curated Projects Portfolio section */}
        <Projects 
          onProjectSelect={setSelectedProject} 
          config={config} 
          activeVariant={activeVariant} 
        />

        {/* Dynamic Contact Form connected to theme style presets */}
        <ContactForm 
          config={config} 
          activeVariant={activeVariant} 
        />

      </main>

      {/* Dynamic Footer with socials sync */}
      <Footer 
        config={config} 
        activeVariant={activeVariant} 
      />

      {/* Admin Panel Console */}
      <AdminPanel 
        config={config}
        onConfigChange={setConfig}
        activeVariant={activeVariant}
        onVariantChange={setActiveVariant}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Live Customization Control Drawer Panel */}
      <CustomizerPanel 
        config={config} 
        onConfigChange={setConfig} 
        activeVariant={activeVariant} 
        onVariantChange={setActiveVariant} 
      />

      {/* Lightbox Specification details dialog */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

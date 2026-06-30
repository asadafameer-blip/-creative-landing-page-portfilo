import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Mail, User, TerminalSquare, RefreshCw, CheckCircle, ShieldCheck, Phone, MessageCircle } from "lucide-react";
import { MessageSubmission } from "../types";
import { PortfolioConfig } from "../portfolioData";
import { PortfolioVariant } from "./CustomizerPanel";
import { 
  getAccentTextColor, 
  getAccentBgColor, 
  getAccentGradient, 
  getAccentBorderColor, 
  getAccentGlow 
} from "../lib/colorUtils";

interface ContactFormProps {
  config: PortfolioConfig;
  activeVariant: PortfolioVariant;
}

export default function ContactForm({ config, activeVariant }: ContactFormProps) {
  const [form, setForm] = useState<MessageSubmission>({
    name: "",
    email: "",
    subject: "MERN Stack Project",
    message: ""
  });

  const [isCompiling, setIsCompiling] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsCompiling(true);
    setTerminalLogs([]);

    const logs = [
      `Connecting to outbound mail terminal port...`,
      `Verifying transmission parameters for sender: ${form.name.toUpperCase()}`,
      `Authenticating encryption keys for: ${form.email}...`,
      `Injecting package header payload... ${form.message.length} bytes`,
      `Dispatching secure request to ${config.personalInfo.fullName.replace(/\s+/g, "").toLowerCase()} API server...`,
      `[OK] Signal successfully logged. Status Code: 202`
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            // Save message to localStorage so it loads dynamically in the Admin Panel
            const stored = localStorage.getItem("outbound_telemetry");
            let messagesList = [];
            if (stored) {
              try {
                messagesList = JSON.parse(stored);
              } catch (e) {
                console.error(e);
              }
            }
            messagesList.unshift({
              name: form.name,
              email: form.email,
              subject: form.subject,
              message: form.message,
              timestamp: new Date().toISOString()
            });
            localStorage.setItem("outbound_telemetry", JSON.stringify(messagesList));

            setIsCompiling(false);
            setIsSubmitted(true);
          }, 800);
        }
      }, (index + 1) * 400);
    });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", subject: "MERN Stack Project", message: "" });
    setIsSubmitted(false);
    setTerminalLogs([]);
  };

  // Accent helper maps
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

  const getButtonClasses = () => {
    if (config.accentColor) {
      return `bg-gradient-to-r ${getAccentGradient(config.accentColor)} text-slate-950 font-bold shadow-lg`;
    }
    switch (activeVariant) {
      case "Aceternity": return "bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-slate-950";
      case "LeeRobinson": return "bg-white text-black font-semibold border border-slate-200";
      case "Sidefolio": return "bg-emerald-500 text-slate-950 font-semibold";
      default: return "bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950";
    }
  };

  const getFormBorderClasses = () => {
    switch (activeVariant) {
      case "LeeRobinson": return "border-slate-800 bg-black";
      case "Aceternity": return "border-cyan-500/10 bg-zinc-950";
      case "Sidefolio": return "border-emerald-500/10 bg-slate-900";
      default: return "border-slate-900 bg-slate-900/40";
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-950 border-t border-slate-900/60 theme-transition" id="contact">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16" id="contact-section-header">
          <p className={`font-mono text-xs tracking-[0.2em] mb-3 uppercase ${getAccentText()}`}>ESTABLISH CONNECTION</p>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Send A Message
          </h2>
          <p className="text-slate-400 font-light text-xs md:text-sm mt-3 leading-relaxed">
            Fill out the form below to transmit your project specifications directly to my developer workstation.
          </p>
        </div>

        {/* Glassmorphic Contact Terminal Card */}
        <div className={`rounded-2xl border overflow-hidden shadow-2xl relative transition-all duration-500 ${getFormBorderClasses()}`} id="contact-terminal-wrapper">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-white/5 font-mono text-[10px] text-slate-500">
            <div className="flex items-center gap-2">
              <TerminalSquare className={`w-4 h-4 ${getAccentText()}`} />
              <span>OUTBOUND_TELEMETRY_SHELL_v1.2</span>
            </div>
            <span className="font-mono text-[9px] text-emerald-400">ENCRYPTION ACTIVE</span>
          </div>

          <div className="p-6 md:p-8" id="contact-card-content">
            <AnimatePresence mode="wait">
              
              {/* 1. Compiling Output Logs */}
              {isCompiling && (
                <motion.div
                  key="compiling"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-xs text-amber-400 bg-slate-950 p-6 rounded-xl border border-white/5 min-h-[250px] flex flex-col justify-between"
                  id="contact-compiling-panel"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 animate-pulse mb-4">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>COMPILING TRANSMISSION PACKETS...</span>
                    </div>
                    <div className="space-y-1 text-[11px] text-slate-300">
                      {terminalLogs.map((log, idx) => (
                        <p key={idx}>&gt; {log}</p>
                      ))}
                    </div>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-6">
                    <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full animate-[loading_3.2s_linear_forwards]" style={{ width: "100%" }} />
                  </div>
                </motion.div>
              )}

              {/* 2. Success Status screen */}
              {isSubmitted && !isCompiling && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 px-4 flex flex-col items-center justify-center min-h-[250px]"
                  id="contact-success-panel"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                    <CheckCircle className="w-7 h-7 text-emerald-400 animate-bounce" />
                  </div>
                  <h4 className="font-sans text-2xl text-white font-extrabold mb-2">Message Transmitted!</h4>
                  <p className="text-slate-400 font-light text-xs md:text-sm max-w-md leading-relaxed mb-8">
                    Thank you, {form.name}. Your specifications packet has successfully navigated the server pipelines and registered on my developer workspace logs. I will connect back soon.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/5 text-slate-300 font-mono text-[11px] tracking-wider transition-all"
                  >
                    SEND NEW TRANSMISSION
                  </button>
                </motion.div>
              )}

              {/* 3. Main Form fields */}
              {!isCompiling && !isSubmitted && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSendMessage}
                  className="space-y-6"
                  id="contact-inputs-form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-slate-500 uppercase mb-2">SENDER_NAME *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="ENTER NAME..."
                          className="w-full bg-slate-950 border border-white/5 rounded-xl pl-11 pr-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-white/20 focus:bg-slate-950/40 transition-all placeholder:text-slate-700"
                        />
                      </div>
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-slate-500 uppercase mb-2">SENDER_EMAIL *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="ENTER EMAIL ADDRESS..."
                          className="w-full bg-slate-950 border border-white/5 rounded-xl pl-11 pr-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-white/20 focus:bg-slate-950/40 transition-all placeholder:text-slate-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block font-mono text-[9px] tracking-widest text-slate-500 uppercase mb-2">PROJECT_SPECTRUM</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-white/20 transition-all"
                    >
                      <option value="MERN Stack Project">MERN Stack Enterprise App</option>
                      <option value="Premium Frontend Layout">Premium Frontend Layout</option>
                      <option value="Custom UI Design">Custom UI / UX Design</option>
                      <option value="Consulting & Training">Consulting & Training</option>
                    </select>
                  </div>

                  {/* Message body */}
                  <div>
                    <label className="block font-mono text-[9px] tracking-widest text-slate-500 uppercase mb-2">COMMUNICATION_PAYLOAD *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="ENTER YOUR INTERNET REQUIREMENTS AND PROJECT SCOPE DETAILS..."
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-white/20 focus:bg-slate-950/40 transition-all placeholder:text-slate-700 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-4 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 ${getButtonClasses()}`}
                    id="btn-send-message-submit"
                  >
                    <Send className="w-4 h-4" />
                    TRANSMIT MESSAGE SIGNAL
                  </button>

                  {/* === NEW: Direct Contact Info === */}
                  <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-white/5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-400" />
                      <a 
                        href="mailto:asadafameer@gmail.com" 
                        className="text-slate-300 hover:text-white font-mono text-xs transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        asadafameer@gmail.com
                      </a>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-white/10" />
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <a 
                        href="https://wa.me/92295806515" 
                        className="text-slate-300 hover:text-white font-mono text-xs transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +92 295 806515
                      </a>
                    </div>
                  </div>
                  {/* =================================== */}
                </motion.form>
              )}

            </AnimatePresence>
          </div>

          {/* Verification stamp footer */}
          <div className="px-6 py-3 bg-slate-950 text-[9px] font-mono text-slate-600 border-t border-white/5 flex justify-between items-center">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              SYSTEM CHECKS PASSED: ZERO EXPLOITS LOGGED
            </span>
            <span>PORT_3000_ACTIVE</span>
          </div>
        </div>

      </div>
    </section>
  );
}
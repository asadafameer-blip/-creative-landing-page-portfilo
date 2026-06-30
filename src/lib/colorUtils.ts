export type AccentColor = "emerald" | "cyan" | "amber" | "indigo" | "fuchsia" | "rose" | "blue" | "orange";

export function getAccentTextColor(color?: string): string {
  const c = (color || "emerald") as AccentColor;
  switch (c) {
    case "emerald": return "text-emerald-400";
    case "cyan": return "text-cyan-400";
    case "amber": return "text-amber-400";
    case "indigo": return "text-indigo-400";
    case "fuchsia": return "text-fuchsia-400";
    case "rose": return "text-rose-400";
    case "blue": return "text-blue-400";
    case "orange": return "text-orange-400";
    default: return "text-emerald-400";
  }
}

export function getAccentHoverTextColor(color?: string): string {
  const c = (color || "emerald") as AccentColor;
  switch (c) {
    case "emerald": return "hover:text-emerald-300";
    case "cyan": return "hover:text-cyan-300";
    case "amber": return "hover:text-amber-300";
    case "indigo": return "hover:text-indigo-300";
    case "fuchsia": return "hover:text-fuchsia-300";
    case "rose": return "hover:text-rose-300";
    case "blue": return "hover:text-blue-300";
    case "orange": return "hover:text-orange-300";
    default: return "hover:text-emerald-300";
  }
}

export function getAccentBgColor(color?: string): string {
  const c = (color || "emerald") as AccentColor;
  switch (c) {
    case "emerald": return "bg-emerald-500";
    case "cyan": return "bg-cyan-500";
    case "amber": return "bg-amber-500";
    case "indigo": return "bg-indigo-500";
    case "fuchsia": return "bg-fuchsia-500";
    case "rose": return "bg-rose-500";
    case "blue": return "bg-blue-500";
    case "orange": return "bg-orange-500";
    default: return "bg-emerald-500";
  }
}

export function getAccentHoverBgColor(color?: string): string {
  const c = (color || "emerald") as AccentColor;
  switch (c) {
    case "emerald": return "hover:bg-emerald-600";
    case "cyan": return "hover:bg-cyan-600";
    case "amber": return "hover:bg-amber-600";
    case "indigo": return "hover:bg-indigo-600";
    case "fuchsia": return "hover:bg-fuchsia-600";
    case "rose": return "hover:bg-rose-600";
    case "blue": return "hover:bg-blue-600";
    case "orange": return "hover:bg-orange-600";
    default: return "hover:bg-emerald-600";
  }
}

export function getAccentBorderColor(color?: string): string {
  const c = (color || "emerald") as AccentColor;
  switch (c) {
    case "emerald": return "border-emerald-500/20";
    case "cyan": return "border-cyan-500/20";
    case "amber": return "border-amber-500/20";
    case "indigo": return "border-indigo-500/20";
    case "fuchsia": return "border-fuchsia-500/20";
    case "rose": return "border-rose-500/20";
    case "blue": return "border-blue-500/20";
    case "orange": return "border-orange-500/20";
    default: return "border-emerald-500/20";
  }
}

export function getAccentFocusBorderColor(color?: string): string {
  const c = (color || "emerald") as AccentColor;
  switch (c) {
    case "emerald": return "focus:border-emerald-500/40";
    case "cyan": return "focus:border-cyan-500/40";
    case "amber": return "focus:border-amber-500/40";
    case "indigo": return "focus:border-indigo-500/40";
    case "fuchsia": return "focus:border-fuchsia-500/40";
    case "rose": return "focus:border-rose-500/40";
    case "blue": return "focus:border-blue-500/40";
    case "orange": return "focus:border-orange-500/40";
    default: return "focus:border-emerald-500/40";
  }
}

export function getAccentHoverBorderColor(color?: string): string {
  const c = (color || "emerald") as AccentColor;
  switch (c) {
    case "emerald": return "hover:border-emerald-500/30";
    case "cyan": return "hover:border-cyan-500/30";
    case "amber": return "hover:border-amber-500/30";
    case "indigo": return "hover:border-indigo-500/30";
    case "fuchsia": return "hover:border-fuchsia-500/30";
    case "rose": return "hover:border-rose-500/30";
    case "blue": return "hover:border-blue-500/30";
    case "orange": return "hover:border-orange-500/30";
    default: return "hover:border-emerald-500/30";
  }
}

export function getAccentGradient(color?: string): string {
  const c = (color || "emerald") as AccentColor;
  switch (c) {
    case "emerald": return "from-emerald-400 to-teal-500";
    case "cyan": return "from-cyan-400 to-blue-500";
    case "amber": return "from-amber-400 to-orange-500";
    case "indigo": return "from-indigo-400 to-violet-500";
    case "fuchsia": return "from-fuchsia-400 to-pink-500";
    case "rose": return "from-rose-400 to-red-500";
    case "blue": return "from-blue-400 to-indigo-500";
    case "orange": return "from-orange-400 to-red-500";
    default: return "from-emerald-400 to-teal-500";
  }
}

export function getAccentGlow(color?: string): string {
  const c = (color || "emerald") as AccentColor;
  switch (c) {
    case "emerald": return "shadow-[0_0_20px_rgba(16,185,129,0.15)]";
    case "cyan": return "shadow-[0_0_20px_rgba(6,182,212,0.15)]";
    case "amber": return "shadow-[0_0_20px_rgba(245,158,11,0.15)]";
    case "indigo": return "shadow-[0_0_20px_rgba(99,102,241,0.15)]";
    case "fuchsia": return "shadow-[0_0_20px_rgba(217,70,239,0.15)]";
    case "rose": return "shadow-[0_0_20px_rgba(244,63,94,0.15)]";
    case "blue": return "shadow-[0_0_20px_rgba(59,130,246,0.15)]";
    case "orange": return "shadow-[0_0_20px_rgba(249,115,22,0.15)]";
    default: return "shadow-[0_0_20px_rgba(16,185,129,0.15)]";
  }
}

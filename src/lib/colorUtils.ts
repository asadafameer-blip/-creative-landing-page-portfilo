// src/lib/colorUtils.ts

type AccentColor = 'emerald' | 'cyan' | 'amber' | 'indigo' | 'fuchsia' | 'rose' | 'blue' | 'orange';

const colorMap: Record<AccentColor, {
  text: string;
  bg: string;
  hoverBg: string;
  border: string;
  gradient: string;
}> = {
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-400',
    hoverBg: 'hover:bg-emerald-500',
    border: 'border-emerald-400',
    gradient: 'from-emerald-400 to-emerald-600',
  },
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-400',
    hoverBg: 'hover:bg-cyan-500',
    border: 'border-cyan-400',
    gradient: 'from-cyan-400 to-cyan-600',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-400',
    hoverBg: 'hover:bg-amber-500',
    border: 'border-amber-400',
    gradient: 'from-amber-400 to-amber-600',
  },
  indigo: {
    text: 'text-indigo-400',
    bg: 'bg-indigo-400',
    hoverBg: 'hover:bg-indigo-500',
    border: 'border-indigo-400',
    gradient: 'from-indigo-400 to-indigo-600',
  },
  fuchsia: {
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-400',
    hoverBg: 'hover:bg-fuchsia-500',
    border: 'border-fuchsia-400',
    gradient: 'from-fuchsia-400 to-fuchsia-600',
  },
  rose: {
    text: 'text-rose-400',
    bg: 'bg-rose-400',
    hoverBg: 'hover:bg-rose-500',
    border: 'border-rose-400',
    gradient: 'from-rose-400 to-rose-600',
  },
  blue: {
    text: 'text-blue-400',
    bg: 'bg-blue-400',
    hoverBg: 'hover:bg-blue-500',
    border: 'border-blue-400',
    gradient: 'from-blue-400 to-blue-600',
  },
  orange: {
    text: 'text-orange-400',
    bg: 'bg-orange-400',
    hoverBg: 'hover:bg-orange-500',
    border: 'border-orange-400',
    gradient: 'from-orange-400 to-orange-600',
  },
};

export function getAccentTextColor(accent: AccentColor): string {
  return colorMap[accent]?.text || 'text-emerald-400';
}

export function getAccentBgColor(accent: AccentColor): string {
  return colorMap[accent]?.bg || 'bg-emerald-400';
}

export function getAccentHoverBgColor(accent: AccentColor): string {
  return colorMap[accent]?.hoverBg || 'hover:bg-emerald-500';
}

export function getAccentBorderColor(accent: AccentColor): string {
  return colorMap[accent]?.border || 'border-emerald-400';
}

export function getAccentGradient(accent: AccentColor): string {
  return colorMap[accent]?.gradient || 'from-emerald-400 to-emerald-600';
}
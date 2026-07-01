import { Project } from "./types";

export interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate" | "Beginner";
  category: "frontend" | "backend" | "tools";
}

export interface PortfolioConfig {
  personalInfo: {
    fullName: string;
    username: string;
    bio: string;
    roles: string[];
    coreTechStack: string[];
    availableForHire: boolean;
  };
  socials: {
    github: string;
    linkedin: string;
    facebook: string;
  };
  skills: Skill[];
  projects: Project[];
  accentColor?: string; // Live button & border accent colors
}

export const initialPortfolioConfig: PortfolioConfig = {
  accentColor: "blue", // Default customized button color
  personalInfo: {
    fullName: "Sadaf Ameer",
    username: "@sadafameer",
    bio: "Passionate Full-Stack Web Developer specializing in Next.js, Express.js, MongoDB, and robust API Architectures. I design high-performance, responsive web applications with a focus on seamless backend integrations and pixel-perfect dark/light user interfaces.",
    roles: [
      "Next.js Developer",
      "Express.js & MongoDB Specialist",
      "Full-Stack API Engineer",
      "MERN Stack Architect"
    ],
    coreTechStack: ["Next.js", "Express.js", "MongoDB", "RESTful APIs", "React", "Node.js", "Tailwind CSS", "TypeScript"],
    availableForHire: true
  },
  socials: {
    github: "https://github.com/asadafameer-blip",
    linkedin: "https://www.linkedin.com/in/sadaf-ameer-654864386",
    facebook: "https://www.facebook.com/profile.php?id=61579831676376"
  },
  skills: [
    { name: "Next.js", level: "Expert", category: "frontend" },
    { name: "React.js", level: "Expert", category: "frontend" },
    { name: "TypeScript", level: "Advanced", category: "frontend" },
    { name: "JavaScript", level: "Expert", category: "frontend" },
    { name: "Tailwind CSS", level: "Expert", category: "frontend" },
    { name: "HTML5/CSS3", level: "Expert", category: "frontend" },
    { name: "Redux Toolkit", level: "Intermediate", category: "frontend" },
    { name: "Framer Motion", level: "Intermediate", category: "frontend" },
    { name: "Node.js", level: "Expert", category: "backend" },
    { name: "Express.js", level: "Expert", category: "backend" },
    { name: "MongoDB", level: "Advanced", category: "backend" },
    { name: "Mongoose ODM", level: "Advanced", category: "backend" },
    { name: "RESTful APIs", level: "Expert", category: "backend" },
    { name: "Firebase", level: "Intermediate", category: "backend" },
    { name: "Git & GitHub", level: "Expert", category: "tools" },
    { name: "Vite", level: "Expert", category: "tools" },
    { name: "NPM / Yarn", level: "Expert", category: "tools" },
    { name: "Postman", level: "Advanced", category: "tools" },
    { name: "Docker", level: "Beginner", category: "tools" }
  ],
  projects: [
    {
      id: "markazz-shop",
      title: "Markazz Shop",
      subtitle: "PREMIUM FOOTWEAR E-STORE",
      category: "Full-Stack",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      description: "An elegant, highly responsive MERN footwear e-commerce application displaying premium shoes, sandals, and Peshawari Chappals. Built with high-performance state synchronization, category filtering, and direct WhatsApp order placement.",
      tags: ["MongoDB", "Express", "React", "Node.js", "Redux Toolkit"],
      client: "Markazz Group",
      duration: "3 Months",
      demoUrl: "https://markazzshop.com/",
      githubUrl: "https://github.com/sadafbibi/markazz-shop",
      features: ["Beautiful footwear slider grids", "Persistent cart storage", "WhatsApp order dispatch logic", "Mobile-first responsive design"],
      tools: ["React", "Express.js", "Tailwind CSS", "Mongoose", "Vite"]
    },
    {
      id: "lazak-essentials",
      title: "LAZAK Premium Essentials",
      subtitle: "OUTDOOR GRILL & KITCHEN GEAR",
      category: "Full-Stack",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      description: "A gorgeous luxury catalog for premium outdoor kitchen grills, Jali networks, and meat packaging solutions. Features advanced live product filtering, crisp typography, and fluid screen transition effects.",
      tags: ["React", "Vite", "Tailwind CSS", "LocalState"],
      client: "LAZAK BBQ Ltd",
      duration: "2 Months",
      demoUrl: "https://lazak.vercel.app/",
      githubUrl: "https://github.com/sadafbibi/lazak",
      features: ["Custom Jali sizing calculator", "High contrast imagery", "Subtle scroll animations", "Detailed technical specification tabs"],
      tools: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"]
    },
    {
      id: "hamme-naturals",
      title: "Hammé Naturals",
      subtitle: "BEAUTY & SKINCARE COSMETICS",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      description: "A clean cosmetic brand store covering facewashes, beauty creams, serums, and body moisturizers. Includes specialized skin-concern filters and smooth, touch-friendly product catalog browsing.",
      tags: ["React 19", "Tailwind CSS", "WhatsApp Linkage"],
      client: "Hammé Cosmetics Pakistan",
      duration: "3 Months",
      demoUrl: "https://www.hamme.com.pk/",
      githubUrl: "https://github.com/sadafbibi/hamme-naturals",
      features: ["Concern-targeted product listings", "WhatsApp fast customer helpline", "Premium layout banner sliders", "Responsive touch navigation"],
      tools: ["Vite", "Tailwind CSS v4", "Lucide Icons", "Framer Motion"]
    },
    {
      id: "aurelius-food",
      title: "Aurelius Fine Dining",
      subtitle: "LUXURY RESTAURANT PORTAL",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      description: "A glamorous fine dining restaurant portal located in London, Mayfair. Built with an editorial gold-on-dark mood scheme, detailed menus, and a fully functional online reservation form.",
      tags: ["React", "Lux Gold Accents", "Interactive Booking"],
      client: "Aurelius Hospitality Ltd",
      duration: "1.5 Months",
      demoUrl: "https://aurelius-food.vercel.app/",
      githubUrl: "https://github.com/sadafbibi/aurelius-food",
      features: ["Dynamic reservation date scheduler", "Polished menu slider tabs", "Interactive drink mixology logs", "Parallax image backdrops"],
      tools: ["React", "Tailwind CSS", "Framer Motion", "Vite"]
    },
    {
      id: "al-manzoor-education",
      title: "Al-Manzoor Education System",
      subtitle: "ACADEMICS & ADMISSIONS SYSTEM",
      category: "Backend",
      image: "/src/assets/images/almanzoor_portal_1782820220587.jpg",
      description: "A complete multi-portal educational management database application designed for Al-Manzoor Education System in Gogera Khass. Manages student admissions, curriculum dispatch, and school event galleries.",
      tags: ["Node.js", "Express", "MongoDB", "Academic Modules"],
      client: "Al-Manzoor Education Board",
      duration: "4 Months",
      demoUrl: "https://al-manzoor-education-system-gogera.vercel.app/",
      githubUrl: "https://github.com/sadafbibi/al-manzoor",
      features: ["Online admission application pipelines", "Class-wise study syllabus guides", "Dynamic news bulletin board", "Admin login telemetry checks"],
      tools: ["Express", "MongoDB", "Node.js", "Bootstrap-Tailwind Grid", "Mongoose"]
    }
  ]
};

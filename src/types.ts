export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full-Stack" | "Frontend" | "Backend" | "AI & Web3";
  image: string;
  description: string;
  tags: string[];
  client: string;
  duration: string;
  demoUrl: string;
  githubUrl: string;
  features: string[];
  tools: string[];
}

export type CategoryFilter = "All" | "Full-Stack" | "Frontend" | "Backend" | "AI & Web3";

export interface MessageSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

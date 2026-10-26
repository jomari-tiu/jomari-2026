import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", icon: "SiReact" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
      { name: "Framer Motion", icon: "SiFramer" },
      { name: "Zustand", icon: "SiZustand" },
      { name: "React Query", icon: "SiReactquery" },
      { name: "React Hook Form", icon: "SiReacthookform" },
      { name: "Axios", icon: "SiAxios" },
      { name: "Redux Toolkit", icon: "SiRedux" },
      { name: "Vite", icon: "SiVite" },
    ],
  },
  {
    id: "ui-ux",
    label: "UI/UX",
    skills: [
      { name: "Figma", icon: "SiFigma" },
      { name: "SCSS / Sass", icon: "SiSass" },
      { name: "Storybook", icon: "SiStorybook" },
      { name: "shadcn/ui", icon: "SiShadcnui" },
      { name: "Radix UI", icon: "SiRadixui" },
      { name: "HTML5", icon: "SiHtml5" },
      { name: "CSS3", icon: "SiCss3" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express", icon: "SiExpress" },
      { name: "WordPress", icon: "SiWordpress" },
      { name: "Drizzle ORM", icon: "SiPrisma" },
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "REST API", icon: "SiOpenapi" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: [
      { name: "React Native", icon: "SiReact" },
      { name: "Expo", icon: "SiExpo" },
      { name: "iOS / Android", icon: "SiAndroid" },
      { name: "Push Notifications", icon: "SiFirebase" },
      { name: "Deep Linking", icon: "SiReact" },
      { name: "Offline-first", icon: "SiPwa" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    skills: [
      { name: "Vercel", icon: "SiVercel" },
      { name: "GitHub Actions", icon: "SiGithubactions" },
      { name: "Expo Workflows", icon: "SiExpo" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", icon: "SiGit" },
      { name: "GitHub", icon: "SiGithub" },
      { name: "VS Code", icon: "SiVisualstudiocode" },
      { name: "Postman", icon: "SiPostman" },
      { name: "pnpm", icon: "SiPnpm" },
      { name: "Vitest", icon: "SiVitest" },
      { name: "Playwright", icon: "SiPlaywright" },
    ],
  },
];

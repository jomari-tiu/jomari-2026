export type ProjectType = "web-app" | "website";

export type Project = {
  id: number;
  title: string;
  description: string;
  demoLink?: string;
  demoLink2?: string;
  codeLink?: string;
  coverImage?: string;
  thumbnail?: string;
  imageList?: string[];
  organization: string;
  projectType: ProjectType;
  technologies?: string[];
  otherImagesFolderName?: string;
};

export type Skill = {
  name: string;
  icon: string;
};

export type SkillCategory = {
  id: string;
  label: string;
  skills: Skill[];
};

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  dateRange: string;
  location: string;
  type: "work" | "education";
  bullets: string[];
};

export type SocialLink = {
  label: string;
  url: string;
  icon: string;
};

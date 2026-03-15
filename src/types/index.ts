export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  level: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  role: string;
  achievements: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  forks_count: number;
  owner: {
    login: string;
  };
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  skills: Skill[];
  projects: Project[];
  contact: ContactInfo;
}

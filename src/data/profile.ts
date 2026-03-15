import type { Profile, Skill, Project, ContactInfo } from '../types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 95 },
  { name: 'TypeScript', category: 'frontend', level: 90 },
  { name: 'Vue.js', category: 'frontend', level: 85 },
  { name: 'Next.js', category: 'frontend', level: 88 },
  { name: 'Tailwind CSS', category: 'frontend', level: 92 },
  { name: 'HTML5/CSS3', category: 'frontend', level: 95 },
  
  // Backend
  { name: 'Node.js', category: 'backend', level: 88 },
  { name: 'Python', category: 'backend', level: 85 },
  { name: 'Go', category: 'backend', level: 75 },
  { name: 'Java', category: 'backend', level: 80 },
  { name: 'REST API', category: 'backend', level: 90 },
  { name: 'GraphQL', category: 'backend', level: 82 },
  
  // Database
  { name: 'PostgreSQL', category: 'database', level: 85 },
  { name: 'MongoDB', category: 'database', level: 88 },
  { name: 'Redis', category: 'database', level: 80 },
  { name: 'MySQL', category: 'database', level: 82 },
  
  // DevOps
  { name: 'Docker', category: 'devops', level: 85 },
  { name: 'Kubernetes', category: 'devops', level: 75 },
  { name: 'AWS', category: 'devops', level: 80 },
  { name: 'CI/CD', category: 'devops', level: 85 },
  { name: 'GitHub Actions', category: 'devops', level: 88 },
  
  // Tools
  { name: 'Git', category: 'tools', level: 95 },
  { name: 'VS Code', category: 'tools', level: 95 },
  { name: 'Figma', category: 'tools', level: 75 },
  { name: 'Jest', category: 'tools', level: 85 },
];

export const projects: Project[] = [
  {
    id: '1',
    name: '电商平台重构',
    description: '对大型电商平台进行全面技术重构，采用微服务架构，提升系统性能和可维护性。实现了订单服务、商品服务、用户服务等核心模块的拆分与优化。',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    role: '技术负责人',
    achievements: [
      '系统响应时间减少60%',
      '日活跃用户提升至100万+',
      '服务可用性达到99.99%',
      '团队开发效率提升40%'
    ],
    githubUrl: 'https://github.com/example/ecommerce-platform',
    status: 'completed',
    startDate: '2023-01',
    endDate: '2023-12'
  },
  {
    id: '2',
    name: '智能数据分析系统',
    description: '基于机器学习的实时数据分析平台，支持多维度数据可视化和智能报表生成。为企业提供数据驱动的决策支持。',
    techStack: ['Python', 'TensorFlow', 'React', 'D3.js', 'MongoDB', 'AWS'],
    role: '核心开发工程师',
    achievements: [
      '数据处理速度提升300%',
      '报表生成时间从小时级降至分钟级',
      '客户满意度提升45%'
    ],
    githubUrl: 'https://github.com/example/data-analytics',
    status: 'completed',
    startDate: '2023-06',
    endDate: '2023-11'
  },
  {
    id: '3',
    name: '企业协作平台',
    description: '一站式企业协作解决方案，集成即时通讯、项目管理、文档协作等功能。支持多端同步和离线访问。',
    techStack: ['Vue.js', 'TypeScript', 'Go', 'WebSocket', 'Redis', 'Docker'],
    role: '前端架构师',
    achievements: [
      '首屏加载时间优化至1.5秒',
      '支持10万+并发用户',
      '移动端适配覆盖99%设备'
    ],
    githubUrl: 'https://github.com/example/collaboration-platform',
    status: 'in-progress',
    startDate: '2024-01'
  },
  {
    id: '4',
    name: 'AI 代码助手',
    description: '基于大语言模型的智能编程助手，提供代码补全、错误检测、重构建议等功能。支持多种编程语言和IDE集成。',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'React', 'PostgreSQL'],
    role: 'AI工程师',
    achievements: [
      '代码补全准确率达到85%',
      '支持15+编程语言',
      '日活跃用户5万+'
    ],
    githubUrl: 'https://github.com/example/ai-code-assistant',
    status: 'in-progress',
    startDate: '2024-03'
  }
];

export const contactInfo: ContactInfo = {
  email: 'developer@example.com',
  phone: '+86 138-0000-0000',
  location: '中国 · 北京',
  linkedin: 'https://linkedin.com/in/developer',
  github: 'https://github.com/developer',
  website: 'https://developer-portfolio.com'
};

export const profile: Profile = {
  name: '张开发',
  title: '高级全栈工程师',
  bio: '拥有8年软件开发经验的资深工程师，专注于构建高性能、可扩展的Web应用。精通前后端技术栈，对系统架构设计和性能优化有深入理解。热衷于技术创新和团队协作，致力于通过技术解决实际业务问题。',
  skills,
  projects,
  contact: contactInfo
};

export const skillCategories = [
  { key: 'frontend', label: '前端开发', color: 'from-blue-500 to-cyan-500' },
  { key: 'backend', label: '后端开发', color: 'from-green-500 to-emerald-500' },
  { key: 'database', label: '数据库', color: 'from-purple-500 to-pink-500' },
  { key: 'devops', label: 'DevOps', color: 'from-orange-500 to-red-500' },
  { key: 'tools', label: '开发工具', color: 'from-gray-500 to-slate-500' },
] as const;

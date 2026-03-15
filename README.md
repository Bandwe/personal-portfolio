# 个人专业能力展示网站

一个现代化的个人能力展示网站，用于全面呈现个人专业技能、项目经验和职业背景。

![技术栈](https://img.shields.io/badge/React-18-blue)
![技术栈](https://img.shields.io/badge/TypeScript-5.0-blue)
![技术栈](https://img.shields.io/badge/Tailwind%20CSS-4.0-blue)
![技术栈](https://img.shields.io/badge/Vite-6.0-blue)

## 功能特性

### 核心模块

- **个人简介区** - 展示个人信息、职业头衔、简介和关键统计数据
- **关于我** - 详细介绍工作经验、教育背景和专业认证
- **技能展示** - 分类展示技术栈，支持筛选和熟练度可视化
- **项目展示** - 展示项目案例，包含技术栈、职责和成果
- **GitHub 集成** - 展示 GitHub 仓库，支持创建仓库和上传代码
- **联系方式** - 提供多种联系方式和联系表单

### 技术特点

- 响应式设计，适配桌面端、平板和移动端
- 现代化深色主题 UI 设计
- 流畅的页面滚动动画和交互动效
- GitHub API 集成，支持仓库管理
- TypeScript 类型安全
- 基于 Vite 的快速开发和构建

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **图标**: Lucide React
- **GitHub API**: REST API

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
web/
├── src/
│   ├── components/      # React 组件
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── GitHubIntegration.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── services/        # API 服务
│   │   └── github.ts
│   ├── data/           # 数据文件
│   │   └── profile.ts
│   ├── types/          # TypeScript 类型
│   │   └── index.ts
│   ├── App.tsx
│   └── index.css
├── dist/               # 构建输出
└── package.json
```

## GitHub 集成功能

网站集成了 GitHub API，支持以下功能：

1. **展示 GitHub 仓库** - 自动获取并展示用户的 GitHub 仓库列表
2. **创建新仓库** - 通过网站界面直接创建新的 GitHub 仓库
3. **上传代码** - 支持上传文件到新创建的仓库

### 配置 GitHub Token

1. 访问 GitHub Settings > Developer settings > Personal access tokens
2. 生成新的 Token（需要 `repo` 权限）
3. 在网站的 GitHub 集成区域输入 Token

## 自定义配置

### 修改个人信息

编辑 `src/data/profile.ts` 文件来更新个人信息：

```typescript
export const profile: Profile = {
  name: '您的姓名',
  title: '您的职位',
  bio: '您的简介',
  skills: [...],
  projects: [...],
  contact: {...}
};
```

### 修改技能

在 `src/data/profile.ts` 中的 `skills` 数组中添加或修改技能：

```typescript
export const skills: Skill[] = [
  { name: 'React', category: 'frontend', level: 95 },
  { name: 'Node.js', category: 'backend', level: 88 },
  // ...
];
```

### 修改项目

在 `src/data/profile.ts` 中的 `projects` 数组中添加或修改项目：

```typescript
export const projects: Project[] = [
  {
    id: '1',
    name: '项目名称',
    description: '项目描述',
    techStack: ['React', 'Node.js'],
    role: '技术负责人',
    achievements: ['成果1', '成果2'],
    githubUrl: 'https://github.com/...',
    status: 'completed',
    startDate: '2023-01',
    endDate: '2023-12'
  },
  // ...
];
```

## 响应式断点

- **Desktop**: >= 1024px
- **Tablet**: >= 768px
- **Mobile**: < 768px

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License

## 作者

Bandwe通过trae使用Kimi-k2.5开发

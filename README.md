# 个人专业能力展示网站

一个现代化的个人作品集网站，用于全面展示个人专业技能、项目经验和职业背景。

## 功能特性

- 个人简介区 - 展示个人信息、职业背景和统计数据
- 技能展示区 - 分类展示技术栈，支持筛选和熟练度展示
- 项目展示区 - 详细展示参与的项目案例，包含技术栈、职责和成果
- GitHub集成 - 展示GitHub仓库，支持直接创建仓库和上传代码
- 联系方式区 - 提供多种联系方式和联系表单
- 响应式设计 - 完美适配桌面端、平板和移动端
- 现代化UI - 深色主题、渐变色彩、流畅动画

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React

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

### 预览生产构建

```bash
npm run preview
```

## GitHub集成功能

网站内置GitHub API集成，可以：
- 展示GitHub仓库列表
- 创建新的GitHub仓库
- 上传代码文件到仓库

使用方法：
1. 在GitHub设置中生成Personal Access Token
2. 在网站的GitHub区域输入Token和用户名
3. 即可使用创建仓库和上传代码功能

## 项目结构

```
src/
├── components/      # React组件
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── GitHubIntegration.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── services/        # API服务
│   └── github.ts
├── data/           # 数据文件
│   └── profile.ts
├── types/          # TypeScript类型
│   └── index.ts
├── App.tsx
└── index.css
```

## 自定义配置

编辑 `src/data/profile.ts` 文件来自定义个人信息、技能和项目。

## 许可证

MIT License

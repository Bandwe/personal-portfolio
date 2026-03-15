# GitHub 上传指南

## 方法：通过命令行推送

### 步骤 1：在 GitHub 上创建仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `personal-portfolio` (或你喜欢的名字)
   - **Description**: 个人专业能力展示网站
   - **Visibility**: Public (推荐) 或 Private
   - **Initialize**: 不要勾选 "Add a README file" (我们已经有 README 了)
3. 点击 "Create repository"

### 步骤 2：推送本地代码

创建仓库后，GitHub 会显示推送命令，复制以下命令在终端执行：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/personal-portfolio.git

# 推送代码到 main 分支
git branch -M main
git push -u origin main
```

### 步骤 3：验证推送

1. 刷新 GitHub 仓库页面
2. 确认所有文件都已上传
3. 查看 README 是否正确显示

---

## 备选方案：使用 GitHub CLI

如果你安装了 GitHub CLI，可以使用以下命令：

```bash
# 登录 GitHub
gh auth login

# 创建仓库并推送
git remote add origin https://github.com/YOUR_USERNAME/personal-portfolio.git
git branch -M main
git push -u origin main
```

---

## 部署到 GitHub Pages (可选)

如果你想将网站部署到 GitHub Pages，可以：

1. 在 GitHub 仓库页面，点击 "Settings"
2. 选择左侧 "Pages"
3. 在 "Source" 中选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 文件夹
5. 点击 "Save"

或者使用 GitHub Actions 自动部署（推荐）：

在项目根目录创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 快速检查清单

- [ ] 在 GitHub 创建了新仓库
- [ ] 添加了远程仓库地址
- [ ] 推送了 main 分支
- [ ] 在 GitHub 上看到了所有文件
- [ ] README 正确显示

---

## 常见问题

### 1. 推送被拒绝

```bash
# 如果提示权限错误，检查是否登录
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2. 需要输入密码

GitHub 已不支持密码验证，需要使用 Personal Access Token：
1. 访问 https://github.com/settings/tokens
2. 生成新的 Token (选择 repo 权限)
3. 使用 Token 作为密码

### 3. 远程仓库已存在

```bash
# 删除现有远程仓库
git remote remove origin

# 重新添加
git remote add origin https://github.com/YOUR_USERNAME/personal-portfolio.git
```

---

**完成！** 🎉

你的个人作品集网站现在已经上传到 GitHub 了！

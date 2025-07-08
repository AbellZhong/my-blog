# VitePress 从搭建到部署

作为程序员，用 VitePress 搭博客的优势在于：轻量、支持 Markdown、可定制性强。本文记录从初始化到部署的关键步骤。

## 初始化项目
```bash
# 创建项目
npm create vitepress@latest my-blog -- --template blog
cd my-blog
npm install

# 本地预览
npm run dev
```

# 核心配置文件（.vitepress/config.mts）
主要配置导航栏（nav）、侧边栏（sidebar）和主题：
```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '日知录', // 网站标题
  themeConfig: {
    nav: [/* 导航配置 */],
    sidebar: [/* 侧边栏配置 */]
  }
})
```

# 部署到 GitHub Pages
1.新建 deploy.sh 脚本：
```bash
#!/usr/bin/env sh
npm run build
cd .vitepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:你的用户名/你的仓库名.git main:gh-pages
```
2.运行 sh deploy.sh 即可部署。

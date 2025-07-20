---
title: "用React + Next.js + Cursor打造属于自己的博客并部署到Netlify"
excerpt: "本文将手把手教你如何基于Next.js官方博客模板，通过Cursor AI辅助开发，快速搭建一个高颜值、可扩展的个人博客，并免费部署到Netlify，实现真正的全栈博客体验。"
coverImage: "/assets/blog/images/blog.png"
date: "2025-01-20T10:00:00.000Z"
author:
  name: Wayne
  picture: "/assets/blog/authors/headPic.jpg"
ogImage:
  url: "/assets/blog/images/blog.png"
---

## 为什么选择 Next.js 搭建博客？

Next.js 是由 Vercel 团队打造的 React 框架，具备以下优势：

* 支持服务端渲染（SSR）与静态站点生成（SSG）
* 内置路由系统，零配置上手
* 拥有强大的社区模板和生态
* 非常适合构建 SEO 友好的博客系统

而在开发过程中，借助 **Cursor（AI 编程助手）**，你可以高效写代码、调试组件甚至生成内容，大大提升开发体验。

---

## 一、使用官方模板快速启动

我们选择使用 Vercel 提供的博客模板：[blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)

### ✅ 项目初始化

1. **克隆模板项目**

   ```bash
   npx create-next-app my-blog -e https://github.com/vercel/next.js/tree/canary/examples/blog-starter
   cd my-blog
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **本地启动**

   ```bash
   npm run dev
   ```

   启动后访问：`http://localhost:3000`，即可预览初始博客页面。

---

## 二、使用 Cursor 辅助开发（可选）

[Cursor](https://www.cursor.so/) 是一个集成 GPT 和代码 IDE 的 AI 工具，强烈推荐用于：

* ✨ 自动生成文章结构
* 🛠 快速构建组件 UI
* 📦 优化代码逻辑
* 🧠 调试 & 修复 bug

只需在 Cursor 中打开项目，选择文件或使用 `/` 命令输入提示，例如：

```
/rewrite this component using Tailwind CSS and make it mobile-friendly
```

---

## 三、自定义博客内容

该模板使用 Markdown 格式存储博客内容，位于：

```
/_posts/*.md
```

你可以根据模板格式撰写自己的博文，例如本文所用格式：

```md
---
title: "你的文章标题"
excerpt: "简短介绍内容"
coverImage: "/assets/blog/your-image.jpg"
date: "2024-01-01"
author:
  name: "Wayne"
  picture: "/assets/blog/authors/headPic.jpg"
ogImage:
  url: "/assets/blog/your-image.jpg"
---
正文内容写在这里，支持 Markdown 格式。
```

---

## 四、自定义主题样式

* 模板使用 `Tailwind CSS`，你可以在 `styles/` 或 `components/` 中修改 UI 样式
* 替换默认头像和封面图：

  * `/public/assets/blog/introduce/html.jpg`
  * `/public/assets/blog/authors/headPic.jpg`

---

## 五、部署博客到 Netlify（免费且快速）

### 📦 1. 初始化 Git 仓库并上传

```bash
git init
git remote add origin https://github.com/your-username/my-blog.git
git add .
git commit -m "init blog"
git push -u origin main
```

### ☁️ 2. 登录 Netlify 并部署

1. 访问 [https://app.netlify.com/](https://app.netlify.com/)

2. 点击 “Add new site” → “Import from Git”

3. 连接你的 GitHub 并选择仓库

4. 设置构建配置：

   * **Build command**: `npm run build`
   * **Publish directory**: `out`

5. 点击部署，几分钟后你将获得一个公开地址（形如 `https://your-blog.netlify.app`）

### 📝 注意：

你需要在 `next.config.js` 中启用静态导出：

```js
module.exports = {
  output: 'export',
}
```

这样执行 `npm run build` 时会生成 `out` 目录，供 Netlify 静态部署使用。

---

## 六、博客扩展方向

* 🔍 增加搜索功能（使用 Algolia 或 FlexSearch）
* 💬 集成评论系统（如 giscus / utterances）
* 🧩 使用 MDX 增强 Markdown 支持
* 🔐 添加登录权限或管理员编辑界面

---

## 写在最后

通过本教程，你已经掌握了使用 `Next.js + React + Cursor` 构建个人博客的完整流程，并学会将它部署在 Netlify 平台，免费拥有一个属于自己的博客站点。

希望你在这个博客中持续输出、不断成长！

如果你也成功搭建了博客，欢迎分享给我，让我们一起交流技术，共同进步 🚀

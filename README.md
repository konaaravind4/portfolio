# Kona Aravind — AI Portfolio

A production-grade, AI-themed personal portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Three.js**, and an **MDX blog system**.

## ⚡ Features

- 🧠 **Three.js Neural Network Background** — interactive particle simulation with mouse repulsion
- 🎨 **AI Futuristic Design** — dark mode, glassmorphism, neon glows, gradient text
- 📂 **Projects Section** — 4 real AI projects with metrics, architecture modal, and detail pages
- 📝 **MDX Blog** — KaTeX math rendering, syntax highlighting, estimated read time
- 📊 **Skills Section** — animated progress bars with certifications
- 🕐 **Timeline** — education, experience, certifications from resume
- 🔥 **GitHub Heatmap** — live contribution calendar
- 📬 **Contact Form** — React Hook Form + Nodemailer API route
- 🔐 **Admin Auth** — NextAuth.js credentials for blog management
- 🐳 **Dockerized** — multi-stage build for production

## 🚀 Getting Started

### 1. Clone the project
```bash
cd /Users/konaaravind4gmail.com/.gemini/antigravity/scratch/portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.local.example .env.local
# Edit .env.local and fill in your values
```

### 4. Run locally
```bash
npm run dev
# → http://localhost:3000
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_SECRET` | JWT secret (run `openssl rand -base64 32`) | Yes |
| `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000`) | Yes |
| `ADMIN_EMAIL` | Admin email for blog management | Yes |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of admin password | Yes |
| `SMTP_HOST` | SMTP server for contact form | No |
| `SMTP_PORT` | SMTP port (default 587) | No |
| `SMTP_USER` | SMTP username | No |
| `SMTP_PASS` | SMTP password / app password | No |
| `CONTACT_TO_EMAIL` | Where contact emails go | No |

### Generate admin password hash:
```bash
node -e "const b=require('bcryptjs'); b.hash('yourpassword',10).then(console.log)"
```

## 🐳 Docker Deployment

```bash
docker build \
  --build-arg NEXTAUTH_SECRET=your_secret \
  --build-arg NEXTAUTH_URL=https://yourdomain.com \
  -t kona-portfolio .

docker run -p 3000:3000 \
  -e ADMIN_EMAIL=konaaravind4@gmail.com \
  -e ADMIN_PASSWORD_HASH=your_hash \
  kona-portfolio
```

## 🌐 Vercel Deployment

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — automatic CI/CD on every push

## ✍️ Blog Template

Create a new file in `content/blog/your-post-slug.mdx`:

```mdx
---
title: "Your Blog Post Title"
excerpt: "A one-sentence summary shown in cards."
date: "2026-01-15"
tags: ["ML", "RAG", "Math"]
author: "Kona Aravind"
published: true
---

# Your Heading

Normal markdown with **bold**, *italic*, and `code`.

Math with KaTeX:
$$
E = mc^2
$$

Inline math: $\alpha + \beta = \gamma$

## Code Block

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
```

## 📁 Project Schema

Add projects to `lib/projects.ts`:

```json
{
  "slug": "my-project",
  "title": "My AI Project",
  "tagline": "One-line description",
  "description": "Short description",
  "longDescription": "Full paragraph description",
  "techStack": ["Python", "PyTorch"],
  "github": "https://github.com/...",
  "demo": "",
  "category": "NLP",
  "featured": true,
  "metrics": [
    { "label": "Accuracy", "value": "94%", "color": "cyan" }
  ],
  "architecture": "Input → Model → Output",
  "problemStatement": "What problem does this solve?",
  "mathModel": "optional LaTeX string",
  "screenshots": [],
  "tags": ["NLP", "ML"],
  "date": "2025-01-01"
}
```

## 📜 License

MIT © 2026 Kona Aravind

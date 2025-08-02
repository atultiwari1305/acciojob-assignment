# 🧠 AI-Powered Micro-Frontend Generator Playground

A stateful, full-stack platform that allows users to **generate, tweak, and export React components and pages** using **LLM-driven prompts** — with persistent chat, code, and preview states across sessions.

---

## 📦 Tech Stack

| Layer        | Tech Used                             |
|--------------|----------------------------------------|
| Frontend     | React + Next.js                       |
| Backend      | Node.js + Express                     |
| Database     | MongoDB (via Mongoose)                |
| Auth         | Email + Password (JWT)                |
| AI Model     | OpenRouter LLMs (LLaMA, GPT-4o-mini)  |
| Caching      | Redis (Upstash or Local Redis)        |
| Hosting      | Netlify (Frontend) + Render (Backend) |

---

## 🔑 Features

✅ Email/password login & signup  
✅ AI-chat driven component generation  
✅ Live JSX/CSS rendering preview  
✅ Syntax-highlighted code tabs  
✅ Copy/Download code  
✅ Session saving and loading  
✅ Redis caching (optional)  
✅ Vercel / Render / Netlify deployable  
✅ Component tweaking via chat (WIP)  

---

## 🛠️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/yourusername/ai-microfrontend-generator.git
cd ai-microfrontend-generator

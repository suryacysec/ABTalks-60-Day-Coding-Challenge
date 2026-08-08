<div align="center">

# 🔥 ABTalks – 60 Day Coding Challenge

### _Build Daily. Stay Visible. Get Hired._

A production-quality, mobile-first web application that tracks a 60-day coding challenge designed for Indian college students. Choose your track, build every day, and showcase your consistency to recruiters.

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Powered by Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live-222?style=for-the-badge&logo=github&logoColor=white)](https://ab-talks-60-day-coding-challenge.vercel.app/)

[**🌐 Live Demo**](https://ab-talks-60-day-coding-challenge.vercel.app/) · [**📝 AI Usage Log**](./PROMPTS.md) · [**🐛 Report Bug**](https://github.com/suryacysec/ABTalks-60-Day-Coding-Challenge/issues)

</div>

---

## 📸 Screenshots

| Landing Page | Dashboard | Challenge Day |
|:---:|:---:|:---:|
| Hero with typing effect, animated counters & floating particles | Streak tracking, progress bar, leaderboard & difficulty chart | Task details, submission form & AI post generator |

> _The app features an animated aurora borealis background, glassmorphism cards, and smooth page transitions throughout._

---

## ✨ Features

### 🎯 4 Specialized Tracks
Choose from **Cybersecurity**, **Web Development**, **DSA & Competitive Programming**, or **AI/ML** — each with a curated 60-day task roadmap that goes from beginner to advanced.

### 📊 Interactive Dashboard
- **Streak tracking** with animated flame icons
- **Progress bar** with shimmer effect and milestone markers (Day 15, 30, 45, 60)
- **Leaderboard** with medal icons and rank indicators
- **Difficulty curve chart** powered by Recharts

### 🧑‍💼 Recruiter View
Toggle a recruiter-perspective view of your profile featuring:
- GitHub-style **activity heatmap**
- Skill tags with proficiency indicators
- Summary statistics (days completed, streak, track)

### 🤖 AI Post Generator
Generate professional **LinkedIn posts** about your daily progress using the **Gemini API** — all through a secure Vercel serverless function.

### ⚡ Live Activity Feed
Auto-rotating peer activity cards with track-colored avatars showing what other challengers are building.

### 🏆 Achievements System
Unlock badges as you hit milestones — first submission, 7-day streak, halfway mark, and challenge completion.

### 🎨 Premium Dark Theme
- Animated **aurora borealis gradient** background
- Subtle **tech dot-grid** overlay
- **Glassmorphism** cards with backdrop blur
- Smooth **Framer Motion** page transitions

### 📱 Mobile-First Design
Designed for **390px screens** first, then scales gracefully to tablet and desktop breakpoints.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI framework with hooks |
| [Vite](https://vite.dev) | 8 | Lightning-fast build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | 3.4 | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | 13 | Declarative animations & page transitions |
| [Recharts](https://recharts.org) | 3.10 | Data visualization (difficulty chart) |
| [Lucide React](https://lucide.dev) | 1.30 | Beautiful & consistent icon library |
| [React Router](https://reactrouter.com) | 7 | Client-side routing (HashRouter) |
| [Gemini API](https://ai.google.dev) | 1.5 Flash | AI-powered LinkedIn post generation |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/suryacysec/ABTalks-60-Day-Coding-Challenge.git

# Navigate to the project
cd ABTalks-60-Day-Coding-Challenge

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run OxLint for code quality checks |
| `npm run deploy` | Deploy to GitHub Pages via `gh-pages` |

---

## 📁 Project Structure

```
ABTalks-60-Day-Coding-Challenge/
├── .github/
│   └── workflows/
│       └── static.yml             # GitHub Pages CI/CD workflow
├── api/
│   └── generate-post.js           # Vercel serverless function (Gemini AI)
├── public/
│   ├── favicon.svg                # App favicon
│   └── icons.svg                  # SVG icon sprite
├── src/
│   ├── components/
│   │   ├── AIPostGenerator.jsx    # AI-powered LinkedIn post generator
│   │   ├── DifficultyChart.jsx    # 60-day difficulty curve (Recharts)
│   │   ├── PeerFeed.jsx           # Live activity feed with auto-rotation
│   │   ├── ProgressBar.jsx        # Shimmer progress bar with milestones
│   │   ├── RecruiterView.jsx      # Recruiter profile view + heatmap
│   │   ├── StreakCard.jsx          # Streak counter with SVG flame animation
│   │   ├── SubmissionForm.jsx     # GitHub & LinkedIn submission form
│   │   └── Toast.jsx              # Toast notification system
│   ├── data/
│   │   └── mock.js                # Mock data (student, tasks, leaderboard)
│   ├── pages/
│   │   ├── Landing.jsx            # Hero page — typing effect, counters, particles
│   │   ├── Dashboard.jsx          # Main dashboard — stats, chart, leaderboard
│   │   └── ChallengeDay.jsx       # Individual day — task, submission, AI post
│   ├── App.jsx                    # Root component with routing & transitions
│   ├── App.css                    # Legacy styles (kept for compatibility)
│   ├── index.css                  # Global design system & utilities
│   └── main.jsx                   # React entry point
├── index.html                     # HTML entry with SEO & Open Graph tags
├── tailwind.config.js             # Tailwind theme configuration
├── vite.config.js                 # Vite build configuration
├── vercel.json                    # Vercel deployment config (SPA rewrites)
├── postcss.config.js              # PostCSS plugin config
├── PROMPTS.md                     # AI usage log (hackathon requirement)
└── package.json                   # Dependencies & scripts
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--background` | `#0A0A0F` | Page background with aurora gradient |
| `--card` | `#13131A` | Glass card backgrounds |
| `--primary` | `#7C3AED` | Violet — main accent & CTAs |
| `--secondary` | `#3B82F6` | Blue — secondary accent & links |
| `--success` | `#10B981` | Green — completed / positive states |
| `--danger` | `#EF4444` | Red — missed / error states |
| Font | [Inter](https://fonts.google.com/specimen/Inter) (400–900) | Typography across all components |

### Visual Effects
- **Aurora Background** — A 20-second looping gradient animation with violet, blue, and emerald hues
- **Glassmorphism** — `backdrop-blur` + semi-transparent backgrounds on all cards
- **Micro-animations** — Hover scales, shimmer effects, fade-in stagger animations
- **Floating Particles** — Subtle animated dots on the landing page hero

---

## 🌍 Deployment

### GitHub Pages (Current)

The app is automatically deployed to GitHub Pages on every push to `main` via the [static.yml](.github/workflows/static.yml) workflow.

**Live URL:** [https://ab-talks-60-day-coding-challenge.vercel.app/](https://ab-talks-60-day-coding-challenge.vercel.app/)

### Vercel (Optional — for AI Post Generator)

The AI Post Generator requires a Vercel serverless function to securely proxy the Gemini API key.

1. Import the repo on [vercel.com](https://vercel.com)
2. Add environment variable: `GEMINI_API_KEY=your_api_key_here`
3. Deploy — the `api/generate-post.js` function will be auto-detected

---

## 🔐 Environment Variables

| Variable | Where | Description |
|---|---|---|
| `GEMINI_API_KEY` | Vercel Dashboard | Google Gemini API key for AI post generation (server-side only, never exposed to client) |

> **Note:** The app runs fully without the API key — the AI Post Generator will simply show an error if the key is not configured. All other features work out of the box with mock data.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Built By

<div align="center">

**Suryansh Gupta**
B.Tech in IT · AKGEC

[![GitHub](https://img.shields.io/badge/GitHub-suryanshinfosec-181717?style=for-the-badge&logo=github)](https://github.com/suryanshinfosec)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-suryanshinfosec-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/suryanshinfosec/)

---

_Built with ❤️ for the Vicodathon Hackathon · 2026_

</div>

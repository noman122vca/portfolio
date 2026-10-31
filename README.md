# Hassan Mahmud Portfolio - Reconstructed & Documented

> **Reverse-Engineered Source & Documentation**: `https://hassan-mahmud.vercel.app/`  
> **Reconstruction Standard**: Antigravity SDD, Zero-Trust Architecture & Spec-Driven Development

---

## 🌟 Overview & Highlights
This repository contains the complete reverse-engineered codebase, assets, and documentation for **Hassan Mahmud**'s official creative portfolio.

- **Profile Subject**: Hassan Mahmud (Official Name: Mohammad Hasan)
- **Specializations**: Graphic Design, Video Editing, Motion Graphics, Meta Marketing
- **Institutional Background**:
  - As-Sunnah Skill Development Institute: Batch 37 SBMC Certified
  - National Skills Development Authority (NSDA): CBT&A Level 3 Competent in Digital Marketing (Prime Minister's Office Recognized)
- **Key Features**:
  - 🌐 **Full Bilingual Support**: English & Bengali (বাংলা) with `LanguageProvider` and local storage synchronization
  - 🔊 **Voice Welcome Narration**: Text-to-Speech (TTS) integration via browser Web Speech API with English and Bengali natural voices
  - 🎥 **Video Showcase & Player Modal**: YouTube, Vimeo, Google Drive, and MP4 embedded player supporting both Landscape (16:9) and Reels/Shorts (9:16)
  - 🖼️ **Graphic Design Lightbox**: High-resolution zoomable visual art previews with tag and metadata inspection
  - ⚡ **Zero-Backend Persistence**: Client-side `localStorage` schema (`hassan_portfolio_items_v18`) with in-browser management modals for adding videos and graphics
  - 📄 **Interactive Curriculum Vitae**: Viewable modal with detailed educational background, competencies, references, and direct PDF download

---

## 📁 Project Directory Structure
Strict separation of concerns adhering to the SDD architecture standard:

```text
iftekar_profile/
├── .env.example                     # Environment template with placeholders
├── .env                             # Local development variables (gitignored)
├── .gitignore                       # Clean repository exclusions
├── package.json                     # Pinned React 19, Vite, Tailwind CSS, Lucide, Framer Motion
├── index.html                       # Exact cloned HTML with metadata, schema.org JSON-LD, fonts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration with font families and colors
├── postcss.config.js                # PostCSS configuration
│
├── specs/                           # SDD Specification
│   └── site-reconstruction-and-reverse-engineering.md
│
├── docs/                            # Deep Architectural Documentation
│   ├── ARCHITECTURE.md              # System design, Mermaid diagrams & technology stack
│   ├── ASSETS_AND_MEDIA.md          # Complete catalog of images, videos, SVGs, and fonts
│   ├── BACKEND_AND_PERSISTENCE.md   # Analysis of backend, localStorage, and form flows
│   └── DATA_SCHEMA.md               # TypeScript / JSDoc contracts for all models
│
├── notes/                           # Live State & Agent Handover
│   ├── PROJECT_STATE.md             # Real-time completed items and task ledger
│   └── AGENT_HANDOVER.md            # Concise single-paragraph directive for session resumption
│
├── config/                          # Configuration & Policy Gating
│   ├── policies.yaml                # Zero-Trust security & CSP policies
│   └── portfolio-data.json          # Formatted JSON dataset
│
├── public/                          # 100% Downloaded Offline Static Assets
│   ├── as-sunnah-logo.png           # As-Sunnah Institute emblem
│   ├── hassan-avatar-v2.png         # High-resolution hero avatar
│   ├── hassan-mahmud-cv.pdf         # Official complete CV PDF
│   ├── nsda-logo.svg                # National Skills Development Authority vector logo
│   ├── favicon.svg / favicon.png    # Browser tab icons and manifest
│   ├── external_assets/             # Offline mirrors of YouTube thumbnails & avatar
│   └── portfolio/                   # All 8 graphic design campaign artwork files
│
├── src/                             # Reconstructed Modern React Component Source
│   ├── main.jsx                     # Application entry point
│   ├── App.jsx                      # Root container orchestrating all sections & modals
│   ├── index.css                    # Tailwind + custom glassmorphic & glowing styles
│   ├── context/
│   │   └── LanguageContext.jsx      # Bilingual context (EN/BN) with persistence
│   ├── data/
│   │   ├── profileData.js           # Hassan Mahmud bio, contact info, social links
│   │   ├── cvData.js                # Education, competencies, references, CV details
│   │   ├── trainingData.js          # As-Sunnah and NSDA certification data
│   │   ├── portfolioData.js         # Default 18 video and graphic design items
│   │   └── translations.js          # English and Bengali strings dictionary
│   └── components/
│       ├── BackgroundFX.jsx         # Ambient glowing radial gradients & dots
│       ├── Navbar.jsx               # Sticky navbar with TTS, language toggle, and CV CTA
│       ├── Hero.jsx                 # Hero section with animated 3D orbiting tool badges
│       ├── PortfolioSection.jsx     # Works showcase with category & video format filters
│       ├── AboutSection.jsx         # Personal narrative, values, and quote
│       ├── SkillsAndTraining.jsx    # Dual institutional accreditation showcase
│       ├── ExperienceSection.jsx    # Verified official channels & why hire breakdown
│       ├── ContactSection.jsx       # WhatsApp chat, phone, email & interactive form
│       ├── Footer.jsx               # Quick jumps, scroll-to-top, and copyright
│       ├── Icons.jsx                # Custom SVGs (Pr, Ps, Ai, Ae, CapCut, Meta, WhatsApp, etc.)
│       └── modals/
│           ├── CVModal.jsx              # Curriculum Vitae viewer with PDF download
│           ├── MediaDetailModal.jsx     # Video player & Graphic design lightbox
│           ├── VideoFormModal.jsx       # In-browser video add/manage with YouTube parser
│           └── GraphicUploadModal.jsx   # In-browser graphic artwork uploader
│
└── tests/                           # Deterministic Test Suites
    └── site.test.js                 # 6 automated tests validating schemas, items & URL parsers
```

---

## 🚀 Getting Started

### 1. Run Tests
Validate data contracts, portfolio integrity, and YouTube URL parsing logic:
```bash
npm test
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` to browse the interactive portfolio locally!

### 3. Production Build
```bash
npm run build
```
Creates an optimized static bundle in `dist/` ready to deploy on Vercel, Netlify, or Cloudflare Pages.

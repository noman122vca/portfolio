# Hassan Mahmud Portfolio - Architectural Specification & Reverse Engineering Blueprint

This document details the complete system architecture, data models, state lifecycle, component tree, and media pipelines reverse-engineered from `https://hassan-mahmud.vercel.app/`.

---

## 1. System Design & Technology Stack

```mermaid
graph TD
    Client["Client Browser (Desktop / Mobile)"]
    
    subgraph "Frontend Layer (React 19 + Vite)"
        Vite["Vite 6 SPA Runner"]
        ReactApp["React 19 Root (b.StrictMode)"]
        LangContext["LanguageProvider (i18n Context)"]
        LocalStorage["Browser localStorage API (v18)"]
        WebSpeech["Web Speech Synthesis API"]
    end

    subgraph "Styling & Motion"
        Tailwind["Tailwind CSS 3.4+ Utility Engine"]
        FramerMotion["Framer Motion Engine (Transitions, Drag, Layout)"]
        Lucide["Lucide React Icon System"]
    end

    subgraph "Media & Content Providers"
        VercelCDN["Vercel Static Edge CDN (Images, PDFs, Logos)"]
        YouTube["YouTube Player Embed API / Thumbnails"]
        Unsplash["Unsplash CDN (Fallbacks & Design stock)"]
    end

    Client --> Vite
    Vite --> ReactApp
    ReactApp --> LangContext
    ReactApp --> LocalStorage
    ReactApp --> WebSpeech
    ReactApp --> Tailwind
    ReactApp --> FramerMotion
    ReactApp --> Lucide
    ReactApp --> VercelCDN
    ReactApp --> YouTube
    ReactApp --> Unsplash
```

### Pinned Tool & Library Versions
- **Node.js**: `v22.x` / `v20.x` LTS
- **React**: `^19.0.0`
- **React DOM**: `^19.0.0`
- **Vite**: `^6.0.0`
- **Tailwind CSS**: `^3.4.17`
- **Framer Motion**: `^11.15.0`
- **Lucide React**: `^0.468.0`
- **PostCSS**: `^8.4.49`
- **Autoprefixer**: `^10.4.20`

---

## 2. Component Hierarchy & Flow

```mermaid
flowchart TD
    App["App.jsx (Root)"] --> LangProv["LanguageProvider"]
    LangProv --> Shell["Main Container (<div className='relative min-h-screen bg-[#020B0E]'>)"]
    
    Shell --> FX["BackgroundFX (Ambient gradients, dot grid)"]
    Shell --> Nav["Navbar (Sticky glassmorphic bar, TTS, Lang toggle, CV CTA)"]
    Shell --> Main["<main> (Page content)"]
    Shell --> Foot["Footer (Social links, quick jumps, copyright)"]
    
    Main --> Hero["Hero (Avatar, 3D Orbiting badges, Bio, CTAs)"]
    Main --> Portfolio["PortfolioSection (Category filter, Video format filter, Cards)"]
    Main --> About["AboutSection (Bio, Quote, Value pillars)"]
    Main --> Training["SkillsAndTraining (As-Sunnah SDI, NSDA Level 3 Govt. Certified)"]
    Main --> Experience["ExperienceSection (Official profiles, Value proposition)"]
    Main --> Contact["ContactSection (WhatsApp, Phone, Email, Interactive Form)"]
    
    Shell --> CVModal["CVModal (Full resume, education, references, PDF download)"]
    Shell --> MediaModal["MediaDetailModal (Video player / Lightbox preview)"]
    Shell --> VideoForm["VideoFormModal (Add/manage video projects, parse YouTube)"]
    Shell --> UploadModal["GraphicUploadModal (Add custom artwork with tags)"]
```

---

## 3. Data Flow & LocalStorage Lifecycle

The application adopts a **Zero-Backend / Jamstack** architecture:
1. **Initial Seed**: Default 14 projects (6 video productions + 8 graphic design campaigns) are defined in static JavaScript modules (`portfolioData.js`).
2. **Versioned Migration**: On initial load, keys `hassan_portfolio_items_v1` through `hassan_portfolio_items_v17` are automatically cleaned up to prevent stale data conflicts.
3. **Current Namespace**: `hassan_portfolio_items_v18` stores any user-added or modified portfolio items.
4. **Reactivity**: Any addition through `VideoFormModal` or `GraphicUploadModal` updates React state immediately and serializes to `localStorage`.
5. **Reset Capability**: The user can reset back to factory default items at any time, which purges the key and resets the state.

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Admin
    participant App as React App
    participant LS as Browser localStorage
    participant Memory as React State (items)

    App->>LS: Purge legacy keys (v1 to v17)
    App->>LS: Read key "hassan_portfolio_items_v18"
    alt Key exists & valid
        LS-->>App: Return stored items JSON
        App->>Memory: Initialize state with stored items + verify default graphics
    else No key exists
        App->>Memory: Initialize state with default 14 production items
    end

    User->>App: Submits new Video / Graphic via modal
    App->>Memory: Prepend new item to active state
    App->>LS: Write updated JSON to "hassan_portfolio_items_v18"
    App-->>User: Portfolio Grid updates instantly
```

---

## 4. Audio & Text-to-Speech (TTS) Pipeline

```mermaid
flowchart LR
    Click["User clicks 'Play Welcome'"] --> Check{"'speechSynthesis' in window?"}
    Check -- No --> Alert["Silent fallback / Console warning"]
    Check -- Yes --> ActiveCheck{"Is audio already playing?"}
    ActiveCheck -- Yes --> Cancel["window.speechSynthesis.cancel() -> Reset button to 'Play Welcome'"]
    ActiveCheck -- No --> Synth["Create SpeechSynthesisUtterance"]
    Synth --> LangPick{"Current Language?"}
    LangPick -- Bengali ('bn') --> BN["utterance.lang = 'bn-BD'<br/>Voice match: Bengali / Natural"]
    LangPick -- English ('en') --> EN["utterance.lang = 'en-US'<br/>Voice match: Natural / Google / Samantha"]
    BN --> Speak["window.speechSynthesis.speak(utterance)"]
    EN --> Speak
    Speak --> BtnState["Navbar button toggles to 'Stop Greeting' with pulsating sound waves"]
```

---

## 5. Security & Zero-Trust Posture
- **No Client Secrets Exposed**: No hardcoded production database keys, auth tokens, or private secrets were present in the bundle.
- **Strict Content Isolation**: Embedded videos run inside sandboxed iframes (`https://www.youtube.com/embed/...`, `https://player.vimeo.com/...`, `https://drive.google.com/...`).
- **Sanitized Links**: Outbound links to WhatsApp, Facebook, LinkedIn, Behance, and YouTube include `rel="noopener noreferrer"`.
- **Clean Fallbacks**: External asset failures (e.g. Unsplash or YouTube rate-limits) fall back to local SVG/PNG placeholders stored in `public/`.

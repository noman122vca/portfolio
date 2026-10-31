---
feature: "portfolio-reverse-engineering-and-reconstruction"
target_url: "https://hassan-mahmud.vercel.app/"
version: "1.0.0"
status: "completed"
framework: "React 19 + Vite 6 + Tailwind CSS"
author: "Antigravity SDD Standard"
date: "2026-10-31"

data_contracts:
  profile:
    name: "Hassan Mahmud"
    officialName: "Mohammad Hasan"
    designation: "Graphic Designer, Video Editor & Digital Marketer"
    phone: "+8801310-768690"
    email: "hassanmahmud.info@gmail.com"
    whatsapp: "https://wa.me/8801310768690"
  storage_keys:
    portfolio_items: "hassan_portfolio_items_v18"
    language_state: "hassan_portfolio_lang"
    legacy_keys_purged: ["v1", "v2", "...", "v17"]
---

# Feature Specification: Hassan Mahmud Portfolio Website Reconstruction

## 1. Overview & Objective
This specification formalizes the architectural contracts, data models, UI components, interaction paradigms, and static asset mapping reverse engineered from the production portfolio web application located at `https://hassan-mahmud.vercel.app/`.

The application serves as a dynamic, bilingual (English & Bengali) creative showcase for **Hassan Mahmud** (Official Name: Mohammad Hasan), a Graphic Designer, Video Editor, and NSDA-certified Digital Marketer in Bangladesh.

---

## 2. Gherkin BDD Scenarios

### Scenario 1: Bilingual Language Switching
```gherkin
Feature: Language Localization (English and Bengali)
  As a visitor from Bangladesh or international clients
  I want to toggle between English and Bengali translations
  So that I can read the portfolio in my preferred language.

  Scenario: Switching from English to Bengali
    Given the portfolio is rendered in default English ("en")
    When the user clicks the "বাংলা" language toggle button in the navbar
    Then the active language updates to "bn"
    And the HTML root attribute "lang" changes to "bn"
    And navigation labels update to Bengali (e.g., "হোম", "প্রজেক্টসমূহ", "পরিচিতি")
    And the choice is persisted in localStorage under key "hassan_portfolio_lang"

  Scenario: Switching back to English
    Given the portfolio is currently in Bengali ("bn")
    When the user clicks the "EN" language toggle button
    Then the active language updates to "en"
    And the document lang attribute changes to "en"
```

### Scenario 2: Web Speech API Welcome Narration
```gherkin
Feature: Text-to-Speech (TTS) Voice Narration
  As a visitor browsing the creative portfolio
  I want to listen to an audio introduction
  So that I can hear the creator's welcome message without reading.

  Scenario: Playing Welcome Audio
    Given the visitor is on the portfolio hero section
    When the visitor clicks "Play Welcome" / "শুনুন" button in the navbar
    Then the Web Speech API window.speechSynthesis cancels any ongoing audio
    And an SpeechSynthesisUtterance is created with voice locale "en-US" or "bn-BD"
    And the navbar button transitions to a pulsing audio equalizer state "Stop Greeting"

  Scenario: Stopping Welcome Audio
    Given audio playback is actively synthesizing
    When the visitor clicks "Stop Greeting"
    Then window.speechSynthesis.cancel() is invoked
    And the button state reverts to "Play Welcome"
```

### Scenario 3: Video & Graphic Portfolio Filtering & Lightbox Preview
```gherkin
Feature: Dynamic Media Showcase and Modal Inspection
  As a potential employer or client
  I want to filter portfolio works by media type (Videos, Graphics) and categories
  And open interactive lightboxes or video players
  So that I can evaluate design quality and motion execution.

  Scenario: Filtering by Video Projects
    Given the portfolio showcase section is visible
    When the user clicks "Video Editing" tab
    Then only video cards with YouTube/Vimeo/Drive media are rendered
    And format badges indicate "Landscape" or "Reel / Shorts"

  Scenario: Opening a Video Modal
    Given the user is viewing video items
    When the user clicks on "AS SUNNAH SKILL ADMISSION PROMO VIDEO"
    Then the MediaDetailModal opens with an autoplaying responsive YouTube embed iframe
    And next/previous navigation controls allow cycling through related video works
    And pressing "Escape" or the close button closes the modal

  Scenario: Viewing High-Res Graphic Art
    Given the user clicks on a graphic design card
    When the MediaDetailModal mounts
    Then a high-resolution lightbox displays the full graphic artwork
    And tags ("Product Ad", "Photoshop", "Visual Manipulation") are rendered
```

### Scenario 4: In-Browser Portfolio Management (Zero-Backend Admin)
```gherkin
Feature: LocalStorage Portfolio Management
  As the portfolio owner visiting the deployed site
  I want to add new video links or graphic designs directly from the browser
  Without requiring a database server or rebuilding the site.

  Scenario: Adding a Video via Modal
    Given the user opens the "Add / Manage Videos" modal
    When the user inputs a YouTube URL and project title
    Then the URL parser extracts the valid 11-character video ID
    And creates an auto-generated thumbnail from `img.youtube.com/vi/${id}/hqdefault.jpg`
    And prepends the item to the active portfolio array
    And saves the updated array to `localStorage.setItem('hassan_portfolio_items_v18', ...)`

  Scenario: Resetting to Default Production Items
    Given custom items exist in localStorage
    When the user clicks "Reset to Default" and confirms the prompt
    Then localStorage key "hassan_portfolio_items_v18" is removed
    And the portfolio re-seeds with the 14 default production items
```

---

## 3. Component Hierarchy & Architectural Mapping
```text
App (bf) [LanguageProvider]
├── BackgroundFX (ne)
├── Navbar (Id)
│   ├── Logo & Verified Badge
│   ├── Navigation Links (Desktop & Mobile Drawer)
│   ├── TTS Audio Welcome Trigger
│   ├── Language Toggle (EN / বাংলা)
│   └── "Resume / CV" CTA -> triggers CVModal
├── Main
│   ├── Hero (ef)
│   │   ├── Profile Avatar (fallback + external mirror)
│   │   ├── 3D Orbiting Skill Spheres (Zd)
│   │   ├── Bio & Value Proposition
│   │   ├── Social Channels (WhatsApp, Behance, FB, LinkedIn, YouTube)
│   │   └── Primary Action Buttons
│   ├── PortfolioSection (nf)
│   │   ├── Category Pills ("All", "Video Editing", "Graphic Design", "Social Media", "Branding")
│   │   ├── Video Format Filter ("All", "Landscape", "Reel / Shorts")
│   │   ├── Portfolio Grid (cards: tf)
│   │   └── Admin Triggers ("Manage Videos", "Upload Work")
│   ├── AboutSection (rf)
│   │   ├── Bio Narrative
│   │   ├── Core Philosophies
│   │   └── Interactive Stats Grid
│   ├── SkillsAndTraining (sf)
│   │   ├── AsSunnahTraining (af) - Batch 37 SBMC Certified
│   │   └── NSDAAccreditation (of) - PMO Govt. Level 3 CBT&A Competent
│   ├── ExperienceSection (cf)
│   │   ├── Why Hire Hassan Mahmud
│   │   └── Official Verified Profiles Carousel
│   └── ContactSection (lf)
│       ├── Direct Communication Info (WhatsApp, Email, Phone, Location)
│       └── Interactive Project Inquiry Form
├── Footer (uf)
└── Modals
    ├── CVModal (gf) - Interactive CV Viewer & PDF Downloader
    ├── MediaDetailModal (hf) - Video Player & Graphic Lightbox
    ├── VideoFormModal (_f) - Add / Manage Video items with YouTube parser
    └── GraphicUploadModal (vf) - Add Graphic design items
```

# Project State: MD EFTEKAR HOSSEN NOMAN Portfolio (Reconstructed & Customized)

## Completed Milestones
- [x] Initial website discovery and reverse engineering of `https://hassan-mahmud.vercel.app/`
- [x] Extracted and downloaded all 100% authentic assets in `public/`
- [x] Reconstructed and formatted data models:
  - [x] `src/data/profileData.js` customized for **MD EFTEKAR HOSSEN NOMAN** (WhatsApp, YouTube, Facebook, GitHub, LinkedIn, Behance, Email, Phone)
  - [x] `src/data/cvData.js` updated with MD EFTEKAR HOSSEN NOMAN credentials & contact
  - [x] `src/data/translations.js` updated in both English and Bengali with dynamic speech greeting
  - [x] `index.html` metadata, title, author, OpenGraph, and Schema.org updated for MD EFTEKAR HOSSEN NOMAN
  - [x] Added branded SVG `GitHubIcon` in `src/components/Icons.jsx` and added GitHub to Hero & Official Channels
- [x] Documented architecture, data contracts, and reverse engineering specs:
  - [x] `specs/site-reconstruction-and-reverse-engineering.md`
  - [x] `specs/tasks.md` (33 dependency-ordered tasks conforming to `speckit-tasks` checklist)
  - [x] `specs/customization-and-github-deployment-plan.md`
  - [x] `docs/ARCHITECTURE.md`, `docs/ASSETS_AND_MEDIA.md`, `docs/BACKEND_AND_PERSISTENCE.md`, `docs/DATA_SCHEMA.md`
- [x] Verification & Deployment Readiness:
  - [x] Configured `base: './'` in `vite.config.js` for zero-404 relative paths
  - [x] Added automated CI/CD pipeline `.github/workflows/deploy.yml` for GitHub Pages
  - [x] Unit test suite passed: 6/6 tests PASS (`npm test`)
  - [x] Production build passed: `vite build` completed in 2.27s
  - [x] Live browser rendering verified via Chrome DevTools Protocol: 0 console exceptions, full DOM tree loaded with MD EFTEKAR HOSSEN NOMAN branding.
- [x] **New Portrait & 3D Orbit Integration**:
  - [x] Installed uploaded portrait photo (`media_1793456105514_82734aef.jpg`) as `public/noman-avatar.jpg` and bound to Hero 3D orbiting software rings (Ps, Ai, Pr, Ae, CapCut).
  - [x] Updated OpenGraph and Twitter social card preview image to `public/noman-avatar.jpg`.
- [x] **Swiper 3D Touch Slider (Coverflow)**:
  - [x] Installed `swiper@^14.4.0` with custom cyberpunk cyan theme styles in `src/index.css`.
  - [x] Implemented modular DRY `PortfolioCard` and added interactive `Grid` vs `3D Slider` view mode toggle in `src/components/PortfolioSection.jsx`.
  - [x] Verified 18 project slides rendering with autoplay, depth perspective, dynamic pagination bullets, and glowing navigation arrows.

- [x] **Hero UI Refinement & Formatting (Title Case & Clean Badge)**:
  - [x] Profile photo re-cropped with PIL at `cy=440, size=860` for perfect symmetrical eye, nose, collar alignment.
  - [x] Removed bottom darkening gradient overlay from circular avatar frame, added subtle studio rim glow.
  - [x] Converted ALL CAPS name to clean Title Case: `Md. Eftekar Hossen Noman` across Hero, Navbar, CV data, and translations.
  - [x] Dedicated prominent greeting line: `Hi, I am Md. Eftekar Hossen Noman` with cyan highlight and natural vertical spacing above the bio paragraph.
  - [x] Removed AI sparkles sticker from `GRAPHIC DESIGNER & CREATIVE CREATOR` badge button.
  - [x] Verified build (`vite build`), test suite (`npm test`), and pushed updates to `main` and `gh-pages` branch on GitHub.
  - [x] Verified live on GitHub Pages (`https://noman122vca.github.io/portfolio/`) via Chrome DevTools screenshot capture.

- [x] **Phase 9: US6 - YouTube, Madrasha Education, Reliable CV PDF & Client Media Architecture**:
  - [x] YouTube channel updated to `https://www.youtube.com/@Nomancreative-17` and `@Nomancreative-17` in `src/data/profileData.js`.
  - [x] Educational background updated to Takmil (Dawra-e-Hadith) / Master's Equivalent (Al-Haiatul Ulya) and Fazilat Mishkat (Befaqul Madarisil Arabia) in `src/data/cvData.js`.
  - [x] Generated official, vector PDF `public/md-eftekar-hossen-noman-cv.pdf` using Chrome Page.printToPDF.
  - [x] Resolved PDF download 404 by routing to relative path `./md-eftekar-hossen-noman-cv.pdf` with download filename `Md-Eftekar-Hossen-Noman-CV.pdf`.
  - [x] Upgraded VideoFormModal & GraphicUploadModal with YouTube channel detection, custom thumbnail upload/URL, submission feedback toast, and 1-click JSON code export for client handover.
  - [x] Cleaned storage key to `noman_portfolio_items_v1`.
  - [x] All 6 unit tests passing (`npm test`), production build passing (`vite build`).

- [x] Push local Git repository to remote GitHub (`https://github.com/noman122vca/portfolio`) using user's GitHub credentials / PAT.
- [x] **Phase 10: Firebase Cloud CMS & Client Admin Studio**:
  - [x] Installed `firebase` SDK in `package.json`.
  - [x] Configured Firebase project credentials for `noman-protfolio` (`AIzaSyA3zkBYJRUBl8LxyKWfE7Hyt_gDtCj7igg`) in `.env` and `src/config/firebase.js`.
  - [x] Implemented password-protected `AdminLoginModal` with password `noman@admin2026`.
  - [x] Implemented full `AdminDashboardModal` with video publisher (YouTube, Reels, Shorts), graphic artwork uploader, and cloud project manager with 1-click deletion.
  - [x] Connected real-time `onSnapshot` subscription in `src/App.jsx` merging cloud items with default portfolio.
  - [x] Added Admin Studio triggers in Navbar, PortfolioSection, and Footer.
  - [x] Added unit tests in `tests/firebase.test.js` (7/7 tests passing).
  - [x] Production build passed (`vite build`) and live deployed to GitHub Pages `gh-pages` branch.
- [x] **Phase 11: Hero Avatar Restoration & Clean Styling**:
  - [x] Reverted temporary flyer crop image (`media_1793501195445_2479b99e.png`) per user request.
  - [x] Restored original high-resolution studio portrait of Md. Eftekar Hossen Noman in `public/noman-avatar.jpg` and `public/eftekar-avatar.jpg`.
  - [x] Restored clean neon-glow rotating software rings (Ps, Ai, Pr, Ae, CapCut, Meta) and balanced hero layout.
  - [x] Verified full persistence of Firebase Cloud CMS, YouTube channel `@Nomancreative-17`, Swiper 3D Touch Slider, and CV downloads.
- [x] **Phase 12: Ultra-Glassic Motion Avatar & Symmetrical Hero Layout**:
  - [x] Corrected hero grid from `lg:grid-cols-12` (7/5 lopsided split) to balanced `lg:grid-cols-2` (50/50 split), perfectly centering the avatar & orbit container horizontally.
  - [x] Eliminated asymmetrical transparent gradient cut that caused an optical dark crescent on the right edge.
  - [x] Implemented a 360-degree uniform frosted glass bezel (`p-2.5 sm:p-3`, `backdrop-blur-xl`, `border-[#00E5FF]/60`, `shadow-[0_0_50px_rgba(0,229,255,0.45)]`).
  - [x] Added convex optical glass specular highlight (`radial-gradient(ellipse_at_35%_25%)`) creating a 3D glass dome effect.
  - [x] Added multi-axis animations:
    - Floating bobbing (`y: [-7, 7, -7]`, 5s easeInOut)
    - Ambient cyan breathing pulse behind the orbit
    - Animated diagonal glass light sheen sweep (`x: ['-150%', '160%']`) across the lens
    - Continuous 360-degree rotating tech skill orbit with counter-rotating frosted glass badges
    - Accelerated orbit velocity on avatar hover
  - [x] Verified desktop (`1440x900`) and mobile (`390x844`) responsiveness via Chrome DevTools Protocol screenshots.
- [x] **Phase 13: Image 1 Architecture Setup with Seamless Studio Portrait**:
  - [x] Extracted high-precision cutout of Md. Eftekar Hossen Noman using AI segmentation, completely removing the light-blue square background and watermark 3D cubes.
  - [x] Re-composited portrait on the exact dark cyberpunk teal spotlight background (`#2E8A96` center fading to `#04161E`) matching the 1st reference image (`media_1793508168013_6f2c9bb7.png`).
  - [x] Implemented double concentric glowing cyan rings around the central avatar (inner rim + outer concentric halo ring with dark concentric gap).
  - [x] Aligned all 6 software badges to exact positions and styling from Image 1:
    - Top (12 o'clock): **Ai** (Amber glow)
    - Top-Right (2 o'clock): **Pr** (Magenta/purple glow)
    - Bottom-Right (4 o'clock): **Ae** (Indigo glow)
    - Bottom (6 o'clock): **CapCut** (White card, black logo & text, white halo glow)
    - Bottom-Left (8 o'clock): **Meta** (White card, Meta loop & text, cyan halo glow)
    - Top-Left (10 o'clock): **Ps** (Cyan glow)
  - [x] Passed 7/7 unit tests (`npm test`), production build passing (`vite build`), deployed to GitHub `main` and `gh-pages` (`https://noman122vca.github.io/portfolio/`).
- [x] **Phase 14: Perfect Alignment with Image 2 (Hassan Mahmud Hero Architecture)**:
  - [x] **Typography & Hierarchy**:
    - [x] Header badge updated to `GRAPHIC DESIGNER & VIDEO EDITOR` alongside `• Available for projects`.
    - [x] Headline styling aligned: `Crafting visual stories & high–retention video edits.` with only `video edits.` in vibrant cyan with soft glow.
    - [x] Bio text unified into a single, cohesive, readable paragraph integrating the greeting without disconnected heading blocks.
  - [x] **Single-Row Action Buttons**:
    - [x] Pure white `Selected Works ↓` button with dark text and white glow shadow.
    - [x] Dark glass `Let's Connect` pill with cyan `MessageSquare` icon.
    - [x] Outline/text `Resume (PDF)` pill with cyan `FileText` icon.
    - [x] All 3 buttons guaranteed to stay in one single row on desktop (`flex-nowrap lg:flex-nowrap gap-2.5 sm:gap-3`).
  - [x] **Works Counter Pills**:
    - [x] Dedicated `WORKS:` uppercase mono label with `[ 🎬 Video Editing (9) ]` and `[ 🎨 Graphic Design (9) ]` pills linking to `#projects`.
  - [x] **Verified Channels**:
    - [x] Dedicated thin divider followed by creative channels matching reference: WhatsApp, Meta, Behance, LinkedIn, Facebook, Instagram, YouTube.
  - [x] **Avatar & 3D Holographic Orbit**:
    - [x] Scaled studio portrait on seamless dark teal gradient vignette with natural headroom and shoulders.
    - [x] Dual concentric luminous cyan glowing rings with glass shimmer sweep.
    - [x] Orbit tool order mapped clockwise to match Image 2: **Pr** (Left, 9h) -> **Ae** (Top-Left, 11h) -> **CapCut** (Top-Right, 1h) -> **Meta** (Right, 3h) -> **Ps** (Bottom-Right, 5h) -> **Ai** (Bottom-Left, 7h).
  - [x] All 7 tests passed (`npm test`), production build passed (`vite build`), deployed to GitHub `main` and `gh-pages` (`https://noman122vca.github.io/portfolio/`).
- [x] **Phase 15: Facebook Video Embed, Dual-Persistence Cloud/Local CMS & Admin Publishing**:
  - [x] Resolved Facebook video/reel embedding issue by integrating Facebook's official responsive embed plugin (`https://www.facebook.com/plugins/video.php?href=...`) with direct "Watch on Facebook ↗" fallback overlay in `MediaDetailModal.jsx`.
  - [x] Implemented dual-persistence fallback in `AdminDashboardModal.jsx` and `VideoFormModal.jsx` so if Firestore is still pending activation, items save seamlessly to local storage without throwing blocking browser alerts.
  - [x] Wired `onAddLocalProject` prop in `src/App.jsx` to dynamically prepend new video/graphic projects to the active gallery.
  - [x] Updated portfolio action buttons to `+ Add Video (YT / FB)` in English and `+ ভিডিও যোগ করুন (YT / FB)` in Bengali.
  - [x] Added unit tests for Facebook URL detection and embed logic in `tests/site.test.js` (8/8 tests passing).
  - [x] Production build passed (`vite build`) and ready for deployment to GitHub `main` and `gh-pages`.
- [x] **Phase 16: Zero-Lag Optimistic Publishing & Firebase Timeout Guard**:
  - [x] Root Cause: When Firestore is uninitialized in Firebase Console, `addDoc` connection attempts hang indefinitely without rejecting, trapping the admin UI in `Publishing to Cloud...`.
  - [x] Implemented `Promise.race` timeout guard (2500ms) on `addProjectToCloud` and `deleteProjectFromCloud` in `src/config/firebase.js`.
  - [x] Implemented Instant Optimistic Publishing in `AdminDashboardModal.jsx`: projects save immediately to portfolio state/localStorage, modal closes instantly, screen scrolls to `#projects`, and background cloud sync proceeds non-blocking.
  - [x] Added `allPortfolioItems` and `onDeleteProject` support to Admin Manage tab so local and cloud custom projects can be deleted seamlessly.
  - [x] Dynamically wired WORKS counter in `Hero.jsx` (`({videoCount})` and `({graphicCount})`) driven by active portfolio state.
  - [x] Directly pre-seeded user's Nafees Salim Facebook video into `defaultPortfolioItems` in `src/data/portfolioData.js`.
  - [x] All 8 tests pass (`npm test`) and production build verified (`vite build`).
- [x] **Phase 17: Multi-Facebook Video/Reel Ingestion & Canonical Embed Mapping**:
  - [x] Ingested 4 official Facebook reels provided by user:
    1. `Nafees Salim Rough Cut (As-Sunnah Promo)` (`1PvJ2AVPcW` / `1363652169086347`)
    2. `As-Sunnah Skill Development Institute Promo` (`1JHsYSCzHV` / `1087490990911079`)
    3. `আমার তো জান্নাতে যাওয়া উদ্দেশ্য | Noman Visuals` (`14tbBerDfhX` / `2405190683344268`)
    4. `After Effects Basic Motion | Noman Visuals` (`1dpxHiLsvR` / `969138829584724`)
  - [x] Downloaded high-resolution authentic thumbnails to `public/portfolio/fb_reel_{1..4}.jpg` to prevent CDN expiration.
  - [x] Added `FB_SHARE_MAP` in `MediaDetailModal.jsx` to map share links to canonical Facebook reel URLs in iframe plugin.
  - [x] Updated portfolio default items to 22 (13 videos, 9 graphics) and updated unit test suite (8/8 tests pass).
  - [x] Compiled production bundle and deployed to GitHub `main` and `gh-pages`.

- [x] **Phase 18: Ingestion of All 11 Authentic Facebook Video Projects & Removal of Old YouTube Placeholders**:
  - [x] Removed all 9 old placeholder YouTube videos (`video-hassan-1` through `video-hassan-6` & `video-hassan-reel-2..4`).
  - [x] Ingested all 11 authentic Facebook reels/videos provided by user:
    1. `Nafees Salim Rough Cut (As-Sunnah Promo)` (`1PvJ2AVPcW` / `1363652169086347`)
    2. `As-Sunnah Skill Development Institute Promo` (`1JHsYSCzHV` / `1087490990911079`)
    3. `আমার তো জান্নাতে যাওয়া উদ্দেশ্য | Noman Visuals` (`14tbBerDfhX` / `2405190683344268`)
    4. `After Effects Basic Motion | Noman Visuals` (`1dpxHiLsvR` / `969138829584724`)
    5. `Basic SaaS Motion | Noman Visuals` (`1BpqhUz3P6` / `2328405841255761`)
    6. `Skill Motion Course Project | Noman Visuals` (`1Dq2NQ4pK8` / `1074169458775398`)
    7. `Instagram High-Retention Reel Edit | Noman Visuals` (`1DnvPg6csm` / `27212899438408418`)
    8. `Animation & Motion Design (Vampire Blood Perfume)` (`18XgyxBSfG` / `4306337859656139`)
    9. `Product Promotional Video | Pure Honey Motion Graphics` (`1BTQ4SN7Hb` / `2226215068110349`)
    10. `Steal like an Artist | Noman Visuals` (`19yYLp9Wqg` / `1646995013757948`)
    11. `As-Sunnah Skill Development Institute Lab Showcase` (`19jUy8CUcK` / `1594156038557415`)
  - [x] Downloaded local permanent thumbnails to `public/portfolio/fb_reel_{1..11}.jpg` preventing any CDN expiration.
  - [x] Updated `FB_SHARE_MAP` in `MediaDetailModal.jsx` for all 11 share IDs.
  - [x] Preserved all 9 authentic graphic design projects intact (20 total items: 11 videos + 9 graphics).
  - [x] Bumped localStorage key in `App.jsx` to `noman_portfolio_items_v2` with automated purge of `v1` to eliminate stale cached videos.
  - [x] All 8 tests passing (`npm test`), production build verified (`npm run build`).

- [x] **Phase 19: Ingestion of 4 Authentic Facebook Graphic Design Artworks**:
  - [x] Ingested all 4 Facebook graphic/photo post links provided by user:
    1. `Commercial Product Visual Design` (`share/p/1CQ8Af1gwo` / `122126618103467649`)
    2. `Creative Lettering & Typography Art` (`share/p/1A1T5XwiDR` / `122126616645467649`)
    3. `Commercial Brand Mockup Presentation` (`share/p/1V1bghe2Ws` / `122126615361467649`)
    4. `As-Sunnah SDI Batch 41 Project Design` (`share/p/1Edo69B3UJ` / `122109838767467649`)
  - [x] Downloaded high-resolution original image assets locally to `public/portfolio/fb_graphic_{1..4}.jpg`.
  - [x] Added `externalUrl` to each graphic item pointing to the original Facebook post.
  - [x] Enhanced `MediaDetailModal.jsx` to render an interactive "View on Facebook" button and banner for graphic design works.
  - [x] Total portfolio items expanded to 24 (11 Videos, 13 Graphic Design works). Dynamic hero counter automatically displays `WORKS: Video Editing (11) | Graphic Design (13)`.
  - [x] Bumped localStorage key in `App.jsx` to `noman_portfolio_items_v3` with purge of `v2` and `v1`.
  - [x] Unit test suite updated (`tests/site.test.js`) and 8/8 tests pass (`npm test`).
  - [x] Production build clean (`vite build`).

- [x] **Phase 20: Comprehensive Admin CMS Control, Bulk Deletion, and Category Filters**:
  - [x] Enhanced `AdminDashboardModal.jsx` Manage tab:
    - [x] Displays all projects (both cloud and local items).
    - [x] Added category filter chips: `All`, `Videos`, `Graphics`.
    - [x] Added instant title search bar for rapid filtering.
    - [x] Added 1-click single item deletion with trash button.
    - [x] Added bulk category deletion: `Clear All Videos` (`সব ভিডিও মুছুন`) and `Clear All Graphics` (`সব গ্রাফিক্স মুছুন`).
    - [x] Added `Reset Default` (`ডিফল্ট রিস্টোর`) button.
  - [x] Added Facebook Post Link / External URL input to the `+ Add Graphic` tab in Admin Studio.
  - [x] Tested and verified 8/8 unit tests passing (`npm test`) and production build passing (`vite build`).

- [x] **Phase 21: Sync Portfolio to Exactly Requested 8 Links (4 Videos & 4 Graphics)**:
  - [x] Purged extra Facebook reels (`fb_reel_5` through `fb_reel_11`), leaving exactly the 4 requested Facebook videos:
    1. `Nafees Salim Rough Cut (As-Sunnah Promo)` (`https://www.facebook.com/share/v/1PvJ2AVPcW/`)
    2. `As-Sunnah Skill Development Institute Promo` (`https://www.facebook.com/share/v/1JHsYSCzHV/`)
    3. `আমার তো জান্নাতে যাওয়া উদ্দেশ্য | Noman Visuals` (`https://www.facebook.com/share/v/14tbBerDfhX/`)
    4. `After Effects Basic Motion | Noman Visuals` (`https://www.facebook.com/share/v/1dpxHiLsvR/`)
  - [x] Confirmed the 4 authentic graphic design works from user's links are prominently featured:
    5. `Commercial Product Visual Design` (`https://www.facebook.com/share/p/1CQ8Af1gwo/`)
    6. `Creative Lettering & Typography Art` (`https://www.facebook.com/share/p/1A1T5XwiDR/`)
    7. `Commercial Brand Mockup Presentation` (`https://www.facebook.com/share/p/1V1bghe2Ws/`)
    8. `As-Sunnah SDI Batch 41 Project Design` (`https://www.facebook.com/share/p/1Edo69B3UJ/`)
  - [x] Dynamic counter automatically reflects: `WORKS: Video Editing (4) | Graphic Design (13)`.
  - [x] Bumped `STORAGE_KEY` to `noman_portfolio_items_v4` in `App.jsx` with automatic purge of `v3`, `v2`, `v1`.
  - [x] Unit test suite updated (`tests/site.test.js`) and all 8 tests pass (`npm test`).
  - [x] Production build clean (`vite build`).

- [x] **Phase 22: Complete Removal of 9 Placeholder Graphic Artworks (Clean 8-Item Portfolio)**:
  - [x] Removed all 9 old placeholder graphics identified in user screenshot:
    - `graphic-hassan-artboard-1` (Commercial Product & Brand Visual Campaign)
    - `graphic-hassan-artboard-2` (Creative Brand Visual & Commercial Campaign Artwork)
    - `graphic-hassan-headphone` (Wireless Headphone Commercial Product Ad)
    - `graphic-hassan-biryani` (Spicy Biryani Social Media Campaign)
    - `graphic-hassan-umrah` (Umrah Package Islamic Travel Flyer & Banner)
    - `graphic-hassan-laptop` (Laptop Mega Sale Promotional Banner)
    - `graphic-hassan-typo` (Creative Bengali & Arabic Typography Poster)
    - `graphic-hassan-laravel` (Laravel Creative Framework & Web Design)
    - `graphic-hassan-brand` (Brand Identity & Visual Style Guide)
  - [x] Retained exclusively the 8 authentic projects by Md. Eftekar Hossen Noman (4 Facebook videos + 4 Facebook graphic designs).
  - [x] Dynamic counter automatically reflects: `WORKS: Video Editing (4) | Graphic Design (4)`.
  - [x] Bumped `STORAGE_KEY` to `noman_portfolio_items_v5` with auto-purge of `v4`, `v3`, `v2`, `v1`.
  - [x] Unit test suite updated (`tests/site.test.js`) and all 8 tests pass (`npm test`).
  - [x] Production build verified (`npm run build`).

- [x] **Phase 23: Direct Home Page Admin Controls & 1-Click Card Deletion (Spec-Driven Solution)**:
  - [x] **Direct Card Deletion**: When logged in as Admin, a prominent red `[ 🗑️ মুছুন ]` button appears on every video and graphic card on the homepage (in both Grid & 3D Coverflow slider).
  - [x] **Direct Modal Deletion**: Inside `MediaDetailModal`, an inline `[ 🗑️ প্রজেক্ট মুছুন (Admin) ]` button is rendered in both the top bar and next to the external link, allowing 1-click deletion while previewing any accidentally added project.
  - [x] **Active Admin Status Bar on `#projects`**: When authenticated, displays `[ 🛡️ অ্যাডমিন মোড সক্রিয় ] [ ⚙️ CMS ড্যাশবোর্ড ] [ + ভিডিও যোগ ] [ + গ্রাফিক্স যোগ ] [ 🚪 লগআউট ]`.
  - [x] **Clear Public Action Buttons**: When not logged in, displays `[ 🛡️ অ্যাডমিন স্টুডিও (Login) ]`, `[ + ভিডিও যোগ করুন ]`, and `[ + গ্রাফিক্স যোগ করুন ]`.
  - [x] Password remains default `noman@admin2026`.
  - [x] Tested and verified 8/8 unit tests passing (`npm test`) and production build passing (`npm run build`).
  - [x] Pushed to GitHub `main` (`7fa7c3b`) and deployed live to GitHub Pages `gh-pages` (`https://noman122vca.github.io/portfolio/`).

- [x] **Phase 27: Official As-Sunnah Logo Installation & AI Button Removal (US8)**:
  - [x] **Official Logo Installed**: Installed authentic As-Sunnah Skill Development Institute logo (`public/as-sunnah-logo.png` and `public/as-sunnah-logo.jpg`) from user image. Fixed relative path `src="./as-sunnah-logo.png"` in `SkillsAndTraining.jsx` resolving live 404 broken image.
  - [x] **Logo Badge Aesthetics**: Nested the official logo inside a clean `bg-white p-2 rounded-2xl border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]` container for high contrast and pixel-perfect framing.
  - [x] **AI Sparkles Button Removed**: Removed the `WHAT I DO & EXPERTISE` badge and its `Sparkles` (AI) icon from `SkillsAndTraining.jsx`. The section heading now opens cleanly with the bold `MY SKILLS & EXPERTISE` title.
  - [x] **Visual Verification**: Captured headless Chrome screenshot `skills_section_verified.png` confirming pristine rendering.
  - [x] **Testing & Build**: All 9 unit tests pass (`npm test`) and `npm run build` succeeds cleanly.

## Pending Tasks
- [ ] User 1-click Firestore database activation in Firebase Console (Test mode) whenever client wants global multi-device sync.




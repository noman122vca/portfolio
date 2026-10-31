# Hassan Mahmud Portfolio - Data Models & Schema Contracts

This document contains the complete TypeScript interface definitions and schema contracts reverse engineered from the site.

---

## 1. Portfolio Item Schema
```typescript
export type MediaType = 'video' | 'graphic';
export type VideoFormat = 'landscape' | 'reel';
export type PortfolioCategory = 'Video Editing' | 'Graphic Design' | 'Social Media' | 'Branding';

export interface PortfolioItem {
  id: string;                         // e.g. "video-hassan-1" or "graphic-hassan-biryani"
  title: string;                      // Display title
  category: PortfolioCategory;        // Filtering category
  mediaType: MediaType;               // 'video' | 'graphic'
  videoFormat?: VideoFormat;          // 'landscape' | 'reel' (only for video)
  thumbnailUrl: string;               // Local path or YouTube / Unsplash thumbnail URL
  mediaUrl: string;                   // Local high-res path or YouTube / external link
  description: string;                // Detailed project synopsis
  tags: string[];                     // Technology & theme badges (e.g. ["Photoshop", "Meta Ads"])
  dateAdded: string;                  // e.g. "2026"
  isHighlighted: boolean;             // True if pinned / featured
}
```

---

## 2. Personal Profile Schema
```typescript
export interface ProfileData {
  name: string;                       // "Hassan Mahmud"
  officialName: string;               // "Mohammad Hasan"
  title: string;                      // "Graphic Designer, Video Editor & Digital Marketer"
  badge: string;                      // "GRAPHIC DESIGNER & VIDEO EDITOR"
  tagline: string;                    // "I CREATE. I DESIGN. I BUILD VISUAL EXPERIENCES."
  bioSummary: string;
  aboutQuote: string;
  aboutParagraphs: string[];
  avatarUrl: string;                  // "/hassan-avatar-v2.png"
  avatarJpg: string;
  avatarFull: string;
  avatarFallback: string;
  avatarExternal: string;             // External mirror
  email: string;                      // "hassanmahmud.info@gmail.com"
  phone: string;                      // "+8801310-768690"
  address: string;                    // "House-364, Satarkul Road, Uttar Badda, Dhaka-1212"
  whatsapp: string;
  whatsappUsername: string;
  whatsappLink: string;               // "https://wa.me/8801310768690"
  youtube: string;
  youtubeLink: string;
  resumeUrl: string;                  // "/hassan-mahmud-cv.pdf"
}
```

---

## 3. Curriculum Vitae (CV) Schema
```typescript
export interface EducationEntry {
  degree: string;                     // "Fazil Degree" | "Higher Secondary School Certificate (Alim)"
  institute: string;                  // "Islamic Arabic University Dhaka" | "Sonagazi Kamil Madrasha"
  status?: string;                    // "Ongoing"
  year?: string;                      // "2023"
  group?: string;                     // "General"
  gpa?: string;                       // "3.79"
}

export interface CoreCompetency {
  domain: string;                     // e.g. "Video Editing", "Graphic Design", "Digital Marketing"
  details: string;
}

export interface ProfessionalTraining {
  course: string;                     // "Small Business Management Course"
  institute: string;                  // "As-Sunnah Skill Development Institute"
  duration: string;                   // "3 Months"
  keyAreas: string;
}

export interface ReferenceEntry {
  name: string;
  designation: string;
  institute: string;
  mobile: string;
  email: string;
}

export interface CVData {
  fullName: string;
  displayName: string;
  email: string;
  phone: string;
  address: string;
  behance: string;
  careerObjective: string;
  education: EducationEntry[];
  coreCompetencies: CoreCompetency[];
  interpersonalSkills: string[];
  professionalTraining: ProfessionalTraining;
  references: ReferenceEntry[];
  pdfDownloadUrl: string;
}
```

---

## 4. Institutional Training & Certification Schema
```typescript
export interface TrainingCompetency {
  id: string;
  title: string;
  tools: string;
}

export interface AsSunnahData {
  sectionTitle: string;
  institute: string;
  batch: string;                      // "Batch 37"
  courseTag: string;                  // "SBMC Course"
  statusTag: string;                  // "Certified"
  headline: string;
  description: string;
  competenciesTitle: string;
  competencies: TrainingCompetency[];
  experienceTag: string;
  readinessTag: string;
}

export interface NSDAData {
  sectionTitle: string;
  institute: string;                  // "National Skills Development Authority (NSDA)"
  subTitle: string;
  batch: string;                      // "NSDC Level 3 CBT&A Competent"
  badge: string;                      // "★ Govt. Certified in Digital Marketing (Level 3)"
  description: string;
  logo: string;                       // "/nsda-logo.svg"
  competencies: TrainingCompetency[];
}
```

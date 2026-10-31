# Spec & Execution Plan: Client Profile Customization & Remote GitHub Deployment

## 1. Executive Summary & Goals
- **Objective 1 (Customization)**: Transform the current reverse-engineered portfolio into a fully personalized portfolio for the user's friend (Images, WhatsApp link, YouTube link, Facebook link, GitHub link, Email, Phone, Project artworks, and Bio).
- **Objective 2 (Remote GitHub Push without Local Account Login)**: Safely authenticate and push the codebase to the friend's GitHub account from this PC without logging out or disturbing existing developer Git credentials, adhering to modern GitHub Personal Access Token (PAT) requirements.
- **Objective 3 (Live Deployment)**: Host the site live on GitHub Pages (with automated CI/CD via GitHub Actions) or Vercel with zero 404 path breakages.

---

## 2. Part 1: Complete Customization Guide (কোন ফাইলে কী চেঞ্জ করবেন)

### A. Central Profile Data (`src/data/profileData.js`)
All primary personal info, contact numbers, and social links are centralized in a single file: [`src/data/profileData.js`](file:///home/emran/Downloads/iftekar_profile/src/data/profileData.js).

```javascript
export const profileData = {
  // ১. নাম ও উপাধি
  "name": "Friend Full Name",                   // ওয়েবসাইটে প্রদর্শিত নাম
  "officialName": "Official NID / Passport Name",// সার্টিফিকেট / অফিসিয়াল নাম
  "title": "Software Engineer & Frontend Dev",  // পেশাগত টাইটেল
  "badge": "FRONTEND DEVELOPER & UI DESIGNER",  // হিরো সেকশনের ব্যাজ
  "tagline": "I BUILD. I DESIGN. I SCALE DIGITAL EXPERIENCES.",

  // ২. বায়ো ও পরিচিতি
  "bioSummary": "আপনার ফ্রেন্ডের সম্পর্কে ৩-৪ লাইনের সংক্ষিপ্ত বিবরণ...",
  "aboutQuote": "আপনার ফ্রেন্ডের প্রিয় মোটিভেশনাল কোট বা স্টেটমেন্ট...",
  "aboutParagraphs": [
    "প্রথম প্যারাগ্রাফ: ব্যাকগ্রাউন্ড, অভিজ্ঞতা এবং প্যাশন...",
    "দ্বিতীয় প্যারাগ্রাফ: ব্যবহৃত টেকনোলজি, ট্রেনিং এবং অর্জন..."
  ],

  // ৩. ছবি ও সিভি (public/ ফোল্ডারে ফাইল রেখে লিঙ্ক দেওয়া)
  "avatarUrl": "/friend-avatar.png",            // ফ্রেন্ডের প্রোফাইল ছবি
  "resumeUrl": "/friend-resume.pdf",            // ফ্রেন্ডের সিভি PDF

  // ৪. সরাসরি যোগাযোগের তথ্য
  "email": "friend.email@gmail.com",
  "phone": "+8801XXXXXXXXX",
  "address": "Dhaka, Bangladesh",

  // ৫. সোশ্যাল মিডিয়া ও প্রজেক্ট লিঙ্কসমূহ
  "whatsapp": "+8801XXXXXXXXX",
  "whatsappLink": "https://wa.me/8801XXXXXXXXX",// হোয়াটসঅ্যাপ সরাসরি মেসেজ লিংক
  "youtube": "@FriendChannel",
  "youtubeLink": "https://www.youtube.com/@FriendChannel",
  "facebook": "@friend.fb",
  "facebookLink": "https://www.facebook.com/friend.fb",
  "instagram": "@friend.ig",
  "instagramLink": "https://www.instagram.com/friend.ig",
  "linkedin": "Friend Full Name",
  "linkedinLink": "https://www.linkedin.com/in/friend-profile",
  "behance": "friend-behance",
  "behanceLink": "https://www.behance.net/friend-behance",
  "github": "@friend-github",
  "githubLink": "https://github.com/friend-github" // গিটহাব প্রোফাইল লিঙ্ক
};
```

---

### B. মিডিয়া ও অ্যাসেট রিপ্লেসমেন্ট (`public/` ডিরেক্টরি)
যে ফাইলগুলো `public/` ফোল্ডারে রিপ্লেস করবেন:

| সম্পদ (Asset) | ফাইল লোকেশন (File Path) | বিবরণ ও সাইজ রিকমেন্ডেশন |
| :--- | :--- | :--- |
| **প্রোফাইল ছবি (Avatar)** | `public/hassan-avatar-v2.png` (অথবা নতুন নামে `public/friend-avatar.png`) | ট্রান্সপারেন্ট PNG বা ক্লিন স্কয়ার 1:1 রেশিও (ন্যূনতম 800x800px)। এটি ৩ডি অরবিটে ঘুরবে। |
| **সিভি / রেজুমে (CV)** | `public/hassan-mahmud-cv.pdf` (বা `public/friend-cv.pdf`) | ফ্রেন্ডের আসল PDF রিজিউমে। |
| **পোর্টফোলিও ইমেজসমূহ** | `public/portfolio/` | ফ্রেন্ডের ডিজাইন/ওয়েবসাইট প্রজেক্টের স্ক্রিনশট বা আর্টওয়ার্ক। |
| **ভিডিও থাম্বনেইল** | `public/external_assets/` | ফ্রেন্ডের ইউটিউব ভিডিওর কভার বা ভিডিও স্ক্রিনশট। |

---

### C. পোর্টফোলিও প্রজেক্টের লিস্ট (`src/data/portfolioData.js`)
ফ্রেন্ডের প্রজেক্টগুলো অ্যাড করতে [`src/data/portfolioData.js`](file:///home/emran/Downloads/iftekar_profile/src/data/portfolioData.js) ওপেন করুন:
- প্রতিটি প্রজেক্টে `title`, `description`, `category` (`video` বা `graphic`), `aspect` (`16:9` বা `9:16`), `youtubeUrl`, এবং `tags` পরিবর্তন করতে পারবেন।

---

### D. ব্রাউজার ট্যাব টাইটেল ও মেটা ট্যাগ (`index.html`)
[`index.html`](file:///home/emran/Downloads/iftekar_profile/index.html) ওপেন করে:
- `<title>` ট্যাগে ফ্রেন্ডের নাম দিন: `<title>Friend Name - Portfolio</title>`
- `<meta name="author" content="Friend Name">`
- `<meta property="og:title" content="...">`

---

## 3. Part 2: গিটহাব পুশ ও রিমোট অথেনটিকেশন গাইড

### গিটহাবের সিকিউরিটি রুল:
> ⚠️ **মনে রাখবেন**: ২০২১ সালের আগস্ট থেকে গিটহাব টার্মিনালে একাউন্ট পাসওয়ার্ড গ্রহণ করে না। পাসওয়ার্ড দিলে গিটহাব রিজেক্ট করবে। এর পরিবর্তে **Personal Access Token (PAT)** ব্যবহার করতে হয়।

### ধাপ ১: ফ্রেন্ডের গিটহাবে টোকেন ও রিপোজিটরি তৈরি (৩ মিনিটের কাজ)
1. যে কোনো ব্রাউজারে (বা একটি Incognito উইন্ডোতে) ফ্রেন্ডের GitHub-এ ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করুন: [github.com/login](https://github.com/login)।
2. একটি নতুন রিপোজিটরি তৈরি করুন:
   - উপরে ডানে **`+`** আইকন -> **New repository**
   - Repository name: ধরুন `portfolio` বা `my-profile`
   - পাবলিক রাখুন (**Public** সিলেক্ট করুন)
   - "Add a README file" বা অন্য কিছুতে টিক দেওয়ার দরকার নেই (খালি রিপো তৈরি করুন)।
   - **Create repository** বাটনে চাপ দিন।
3. এবার একটি **Personal Access Token (PAT)** তৈরি করুন:
   - ফ্রেন্ডের প্রোফাইল আইকন (ডানদিকের কোনায়) -> **Settings**
   - বাম পাশের মেনুর একদম নিচে চলে যান -> **Developer settings**
   - **Personal access tokens** -> **Tokens (classic)**
   - **Generate new token** -> **Generate new token (classic)**
   - Note ফিল্ডে নাম লিখুন: `portfolio-deploy-token`
   - Expiration: `No expiration` বা `30 days`
   - Scopes-এ শুধু নিচের ২টি অপশনে টিক দিন:
     - `[x] repo` (Full control of private repositories)
     - `[x] workflow` (Update GitHub Action workflows)
   - নিচে স্ক্রল করে সবুজ রঙের **Generate token** বাটনে ক্লিক করুন।
   - **টোকেনটি কপি করে নিন** (এটি দেখতে এমন হবে: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)। *সাবধান: পেজ রিফ্রেশ দিলে এটি আর দেখা যাবে না, তাই সেভ করে রাখুন।*

---

### ধাপ ২: টার্মিনাল থেকে পুশ করার কমান্ড (১০০% ক্লিন)

আপনার লোকাল পিসির গিট কনফিগারেশন নষ্ট না করে সরাসরি ফ্রেন্ডের গিটহাবে পুশ করার জন্য নিচের কমান্ডগুলো আপনার টার্মিনালে রান করুন:

```bash
# ১. প্রজেক্ট ফোল্ডারে প্রবেশ (যদি এখনো না থাকেন)
cd /home/emran/Downloads/iftekar_profile

# ২. গিট রিপোজিটরি ইনিশিয়ালাইজ করুন
git init

# ৩. ফ্রেন্ডের আইডেন্টিটি সেট করুন (শুধু এই প্রজেক্টের জন্য)
git config user.name "Friend GitHub Username"
git config user.email "friend-email@example.com"

# ৪. মেইন ব্রাঞ্চ সিলেক্ট করুন
git branch -M main

# ৫. সমস্ত ফাইল স্টেজিংয়ে যোগ করুন এবং কমিট করুন
git add .
git commit -m "feat: initial release of customized personal portfolio"

# ৬. ফ্রেন্ডের টোকেন সহ রিমোট অরিজিন অ্যাড করুন
# ফরম্যাট: https://<TOKEN>@github.com/<USERNAME>/<REPO_NAME>.git
git remote add origin https://ghp_YOUR_COPIED_TOKEN_HERE@github.com/friend-username/portfolio.git

# ৭. কোড পুশ করে দিন!
git push -u origin main
```
> 💡 **নোট**: রিমোট URL-এর ভেতরে `https://<TOKEN>@github.com/...` দিলে টার্মিনাল আপনার কাছে কোনো ইউজারনেম বা পাসওয়ার্ড চাইবে না, সরাসরি অটোমেটিক পুশ হয়ে যাবে!

---

## 4. Part 3: ওয়েবসাইট লাইভ করা (Live Deployment)

### অপশন ১: GitHub Pages দিয়ে ফ্রি লাইভ করা (স্বয়ংক্রিয় CI/CD)
আমরা অলরেডি আপনার প্রজেক্টে [`.github/workflows/deploy.yml`](file:///home/emran/Downloads/iftekar_profile/.github/workflows/deploy.yml) এবং [`vite.config.js`](file:///home/emran/Downloads/iftekar_profile/vite.config.js)-এ রিলেটিভ পাথ কনফিগার করে দিয়েছি।

পুশ করার পর শুধু একবার গিটহাবে গিয়ে এটি অন করে দিন:
1. ফ্রেন্ডের GitHub রিপোজিটরিতে যান (যেমন: `github.com/friend-username/portfolio`)।
2. উপরে **Settings** ট্যাবে যান।
3. বাম পাশের মেনু থেকে **Pages**-এ ক্লিক করুন।
4. **Build and deployment** সেকশনের নিচে **Source** ড্রপডাউনে:
   - সিলেক্ট করুন: **`GitHub Actions`**।
5. ব্যস! আর কিছু করতে হবে না। ১ মিনিটের মধ্যে GitHub Actions স্বয়ংক্রিয়ভাবে প্রজেক্ট বিল্ড করে লাইভ করে দেবে।
6. **লাইভ ওয়েবসাইটের লিংক হবে**:
   👉 `https://friend-username.github.io/portfolio/`

---

### অপশন ২: Vercel দিয়ে লাইভ করা (আরও ফাস্ট & নো-কনফিগ)
অরিজিনাল সাইটটিও Vercel-এ হোস্ট করা ছিল:
1. ব্রাউজারে [vercel.com](https://vercel.com)-এ যান।
2. "Continue with GitHub" দিয়ে ফ্রেন্ডের GitHub অ্যাকাউন্ট দিয়ে ১-ক্লিকে লগইন করুন।
3. **Add New...** -> **Project** -> তৈরি করা `portfolio` রিপোজিটরিটি সিলেক্ট করে **Deploy** বাটনে ক্লিক করুন।
4. ১ মিনিটের মধ্যে Vercel লাইভ লিংক দেবে:
   👉 `https://friend-name-portfolio.vercel.app` (অথবা ফ্রেন্ড চাইলে নিজস্ব ডটকম ডোমেইনও ফ্রিতে কানেক্ট করতে পারবে)।

# Hassan Mahmud Portfolio - Backend, Database & Persistence Architecture

This document provides a forensic analysis of how data, backend operations, database state, and network communication operate within `https://hassan-mahmud.vercel.app/`.

---

## 1. Executive Forensic Summary
| Dimension | Findings | Production Status |
| :--- | :--- | :--- |
| **Backend Server** | None (Static Jamstack on Vercel Edge CDN) | Active |
| **Database** | Browser `localStorage` (Namespace: `hassan_portfolio_items_v18`) | Active |
| **API Endpoints** | None (Zero server-side REST/GraphQL calls) | Verified |
| **Contact Form** | Client-side interactive simulation (800ms async timer) + Direct WhatsApp / Email links | Active |
| **Audio Processing** | Client-side Web Speech API (`window.speechSynthesis`) | Active |
| **Hosting Platform** | Vercel Edge (`bom1::...` Mumbai point-of-presence) | Active |

---

## 2. Database & State Persistence (`localStorage`)

### Key Namespaces
1. **`hassan_portfolio_items_v18`**:
   - Stores the serialized JSON array of portfolio projects.
   - Initialized with 14 default items (6 video projects, 8 graphic designs).
   - If user adds or deletes items via the in-browser modals, this key reflects the changes.
2. **`hassan_portfolio_lang`**:
   - Stores `'en'` or `'bn'`.
   - Defaults to `'en'`.
3. **Migration Routine**:
   - Upon mounting, the application iterates from `1` to `17` and executes:
     ```javascript
     for (let e = 1; e <= 17; e++) {
       localStorage.removeItem(`hassan_portfolio_items_v${e}`);
     }
     ```
   - This ensures schema breaking changes between versions are cleanly pruned without corrupting the active v18 data model.

---

## 3. Contact Form & Lead Generation Flow

The contact form is designed for zero-maintenance hosting while providing full user satisfaction:
1. **Input Validation**: `name`, `email`, and `message` are marked `required` with HTML5 validation.
2. **Interactive Submission**:
   - `e.preventDefault()` prevents standard form submission.
   - `isSubmitting` state triggers a loading spinner for `800ms`.
   - `isSubmitted` state displays an animated green checkmark confirmation banner:
     - English: *"Thank you for reaching out! Hassan Mahmud has received your message and will get back to you shortly."*
     - Bengali: *"ধন্যবাদ। হাসান মাহমুদ আপনার বার্তাটি দেখে অতি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।"*
   - Auto-resets after `5000ms`.
3. **Direct Contact Fallback**:
   - WhatsApp CTA: `https://wa.me/8801310768690` opens direct chat with pre-filled greeting.
   - Mailto link: `mailto:hassanmahmud.info@gmail.com`.
   - Telephone: `tel:+8801310768690`.

### Backend Upgrade Options (If desired in future)
If you wish to connect a real backend database or email dispatch service, the following zero-config adapters can be dropped in:
- **Resend**: `await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(formData) })`
- **EmailJS**: `emailjs.send(serviceId, templateId, formRef.current, publicKey)`
- **Supabase**: `supabase.from('leads').insert([formData])`
- **Web3Forms / Formspree**: Direct POST endpoint in `<form action="...">`

---

## 4. Video Embed & Streaming Architecture
Rather than hosting heavy video files on Vercel (which would incur bandwidth costs and video transcoding complexities), the architecture delegates streaming to:
1. **YouTube Embedded Player**:
   - Regular landscape videos: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
   - Vertical Shorts: Parsed through regex `/shorts/([a-zA-Z0-9_-]{11})/`
2. **Vimeo Player**:
   - `https://player.vimeo.com/video/${id}?autoplay=1`
3. **Google Drive Video Preview**:
   - `https://drive.google.com/file/d/${id}/preview`
4. **Direct MP4/WebM Fallback**:
   - Standard HTML5 `<video controls autoplay>` container.

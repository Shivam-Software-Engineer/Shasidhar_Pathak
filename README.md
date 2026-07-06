# Shashidhar Pathak — Portfolio Website

A **dark professional** single-page portfolio built with **HTML + Tailwind (CDN) + Vanilla JS + AOS animations**.

## 📂 File Structure

```
portfolio/
├── index.html           ← Main page (edit content here)
├── css/
│   └── style.css        ← Custom styles (colors, layout)
├── js/
│   └── main.js          ← AOS init, counters, contact form
├── assets/
│   ├── resume.pdf       ← 🔴 REPLACE with real resume PDF
│   └── profile.jpg      ← (optional) uncle's photo
└── README.md
```

## 🚀 How to Run Locally

**Option 1 – double-click**  
Just open `index.html` in any modern browser. Everything works from CDN.

**Option 2 – any static server** (recommended for `mailto:` + fonts):
```bash
cd portfolio
python3 -m http.server 8080
# then open  http://localhost:8080
```

Or use VS Code's **Live Server** extension → right-click `index.html` → *Open with Live Server*.

## ✏️ What to Change

### 1. Replace fake contact details
Search & replace across `index.html` and `js/main.js`:
- `shashidhar.pathak@example.com` → real email
- `+91 99999 99999` → real phone
- Social links (`#`) in the contact section — LinkedIn, WhatsApp, Instagram URLs

### 2. Add real profile photo
Replace the hero image URL in `index.html` (search for `unsplash.com/photo-1581094794329`) with the path to a local photo, e.g. `assets/profile.jpg`.

### 3. Drop in the resume PDF
Put uncle's resume as **`assets/resume.pdf`** — both the navbar & hero "Download CV" buttons already point to that path.

## 📧 Setting Up Real Email Sending (EmailJS – Free)

The contact form currently opens the user's email client (`mailto:` fallback).  
To send real emails **from the website itself**, use EmailJS (free tier = 200 emails/month, no backend needed):

1. **Sign up** → https://www.emailjs.com
2. **Add an Email Service** (Gmail / Outlook / your provider) — follow their wizard.
3. **Create an Email Template** — paste these variables into the template body:
   ```
   From: {{from_name}} <{{reply_to}}>
   Phone: {{phone}}
   Subject: {{subject}}

   {{message}}
   ```
4. From the EmailJS dashboard, copy:
   - **Public Key**
   - **Service ID**
   - **Template ID**
5. Open **`js/main.js`** and update the `EMAILJS_CONFIG` block:
   ```js
   const EMAILJS_CONFIG = {
     publicKey:  "xxxxxxxxxxx",
     serviceId:  "service_xxxx",
     templateId: "template_xxxx",
   };
   ```
6. **Un-comment** the init line just below the config:
   ```js
   if (window.emailjs) emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
   ```
7. Reload the site → the form will send real emails to your inbox.

### Alternative: Formspree (also free)
Replace `<form id="contactForm" ...>` action with:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
```
and remove the JS submit handler.

## 🎨 Design Tokens

Colors are defined in the Tailwind config block inside `index.html` (top of file):
- `base`      `#0a0f1c`   — page background
- `surface`   `#0f1626`   — cards / sections
- `brand`     `#d4b26a`   — gold accents
- `ink`       `#e7ecf5`   — primary text

Fonts (Google Fonts): **Playfair Display** for headings, **Manrope** for body, **IBM Plex Mono** for labels.

## 📱 Responsive

Fully responsive — tested from 360 px mobile up to 4K desktop.  
Mobile menu, stacked layouts and touch-friendly buttons all included.

## 🧩 Tech Used

- HTML5
- Tailwind CSS (CDN, no build step)
- AOS – Animate On Scroll
- Font Awesome 6 icons
- EmailJS (optional) for contact form
- Google Fonts

## 📸 Deployment

Static site — deploy anywhere:
- **GitHub Pages** (free): push the `portfolio/` folder → Settings → Pages
- **Netlify / Vercel**: drag-and-drop the folder
- **Firebase Hosting**, **Cloudflare Pages** — all free tiers work

---

Made with care for **Shashidhar Pathak** — Lead QA/QC · Civil Engineer.

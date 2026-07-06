/* ============================================
   Shashidhar Pathak — Portfolio JS
   AOS init · Navbar · Counters · Skill bars ·
   Mobile menu · Contact form (EmailJS + fallback)
   ============================================ */

/* ----- 1. AOS init ----- */
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
      easing: "ease-out-cubic",
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  initNavbar();
  initMobileMenu();
  initCounters();
  initSkillBars();
  initContactForm();
});

/* ----- 2. Navbar scroll state ----- */
function initNavbar() {
  const nav = document.getElementById("navbar");
  const toggle = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* ----- 3. Mobile menu ----- */
function initMobileMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    const open = !menu.classList.contains("hidden");
    btn.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.add("hidden");
      btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    })
  );
}

/* ----- 4. Number counters (once when hero visible) ----- */
function initCounters() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;

  const animate = (el) => {
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  nums.forEach((n) => io.observe(n));
}

/* ----- 5. Animate skill bars on scroll ----- */
function initSkillBars() {
  const bars = document.querySelectorAll(".bar > span");
  if (!bars.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = e.target.style.width;
          e.target.style.width = "0";
          requestAnimationFrame(() => {
            e.target.style.width = target;
          });
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.35 }
  );
  bars.forEach((b) => io.observe(b));
}

/* ============================================
   6. Contact form — EmailJS + mailto fallback
   --------------------------------------------
   TO ENABLE REAL EMAIL SENDING:
   1) Create a free account at  https://www.emailjs.com
   2) Create an Email Service + Email Template.
   3) Copy 3 keys from the EmailJS dashboard and
      paste them below, then replace the CONFIG.
   4) Un-comment the `emailjs.init(...)` line.

   Template variables you should use in EmailJS:
     {{from_name}}  {{reply_to}}  {{phone}}
     {{subject}}    {{message}}
   ============================================ */
const EMAILJS_CONFIG = {
  publicKey:  "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId:  "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
};

// If you fill above, uncomment:
// if (window.emailjs) emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });

function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const submitText = document.getElementById("submitText");
  const submitIcon = document.getElementById("submitIcon");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    // basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      setStatus("Please fill all required fields.", "err");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setStatus("Please enter a valid email address.", "err");
      return;
    }

    setBusy(true);
    setStatus("Sending your message…", "info");

    const canUseEmailJS =
      window.emailjs &&
      !EMAILJS_CONFIG.publicKey.startsWith("YOUR_") &&
      !EMAILJS_CONFIG.serviceId.startsWith("YOUR_") &&
      !EMAILJS_CONFIG.templateId.startsWith("YOUR_");

    try {
      if (canUseEmailJS) {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: data.name,
            reply_to: data.email,
            phone: data.phone || "—",
            subject: data.subject,
            message: data.message,
          },
          { publicKey: EMAILJS_CONFIG.publicKey }
        );
        setStatus("Message sent — I'll get back to you shortly.", "ok");
        form.reset();
      } else {
        // Fallback: open user's email client with prefilled details
        const to = "shashidhar.pathak@example.com"; // ← replace with real email
        const body =
          `Name: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Phone: ${data.phone || "—"}\n\n` +
          `${data.message}`;
        const url =
          "mailto:" +
          encodeURIComponent(to) +
          "?subject=" +
          encodeURIComponent(data.subject) +
          "&body=" +
          encodeURIComponent(body);
        window.location.href = url;
        setStatus(
          "EmailJS not configured — opening your email app instead.",
          "info"
        );
      }
    } catch (err) {
      console.error(err);
      setStatus(
        "Something went wrong. Please email directly at shashidhar.pathak@example.com",
        "err"
      );
    } finally {
      setBusy(false);
    }
  });

  function setBusy(busy) {
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = busy;
    submitText.textContent = busy ? "Sending…" : "Send Message";
    submitIcon.className = busy
      ? "fa-solid fa-spinner fa-spin"
      : "fa-solid fa-paper-plane group-hover:translate-x-1 transition-transform";
  }

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className =
      "text-sm " +
      (type === "ok"
        ? "text-emerald-400"
        : type === "err"
        ? "text-red-400"
        : "text-muted");
  }
}

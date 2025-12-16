/* ======================================
   Ink & Pixel Studio — Core Interactions
   Research-driven. Intentional. Clean.
====================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     1. STICKY NAV SCROLL STATE
  ========================= */

  const nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("nav-scrolled", window.scrollY > 40);
    });
  }

  /* =========================
     2. SMOOTH ANCHOR SCROLL
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* =========================
     3. SCROLL REVEAL (SAFE)
  ========================= */

  const revealItems = document.querySelectorAll(
    ".service-card, .step, .metrics div, .case p"
  );

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach(el => revealObserver.observe(el));

  /* =========================
     4. TRUST METRICS COUNTER
  ========================= */

  const counters = document.querySelectorAll("[data-count]");
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
      const target = Number(counter.dataset.count);
      let start = 0;
      const duration = 1400;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);

        if (progress < 1) requestAnimationFrame(tick);
        else counter.textContent = target;
      }

      requestAnimationFrame(tick);
    });
  }

  const proofSection = document.querySelector(".proof");
  if (proofSection) {
    const counterObserver = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    counterObserver.observe(proofSection);
  }

  /* =========================
     5. CTA DIMMING ON AUDIT
  ========================= */

  const auditSection = document.querySelector("#audit");
  const heroCTA = document.querySelector(".hero-cta");

  if (auditSection && heroCTA) {
    const auditObserver = new IntersectionObserver(
      entries => {
        heroCTA.classList.toggle("cta-dim", entries[0].isIntersecting);
      },
      { threshold: 0.4 }
    );

    auditObserver.observe(auditSection);
  }

  /* =========================
     6. EXIT INTENT (SOFT)
  ========================= */

  let exitShown = false;

  document.addEventListener("mouseout", e => {
    if (exitShown || e.clientY > 0) return;
    exitShown = true;
    showExitPrompt();
  });

  function showExitPrompt() {
    const el = document.createElement("div");
    el.className = "exit-message";
    el.innerHTML = `
      <p><strong>Before you go</strong><br>
      If your idea matters, don’t leave clarity on the table.</p>
      <a href="#audit" class="btn-primary">Request Free Audit</a>
    `;
    document.body.appendChild(el);

    requestAnimationFrame(() => el.classList.add("visible"));

    setTimeout(() => el.remove(), 10000);
  }

  /* =========================
     7. BUTTON PRESS FEEDBACK
  ========================= */

  document.querySelectorAll(".btn-primary, .btn-secondary").forEach(btn => {
    btn.addEventListener("pointerdown", () => {
      btn.style.transform = "scale(0.97)";
    });

    btn.addEventListener("pointerup", reset);
    btn.addEventListener("pointerleave", reset);

    function reset() {
      btn.style.transform = "";
    }
  });

});

/* ======================================
   Ink & Pixel Studio — Core Interactions
   Research-driven. Intentional. Clean.
====================================== */

/* =========================
   TRUST METRICS COUNTER
========================= */

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute("data-count"), 10);
    let current = 0;
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      current = Math.floor(eased * target);
      counter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
}

/* =========================
   SERVICE EXPLORER
========================= */

const serviceButtons = document.querySelectorAll(".service-list button");
const servicePanels = document.querySelectorAll(".service-panel");

serviceButtons.forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.service;

    serviceButtons.forEach(btn => btn.classList.remove("active"));
    servicePanels.forEach(panel => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(targetId).classList.add("active");
  });
});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  ".service-panel, .step, .testimonial"
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px"
  }
);

revealElements.forEach(el => revealObserver.observe(el));

/* =========================
   COUNTER VISIBILITY TRIGGER
========================= */

const metricsSection = document.querySelector(".trust-metrics");

const metricsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        metricsObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);

if (metricsSection) {
  metricsObserver.observe(metricsSection);
}

/* =========================
   BUTTON PRESS FEEDBACK
========================= */

const interactiveButtons = document.querySelectorAll(
  ".btn-primary, .btn-secondary, .btn-outline"
);

interactiveButtons.forEach(btn => {
  btn.addEventListener("mousedown", () => {
    btn.style.transform = "scale(0.97)";
  });

  btn.addEventListener("mouseup", () => {
    btn.style.transform = "";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});

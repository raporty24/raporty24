console.log("site.js loaded");

function registerApp(Alpine) {
  Alpine.data("app", () => ({
    // ========================
    // UI
    // ========================
    panel: "analytics",
    menuOpen: false,

    // ========================
    // NAV active section (scroll spy)
    // ========================
    activeSection: "hero",

    // ========================
    // TikTok floating widget
    // ========================
    tiktokOpen: false,
    tiktokLoaded: false,

    toggleTikTok() {
      this.tiktokOpen = !this.tiktokOpen;
      if (this.tiktokOpen) this.loadTikTok();
    },

    closeTikTok() {
      this.tiktokOpen = false;
    },

    loadTikTok() {
      if (this.tiktokLoaded) return;
      this.tiktokLoaded = true;

      // Doładuj embed.js tylko raz (dopiero gdy użytkownik otworzy widget)
      const s = document.createElement("script");
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    },

    // ========================
    // DEMO
    // ========================
    showDemo: false,
    currentDemo: 0,
    dashboards: [
      { title: "Dashboard Magazyn & Sprzedaż", file: "/dashboard1.html", img: "/dash1.webp" },
      { title: "Dashboard Sprzedaż eCommerce", file: "/dashboard2.html", img: "/dash2.webp" },
    ],

    openDemo(i = 0) {
      // żeby nic się nie nakładało wizualnie
      this.closeTikTok();

      this.currentDemo = i;
      this.showDemo = true;

      // blokada scrolla przy modalu
      document.documentElement.style.overflow = "hidden";
    },

    closeDemo() {
      this.showDemo = false;
      document.documentElement.style.overflow = "";
    },

    get demoSrc() {
      return this.dashboards?.[this.currentDemo]?.file || "";
    },

    // ========================
    // Panels (jeśli jeszcze używasz przełączania)
    // ========================
    get panelIndex() {
      const map = { analytics: 0, reporting: 1, optimization: 2, maleFirmy: 3 };
      return map[this.panel] ?? 0;
    },

    nextPanel() {
      const order = ["analytics", "reporting", "optimization", "maleFirmy"];
      const i = this.panelIndex;
      this.panel = order[(i + 1) % order.length];
    },

    prevPanel() {
      const order = ["analytics", "reporting", "optimization", "maleFirmy"];
      const i = this.panelIndex;
      this.panel = order[(i - 1 + order.length) % order.length];
    },

    // ========================
    // INIT
    // ========================
    init() {
      console.log("app init()", {
        panel: this.panel,
        dashboards: this.dashboards.length,
      });

      this.initActiveNav();
    },

    // ========================
    // ACTIVE NAV (pewne 100% - bez IntersectionObserver)
    // ========================
    initActiveNav() {
      const ids = [
        "hero",
        "oferta",
        "technologie",
        "demo-section",
        "cennik",
        "abonament",
        "dlaczego",
        "kontakt",
      ];

      const headerEl = document.querySelector("header.sticky");
      const getHeaderOffset = () =>
        headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 80;

      const applyActive = (id) => {
        this.activeSection = id;

        const links = document.querySelectorAll(
          'a.menu-link[href^="#"], a.mobile-menu-link[href^="#"]'
        );

        links.forEach((a) => {
          const href = a.getAttribute("href") || "";
          if (!href.startsWith("#")) return;
          const target = href.slice(1);
          a.classList.toggle("active", target === id);
        });
      };

      const getTopAbs = (el) => el.getBoundingClientRect().top + window.scrollY;

      const getSections = () =>
        ids
          .map((id) => document.getElementById(id))
          .filter(Boolean)
          .map((el) => ({ id: el.id, el }));

      let ticking = false;

      const onScroll = () => {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
          const sections = getSections();
          if (!sections.length) {
            ticking = false;
            return;
          }

          const headerOffset = getHeaderOffset();
          const markerY = window.scrollY + headerOffset + 120;

          const sorted = sections
            .map((s) => ({ ...s, top: getTopAbs(s.el) }))
            .sort((a, b) => a.top - b.top);

          let currentId = sorted[0].id;
          for (const s of sorted) {
            if (s.top <= markerY) currentId = s.id;
            else break;
          }

          applyActive(currentId);
          ticking = false;
        });
      };

      // Startowo ustaw aktywną sekcję
      if (location.hash) {
        const initial = location.hash.slice(1);
        if (document.getElementById(initial)) applyActive(initial);
        else applyActive("hero");
      } else {
        applyActive("hero");
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      window.addEventListener("hashchange", () => {
        const id = location.hash.slice(1);
        if (id && document.getElementById(id)) applyActive(id);
      });

      // Odpal po starcie i po pełnym load (obrazy/fonty potrafią przesunąć sekcje)
      onScroll();
      window.addEventListener("load", onScroll);
    },
  }));
}

// "kuloodporne" podpięcie: działa niezależnie od kolejności scriptów
if (window.Alpine) {
  registerApp(window.Alpine);
} else {
  document.addEventListener("alpine:init", () => {
    console.log("alpine:init fired");
    registerApp(window.Alpine);
  });
}

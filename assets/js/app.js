(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const loader = $("[data-loader]");
  const loaderBar = $("[data-loader-bar]");
  const loaderCount = $("[data-loader-count]");

  if (loader) {
    let progress = 0;
    const step = () => {
      progress = Math.min(progress + Math.ceil(Math.random() * 13), 100);
      if (loaderBar) loaderBar.style.transform = `scaleX(${progress / 100})`;
      if (loaderCount) loaderCount.textContent = `${String(progress).padStart(2, "0")}`;
      if (progress < 100) {
        window.setTimeout(step, reducedMotion ? 10 : 36 + Math.random() * 55);
      } else {
        window.setTimeout(() => loader.classList.add("is-done"), reducedMotion ? 0 : 180);
      }
    };
    step();
  }

  const header = $("[data-header]");
  const scrollProgress = $("[data-scroll-progress]");

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 24);
    if (scrollProgress) {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? y / height : 0;
      scrollProgress.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const menuButton = $("[data-menu-toggle]");
  const nav = $("[data-nav]");

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  };

  menuButton?.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const transition = $("[data-page-transition]");
  $$('a[href$=".html"], a[href="./"], a[href="/"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      const url = new URL(link.href, window.location.href);
      const samePage = url.pathname === window.location.pathname;
      const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (!href || modified || link.target === "_blank" || samePage || url.origin !== window.location.origin) return;
      event.preventDefault();
      if (reducedMotion || !transition) {
        window.location.href = url.href;
        return;
      }
      transition.classList.add("is-leaving");
      window.setTimeout(() => { window.location.href = url.href; }, 560);
    });
  });

  if (finePointer && !reducedMotion) {
    const dot = $("[data-cursor-dot]");
    const ring = $("[data-cursor-ring]");
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener("pointermove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (dot && ring) {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    }, { passive: true });

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      if (dot) dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      if (ring) ring.style.transform = `translate3d(${ringX - 19}px, ${ringY - 19}px, 0)`;
      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    $$('a, button, input, select, textarea, [data-tilt]').forEach((element) => {
      element.addEventListener("pointerenter", () => ring?.classList.add("is-active"));
      element.addEventListener("pointerleave", () => ring?.classList.remove("is-active"));
    });
  }

  const revealElements = $$('[data-reveal]');
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8%" });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  if (!reducedMotion) {
    const parallaxItems = $$('[data-parallax]');
    let parallaxTicking = false;
    const updateParallax = () => {
      parallaxItems.forEach((element) => {
        const speed = Number(element.dataset.parallax || 0.08);
        const rect = element.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      parallaxTicking = false;
    };
    window.addEventListener("scroll", () => {
      if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
      }
    }, { passive: true });
    updateParallax();

    $$('[data-tilt]').forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1100px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "perspective(1100px) rotateX(0) rotateY(0) translateY(0)";
      });
    });

    $$('[data-magnetic]').forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });
      button.addEventListener("pointerleave", () => { button.style.transform = "translate(0, 0)"; });
    });
  }

  const filterButtons = $$('[data-filter]');
  const gameRows = $$('[data-category]');
  const emptyState = $("[data-empty-state]");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      const filter = button.dataset.filter;
      let visible = 0;
      gameRows.forEach((row) => {
        const show = filter === "all" || row.dataset.category?.split(" ").includes(filter);
        row.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      emptyState?.classList.toggle("is-visible", visible === 0);
    });
  });

  const gameData = {
    starfall: {
      title: "Starfall Drift",
      type: "Action adventure · In production",
      image: "assets/images/starfall-drift.webp",
      body: "Cross a moonlit salt world on a machine built from memory. Track impossible storms, trade stories with the last signal keepers, and decide which fragments of a dying sky deserve to survive.",
      meta: "Single-player · PC / Console · 2027"
    },
    neon: {
      title: "Neon Tide",
      type: "Narrative exploration · Released",
      image: "assets/images/neon-tide.webp",
      body: "Dive through a drowned city where memories take the shape of luminous koi. Every rooftop holds a story, every current changes the map, and the city remembers the choices you leave behind.",
      meta: "Single-player · PC · Available now"
    },
    crown: {
      title: "Hollow Crown",
      type: "Dark fantasy RPG · Prototype",
      image: "assets/images/hollow-crown.webp",
      body: "Climb a kingdom carved into the body of its fallen ruler. Read the fractures in the stone, bargain with forgotten vows, and rebuild a crown that may never have deserved its power.",
      meta: "Single-player · PC / Console · In development"
    }
  };

  const modal = $("[data-game-modal]");
  const modalTitle = $("[data-modal-title]");
  const modalType = $("[data-modal-type]");
  const modalBody = $("[data-modal-body]");
  const modalMeta = $("[data-modal-meta]");
  const modalImage = $("[data-modal-image]");
  const modalClose = $("[data-modal-close]");
  let modalTrigger = null;

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modalTrigger?.focus();
  };

  $$('[data-game-open]').forEach((button) => {
    button.addEventListener("click", () => {
      const game = gameData[button.dataset.gameOpen];
      if (!game || !modal) return;
      modalTrigger = button;
      if (modalTitle) modalTitle.textContent = game.title;
      if (modalType) modalType.textContent = game.type;
      if (modalBody) modalBody.textContent = game.body;
      if (modalMeta) modalMeta.textContent = game.meta;
      if (modalImage) {
        modalImage.src = game.image;
        modalImage.alt = `${game.title} concept art`;
      }
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      window.setTimeout(() => modalClose?.focus(), 80);
    });
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
    if (event.key === "Tab" && modal?.classList.contains("is-open")) {
      const focusable = $$('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal)
        .filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  $$('[data-role-trigger]').forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const role = trigger.closest(".role");
      const open = role?.classList.toggle("is-open");
      const panel = role?.querySelector(".role__panel");
      trigger.setAttribute("aria-expanded", String(Boolean(open)));
      if (panel) {
        panel.setAttribute("aria-hidden", String(!open));
        panel.inert = !open;
      }
    });
  });

  const form = $("[data-contact-form]");
  const toast = $("[data-toast]");
  const showToast = (title, message) => {
    if (!toast) return;
    const titleNode = $("strong", toast);
    const messageNode = $("span", toast);
    if (titleNode) titleNode.textContent = title;
    if (messageNode) messageNode.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 5000);
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = $$('[data-required]', form);
    let firstInvalid = null;

    fields.forEach((field) => {
      const wrapper = field.closest(".field");
      const error = $(".field__error", wrapper);
      let message = "";
      if (!field.value.trim()) message = "Please complete this field.";
      if (field.type === "email" && field.value && !/^\S+@\S+\.\S+$/.test(field.value)) message = "Please enter a valid email address.";
      wrapper?.classList.toggle("is-invalid", Boolean(message));
      field.setAttribute("aria-invalid", String(Boolean(message)));
      if (error) error.textContent = message;
      if (message && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      showToast("A few details are missing", "Check the highlighted fields and try again.");
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(`${data.get("project")} enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject type: ${data.get("project")}\n\n${data.get("message")}`
    );
    showToast("Message prepared", "Your email app will open with everything filled in.");
    window.setTimeout(() => {
      window.location.href = `mailto:hello@meebugames.com?subject=${subject}&body=${body}`;
    }, 500);
  });

  form?.addEventListener("input", (event) => {
    const field = event.target.closest('[data-required]');
    if (!field) return;
    field.closest(".field")?.classList.remove("is-invalid");
    field.setAttribute("aria-invalid", "false");
    const error = $(".field__error", field.closest(".field"));
    if (error) error.textContent = "";
  });

  $$('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
})();

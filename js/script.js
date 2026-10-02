document.addEventListener("DOMContentLoaded", () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 1. Dynamic Hero Hover Effect & Smooth Text Swap Engine
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const tickerLinks = document.querySelectorAll(
    ".interactive-ticker .ticker-item a"
  );
  const heroBgLayers = document.querySelectorAll(".hero-bg");

  if (heroTitle && heroSubtitle) {
    const baseContent = {
      title: heroTitle.innerHTML,
      subtitle: heroSubtitle.innerHTML,
    };

    const dynamicContent = {
      "#about": {
        title: "Connecting Technology With Real-World Needs.",
        subtitle:
          "I am a frontend developer focused on building clean, functional, and performance-driven platforms that expand business reach beyond physical footprints.",
        bgClass: "bg-about",
      },
      "#services": {
        title: "Clear, Reliable Web Solutions.",
        subtitle:
          "Providing high-impact modern landing pages, fully fluid responsive interface design layouts, and modular frontend architectures utilizing clean markup standards.",
        bgClass: "bg-services",
      },
      "#work": {
        title: "Aura Interiors Studio Concept.",
        subtitle:
          "Exploring digital craft design boundaries with clean structural visual spacing, rich immersive presentation structures, and modern interface layout workflows.",
        bgClass: "bg-aura",
      },
    };

    function swapHeroContent(titleText, subtitleText) {
      heroTitle.style.opacity = "0";
      heroSubtitle.style.opacity = "0";

      setTimeout(() => {
        heroTitle.innerHTML = titleText;
        heroSubtitle.innerHTML = subtitleText;
        heroTitle.style.opacity = "1";
        heroSubtitle.style.opacity = "1";
      }, 200);
    }

    tickerLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        const targetId = link.getAttribute("href");
        const match = dynamicContent[targetId];

        if (match) {
          swapHeroContent(match.title, match.subtitle);
          heroBgLayers.forEach((bg) => {
            bg.classList.remove("active");
            const video = bg.querySelector("video");
            if (video && !prefersReducedMotion) video.pause();
          });

          const targetBg = document.querySelector(`.${match.bgClass}`);
          if (targetBg) {
            targetBg.classList.add("active");
            const activeVideo = targetBg.querySelector("video");
            if (activeVideo && !prefersReducedMotion) activeVideo.play().catch(() => {});
          }
        }
      });

      link.addEventListener("mouseleave", () => {
        swapHeroContent(baseContent.title, baseContent.subtitle);
        heroBgLayers.forEach((bg) => {
          bg.classList.remove("active");
          const video = bg.querySelector("video");
          if (video && !prefersReducedMotion) video.pause();
        });

        const defaultBg = document.querySelector(".default-bg");
        if (defaultBg) {
          defaultBg.classList.add("active");
          const defaultVideo = defaultBg.querySelector("video");
          if (defaultVideo && !prefersReducedMotion) defaultVideo.play().catch(() => {});
        }
      });
    });
  }

  // 2. Custom Tactile Cursor (Hardware-Accelerated)
  const isPointerFine = window.matchMedia("(pointer: fine)").matches;
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");

  if (isPointerFine && cursorDot && cursorRing) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    // Linear Interpolation helper function for smooth physics lag
    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Track mouse coordinates
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Immediate translation for center dot
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      document.body.classList.remove("cursor-hidden");
    });

    // Smooth animation loop for the trailing ring
    function renderCursor() {
      // 0.18 speed factor gives that responsive feel like meermohsin.com
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);

      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hide cursor when leaving the window bounds
    document.addEventListener("mouseleave", () => {
      document.body.classList.add("cursor-hidden");
    });

    document.addEventListener("mouseenter", () => {
      document.body.classList.remove("cursor-hidden");
    });

    // Event delegation for all current & dynamic hoverable elements
    const interactiveSelector = "a, button, .ticker-item, .service-card, .case-study-card, .bento-card, .nav-cta";

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactiveSelector)) {
        document.body.classList.add("cursor-hover");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactiveSelector)) {
        document.body.classList.remove("cursor-hover");
      }
    });
  }

  // 3. Mobile Navigation Menu Toggle with Full ARIA Accessibility
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (mobileToggle && mobileMenu) {
    const toggleMenu = (isOpen) => {
      const activeState = typeof isOpen === "boolean" ? isOpen : !mobileMenu.classList.contains("active");
      mobileToggle.classList.toggle("open", activeState);
      mobileMenu.classList.toggle("active", activeState);
      document.body.classList.toggle("menu-open", activeState);
      mobileToggle.setAttribute("aria-expanded", activeState.toString());
    };

    mobileToggle.addEventListener("click", () => toggleMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });
  }

  // 4. Update Copyright Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 5. Scroll Reveal Observer Engine
  const revealElements = document.querySelectorAll("[data-reveal]");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    setTimeout(() => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add("revealed");
        }
      });
    }, 100);
  }

  // 6. Magnetic Cards (Desktop Only)
  if (window.innerWidth > 900 && !prefersReducedMotion) {
    const cards = document.querySelectorAll(".magnetic-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1000px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      });
    });
  }

  // 7. Parallax Scroll Effect
  if (!prefersReducedMotion) {
    const parallaxElements = document.querySelectorAll("[data-parallax]");
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax"));
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    });
  }

  // 8. Performance Video Lazy Observer (Plays videos only when in viewport)
  if (!prefersReducedMotion) {
    const videos = document.querySelectorAll("video");
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            const parentBg = video.closest(".hero-bg");
            if (!parentBg || parentBg.classList.contains("active")) {
              video.play().catch(() => {});
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    videos.forEach((video) => videoObserver.observe(video));
  }
});
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const body = document.body;
  body.style.overflow = "hidden";
  setTimeout(() => {
    loader.classList.add("fade-out");
    body.style.overflow = "auto";
  }, 1000);
  setTimeout(() => {
    loader.remove();
  }, 5000);
});

function scrollToApps() {
  const element = document.getElementById("appetizers");
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

const textarea = document.querySelectorAll("textarea");

// textarea.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     e.preventDefault(); // Stops the new line from being created
//   }
// });

// textarea.addEventListener("input", function () {
//   // Replaces all types of line breaks (LF, CR) with an empty string or a space
//   this.value = this.value.replace(/[\r\n]+/g, "");
// });

function todaysDate() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = today;
}

// Current page tracker
let currentPage = "";

const routeMap = {
  "/": "pages/home.html",
  "/index.html": "pages/home.html",
  "/menu": "pages/menu.html",
  "/menu.html": "pages/menu.html",
  "/events": "pages/events.html",
  "/events.html": "pages/events.html",
  "/contact": "pages/contact.html",
  "/contact.html": "pages/contact.html",
  "/reservation": "pages/reservation.html",
  "/reservation.html": "pages/reservation.html",
  "/terms": "pages/terms.html",
  "/terms.html": "pages/terms.html",
  "/privacy": "pages/privacy.html",
  "/privacy.html": "pages/privacy.html",
};

function getRouteFromPage(pageUrl) {
  const slug = pageUrl.replace("pages/", "").replace(".html", "");
  return slug === "home" ? "/" : slug === "index" ? "/" : `/${slug}`;
}

function getPageFromPath(pathname) {
  const normalizedPath = pathname.toLowerCase().replace(/\/$/, "") || "/";
  return routeMap[normalizedPath] || routeMap["/"];
}

function toggleFAQ(button) {
  const container = document.getElementById("faqContainer");
  const allItems = container.querySelectorAll(".faq-content");
  const allIcons = container.querySelectorAll(".faq-icon");

  const content = button.nextElementSibling;
  const icon = button.querySelector(".faq-icon");

  const isOpen = content.style.maxHeight;

  allItems.forEach((item) => {
    item.style.maxHeight = null;
    item.style.opacity = 0;
  });

  allIcons.forEach((i) => {
    i.style.transform = "rotate(0deg)";
    i.textContent = "+";
  });

  if (!isOpen) {
    content.style.maxHeight = content.scrollHeight + "px";
    content.style.opacity = 1;

    button.scrollIntoView({ behavior: "smooth", block: "center" });

    icon.style.transform = "rotate(45deg)";
    icon.textContent = "+";
  }
}

function updateActiveButtonMobile() {
  const currentPath = window.location.pathname;
  const backgroundCSSactive = "var(--bg-2)";
  const backgroundCSSinactive = "transparent";
  const fontWeightCSSactive = "900";
  const fontWeightCSSinactive = "normal";
  const borderCSSinactive = "1px solid transparent";
  const borderCSSactive = "1px solid var(--primary-color)";
  const cursorCSSactive = "default";
  const cursorCSSinactive = "pointer";
  const colorCSSactive = "var(--primary-color)";
  const colorCSSinactive = "var(--gray-400)";

  const pageMap = {
    "/menu": "#mobileMenu > button#menu-button",
    "/events": "#mobileMenu > button#events-button",
    "/contact": "#mobileMenu > button#contact-button",
  };

  Object.values(pageMap).forEach((selector) => {
    const button = document.querySelector(selector);
    if (button) {
      // inactive
      button.classList.remove("shadow-md");
      button.style.fontWeight = fontWeightCSSinactive;
      button.style.border = borderCSSinactive;
      button.style.cursor = cursorCSSinactive;
      button.style.backgroundColor = backgroundCSSinactive;
      button.style.color = colorCSSinactive;
    }
  });

  const activeButtonSelector = pageMap[currentPath];
  if (activeButtonSelector) {
    const activeButton = document.querySelector(activeButtonSelector);
    if (activeButton) {
      // active
      activeButton.classList.toggle("shadow-md");
      activeButton.style.fontWeight = fontWeightCSSactive;
      activeButton.style.border = borderCSSactive;
      activeButton.style.cursor = cursorCSSactive;
      activeButton.style.backgroundColor = backgroundCSSactive;
      activeButton.style.color = colorCSSactive;
    }
  }
}

function updateActiveButton() {
  const currentPath = window.location.pathname;
  const colorCSSactive = "var(--primary-color)";
  const colorCSSinactive = "var(--gray-700)";
  const fontWeightCSSactive = "900";
  const fontWeightCSSinactive = "400";
  const borderCSSinactive = "1px solid transparent";
  const borderCSSactive = "1px solid var(--primary-color)";
  const backgroundCSSactive = "var(--bg-2)";
  const backgroundCSSinactive = "transparent";

  const pageMap = {
    "/menu": "menu-button",
    "/events": "events-button",
    "/contact": "contact-button",
  };

  Object.values(pageMap).forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      //   button.style.borderBottom = "none";
      button.style.fontWeight = fontWeightCSSinactive;
      button.style.color = colorCSSinactive;
      button.style.backgroundColor = backgroundCSSinactive;
    }
  });

  const activeButtonId = pageMap[currentPath];
  if (activeButtonId) {
    const activeButton = document.getElementById(activeButtonId);
    if (activeButton) {
      //   activeButton.style.borderBottom = "2px solid var(--gray-800)";
      activeButton.style.fontWeight = fontWeightCSSactive;
      activeButton.style.color = colorCSSactive;
      activeButton.style.backgroundColor = backgroundCSSactive;
    }
  }
}

function autoResize(el) {
  el.style.height = "auto";

  const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
  const maxLines = 6; // adjust if you want
  const maxHeight = lineHeight * maxLines;

  el.style.height = Math.min(el.scrollHeight, maxHeight) + 2 + "px";

  this.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the creation of a new line
    }
    // this.value = this.value.replace(/[\r\n]+/g, "");
  });

  //   this.addEventListener("input", function () {
  //     // Removes all new line characters globally
  //     this.value = this.value.replace(/[\r\n]+/g, "");
  //   });
}

function initMenuNav() {
  const links = document.querySelectorAll(".menu-link");
  const sections = document.querySelectorAll("section[id]");
  const indicator = document.getElementById("menuIndicator");

  if (!links.length || !sections.length || !indicator) return;

  function moveIndicator(el) {
    const rect = el.getBoundingClientRect();
    // const parentRect = el.parentElement.getBoundingClientRect();
    const parentRect = document
      .getElementById("menuNavLinks")
      .getBoundingClientRect();

    indicator.style.width = rect.width + "px";
    if (window.matchMedia("(max-width: 768px)").matches) {
      indicator.style.left = rect.left - parentRect.left - 31 + "px";
    } else {
      indicator.style.left = rect.left - parentRect.left - 47 + "px";
    }
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.dataset.section;
      const section = document.getElementById(id);

      if (section) {
        const offset = 131;
        const top = section.offsetTop - offset;

        window.scrollTo({
          top: top,
          behavior: "smooth",
        });
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          links.forEach((link) => {
            link.classList.remove("active");

            if (link.dataset.section === id) {
              link.classList.add("active");
              moveIndicator(link);
            }
          });
        }
      });
    },
    {
      rootMargin: "-120px 0px -40% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));

  const active = document.querySelector(".menu-link.active");
  if (active) {
    setTimeout(() => moveIndicator(active), 50);
  }

  window.addEventListener("resize", () => {
    const active = document.querySelector(".menu-link.active");
    if (active) moveIndicator(active);
  });
}

function initializeSwiper() {
  document.querySelectorAll(".swiper").forEach((el) => {
    new Swiper(el, {
      slidesPreview: 1.2,
      spaceBetween: 16,
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: el.querySelector(".swiper-pagination"),
        clickable: true,
      },
    });
  });
  // console.log("swiper initialized");
}

function initCustomSelect() {
  document.querySelectorAll("[data-select]").forEach((container) => {
    const trigger = container.querySelector("[data-trigger]");
    const dropdown = container.querySelector("[data-dropdown]");
    const valueText = container.querySelector("[data-value-display]");
    const realSelect = container.querySelector("select");
    const arrow = container.querySelector("[data-arrow]");
    const options = container.querySelectorAll("[data-option]");

    if (!trigger || !dropdown) return;

    // Toggle dropdown
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();

      const isOpen = dropdown.classList.contains("h-auto");

      dropdown.classList.toggle("h-auto", !isOpen);
      dropdown.classList.toggle("pointer-events-auto", !isOpen);
      dropdown.classList.toggle("translate-y-0", !isOpen);

      options.forEach((el) => el.classList.toggle("hidden", isOpen));
      arrow.classList.toggle("rotate-180", !isOpen);
    });

    // Select option
    options.forEach((option) => {
      option.addEventListener("click", () => {
        const value = option.dataset.value;
        const text = option.textContent;

        valueText.textContent = text;
        valueText.classList.remove("text-gray-400");

        realSelect.value = value;

        // new -----
        realSelect.dispatchEvent(new Event("input"));
        // ---------

        dropdown.classList.remove(
          "h-auto",
          "pointer-events-auto",
          "translate-y-0",
        );

        options.forEach((el) => el.classList.add("hidden"));
        arrow.classList.remove("rotate-180");
      });
    });

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        dropdown.classList.remove(
          "h-auto",
          "pointer-events-auto",
          "translate-y-0",
        );

        options.forEach((el) => el.classList.add("hidden"));
        arrow.classList.remove("rotate-180");
      }
    });
  });
}

function setMinDate() {
  const dateInput = document.querySelector('input[type="date"]');
  if (!dateInput) return;

  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;
}

// Toggle Mobile Menu with smooth animation

function animateMenuIcon(isOpen) {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const line3 = document.getElementById("line3");
  const menuIconButton = document.getElementById("menuIconButton");
  const logo = document.getElementById("mainLogo");

  if (isOpen) {
    // top — rotating facing down
    // line1.style.transform = "rotate(-45deg) translate(-1px, 2.5px)";
    line1.style.transform = "rotate(-45deg) translate(-1px, 2.6px)";
    line2.style.opacity = "0";
    // bottom — rotating facing upward
    line3.style.transform = "rotate(45deg) translate(-6px, -7px)";
    //menuIconButton.style.transform = "translateY(-3px)";
    logo.classList.remove("pt-2");
  } else {
    line1.style.transform = "rotate(0) translate(0, 0)";
    line2.style.opacity = "1";
    line3.style.transform = "rotate(0) translate(0, 0)";
    //menuIconButton.style.transform = "translateY(0)";
    logo.classList.add("pt-2");
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  const navbar = document.getElementById("navbar");

  const isOpen = mobileMenu.classList.contains("menu-open");

  animateMenuIcon(!isOpen);

  if (isOpen) {
    closeMobileMenu();
  } else {
    navbar.style.backgroundColor = "rgba(255,255,255, 1)";
    navbar.style.color = "black";
    if (mobileMenu) {
      mobileMenu.classList.add("menu-open");
    }
    if (overlay) {
      overlay.classList.remove("opacity-0", "pointer-events-none");
      overlay.classList.add("opacity-100");
    }
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  const navbar = document.getElementById("navbar");

  animateMenuIcon(false);

  //   navbar.style.backgroundColor = "rgba(255,255,255, 0)";
  //   navbar.style.color = "white";

  if (mobileMenu) {
    mobileMenu.classList.remove("menu-open");
  }
  if (overlay) {
    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0", "pointer-events-none");
  }

  const scrollPosition = window.scrollY;
  const maxScroll = 50; // Pixels to scroll before navbar becomes fully opaque

  if (scrollPosition < maxScroll) {
    const opacity = scrollPosition / maxScroll;
    if (currentPage === "home") {
      navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      navbar.style.color = "white";
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 1)";
      navbar.style.color = "black";
    }
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 1)";
    navbar.style.color = "black";
  }
}

function showToast(type = "success", message = "") {
  const container = document.getElementById("toastContainer");

  const isSuccess = type === "success";

  const toast = document.createElement("div");

  toast.className = `
    flex items-start gap-3 px-4 py-3 rounded-sm shadow-lg
    text-sm text-white w-[280px]
    transition-all duration-300
    ${isSuccess ? "bg-[var(--primary-color)]" : "bg-red-600"}
  `;

  toast.innerHTML = `
    <div class="mt-0.5">
      ${
        isSuccess
          ? `<svg width="18" height="18" fill="white" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" stroke="white" stroke-width="2" fill="none"/>
            </svg>`
          : `<svg width="18" height="18" fill="white" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V6h2v6z"/>
            </svg>`
      }
    </div>

    <div class="flex-1 mt-[1px]">
      ${message}
    </div>

    <button onclick="this.parentElement.remove()" class="opacity-70 hover:opacity-100 mt-[1px]">
      ✕
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-x-3");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function setErrorMessage(el, error) {
  if (!error) return;

  if (el.validity.valueMissing) {
    error.textContent = "This field is required";
  } else if (el.type === "email" && el.validity.typeMismatch) {
    error.textContent = "Enter a valid email";
  } else if (el.validity.tooShort) {
    error.textContent = `Minimum ${el.minLength} characters`;
  } else {
    error.textContent = "Invalid input";
  }
}

function initLiveValidation(form) {
  const fields = form.querySelectorAll("input, textarea, select");

  fields.forEach((el) => {
    const error = el.closest("div")?.querySelector(".error-msg");
    const selectBtn = el.closest("div")?.querySelector("[data-trigger]");
    const selectBtnAlt = el
      .closest("div > div")
      ?.querySelector("[data-trigger]");

    el.addEventListener("input", () => {
      // console.log("Valid?", el.checkValidity(), el.name);

      if (el.value.trim() === "") {
        el.classList.remove("border-red-600");
        if (error) error.classList.add("hidden");
        if (selectBtn) selectBtn.classList.remove("border-red-600");
        if (selectBtnAlt) selectBtnAlt.classList.remove("border-red-600");
        return;
      }

      if (!el.checkValidity()) {
        el.classList.add("border-red-600");
        if (selectBtn) selectBtn.classList.add("border-red-600");
        if (selectBtnAlt) selectBtnAlt.classList.add("border-red-600");
        if (error) {
          error.classList.remove("hidden");
          setErrorMessage(el, error);
        }
      } else {
        el.classList.remove("border-red-600");
        if (error) error.classList.add("hidden");
        if (selectBtnAlt) selectBtnAlt.classList.remove("border-red-600");
      }
    });

    el.addEventListener("blur", () => {
      if (!el.checkValidity()) {
        el.classList.add("border-red-600");
        if (selectBtn) selectBtn.classList.add("border-red-600");
        if (selectBtnAlt) selectBtnAlt.classList.add("border-red-600");
        if (error) {
          error.classList.remove("hidden");
          setErrorMessage(el, error);
        }
      }
    });
  });

  // console.log("ran");
}

function resetCustomSelect(form) {
  form.querySelectorAll("[data-select]").forEach((container) => {
    const valueText = container.querySelector("[data-value-display]");
    const realSelect = container.querySelector("select");
    const arrow = container.querySelector("[data-arrow]");
    const dropdown = container.querySelector("[data-dropdown]");

    if (valueText) {
      valueText.textContent = "Select an option";
      valueText.classList.add("text-gray-400");
    }

    if (realSelect) {
      realSelect.value = "";
    }

    if (arrow) {
      arrow.classList.remove("rotate-180");
    }

    if (dropdown) {
      dropdown.classList.remove("h-auto");
    }
  });
}

function initFormSystem() {
  // console.log("Forms found: ", document.querySelectorAll("form").length);
  document.querySelectorAll("form").forEach((form) => {
    // console.log(form);
    initLiveValidation(form);

    // console.log("made it past initLiveValidation");

    const btn = form.querySelector(".submit-btn");
    if (!btn) {
      // console.warn("Form missing required elements, skipping...");
      return;
    }
    const text = btn.querySelector(".btn-text");
    if (!text) {
      // console.warn("Form missing required elements, skipping...");
      return;
    }
    const loader = btn.querySelector(".loader");
    if (!loader) {
      // console.warn("Form missing required elements, skipping...");
      return;
    }

    // console.log("here");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let valid = true;

      form.querySelectorAll("input, textarea, select").forEach((el) => {
        if (!el.checkValidity()) {
          valid = false;
          el.dispatchEvent(new Event("blur"));
        }
      });

      if (!valid) {
        showToast("error", "Please fix the highlighted fields.");
        return;
      }

      btn.disabled = true;
      text.classList.add("hidden");
      loader.classList.remove("hidden");

      // console.log("submit");

      try {
        // console.log("try");

        if (form.dataset.test === "true") {
          console.log("TEST MODE ACTIVE");

          showToast("success", "Test submission successful.");

          form.reset();
          resetCustomSelect(form);

          return;
        }

        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          form.reset();
          resetCustomSelect(form);
          showToast("success", "Reservation sent");
        } else {
          showToast("error", "Submission failed.");
        }
      } catch {
        showToast("error", "Network error.");
      } finally {
        btn.disabled = false;
        text.classList.remove("hidden");
        loader.classList.add("hidden");
      }
    });
  });
  // console.log("form system code ran");
}

function initAnimations() {
  const elements = document.querySelectorAll(".fade-up");

  // console.log("Found elements:", elements.length);

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // console.log("Observing:", entry.target);

        if (entry.isIntersecting) {
          // console.log("Animating:", entry.target);

          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  elements.forEach((el) => {
    observer.observe(el);
  });
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("animate-in");
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   },
  //   {
  //     threshold: 0.1,
  //   },
  // );

  // document.querySelectorAll(".fade-up").forEach((el) => {
  //   observer.observe(el);
  //   console.log("observer observed");
  // });

  // console.log("Animations initialized");
}

async function loadPage(pageUrl, pushState = true) {
  if (pageUrl.startsWith("#")) {
    const el = document.querySelector(pageUrl);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  try {
    // const cacheBustedUrl = `${pageUrl}?v=${Date.now()}`;

    // console.log("Loading page:", pageUrl);

    const response = await fetch(pageUrl);
    if (!response.ok) throw new Error("Page not found");

    const content = await response.text();
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(content, "text/html");
    const contentDiv = document.getElementById("content");
    // contentDiv.innerHTML = doc.body.innerHTML;
    contentDiv.innerHTML = content;
    // console.log("HTML just injected ----");

    // console.log("Container:", contentDiv);

    // console.log("Fade elements: ", contentDiv.querySelectorAll(".fade-up"));

    requestAnimationFrame(() => {
      initAnimations?.();
    });

    initializeSwiper?.();
    initCustomSelect?.();

    initFormSystem?.();

    // console.log("everything went smoothly");

    // Update current page
    currentPage = pageUrl.split("/").pop().replace(".html", "");

    // Ensure only non-home gets top padding for fixed navbar overlap
    if (currentPage === "home") {
      contentDiv.classList.remove("pt-[78px]");
    } else {
      contentDiv.classList.add("pt-[78px]");
    }

    // Update page title
    const pageName =
      currentPage === "home"
        ? "Home"
        : currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
    document.title = `${pageName} - Caspar's`;

    // Update URL without full page reload
    if (pushState) {
      window.history.pushState(
        { page: pageUrl },
        "",
        getRouteFromPage(pageUrl),
      );
    }

    setMinDate();

    // Close mobile menu
    closeMobileMenu();

    setTimeout(() => initMenuNav(), 150);

    // Navbar style behavior depends on page
    // handleMediaNavbar(mobile);

    const navbar = document.getElementById("navbar");
    //matchDesktop = window.matchMedia("(min-width: 768px)");

    if (navbar) {
      if (currentPage === "home") {
        navbar.style.backgroundColor = "rgba(255,255,255, 0)";
        navbar.style.color = "white";
      } else {
        navbar.style.backgroundColor = "rgba(255,255,255, 1)";
        navbar.style.color = "black";
      }
    }

    // Setup form handlers for the newly loaded content
    //setupFormHandlers();
    updateActiveButton();
    updateActiveButtonMobile();

    const hash = window.location.hash;

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
      }
    }
    if (!window.location.hash) {
      // Scroll to top
      window.scrollTo(0, 0);
    }
  } catch (error) {
    console.error("Error loading page:", error);
    document.getElementById("content").innerHTML =
      '<p class="w-full p-32 text-xl font-bold text-center text-red-600">Error loading page. Please try again.</p>';
  }
}

// Handle browser back/forward buttons
window.addEventListener("popstate", function (e) {
  if (e.state && e.state.page) {
    loadPage(e.state.page, false);
  } else {
    loadPage(getPageFromPath(window.location.pathname), false);
  }
  updateActiveButton();
  updateActiveButtonMobile();
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  const route = window.location.pathname;
  // const parallaxBg = document.getElementById("parallaxBg");

  loadPage(getPageFromPath(route), false);

  //initFormSystem?.();

  // Navbar scroll transparency effect on Home only
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    // const reservationBtn = document.getElementsByClassName("reservation-btn");
    if (!navbar) return;

    if (currentPage !== "home") {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 1)";
      return;
    }

    const scrollPosition = window.scrollY;
    const maxScroll = 50; // Pixels to scroll before navbar becomes fully opaque

    if (scrollPosition < maxScroll) {
      const opacity = scrollPosition / maxScroll;
      navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      navbar.style.color = "white";
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 1)";
      navbar.style.color = "black";
    }

    setTimeout(() => initMenuNav(), 50);
    // parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  });

  updateActiveButton();
  updateActiveButtonMobile();

  constrainInput = (event) => {
    event.target.value = event.target.value.replace(/[\r\n\v]+/g, "");
  };

  document.querySelectorAll("textarea").forEach((el) => {
    el.addEventListener("keyup", constrainInput);
  });

  showToast("success", "Toasty test");

  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("animate-in");
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   },
  //   {
  //     threshold: 0.1,
  //   },
  // );
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("animate-in");
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   },
  //   {
  //     threshold: 0.1,
  //   },
  // );

  // document.querySelectorAll(".fade-up").forEach((el) => {
  //   observer.observe(el);
  // });

  initAnimations?.();

  // console.log(document.querySelectorAll(".fade-up"));

  // console.log("Restaurant website initialized successfully!");
});

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

// Simple toast notification
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 transition-opacity duration-300 ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
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

  const pageMap = {
    "/menu": "#mobileMenu > button#menu-button",
    "/events": "#mobileMenu > button#events-button",
    "/contact": "#mobileMenu > button#contact-button",
  };

  Object.values(pageMap).forEach((selector) => {
    const button = document.querySelector(selector);
    if (button) {
      button.style.fontWeight = "normal";
      button.style.borderLeft = "1px solid transparent";
      button.style.cursor = "pointer";
    }
  });

  const activeButtonSelector = pageMap[currentPath];
  if (activeButtonSelector) {
    const activeButton = document.querySelector(activeButtonSelector);
    if (activeButton) {
      activeButton.style.fontWeight = "bold";
      activeButton.style.borderLeft = "1px solid var(--primary-color)";
      activeButton.style.cursor = "default";
    }
  }
}

function updateActiveButton() {
  const currentPath = window.location.pathname;

  const pageMap = {
    "/menu": "menu-button",
    "/events": "events-button",
    "/contact": "contact-button",
  };

  Object.values(pageMap).forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      //   button.style.borderBottom = "none";
      button.style.fontWeight = "normal";
    }
  });

  const activeButtonId = pageMap[currentPath];
  if (activeButtonId) {
    const activeButton = document.getElementById(activeButtonId);
    if (activeButton) {
      //   activeButton.style.borderBottom = "2px solid #1F2937";
      activeButton.style.fontWeight = "bold";
    }
  }
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
        const offset = 125;
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
  console.log("swiper initialized");
}

async function loadPage(pageUrl, pushState = true) {
  try {
    const cacheBustedUrl = `${pageUrl}?v=${Date.now()}`;

    const response = await fetch(pageUrl);
    if (!response.ok) throw new Error("Page not found");

    const content = await response.text();
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = content;

    initializeSwiper?.();

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

    // Close mobile menu
    closeMobileMenu();

    // Scroll to top
    window.scrollTo(0, 0);

    setTimeout(() => initMenuNav(), 150);

    // Navbar style behavior depends on page
    const navbar = document.getElementById("navbar");
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
    setupFormHandlers();
    updateActiveButton();
    updateActiveButtonMobile();
  } catch (error) {
    console.error("Error loading page:", error);
    document.getElementById("content").innerHTML =
      '<p class="text-center text-red-500">Error loading page. Please try again.</p>';
  }
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
    line1.style.transform = "rotate(-45deg) translate(-1px, 2.5px)";
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

  const isOpen = mobileMenu.classList.contains("menu-open");

  animateMenuIcon(!isOpen);

  if (isOpen) {
    closeMobileMenu();
  } else {
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

  animateMenuIcon(false);

  if (mobileMenu) {
    mobileMenu.classList.remove("menu-open");
  }
  if (overlay) {
    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0", "pointer-events-none");
  }
}

// Setup form handlers for dynamically loaded content
function setupFormHandlers() {
  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.onsubmit = function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Log form data (in a real application, you would send this to a server)
      console.log("Contact Form Data:", data);

      // Show success message
      showToast("Thank you for your message! We will get back to you soon.");

      // Reset form
      this.reset();
    };
  }

  // Reservation Form Submission
  const reservationForm = document.getElementById("reservationForm");
  if (reservationForm) {
    reservationForm.onsubmit = function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Validate date is in the future
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        showToast("Please select a future date for your reservation.", "error");
        return;
      }

      // Validate time format
      if (!data.time) {
        showToast("Please select a time for your reservation.", "error");
        return;
      }

      // Log reservation data (in a real application, you would send this to a server)
      console.log("Reservation Data:", data);

      // Show success message
      showToast(
        `Reservation confirmed for ${data.firstName} ${data.lastName} on ${data.date} at ${data.time} for ${data.guests} guest(s). We look forward to seeing you!`,
      );

      // Reset form
      this.reset();

      // Load home page after a short delay
      setTimeout(() => {
        loadPage("pages/home.html");
      }, 2000);
    };
  }

  // Set minimum date for date input (today)
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
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

  console.log("Restaurant website initialized successfully!");
});

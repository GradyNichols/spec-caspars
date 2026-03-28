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

async function loadPage(pageUrl, pushState = true) {
  try {
    const response = await fetch(pageUrl);
    if (!response.ok) throw new Error("Page not found");

    const content = await response.text();
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = content;

    // Update current page
    currentPage = pageUrl.split("/").pop().replace(".html", "");

    // Ensure only non-home gets top padding for fixed navbar overlap
    if (currentPage === "home") {
      contentDiv.classList.remove("pt-20");
    } else {
      contentDiv.classList.add("pt-20");
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

    // Navbar style behavior depends on page
    const navbar = document.getElementById("navbar");
    if (navbar) {
      if (currentPage === "home") {
        navbar.style.backgroundColor = "rgba(255,255,255, 0)";
      } else {
        navbar.style.backgroundColor = "rgba(255,255,255, 1)";
      }
    }

    // Setup form handlers for the newly loaded content
    setupFormHandlers();
  } catch (error) {
    console.error("Error loading page:", error);
    document.getElementById("content").innerHTML =
      '<p class="text-center text-red-500">Error loading page. Please try again.</p>';
  }
}

// Toggle Mobile Menu with smooth animation
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("menu-open");
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.classList.remove("menu-open");
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
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  const route = window.location.pathname;
  loadPage(getPageFromPath(route), false);

  // Navbar scroll transparency effect on Home only
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
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
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 1)";
    }
  });

  console.log("Restaurant website initialized successfully!");
});

// Load page content dynamically without full page reload
async function loadPage(pageUrl) {
  try {
    const response = await fetch(pageUrl);
    if (!response.ok) throw new Error('Page not found');
    
    const content = await response.text();
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = content;
    
    // Update page title
    const pageTitle = pageUrl.split('/')[1];
    document.title = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1) + ' - Our Restaurant';
    
    // Update URL without full page reload
    window.history.pushState({ page: pageUrl }, '', pageUrl.replace('pages/', ''));
    
    // Close mobile menu
    closeMobileMenu();
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Setup form handlers for the newly loaded content
    setupFormHandlers();
    
  } catch (error) {
    console.error('Error loading page:', error);
    document.getElementById('content').innerHTML = '<p class="text-center text-red-500">Error loading page. Please try again.</p>';
  }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.add("hidden");
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
      alert("Thank you for your message! We will get back to you soon.");

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
        alert("Please select a future date for your reservation.");
        return;
      }

      // Validate time format
      if (!data.time) {
        alert("Please select a time for your reservation.");
        return;
      }

      // Log reservation data (in a real application, you would send this to a server)
      console.log("Reservation Data:", data);

      // Show success message
      alert(
        `Reservation confirmed for ${data.firstName} ${data.lastName} on ${data.date} at ${data.time} for ${data.guests} guest(s). We look forward to seeing you!`,
      );

      // Reset form
      this.reset();

      // Load home page after a short delay
      setTimeout(() => {
        loadPage('pages/home.html');
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
window.addEventListener('popstate', function(e) {
  if (e.state && e.state.page) {
    loadPage(e.state.page);
  }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // Load home page by default
  loadPage('pages/home.html');

  // Bootstrap-specific functionality can be added here
  console.log("Restaurant website initialized successfully!");
});

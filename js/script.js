// Show/Hide Sections
function showSection(sectionId) {
  // Hide all sections
  const allSections = document.querySelectorAll(".content-section");
  allSections.forEach((section) => {
    section.classList.add("hidden");
  });

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.remove("hidden");
    // Scroll to top
    window.scrollTo(0, 0);
  }

  // Close mobile menu
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
  }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  }
}

// Update Form Handlers
function updateFormHandlers() {
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

      // Redirect to home page after a short delay
      setTimeout(() => {
        showSection("home");
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

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // Update form handlers
  updateFormHandlers();

  // Bootstrap-specific functionality can be added here
  // The Bootstrap JS bundle is already included in all HTML files
  console.log("Restaurant website initialized successfully!");
});

// Toggle Mobile Menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  }
}

// Contact Form Submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
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
  });
}

// Reservation Form Submission
const reservationForm = document.getElementById("reservationForm");
if (reservationForm) {
  reservationForm.addEventListener("submit", function (e) {
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
      window.location.href = "index.html";
    }, 2000);
  });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });
});

// Add smooth scroll behavior for page navigation
document.addEventListener("DOMContentLoaded", function () {
  // Set minimum date for date input (today)
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }
});

// Bootstrap-specific functionality can be added here
// The Bootstrap JS bundle is already included in all HTML files
console.log("Restaurant website initialized successfully!");

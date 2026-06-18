document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  fetch("components/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      if (typeof initNavbar === "function") initNavbar();
    })
    .catch((err) => console.error("Error loading navbar:", err));

  // Load footer
  fetch("components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
      if (typeof initFooter === "function") initFooter();
    })
    .catch((err) => console.error("Error loading footer:", err));

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: "ease-in-out-cubic",
    });
  }

  // Contact Form Validation
  const form = document.getElementById("contactForm");

  if (form) {
    // Real-time validation on blur
    form.querySelectorAll(".form-group").forEach((group) => {
      const input = group.querySelector("input, textarea");
      const errorDisplay = group.querySelector(".error-message");

      if (input) {
        input.addEventListener("blur", () => {
          validateField(input, errorDisplay);
        });

        // Remove error styling on input
        input.addEventListener("focus", () => {
          input.classList.remove("error");
          errorDisplay.textContent = "";
        });

        input.addEventListener("input", () => {
          if (input.classList.contains("error")) {
            validateField(input, errorDisplay);
          }
        });
      }
    });

    // Form submission validation
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      let firstInvalidField = null;

      form.querySelectorAll(".form-group").forEach((group) => {
        const input = group.querySelector("input, textarea");
        const errorDisplay = group.querySelector(".error-message");

        if (input) {
          const isFieldValid = validateField(input, errorDisplay);
          if (!isFieldValid) {
            valid = false;
            input.classList.add("error");
            if (!firstInvalidField) {
              firstInvalidField = input;
            }
          }
        }
      });

      if (firstInvalidField) {
        firstInvalidField.focus();
        firstInvalidField.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      if (valid) {
        // ✅ All fields are valid - submit the form
        showSuccessMessage(form);
        form.reset();
        // Clear error styling on all fields after reset
        form.querySelectorAll("input, textarea").forEach((field) => {
          field.classList.remove("error");
        });
      }
    });
  }

  /**
   * Validates a single form field
   * @param {HTMLElement} input - The input or textarea element
   * @param {HTMLElement} errorDisplay - The error message element
   * @returns {boolean} - True if valid, false otherwise
   */
  function validateField(input, errorDisplay) {
    const value = input.value.trim();

    // Check if field is required and empty
    if (input.hasAttribute("required") && !value) {
      errorDisplay.textContent = "This field is required.";
      return false;
    }

    // Validate email format if it's an email field
    if (input.type === "email" && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorDisplay.textContent =
          "Please enter a valid email address (e.g., user@example.com).";
        return false;
      }
    }

    // Check minimum length for message field
    if (input.name === "message" && value && value.length < 10) {
      errorDisplay.textContent =
        "Message should be at least 10 characters long.";
      return false;
    }

    // Clear error message if validation passes
    errorDisplay.textContent = "";
    input.classList.remove("error");
    return true;
  }

  /**
   * Shows a success message to the user
   * @param {HTMLElement} form - The form element
   */
  function showSuccessMessage(form) {
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.setAttribute("role", "alert");
    successMessage.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
    `;

    form.parentElement.insertBefore(successMessage, form);

    // Remove the success message after 5 seconds
    setTimeout(() => {
      successMessage.style.opacity = "0";
      successMessage.style.transition = "opacity 0.3s ease";
      setTimeout(() => successMessage.remove(), 300);
    }, 5000);
  }
});

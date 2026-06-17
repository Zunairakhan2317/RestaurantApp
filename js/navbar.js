function initNavbar() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Toggle menu for mobile
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Highlight active link based on current page
  const links = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

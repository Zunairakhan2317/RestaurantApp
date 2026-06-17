document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  fetch("components/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      if (typeof initNavbar === "function") initNavbar();
    });

  // Load footer
  fetch("components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
      if (typeof initFooter === "function") initFooter();
    });

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: "ease-in-out-cubic",
    });
  }

  // Menu search and filter functionality
  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category-filter");
  const menuCards = document.querySelectorAll(".menu-card");

  function filterMenu() {
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    menuCards.forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      const matchesSearch = name.includes(searchText);
      const matchesCategory =
        category === "all" || card.dataset.category === category;

      if (matchesSearch && matchesCategory) {
        card.style.display = ""; // let CSS Grid handle layout
      } else {
        card.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", filterMenu);
  categoryFilter.addEventListener("change", filterMenu);
});

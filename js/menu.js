document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category-filter");
  const menuCards = document.querySelectorAll(".menu-card");

  function filterMenu() {
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    menuCards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      const matchesSearch = name.includes(searchText);
      const matchesCategory = category === "all" || card.dataset.category === category;

       if (matchesSearch && matchesCategory) {
      card.style.display = "";   // let CSS Grid handle layout
    } else {
      card.style.display = "none";
    }
    });
  }

  searchInput.addEventListener("input", filterMenu);
  categoryFilter.addEventListener("change", filterMenu);
});

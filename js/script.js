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

  // Featured dishes slider
  const track = document.querySelector(".dish-track");
  if (track) {
    const slider = track.closest(".dish-slider");
    const cards = Array.from(track.children);
    const cardWidth = cards[0].offsetWidth + 20; // width + gap
    let index = 0;

    // Clone all cards once for seamless loop
    cards.forEach((card) => track.appendChild(card.cloneNode(true)));

    function moveSlide() {
      index++;
      track.style.transition = "transform 0.7s ease";
      track.style.transform = `translateX(-${index * cardWidth}px)`;

      // Reset seamlessly when half track is scrolled
      if (index >= cards.length) {
        setTimeout(() => {
          track.style.transition = "none";
          track.style.transform = "translateX(0)";
          index = 0;
        }, 700); // wait for transition to finish
      }
    }

    setInterval(moveSlide, 3500);

    window.addEventListener("resize", () => {
      track.style.transition = "none";
      track.style.transform = `translateX(-${index * (cards[0].offsetWidth + 20)}px)`;
    });
  }
});

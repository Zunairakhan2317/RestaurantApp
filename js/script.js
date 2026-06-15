// Load Navbar and Footer dynamically
document.addEventListener("DOMContentLoaded", () => {
 
  // Load navbar
  fetch("components/navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;

      // Now that navbar is injected, initialize its JS
      if (typeof initNavbar === "function") {
        initNavbar();
      }
    });

  // Load footer
  fetch("components/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;

      if (typeof initFooter === "function") {
        initFooter();
      }
    });



  const track = document.querySelector('.dish-track');
  if (track) {
    const slider = track.closest('.dish-slider');
    const cards = Array.from(track.children);
    const visibleCount = 3;
    const originalCount = cards.length;

    cards.slice(0, visibleCount).forEach(card => track.appendChild(card.cloneNode(true)));

    let index = 0;
    const getSlideDistance = () => slider.clientWidth;

    const moveSlide = () => {
      index += 1;
      track.style.transition = 'transform 0.7s ease';
      track.style.transform = `translateX(-${getSlideDistance() * index}px)`;
    };

    const resetLoop = () => {
      if (index >= originalCount / visibleCount) {
        track.style.transition = 'none';
        index = 0;
        track.style.transform = 'translateX(0)';
      }
    };

    track.addEventListener('transitionend', resetLoop);
    window.addEventListener('resize', () => {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${getSlideDistance() * index}px)`;
    });

    setInterval(moveSlide, 3500);
  }
});

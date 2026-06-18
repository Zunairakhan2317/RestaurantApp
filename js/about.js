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

  // Initialize AOS (Animate On Scroll) if library is loaded
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: "ease-in-out-cubic",
    });
  }

  // ✅ Stats Counter Animation with suffix support
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // smaller = faster

  counters.forEach((counter) => {
    const suffix = counter.getAttribute("data-suffix") || "";
    const animate = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animate, 20);
      } else {
        counter.innerText = target.toLocaleString() + suffix;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(counter);
  });
});

// Card scrolling with improved UX
const container = document.getElementById("cards");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// Function to check if arrows should be visible
const updateArrowVisibility = () => {
  if (!container || !nextBtn || !prevBtn) return;

  const scrollLeft = container.scrollLeft;
  const scrollWidth = container.scrollWidth;
  const clientWidth = container.clientWidth;

  // Show/hide prev button
  prevBtn.style.opacity = scrollLeft > 10 ? "0.7" : "0.3";

  // Show/hide next button
  nextBtn.style.opacity =
    scrollLeft < scrollWidth - clientWidth - 10 ? "0.7" : "0.3";
};

// Function to scroll cards
const scrollCards = (direction) => {
  if (!container) return;

  const cardWidth = 220; // Card width + gap
  const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time

  container.scrollBy({
    left: direction === "next" ? scrollAmount : -scrollAmount,
    behavior: "smooth",
  });

  // Update arrow visibility after scrolling
  setTimeout(updateArrowVisibility, 300);
};

// Initialize event listeners
if (nextBtn && prevBtn && container) {
  // Button click events
  nextBtn.addEventListener("click", () => scrollCards("next"));
  prevBtn.addEventListener("click", () => scrollCards("prev"));

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  container.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - scroll right
        scrollCards("next");
      } else {
        // Swipe right - scroll left
        scrollCards("prev");
      }
    }
  };

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") scrollCards("next");
    if (e.key === "ArrowLeft") scrollCards("prev");
  });

  // Update arrow visibility on scroll
  container.addEventListener("scroll", updateArrowVisibility);

  // Initial arrow visibility
  updateArrowVisibility();

  // Update on window resize
  window.addEventListener("resize", updateArrowVisibility);
}

// Add hover effect delay for cards to prevent flickering on mobile
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  let hoverTimeout;

  card.addEventListener("mouseenter", () => {
    hoverTimeout = setTimeout(() => {
      card.style.transform = "translateY(-8px) scale(1.02)";
    }, 100);
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimeout);
    card.style.transform = "";
  });

  // Touch devices: add active state
  card.addEventListener("touchstart", () => {
    card.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("touchend", () => {
    setTimeout(() => {
      card.style.transform = "";
    }, 300);
  });
});

// Form submission handling
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const button = form.querySelector("button");

    if (emailInput && emailInput.value) {
      // Save original button text
      const originalText = button.textContent;

      // Show loading state
      button.textContent = "Sending...";
      button.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Show success state
        button.textContent = "✓ Sent!";
        button.style.background = "#2ecc71";

        // Reset after 2 seconds
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          button.style.background = "";
          emailInput.value = "";
        }, 2000);
      }, 1000);
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

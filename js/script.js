// scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ====== MENU HAMBURGUER ======
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('.menu-toggle i');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  // Alterna o ícone entre "menu" e "x"
  if (menuIcon.classList.contains('bx-menu')) {
    menuIcon.classList.replace('bx-menu', 'bx-x');
  } else {
    menuIcon.classList.replace('bx-x', 'bx-menu');
  }
});

// carossel
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const dotsNav = document.querySelector(".carousel-dots");

  const slidesPerView = 4;
  const totalGroups = Math.ceil(slides.length / slidesPerView);
  let currentGroup = 0;

  // Garante que o slideWidth seja calculado corretamente após o DOM carregar
  // (Verifique se slides[0] existe)
  if (slides.length === 0) return;

  const slideWidth = slides[0].getBoundingClientRect().width + 20; // 20px de margem/gap
  const groupWidth = slideWidth * slidesPerView;

  const autoplayIntervalTime = 5000; // 5 segundos
  let autoplayTimer;

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      moveToGroup(currentGroup + 1);
    }, autoplayIntervalTime);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${groupWidth * currentGroup}px)`;
    dots.forEach((dot, i) => {
      dot.innerHTML = i === currentGroup ? "★" : "☆";
    });
  }

  function moveToGroup(index) {
    currentGroup = (index + totalGroups) % totalGroups;
    updateCarousel();
  }

  // Cria as estrelas (Dots)
  const dots = Array.from({ length: totalGroups }).map((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.innerHTML = i === 0 ? "★" : "☆";
    dot.addEventListener("click", () => {
      moveToGroup(i);
      resetAutoplay();
    });
    dotsNav.appendChild(dot);
    return dot;
  });

  nextButton.addEventListener("click", () => {
    moveToGroup(currentGroup + 1);
    resetAutoplay();
  });

  prevButton.addEventListener("click", () => {
    moveToGroup(currentGroup - 1);
    resetAutoplay();
  });


  startAutoplay();

  updateCarousel();
});

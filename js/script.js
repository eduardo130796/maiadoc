// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});


// script.js

// Caminho da imagem (mude se preciso)
const heroImagePath = '../img/fachada_1.webp';
const placeholder = '../img/fachada.webp'; // coloque uma alternativa pequena

function setHeroBackground(path) {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Pré-carregar
  const img = new Image();
  img.src = path;

  img.onload = () => {
    // Aplica com transição suave
    hero.style.transition = 'background-image 0.6s ease-in-out, filter 0.6s ease';
    hero.style.backgroundImage = `url('${path}')`;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
    hero.classList.add('hero-loaded'); // para retirar blur no CSS
  };

  img.onerror = () => {
    // Em caso de erro, usa placeholder
    hero.style.backgroundImage = `url('${placeholder}')`;
    console.warn('Falha ao carregar a imagem principal. Usando fallback.');
  };
}

// Executa quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  setHeroBackground(heroImagePath);
});

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  // ===== Rolagem suave e correção de deslocamento =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const targetPosition = targetElement.offsetTop - navbarHeight + 5;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // ===== (Opcional) Destaque no menu conforme a rolagem =====
  const sections = document.querySelectorAll("section[id]");
  const menuLinks = document.querySelectorAll(".navbar a[href^='#']");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 90;
      if (scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });
});

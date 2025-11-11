import React, { useEffect, useRef, useState } from "react";
import "./quarto.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    const items = carousel.querySelectorAll(".carousel-item");
    let autoScrollInterval;

    function getItemFullWidth() {
      const item = items[0];
      if (!item) return 0;
      const itemWidth = item.getBoundingClientRect().width;
      const gapValue = parseFloat(getComputedStyle(carousel).getPropertyValue("gap")) || 0;
      return itemWidth + gapValue;
    }

    function updateCarousel() {
      const width = getItemFullWidth();
      const offset = -currentIndex * width;
      carousel.style.transform = `translateX(${offset}px)`;
    }

    function nextSlide() {
      setCurrentIndex((prev) => (prev >= items.length - 1 ? 0 : prev + 1));
    }

    function startAutoScroll() {
      clearInterval(autoScrollInterval);
      if (window.innerWidth > 768) {
        autoScrollInterval = setInterval(nextSlide, 5000);
      }
    }

    updateCarousel();
    startAutoScroll();

    window.addEventListener("resize", () => {
      updateCarousel();
      startAutoScroll();
    });

    return () => clearInterval(autoScrollInterval);
  }, [currentIndex]);

  return (
    <div>
      {/* HEADER */}
      <header className="main-header">
        <nav className="navbar">
          <div className="logo">BLUEN</div>
          <ul className="nav-links">
            <li><a href="#">SERVIÇOS</a></li>
            <li><a href="#">PROJETOS</a></li>
            <li><a href="#">CONTATE-NOS</a></li>
          </ul>
          <div className="menu-toggle">
            <i className="fas fa-bars"></i>
          </div>
        </nav>

        <div className="hero-content">
          <p className="project-tag">PROJETO EM DESTAQUE</p>
          <h1 className="hero-title">Quartos</h1>
        </div>
      </header>

      {/* CARROSSEL */}
      <section className="projects-carousel-section">
        <div className="carousel-header">
          <h2 className="section-title">Nossos Projetos de Quartos</h2>
          <a href="#" className="btn-ver-tudo">VER TUDO</a>
        </div>

        <div className="carousel-container">
          <button
            className="nav-btn prev-btn"
            aria-label="Anterior"
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="project-carousel" ref={carouselRef}>
            <div className="carousel-item">
              <img src="/imagens/quarto2.jpeg" alt="Quarto Sereno" />
              <div className="project-info">
                <h3>Quarto Sereno</h3>
                <p>Foco no relaxamento com cinzas suaves e azul pastel. Ambiente tranquilo e minimalista.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="/imagens/quarto3.jpeg" alt="Quarto Urbano Chic" />
              <div className="project-info">
                <h3>Quarto Urbano Chic</h3>
                <p>Estilo moderno com cinza grafite/chumbo e azul marinho profundo. Elegância e personalidade.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="/imagens/quarto4.jpeg" alt="Quarto Luxuoso" />
              <div className="project-info">
                <h3>Quarto Luxuoso</h3>
                <p>Conforto e opulência com cinzas escuros e azul royal/elétrico em tecidos de veludo. Toques de brilho.</p>
              </div>
            </div>
          </div>

          <button
            className="nav-btn next-btn"
            aria-label="Próximo"
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-bluen">
        <div className="footer-grid">
          <div className="col-info">
            <h2>BLUEN</h2>
            <h3>SOBRE NÓS</h3>
            <p>
              Na Bluen, acreditamos que cada espaço conta uma história — e a nossa missão é ajudar você a contá-la da melhor forma.
              Combinamos design inteligente, funcionalidade e estética para criar ambientes que refletem quem você é e como você vive.
              Seja transformando lares ou repensando espaços de trabalho, nosso foco é unir beleza, conforto e propósito em cada projeto.
              Bluen — design que inspira, transforma e acolhe.
            </p>
          </div>

          <div className="col-social col-separator">
            <h3>NOS SIGA</h3>
            <ul>
              <li><a href="#"><i className="fab fa-instagram"></i> @bluen</a></li>
              <li><a href="#"><i className="fab fa-facebook-f"></i> @bluenbook</a></li>
              <li><a href="#"><i className="fab fa-linkedin-in"></i> @bluein</a></li>
              <li><a href="#"><i className="fab fa-youtube"></i> @blueen</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

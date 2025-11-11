import React, { useEffect, useRef, useState } from "react";
import "./garagem.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    const items = carousel.querySelectorAll(".carousel-item");
    const itemScrollDuration = 5000;
    let autoScrollInterval;

    function getItemFullWidth() {
      const item = items[0];
      if (!item) return 0;
      const itemWidth = item.getBoundingClientRect().width;
      const gapStyle = getComputedStyle(carousel).getPropertyValue("gap");
      const gapValue = gapStyle ? parseFloat(gapStyle) : 0;
      return itemWidth + gapValue;
    }

    function updateCarousel() {
      const width = getItemFullWidth();
      const offset = -currentIndex * width;
      carousel.style.transform = `translateX(${offset}px)`;
    }

    function nextSlide() {
      setCurrentIndex((prevIndex) =>
        prevIndex >= items.length - 1 ? 0 : prevIndex + 1
      );
    }

    function startAutoScroll() {
      clearInterval(autoScrollInterval);
      if (window.innerWidth > 768) {
        autoScrollInterval = setInterval(nextSlide, itemScrollDuration);
      }
    }

    startAutoScroll();
    updateCarousel();

    carousel.addEventListener("mouseover", () => clearInterval(autoScrollInterval));
    carousel.addEventListener("mouseout", startAutoScroll);

    window.addEventListener("resize", () => {
      updateCarousel();
      startAutoScroll();
    });

    return () => {
      clearInterval(autoScrollInterval);
      window.removeEventListener("resize", updateCarousel);
    };
  }, [currentIndex]);

  return (
    <div>
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
          <h1 className="hero-title">Garagem</h1>
        </div>
      </header>

      <section className="projects-carousel-section">
        <div className="carousel-header">
          <h2 className="section-title">Nossos Projetos da nossa Garagem</h2>
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
              <img src="/imagens/garagem2.jpeg" alt="Garagem Showroom" />
              <div className="project-info">
                <h3>Garagem Showroom</h3>
                <p>
                  Design moderno e minimalista com cinza brilhante no piso e azul vibrante na iluminação, destacando o carro.
                </p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="/imagens/garagem3.jpeg" alt="Garagem Man Cave Integrada" />
              <div className="project-info">
                <h3>Garagem Man Cave Integrada</h3>
                <p>
                  Combina espaço para o carro com área de lazer. Cinza grafite e azul confortável nos estofados.
                </p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="/imagens/garagem4.jpeg" alt="Garagem Industrial-Chique" />
              <div className="project-info">
                <h3>Garagem Industrial-Chique</h3>
                <p>
                  Estilo robusto com cinza de tijolos/concreto e toques de azul-cobalto em detalhes funcionais.
                </p>
              </div>
            </div>
          </div>

          <button
            className="nav-btn next-btn"
            aria-label="Próximo"
            onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, 2))}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

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

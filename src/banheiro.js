import React, { useEffect, useRef, useState } from "react";
import "./banheiro.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemScrollDuration = 5000;
  const autoScrollRef = useRef(null);

  const updateCarousel = () => {
    const carousel = carouselRef.current;
    const items = carousel.querySelectorAll(".carousel-item");
    const item = items[0];
    if (!item) return;

    const itemWidth = item.getBoundingClientRect().width;
    const gapStyle = getComputedStyle(carousel).getPropertyValue("gap");
    const gapValue = gapStyle ? parseFloat(gapStyle) : 0;
    const width = itemWidth + gapValue;

    const offset = -currentIndex * width;
    carousel.style.transform = `translateX(${offset}px)`;
  };

  const nextSlide = () => {
    const items = carouselRef.current.querySelectorAll(".carousel-item");
    setCurrentIndex((prev) =>
      prev >= items.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const startAutoScroll = () => {
    clearInterval(autoScrollRef.current);
    if (window.innerWidth > 768) {
      autoScrollRef.current = setInterval(nextSlide, itemScrollDuration);
    }
  };

  useEffect(() => {
    updateCarousel();
  }, [currentIndex]);

  useEffect(() => {
    startAutoScroll();
    window.addEventListener("resize", () => {
      updateCarousel();
      startAutoScroll();
    });

    const carousel = carouselRef.current;
    carousel.addEventListener("mouseover", () =>
      clearInterval(autoScrollRef.current)
    );
    carousel.addEventListener("mouseout", startAutoScroll);

    return () => {
      clearInterval(autoScrollRef.current);
      window.removeEventListener("resize", updateCarousel);
    };
  }, []);

  return (
    <>
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
          <h1 className="hero-title">Banheiro</h1>
        </div>
      </header>

      <section className="projects-carousel-section">
        <div className="carousel-header">
          <h2 className="section-title">Nossos Projetos de banheiros</h2>
          <a href="#" className="btn-ver-tudo">VER TUDO</a>
        </div>

        <div className="carousel-container">
          <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Anterior">
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="project-carousel" ref={carouselRef}>
            <div className="carousel-item">
              <img src="/imagens/banheiro2.jpeg" alt="Banheiro Refúgio" />
              <div className="project-info">
                <h3>Banheiro Refúgio</h3>
                <p>
                  Elegância e calma com cinza claro/mármore e toques serenos de azul-marinho em gabinetes.
                </p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="/imagens/banheiro3.jpeg" alt="Luxo Contemporâneo" />
              <div className="project-info">
                <h3>Luxo Contemporâneo</h3>
                <p>
                  Visual dramático usando cinza chumbo e toques de azul royal/petróleo em acessórios e iluminação.
                </p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="/imagens/banheiro4.jpeg" alt="Banheiro Urbano Chic" />
              <div className="project-info">
                <h3>Banheiro Urbano Chic</h3>
                <p>
                  Moderno e funcional com base em cinza cimento e toques refrescantes de azul-celeste em nichos e detalhes.
                </p>
              </div>
            </div>
          </div>

          <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Próximo">
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
    </>
  );
}

export default App;

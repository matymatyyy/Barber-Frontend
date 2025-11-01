import { useState, useEffect } from "react";

const SLIDES_DATA = [
  {
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600",
    subtitle: "No es solo un corte, es una experiencia",
    title: "Ser barbero es cuidar\nde las personas",
    description: "Nuestra barbería es el territorio creado para hombres que aprecian la calidad premium y un aspecto impecable."
  },
  {
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1600",
    subtitle: "Estilo Clásico y Afeitados",
    title: "Nuestros estilos\nmejoran tu sonrisa",
    description: "Ambiente y técnica profesional para un resultado impecable."
  },
  {
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1600",
    subtitle: "No es solo un corte, es una experiencia",
    title: "Donde los hombres quieren\nverse en su mejor versión",
    description: "Servicio premium y atención personalizada en cada visita."
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-slider" id="home">
      {SLIDES_DATA.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-content">
            <h3>{slide.subtitle}</h3>
            <h1>{slide.title.split('\n').map((line, i) => (
              <span key={i}>{line}{i < slide.title.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p>{slide.description}</p>
            <a href="/reservation" className="btn">
              <span>Reservar Turno</span>
            </a>
          </div>
        </div>
      ))}

      <div className="slider-dots">
        {SLIDES_DATA.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

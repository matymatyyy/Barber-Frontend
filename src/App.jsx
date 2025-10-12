import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  const goToLogin = () => {
    navigate("/login");
  };

  //hay que descargar las imagenes y usarlas de forma local
  const slides = [
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

  const testimonials = [
    {
      text: "Excelente servicio y atención profesional. El mejor corte que he tenido en años. Totalmente recomendado.",
      author: "Anita Tran, Cliente Satisfecha"
    },
    {
      text: "Ambiente increíble y barberos expertos. Siempre salgo sintiéndome renovado y con un estilo impecable.",
      author: "Leslie Williamson, Cliente Regular"
    },
    {
      text: "La mejor barbería de la ciudad. Atención personalizada y resultados perfectos cada vez.",
      author: "Fred Moody, Cliente Regular"
    }
  ];

  const services = [
    { icon: "✂️", title: "Cortes de Cabello", description: "Estilos clásicos y modernos adaptados a tu personalidad y estilo de vida. Nuestros expertos te asesorarán en el mejor corte." },
    { icon: "💈", title: "Recorte de Barba", description: "Perfilado profesional para mantener tu barba con estilo impecable. Técnicas tradicionales y productos premium." },
    { icon: "🪒", title: "Afeitado Suave", description: "Afeitado tradicional con toalla caliente y productos premium. Una experiencia relajante y revitalizante." }
  ];

  const team = [
    { name: "Matias Cirulli", role: "Barbero Senior", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200" },
    { name: "Joaco Sosa", role: "Especialista en Barba", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200" },
    { name: "Mati Schettino", role: "Barbero Tradicional", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=1200" }
  ];

  const pricing = [
    {
      category: "Estilismo de Cabello",
      items: [
        { name: "Corte de Cabello", desc: "Corte profesional adaptado a tu estilo.", price: "$8000" },
        { name: "Peinado", desc: "Estilizado y acabado perfecto.", price: "$9000" },
        { name: "Recorte", desc: "Mantenimiento y perfilado.", price: "$10000" }
      ]
    },
    {
      category: "Afeitado",
      items: [
        { name: "Afeitado Completo", desc: "Afeitado tradicional con toalla caliente.", price: "$8000" },
        { name: "Recorte de Barba", desc: "Perfilado y mantenimiento de barba.", price: "$9000" },
        { name: "Afeitado Suave", desc: "Acabado perfecto y cuidado de la piel.", price: "$10000" }
      ]
    }
  ];

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderVisible(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Slider automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Testimonial automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      setHeaderScrolled(scrollY > 100);
      setShowScrollTop(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // Si estamos en una ruta hija (login, register, home), solo mostrar el Outlet
  if (location.pathname !== '/') {
    return <Outlet />;
  }

  return (
    <>
      {/* Preloader */}
      {preloaderVisible && (
        <div className="preloader">
          <div className="loader"></div>
        </div>
      )}

      {/* HEADER */}
      <header className={headerScrolled ? "scrolled" : ""}>
        <nav>
          <a href="#home" className="logo">BARBER SHOP</a>

          <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
            <li><a href="#home" onClick={(e) => handleNavClick(e, "home")}>Inicio</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, "about")}>Nosotros</a></li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, "services")}>Servicios</a></li>
            <li><a href="#team" onClick={(e) => handleNavClick(e, "team")}>Equipo</a></li>
            <li><a href="#pricing" onClick={(e) => handleNavClick(e, "pricing")}>Precios</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>Contacto</a></li>
          </ul>

          <button className="menu-btn" onClick={() => navigate("/login")}>
            <span>Reservar Turno</span>
          </button>
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </nav>
      </header>

      {/* HERO SLIDER */}
      <div className="hero-slider" id="home">
        {slides.map((slide, index) => (
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
              <a href="#contact" className="btn" onClick={(e) => handleNavClick(e, "contact")}>
                <span>Reservar Turno</span>
              </a>
            </div>
          </div>
        ))}

        <div className="slider-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h3>Presentamos</h3>
              <h2>La Barbería<br />Desde 2025</h2>
              <p>Un barbero es una persona cuya ocupación principal es cortar, vestir, arreglar y afeitar el cabello de hombres y niños. El lugar de trabajo de un barbero se conoce como "barbería". Las barberías también son lugares de interacción social y discusión.</p>
              <p>En algunos casos, las barberías también son foros públicos donde se discuten temas de actualidad y se comparten experiencias que fortalecen la comunidad.</p>
              <a href="#services" className="btn" onClick={(e) => handleNavClick(e, "services")}>
                <span>Más sobre nosotros</span>
              </a>
            </div>

            <div className="about-images">
              <div className="about-img"></div>
              <div className="about-img"></div>
              <div className="about-img"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-grey" id="services">
        <div className="container">
          <div className="section-heading">
            <h2>Nuestros Servicios</h2>
            <div className="heading-line"></div>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-box">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING / CONTACT */}
      <section className="booking-section" id="contact">
        <div className="container" style={{ textAlign: "center", color: "#fff" }}>
          <div className="section-heading">
            <h3 style={{ color: "var(--gold)" }}>Reserva tu cita</h3>
            <h2 style={{ color: "#fff" }}>Contáctanos</h2>
            <div className="heading-line"></div>
          </div>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Email: contacto@barbershop.com</p>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Tel: +54 2352551599</p>
          <button className="btn" onClick={() => navigate("/login")}>
            <span>Reservar Turno Online</span>
          </button>
        </div>
      </section>

      {/* TEAM */}
      <section id="team">
        <div className="container">
          <div className="section-heading">
            <h3>Conoce a nuestro equipo</h3>
            <h2>Nuestros Barberos</h2>
            <div className="heading-line"></div>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div
                  className="team-member-img"
                  style={{ backgroundImage: `url(${member.image})` }}
                ></div>
                <div className="team-overlay">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section">
        <div className="container">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-item ${index === currentTestimonial ? "active" : ""}`}
            >
              <p>"{testimonial.text}"</p>
              <h4>{testimonial.author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-grey" id="pricing">
        <div className="container">
          <div className="section-heading">
            <h3>Precios accesibles</h3>
            <h2>Nuestros Precios</h2>
            <div className="heading-line"></div>
          </div>

          <div className="pricing-grid">
            {pricing.map((category, index) => (
              <div key={index} className="price-wrap">
                <h3>{category.category}</h3>
                <ul className="price-list">
                  {category.items.map((item, idx) => (
                    <li key={idx}>
                      <h4>{item.name}</h4>
                      <p>{item.desc}</p>
                      <span className="price">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Hacerte Ver Bien<br />Está En Nuestro ADN</h2>
          <p>Nuestra barbería es el territorio creado para hombres que aprecian la calidad premium, el tiempo y un aspecto impecable.</p>
          <a href="#contact" className="btn" onClick={(e) => handleNavClick(e, "contact")}>
            <span>Reservar Turno</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-widget">
              <h3>BARBER SHOP</h3>
              <p>Nuestra barbería está creada para personas que aprecian la calidad premium, el tiempo y un aspecto impecable.</p>
              <ul className="social-links">
                <li><a href="#">f</a></li>
                <li><a href="#">t</a></li>
                <li><a href="#">in</a></li>
                <li><a href="#">ig</a></li>
              </ul>
            </div>

            <div className="footer-widget">
              <h3>Locación</h3>
              <p>UTN<br />Edificio nuevo</p>
              <p>info@barbershop.com<br />2352 551599</p>
            </div>

            <div className="footer-widget">
              <h3>Horarios de Atención</h3>
              <p>Lunes - Viernes: 11:30am - 8:00pm<br />Sábado - Domingo: 9am - 8pm</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Barber Shop. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        className={`scroll-top ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        ↑
      </button>

      <Outlet />
    </>
  );
}
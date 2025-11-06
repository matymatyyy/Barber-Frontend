import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.pageYOffset > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuth();

    window.addEventListener('storage', checkAuth);

    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const isHome = location.pathname === '/';

    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      navigate("/reservation");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={headerScrolled ? "scrolled" : ""}>
      <nav>
        <a href="#" className="logo" onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}>BARBER SHOP</a>

        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li><a href="#home" onClick={(e) => handleNavClick(e, "home")}>Inicio</a></li>
          <li><a href="#about" onClick={(e) => handleNavClick(e, "about")}>Nosotros</a></li>
          <li><a href="#services" onClick={(e) => handleNavClick(e, "services")}>Servicios</a></li>
          <li><a href="#team" onClick={(e) => handleNavClick(e, "team")}>Equipo</a></li>
          <li><a href="#pricing" onClick={(e) => handleNavClick(e, "pricing")}>Precios</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>Contacto</a></li>
        </ul>

        <button className="menu-btn" onClick={handleAuthButtonClick}>
          <span>{isLoggedIn ? "Reservar Turno" : "Iniciar Sesión"}</span>
        </button>
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </nav>
    </header>
  );
}

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToLogin = () => {
    navigate("/login");
  };

  // Si estamos en una ruta hija (login, register, home), solo mostrar el Outlet
  if (location.pathname !== '/') {
    return <Outlet />;
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
            Barber - Shop
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#Cosas">
                  Cosas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#Productos">
                  Productos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#servicios">
                  Servicios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#galeria">
                  Galería
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contacto">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1>Tu barbería de confianza,<br />donde el corte es tradición y familia</h1>
          <p className="lead">
            Nos gusta que te sientas como en casa: cortes clásicos, modernos y productos pensados para vos y tu familia.
          </p>
          <button className="btn btn-hero" onClick={goToLogin}>
            Reservar tu turno
          </button>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Nuestros Servicios</h2>
          <div className="row">
            <div className="col-md-4">
              <img src="public/images/corte.jpg" alt="Corte" className="img-uniforme" />
              <h5 className="mt-2">Cortes modernos</h5>
            </div>
            <div className="col-md-4">
              <img src="public/images/barba.jpg" alt="Barba" className="img-uniforme" />
              <h5 className="mt-2">Arreglo de barba</h5>
            </div>
            <div className="col-md-4">
              <img src="public/images/tintura.jpg" alt="Tintura" className="img-uniforme" />
              <h5 className="mt-2">Tintura profesional</h5>
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-5 bg-dark text-center">
        <div className="container">
          <h2 className="mb-4">Galería de Trabajos</h2>
          <div className="row">
            <div className="col-md-3 mb-3">
              <img src="public/images/barbershopdos.webp" alt="Galería 1" className="img-uniforme" />
            </div>
            <div className="col-md-3 mb-3">
              <img src="public/images/barbershoptres.jpg" alt="Galería 2" className="img-uniforme" />
            </div>
            <div className="col-md-3 mb-3">
              <img src="public/images/cortetres.jpg" alt="Galería 3" className="img-uniforme" />
            </div>
            <div className="col-md-3 mb-3">
              <img src="public/images/tinturauno.jpg" alt="Galería 4" className="img-uniforme" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Contáctanos</h2>
          <p>Email: contacto@barbershop.com</p>
          <p>Tel: +54 11 5555-5555</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-3 bg-dark text-light">
        <p>&copy; 2025 Barber Shop. Todos los derechos reservados.</p>
      </footer>

      {/* Outlet para renderizar las rutas hijas */}
      <Outlet />
    </>
  );
}
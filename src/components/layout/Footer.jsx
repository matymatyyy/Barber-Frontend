export default function Footer() {
  return (
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
            <p>Martes - Sabado: 11:30am - 8:00pm<br />Sábado - Domingo: 9am - 8pm</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Barber Shop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

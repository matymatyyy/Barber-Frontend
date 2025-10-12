export default function CTA({ onNavClick }) {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Hacerte Ver Bien<br />Está En Nuestro ADN</h2>
        <p>Nuestra barbería es el territorio creado para hombres que aprecian la calidad premium, el tiempo y un aspecto impecable.</p>
        <a href="#contact" className="btn" onClick={(e) => onNavClick(e, "contact")}>
          <span>Reservar Turno</span>
        </a>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h3>Presentamos</h3>
            <h2>La Barbería<br />Desde 2025</h2>
            <p>Un barbero es una persona cuya ocupación principal es cortar, vestir, arreglar y afeitar el cabello de hombres y niños. El lugar de trabajo de un barbero se conoce como "barbería". Las barberías también son lugares de interacción social y discusión.</p>
            <p>En algunos casos, las barberías también son foros públicos donde se discuten temas de actualidad y se comparten experiencias que fortalecen la comunidad.</p>
            <a href="/ubicacion" className="btn">
              <span>Nuestra ubicacion</span>
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
  );
}

import SectionHeading from "../common/SectionHeading";

const SERVICES_DATA = [
  { icon: "✂️", title: "Cortes de Cabello", description: "Estilos clásicos y modernos adaptados a tu personalidad y estilo de vida. Nuestros expertos te asesorarán en el mejor corte." },
  { icon: "💈", title: "Recorte de Barba", description: "Perfilado profesional para mantener tu barba con estilo impecable. Técnicas tradicionales y productos premium." },
  { icon: "🪒", title: "Afeitado Suave", description: "Afeitado tradicional con toalla caliente y productos premium. Una experiencia relajante y revitalizante." }
];

export default function Services() {
  return (
    <section className="bg-grey" id="services">
      <div className="container">
        <SectionHeading title="Nuestros Servicios" />

        <div className="services-grid">
          {SERVICES_DATA.map((service, index) => (
            <div key={index} className="service-box">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import SectionHeading from "../common/SectionHeading";

const PRICING_DATA = [
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

export default function Pricing() {
  return (
    <section className="bg-grey" id="pricing">
      <div className="container">
        <SectionHeading subtitle="Precios accesibles" title="Nuestros Precios" />

        <div className="pricing-grid">
          {PRICING_DATA.map((category, index) => (
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
  );
}

import SectionHeading from "../common/SectionHeading";

const TEAM_DATA = [
  { name: "Matias Cirulli", role: "Barbero Senior", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200" },
  { name: "Joaco Sosa", role: "Especialista en Barba", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200" },
  { name: "Mati Schettino", role: "Barbero Tradicional", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=1200" }
];

export default function Team() {
  return (
    <section id="team">
      <div className="container">
        <SectionHeading subtitle="Conoce a nuestro equipo" title="Nuestros Barberos" />

        <div className="team-grid">
          {TEAM_DATA.map((member, index) => (
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
  );
}

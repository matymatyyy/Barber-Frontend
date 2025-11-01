import { useNavigate } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <section className="booking-section" id="contact">
      <div className="container" style={{ textAlign: "center", color: "#fff" }}>
        <SectionHeading subtitle="Reserva tu cita" title="Contáctanos" />
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Email: contacto@barbershop.com</p>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Tel: +54 2352551599</p>
        <button className="btn" onClick={() => navigate("/reservation")}>
          <span>Reservar Turno Online</span>
        </button>
      </div>
    </section>
  );
}

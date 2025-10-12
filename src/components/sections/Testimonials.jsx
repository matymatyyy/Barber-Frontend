import { useState, useEffect } from "react";

const TESTIMONIALS_DATA = [
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

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonial-section">
      <div className="container">
        {TESTIMONIALS_DATA.map((testimonial, index) => (
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
  );
}

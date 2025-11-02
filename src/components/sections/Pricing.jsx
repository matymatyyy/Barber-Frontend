import { useState, useEffect } from "react";
import SectionHeading from "../common/SectionHeading";

export default function Pricing() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:91/services');
        
        if (!response.ok) {
          throw new Error('Error al cargar los servicios');
        }
        
        const result = await response.json();
        setServices(result.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="bg-grey" id="pricing">
        <div className="container">
          <SectionHeading subtitle="Precios accesibles" title="Nuestros Precios" />
          <div className="text-center">
            <p>Cargando servicios...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-grey" id="pricing">
        <div className="container">
          <SectionHeading subtitle="Precios accesibles" title="Nuestros Precios" />
          <div className="text-center">
            <p>Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-grey" id="pricing">
      <div className="container">
        <SectionHeading subtitle="Precios accesibles" title="Nuestros Precios" />

        <div className="pricing-grid">
          <div className="price-wrap">
            <h3>Servicios de Barbería</h3>
            <ul className="price-list">
              {services.map((service) => (
                <li key={service.id}>
                  <h4>{service.type}</h4>
                  <span className="price">${service.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

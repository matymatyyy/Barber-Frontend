import ServiceCard from "./ServiceCard";

export default function ServiceList({ services }) {
  if (!services || services.length === 0) {
    return <p>No se encontraron dominios</p>;
  }

  return (
    <div style={{ display: "grid", gap: "15px" }}>
      {services.map(service => <ServiceCard key={service.id} service={service} />)}
    </div>
  );
}
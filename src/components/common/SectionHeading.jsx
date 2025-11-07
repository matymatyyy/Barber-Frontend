export default function SectionHeading({ subtitle, title }) {
  return (
    <div className="section-heading">
      {subtitle && <h3>{subtitle}</h3>}
      <h1>{title}</h1>
    </div>
  );
}
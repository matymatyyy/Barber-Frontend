export default function SectionHeading({ subtitle, title }) {
  return (
    <div className="section-heading">
      {subtitle && <h3>{subtitle}</h3>}
      <h2>{title}</h2>
      <div className="heading-line"></div>
    </div>
  );
}
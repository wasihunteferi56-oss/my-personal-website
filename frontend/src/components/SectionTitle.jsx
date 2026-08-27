export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="section-title-wrap reveal">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

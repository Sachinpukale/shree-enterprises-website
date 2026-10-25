export default function TrustStrip({ items, label = "Highlights" }) {
  return (
    <section className="trust-strip" aria-label={label}>
      <div className="page-container">
        <div className="trust-strip-grid">
          {items.map((item) => (
            <div className="trust-item" key={item.title}>
              <i className={`bi ${item.icon}`} aria-hidden="true" />
              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
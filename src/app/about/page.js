import Link from "next/link";

export const metadata = {
  title: "About Us | Shree Enterprises - Pune",
  description:
    "Learn more about Shree Enterprises in Ambegaon Kh, Pune. Your trusted partner for electrical wiring, water purification systems, building maintenance, and elevator servicing.",
};

const values = [
  {
    icon: "bi-shield-check",
    title: "Safety & Compliance First",
    description:
      "All electrical, elevator, and plumbing tasks strictly adhere to standard safety protocols and use certified, load-tested materials.",
  },
  {
    icon: "bi-droplet-half",
    title: "Pure Water, Healthy Lives",
    description:
      "We believe clean drinking water is a fundamental right. We ensure every RO and UV system delivers safe, laboratory-quality TDS levels.",
  },
  {
    icon: "bi-cash-coin",
    title: "Transparent & Fair Estimates",
    description:
      "No inflated quotes or hidden charges. We assess the actual problem, explain the options clearly, and provide upfront pricing.",
  },
  {
    icon: "bi-clock-history",
    title: "Rapid Emergency Response",
    description:
      "Electrical tripping, purifier water leaks, or elevator breakdowns can't wait. Our localized team in Pune responds with high urgency.",
  },
];

const milestones = [
  { count: "10+", label: "Years Combined Experience" },
  { count: "1,200+", label: "Service Calls Completed" },
  { count: "450+", label: "Commercial & Home Clients" },
  { count: "100%", label: "Genuine Parts Guarantee" },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container py-4">
          <span className="hero-badge mb-3">
            <i className="bi bi-info-circle me-2" />
            WHO WE ARE
          </span>
          <h1 className="hero-title mx-auto mt-3">
            Dedicated to Quality, <span>Committed to You.</span>
          </h1>
          <p className="hero-description mx-auto mt-3">
            Shree Enterprises was founded to provide homeowners, societies, and businesses in Pune
            with a single, dependable partner for all their essential facility and maintenance needs.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="section-label">OUR STORY</span>
              <h2 className="display-6 fw-bold mt-2 text-dark">
                Bringing Engineering Excellence to Everyday Service.
              </h2>
              <p className="text-secondary mt-3" style={{ lineHeight: "1.9" }}>
                Finding reliable, punctual, and technically competent service professionals in Pune
                has traditionally been frustrating. Property owners often struggle dealing with
                multiple unverified technicians for electrical repairs, water purifier servicing,
                building upkeep, and lift maintenance.
              </p>
              <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                <strong>Shree Enterprises</strong> was established in Ambegaon Kh, Pune to bridge
                that gap. By combining multi-trade engineering skills under one roof, we provide
                end-to-end technical support with verified technicians, genuine spares, and guaranteed
                workmanship.
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">
                <Link href="/services" className="btn btn-primary rounded-pill px-4 py-2">
                  Explore Our Services
                </Link>
                <Link href="/contact" className="btn btn-outline-primary rounded-pill px-4 py-2">
                  Contact Our Team
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="p-5 rounded-4 shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #f5f8fc 0%, #eaf1f8 100%)",
                  border: "1px solid #dce6f0",
                }}
              >
                <h3 className="h4 fw-bold text-dark mb-4">
                  <i className="bi bi-patch-check-fill text-warning me-2" />
                  Our Mission & Promise
                </h3>
                <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
                  To deliver seamless, safe, and cost-effective electrical, water purification, and
                  building engineering services that protect our clients&apos; properties and enhance
                  their day-to-day comfort.
                </p>

                <div className="border-top pt-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-geo-alt-fill text-primary fs-4 me-3" />
                    <div>
                      <h4 className="h6 fw-bold mb-0 text-dark">Operating Center</h4>
                      <p className="text-muted small mb-0">Ambegaon Kh, Pune, Maharashtra 411046</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <i className="bi bi-telephone-fill text-success fs-4 me-3" />
                    <div>
                      <h4 className="h6 fw-bold mb-0 text-dark">Direct Support Line</h4>
                      <p className="text-muted small mb-0">86260 95720 / 86696 25720</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Counter Section */}
      <section className="py-5" style={{ background: "var(--primary-dark)", color: "#fff" }}>
        <div className="container">
          <div className="row g-4 text-center">
            {milestones.map((m, idx) => (
              <div className="col-6 col-lg-3" key={idx}>
                <div className="p-3">
                  <div className="display-5 fw-bold text-warning mb-1">{m.count}</div>
                  <div className="text-light small text-uppercase tracking-wider">{m.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-heading text-center mb-5">
            <span className="section-label">WHAT DRIVES US</span>
            <h2>Our Core Values</h2>
            <p>The guiding principles behind every project and service call we undertake.</p>
          </div>

          <div className="row g-4">
            {values.map((v, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="service-card p-4 h-100 shadow-sm border-0">
                  <div className="service-icon mb-3">
                    <i className={`bi ${v.icon}`} />
                  </div>
                  <h3 className="h5 fw-bold text-dark">{v.title}</h3>
                  <p className="text-secondary small mt-2 mb-0">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Coverage in Pune */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="section-label">LOCAL SERVICE COVERAGE</span>
              <h2 className="display-6 fw-bold mt-2 text-dark">Proudly Serving Across Pune</h2>
              <p className="text-secondary mt-3">
                Our technicians are stationed strategically to ensure prompt on-site attendance.
                Whether you need immediate help in southern Pune or surrounding hubs, our team is
                just a phone call away.
              </p>
              <div className="row g-2 mt-2">
                {[
                  "Ambegaon Kh & Bk",
                  "Katraj & Kondhwa",
                  "Kothrud & Karve Nagar",
                  "Dhankawadi & Bibwewadi",
                  "Sinhagad Road",
                  "Wakad & Hinjewadi",
                  "Hadapsar & Magarpatta",
                  "Baner & Balewadi",
                ].map((area, idx) => (
                  <div className="col-sm-6" key={idx}>
                    <div className="d-flex align-items-center p-2 rounded bg-light">
                      <i className="bi bi-pin-map-fill text-warning me-2" />
                      <span className="small fw-semibold text-dark">{area}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <div className="p-5 border rounded-4 bg-white shadow-sm">
                <i className="bi bi-clock-fill text-primary display-4 mb-3" />
                <h3 className="h4 fw-bold text-dark">Working Hours</h3>
                <p className="text-muted small">We are available 7 days a week for your convenience.</p>
                <div className="list-group list-group-flush text-start mt-3">
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span>Monday - Saturday:</span>
                    <strong className="text-dark">8:00 AM - 8:30 PM</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span>Sunday:</span>
                    <strong className="text-dark">9:00 AM - 6:00 PM</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span>Emergency Breakdown:</span>
                    <strong className="text-danger">24/7 Priority Support</strong>
                  </div>
                </div>

                <a
                  href="tel:8626095720"
                  className="btn btn-warning w-100 rounded-pill mt-4 fw-bold py-2"
                >
                  <i className="bi bi-telephone-outbound me-2" /> Call for Assistance
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

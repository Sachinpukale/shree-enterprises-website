"use client";

import Link from "next/link";
import HeroWave from "@/components/Herowave";
import TrustStrip from "@/components/Truststrip";
import useScrollReveal from "@/hooks/Usescrollreveal";
import { site } from "@/data/Site";
import "@/css/services.css";

const highlights = [
  {
    icon: "bi-patch-check-fill",
    title: "10+ Years Combined Experience",
    text: "Multi-trade engineering background across Pune",
  },
  {
    icon: "bi-shield-check",
    title: "Safety & Compliance First",
    text: "Strict electrical & elevator safety protocols",
  },
  {
    icon: "bi-box-seam-fill",
    title: "100% Genuine Spares",
    text: "Certified factory components with warranty",
  },
  {
    icon: "bi-headset",
    title: "Rapid Pune Response",
    text: "Strategic on-site technician attendance",
  },
];

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
    icon: "bi-receipt-cutoff",
    title: "Transparent & Fair Estimates",
    description:
      "No inflated quotes or hidden charges. We assess the actual problem, explain options clearly, and provide upfront pricing.",
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

const serviceAreas = [
  "Ambegaon Kh & Bk",
  "Katraj & Kondhwa",
  "Kothrud & Karve Nagar",
  "Dhankawadi & Bibwewadi",
  "Sinhagad Road",
  "Wakad & Hinjewadi",
  "Hadapsar & Magarpatta",
  "Baner & Balewadi",
];

export default function AboutPage() {
  useScrollReveal();

  return (
    <main>
      {/* ── Hero Section Matching Services & Offers ── */}
      <section className="hero-section sv-hero">
        <div className="page-container">
          <nav aria-label="Breadcrumb" className="sv-breadcrumb">
            <Link href="/">Home</Link>
            <i className="bi bi-chevron-right" aria-hidden="true" />
            <span aria-current="page">About Us</span>
          </nav>

          <span className="hero-badge">
            <i className="bi bi-shield-check me-2" aria-hidden="true" />
            Dedicated to Quality & Safety
          </span>

          <h1 className="hero-title mt-4">
            Engineering excellence built on <span>integrity & trust.</span>
          </h1>
          <p className="hero-description mt-3">
            Founded in Ambegaon Kh, Pune, Shree Enterprises is your single dependable partner for
            certified electrical installations, RO water systems, elevator AMC, and turnkey
            facility maintenance.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link
              href="/services"
              className="btn btn-warning btn-lg rounded-pill px-4 shadow-sm"
            >
              Explore Our Services <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
            </Link>
            <a
              href={site.phoneHref}
              className="btn btn-outline-light btn-lg rounded-pill px-4"
              style={{ borderColor: "rgba(255,255,255,0.5)" }}
            >
              <i className="bi bi-telephone me-2" aria-hidden="true" />
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
        <HeroWave />
      </section>

      {/* Trust Standards Strip */}
      <TrustStrip items={highlights} label="Our company standards" />

      {/* ── Company Story & Mission Section ── */}
      <section className="section-padding">
        <div className="page-container">
          <div className="row align-items-center g-5">
            {/* Story */}
            <div className="col-lg-6 reveal-left">
              <span className="section-label">OUR JOURNEY</span>
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
                  View Our Services
                </Link>
                <Link href="/contact" className="btn btn-outline-primary rounded-pill px-4 py-2">
                  Contact Our Team
                </Link>
              </div>
            </div>

            {/* Mission & Hub Card */}
            <div className="col-lg-6 reveal-right">
              <div
                className="p-4 p-md-5 rounded-4 shadow-sm bg-white"
                style={{ border: "1px solid #e4eaf1" }}
              >
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="service-icon mb-0 flex-shrink-0"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <i className="bi bi-patch-check-fill text-warning fs-4" />
                  </div>
                  <div>
                    <span className="section-label mb-0">OUR PROMISE</span>
                    <h3 className="h5 fw-bold text-dark mb-0">Committed to Perfection</h3>
                  </div>
                </div>

                <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
                  To deliver seamless, safe, and cost-effective electrical, water purification, and
                  building engineering services that protect our clients&apos; properties and enhance
                  their day-to-day comfort.
                </p>

                <div className="border-top pt-4">
                  <div className="d-flex align-items-start mb-3 gap-3">
                    <div
                      className="service-icon mb-0 flex-shrink-0"
                      style={{ width: "42px", height: "42px", fontSize: "1.2rem" }}
                    >
                      <i className="bi bi-geo-alt-fill text-primary" />
                    </div>
                    <div>
                      <h4 className="h6 fw-bold mb-1 text-dark">Operating Center</h4>
                      <p className="text-muted small mb-0">
                        {site.location}, Maharashtra 411046
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div
                      className="service-icon mb-0 flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        fontSize: "1.2rem",
                        background: "#e8f5e9",
                      }}
                    >
                      <i className="bi bi-telephone-fill text-success" />
                    </div>
                    <div>
                      <h4 className="h6 fw-bold mb-1 text-dark">Direct Support Line</h4>
                      <p className="text-muted small mb-0">
                        <a href={site.phoneHref} className="text-primary fw-semibold">
                          {site.phoneDisplay}
                        </a>{" "}
                        / 86696 25720
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Metrics Counter ── */}
      <section className="section-padding py-0">
        <div className="page-container">
          <div
            className="p-4 p-md-5 rounded-4 shadow-sm text-center reveal-on-scroll"
            style={{
              background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div className="row g-4">
              {milestones.map((m, idx) => (
                <div className="col-6 col-lg-3" key={idx}>
                  <div className="p-2">
                    <div
                      className="display-5 fw-bold mb-1"
                      style={{ color: "var(--secondary-color)" }}
                    >
                      {m.count}
                    </div>
                    <div className="text-light small text-uppercase fw-semibold tracking-wider">
                      {m.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values Section ── */}
      <section className="section-padding bg-light">
        <div className="page-container">
          <div className="section-heading text-center mb-5 reveal-on-scroll">
            <span className="section-label">WHAT DEFINES US</span>
            <h2>Our Core Values</h2>
            <p>The guiding principles behind every project and service call we undertake.</p>
          </div>

          <div className="row g-4">
            {values.map((v, idx) => (
              <div className="col-md-6 col-lg-3 reveal-on-scroll" key={idx}>
                <article className="service-card h-100">
                  <div className="service-icon">
                    <i className={`bi ${v.icon}`} aria-hidden="true" />
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Coverage in Pune ── */}
      <section className="section-padding">
        <div className="page-container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 reveal-left">
              <span className="section-label">LOCAL SERVICE COVERAGE</span>
              <h2 className="display-6 fw-bold mt-2 text-dark">Proudly Serving Across Pune</h2>
              <p className="text-secondary mt-3">
                Our technicians are stationed strategically to ensure prompt on-site attendance.
                Whether you need immediate help in southern Pune or surrounding hubs, our team is
                just a phone call away.
              </p>
              <div className="row g-2 mt-3">
                {serviceAreas.map((area, idx) => (
                  <div className="col-sm-6" key={idx}>
                    <div className="d-flex align-items-center p-2.5 rounded-3 bg-light border">
                      <i className="bi bi-pin-map-fill text-warning me-2" />
                      <span className="small fw-semibold text-dark">{area}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="col-lg-6 reveal-right">
              <div
                className="p-4 p-md-5 rounded-4 bg-white shadow-sm text-center"
                style={{ border: "1px solid #e4eaf1" }}
              >
                <div
                  className="service-icon mx-auto mb-3"
                  style={{ width: "64px", height: "64px", fontSize: "1.8rem" }}
                >
                  <i className="bi bi-clock-fill" />
                </div>
                <h3 className="h4 fw-bold text-dark">Working Hours</h3>
                <p className="text-muted small">We are available 7 days a week for your convenience.</p>
                <div className="list-group list-group-flush text-start mt-3">
                  <div className="list-group-item d-flex justify-content-between px-0 py-2.5">
                    <span className="text-secondary">Monday - Saturday:</span>
                    <strong className="text-dark">8:00 AM - 8:30 PM</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0 py-2.5">
                    <span className="text-secondary">Sunday:</span>
                    <strong className="text-dark">9:00 AM - 6:00 PM</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0 py-2.5">
                    <span className="text-secondary">Emergency Breakdown:</span>
                    <strong className="text-danger fw-bold">24/7 Priority Support</strong>
                  </div>
                </div>

                <a
                  href={site.phoneHref}
                  className="btn btn-warning w-100 rounded-pill mt-4 fw-bold py-2.5"
                >
                  <i className="bi bi-telephone-outbound me-2" /> Call for Assistance
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Quote / Maintenance Banner ── */}
      <section className="section-padding pt-0">
        <div className="page-container">
          <div className="offer-banner reveal-on-scroll">
            <div>
              <span className="offer-label">NEED A RELIABLE PARTNER?</span>
              <h2>Ready to Upgrade Your Property Care?</h2>
              <p className="mb-0">
                Whether you need a domestic RO service, society elevator AMC, or turnkey commercial
                electricals, our Pune team is ready to inspect and deliver.
              </p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <Link href="/services" className="btn btn-warning rounded-pill px-4 py-2 fw-semibold">
                View All Services
              </Link>
              <a
                href={site.phoneHref}
                className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold"
              >
                <i className="bi bi-telephone me-1" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

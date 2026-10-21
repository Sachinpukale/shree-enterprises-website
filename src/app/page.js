'use client';

import { useState } from "react";
import EnquiryForm from "@/components/EnquiryForm";

const services = [
  {
    icon: "bi-lightning-charge-fill",
    title: "Electrical Wiring",
    description:
      "New wiring, rewiring, DB installation, lighting solutions and electrical repairs.",
  },
  {
    icon: "bi-droplet-fill",
    title: "Water Purification",
    description:
      "RO systems, UV and UF purifiers, water filters and maintenance services.",
  },
  {
    icon: "bi-building",
    title: "Residential & Commercial",
    description:
      "Electrical and plumbing support for homes, offices, shops and industrial units.",
  },
  {
    icon: "bi-arrow-up-square-fill",
    title: "Elevator Maintenance",
    description:
      "Regular maintenance, safety checks and breakdown support for elevators.",
  },
];

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main>
      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="hero-badge">
                <i className="bi bi-patch-check-fill me-2" />
                Your Trusted Service Partner
              </span>

              <h1 className="hero-title mt-4">
                Reliable Solutions for <span>Every Space.</span>
              </h1>

              <p className="hero-description mt-3">
                From electrical wiring and water purification to building
                support and elevator maintenance, Shree Enterprises helps
                keep your spaces running smoothly.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                {/* FIXED: Changed from <a> to <button> with proper click handler */}
                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="btn btn-warning btn-lg rounded-pill px-4"
                >
                  Get an Enquiry <i className="bi bi-arrow-right ms-2" />
                </button>

                <a href="tel:8626095720" className="btn btn-outline-light btn-lg rounded-pill px-4">
                  <i className="bi bi-telephone me-2" />
                  Call Us
                </a>
              </div>

              <div className="hero-note mt-4">
                <i className="bi bi-geo-alt-fill me-2" />
                Proudly serving Ambegaon Kh, Pune
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-visual">
                <div className="hero-visual-icon">
                  <i className="bi bi-tools" />
                </div>
                <p className="visual-eyebrow">SHREE ENTERPRISES</p>
                <h2>Quality Service.<br />Lasting Solutions.</h2>
                <div className="visual-line" />
                <p className="mb-0">
                  Electrical · Water · Maintenance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-label">WHAT WE DO</span>
            <h2>Our Services</h2>
            <p>
              Practical solutions to meet your home and business needs.
            </p>
          </div>

          <div className="row g-4 mt-3">
            {services.map((service) => (
              <div className="col-sm-6 col-lg-3" key={service.title}>
                <article className="service-card h-100">
                  <div className="service-icon">
                    <i className={`bi ${service.icon}`} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="/services" className="service-link">
                    Explore service <i className="bi bi-arrow-right ms-1" />
                  </a>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="benefits-section section-padding">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="section-label">WHY SHREE ENTERPRISES</span>
              <h2 className="display-6 fw-bold mt-3">
                One trusted partner for your service needs.
              </h2>
              <p className="text-secondary mt-3">
                We bring multiple essential services together, making it
                easier to find support for your home, office or business.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="benefit-item">
                <i className="bi bi-check-circle-fill" />
                <div>
                  <h3>Multiple Services</h3>
                  <p>Electrical, purification and maintenance solutions.</p>
                </div>
              </div>

              <div className="benefit-item">
                <i className="bi bi-chat-dots-fill" />
                <div>
                  <h3>Easy Enquiries</h3>
                  <p>Contact us by phone or WhatsApp for your requirements.</p>
                </div>
              </div>

              <div className="benefit-item">
                <i className="bi bi-house-check-fill" />
                <div>
                  <h3>Residential & Commercial</h3>
                  <p>Services for different types of properties and spaces.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="section-padding">
        <div className="container">
          <div className="offer-banner">
            <div>
              <span className="offer-label">SPECIAL OFFERS</span>
              <h2>Looking for the right solution?</h2>
              <p className="mb-0">
                Contact us to discuss your service needs and available offers.
              </p>
            </div>
            <a href="/offers" className="btn btn-warning rounded-pill px-4">
              View Offers <i className="bi bi-arrow-right ms-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact-section section-padding">
        <div className="container text-center">
          <span className="section-label">LET'S CONNECT</span>
          <h2>Need help with a service?</h2>
          <p>
            Tell us what you need. We’ll help you take the next step.
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
            {/* FIXED: Changed from <a> to <button> with proper arrow function handler */}
            <button
              type="button"
              className="btn btn-primary btn-lg rounded-pill px-4"
              style={{ cursor: "pointer" }}
              onClick={() => setIsFormOpen(true)}
            >
              Send an Enquiry
            </button>
            <a href="tel:8626095720" className="btn btn-outline-primary btn-lg rounded-pill px-4">
              <i className="bi bi-telephone me-2" /> 86260 95720
            </a>
          </div>
        </div>
      </section>

      {/* Modal Popup Wrapper Layout */}
      {isFormOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
          onClick={() => setIsFormOpen(false)}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "white",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* FIXED: Restored complete styles for Close 'X' Button */}
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                background: "none",
                border: "none",
                fontSize: "1.75rem",
                cursor: "pointer",
                color: "#aaa",
                zIndex: 1051,
                lineHeight: 1
              }}
            >
              &times;
            </button>

            <div style={{ marginTop: "-1rem" }}>
              <EnquiryForm 
                isOpen = {isFormOpen} onClose={() => setIsFormOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

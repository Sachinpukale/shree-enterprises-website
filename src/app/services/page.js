"use client";

import { useState } from "react";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";

const serviceCategories = [
  {
    id: "electrical",
    icon: "bi-lightning-charge-fill",
    badge: "Most Requested",
    title: "Electrical Wiring & Power Solutions",
    tagline: "Safe, compliant, and durable electrical work for homes and commercial setups.",
    description:
      "Whether you are constructing a new property, renovating an office, or fixing recurring electrical tripping, our certified electricians deliver precision installations and prompt fault troubleshooting.",
    features: [
      "Complete home & commercial rewiring and conduit piping",
      "Distribution Board (DB) setup with MCB & RCCB shock protection",
      "Architectural lighting, LED panels, and designer switches",
      "Dedicated heavy-load circuits for ACs, geysers, and appliances",
      "Earthing pit installation and electrical safety audits",
      "Short-circuit diagnostics and emergency fuse replacements",
    ],
  },
  {
    id: "water",
    icon: "bi-droplet-fill",
    badge: "Health & Purity",
    title: "Water Purification & RO Plants",
    tagline: "Clean, mineral-rich drinking water for families and workplaces.",
    description:
      "We provide end-to-end water treatment solutions ranging from kitchen RO systems to high-capacity commercial plants, ensuring crystal-clear water with optimal TDS balance.",
    features: [
      "Domestic RO, UV, and UF water purifier installation & relocation",
      "Commercial RO plants (25 LPH, 50 LPH, 100+ LPH) for offices & cafes",
      "Filter cartridge replacements (Sediment, Pre-Carbon, Mineralizer)",
      "High-rejection RO membrane replacement & booster pump repair",
      "Water TDS testing and hardness reduction treatment",
      "Comprehensive Annual Maintenance Contracts (AMC) with free visits",
    ],
  },
  {
    id: "commercial",
    icon: "bi-building-gear",
    badge: "Facility Support",
    title: "Residential & Commercial Maintenance",
    tagline: "Turnkey property maintenance to keep your premises running seamlessly.",
    description:
      "Avoid coordinating with multiple individual contractors. Shree Enterprises handles routine electrical, plumbing, and facility care for housing societies, retail stores, and commercial buildings.",
    features: [
      "Housing society maintenance contracts & scheduled inspections",
      "Office electrical fitting, data cabling conduit, and lighting upkeep",
      "Pump room automation, water level controllers & starter panel wiring",
      "Plumbing leak detection, valve replacements, and drain clearances",
      "Preventive scheduled maintenance to avert costly downtime",
      "Prompt on-call technician support across Pune",
    ],
  },
  {
    id: "elevator",
    icon: "bi-arrow-up-square-fill",
    badge: "Certified Safety",
    title: "Elevator Maintenance & Safety Inspections",
    tagline: "Smooth, quiet, and safe vertical transport with zero compromises.",
    description:
      "We partner with building committees and property managers to provide regular elevator servicing, safety certifications, and rapid breakdown response.",
    features: [
      "Monthly scheduled lift servicing, lubrication & mechanical adjustments",
      "Automatic Rescue Device (ARD) inspection & emergency battery checks",
      "Lift door sensor alignment, motor drive checks, and cable wear audits",
      "Elevator cabin aesthetic touchups, push button & indicator repairs",
      "Compliance safety audits per regulatory elevator norms",
      "24/7 emergency lift breakdown and passenger rescue support",
    ],
  },
];

const workSteps = [
  {
    step: "01",
    title: "Share Your Requirement",
    description: "Submit an online enquiry or call us directly with details about your issue or project.",
  },
  {
    step: "02",
    title: "Inspection & Estimate",
    description: "Our experienced technician visits your site in Pune for an honest, upfront quotation.",
  },
  {
    step: "03",
    title: "Quality Execution",
    description: "Work is executed using genuine materials, certified tools, and strict safety guidelines.",
  },
  {
    step: "04",
    title: "Testing & Support",
    description: "We test every installation thoroughly and back our service with friendly follow-up support.",
  },
];

export default function ServicesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenForm = (serviceName) => {
    setSelectedService(serviceName || "");
    setIsFormOpen(true);
  };

  return (
    <main>
      {/* Page Header */}
      <section className="hero-section text-center py-5">
        <div className="container py-4">
          <span className="hero-badge mb-3">
            <i className="bi bi-gear-wide-connected me-2" />
            OUR CORE EXPERTISE
          </span>
          <h1 className="hero-title mx-auto mt-3">
            Professional Services Built for <span>Longevity & Safety</span>
          </h1>
          <p className="hero-description mx-auto mt-3">
            From electrical infrastructure and purified drinking water to comprehensive facility
            upkeep and elevator servicing, we deliver trusted solutions across Pune.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <button
              type="button"
              className="btn btn-warning btn-lg rounded-pill px-4"
              onClick={() => handleOpenForm("General Service Enquiry")}
            >
              Book a Service <i className="bi bi-arrow-right ms-2" />
            </button>
            <a href="tel:8626095720" className="btn btn-outline-light btn-lg rounded-pill px-4">
              <i className="bi bi-telephone me-2" /> Call 86260 95720
            </a>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-heading text-center mb-5">
            <span className="section-label">SPECIALIZED SERVICES</span>
            <h2>What We Offer</h2>
            <p>
              Explore our four specialized service verticals designed for homeowners,
              commercial enterprises, and residential societies.
            </p>
          </div>

          <div className="row g-4">
            {serviceCategories.map((service, idx) => (
              <div className="col-lg-6" key={service.id}>
                <div className="service-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between shadow-sm">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="service-icon mb-0">
                        <i className={`bi ${service.icon}`} />
                      </div>
                      <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-semibold">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="h4 fw-bold mt-3 text-dark">{service.title}</h3>
                    <p className="text-muted small fw-medium mb-3">{service.tagline}</p>
                    <p className="text-secondary">{service.description}</p>

                    <h4 className="h6 fw-bold text-dark mt-4 mb-3">Key Inclusions:</h4>
                    <ul className="list-unstyled mb-4">
                      {service.features.map((item, fIdx) => (
                        <li key={fIdx} className="d-flex align-items-start mb-2 text-secondary">
                          <i className="bi bi-check2-circle text-primary me-2 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-top d-flex gap-2 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-primary rounded-pill px-4"
                      onClick={() => handleOpenForm(service.title)}
                    >
                      Enquire for this Service
                    </button>
                    <a
                      href="https://wa.me/918626095720"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success rounded-pill px-3"
                    >
                      <i className="bi bi-whatsapp me-1" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Process */}
      <section className="section-padding">
        <div className="container">
          <div className="section-heading text-center mb-5">
            <span className="section-label">SIMPLE & TRANSPARENT</span>
            <h2>How It Works</h2>
            <p>Getting your service done with Shree Enterprises takes just four hassle-free steps.</p>
          </div>

          <div className="row g-4">
            {workSteps.map((step) => (
              <div className="col-md-6 col-lg-3" key={step.step}>
                <div className="p-4 border rounded-4 text-center h-100 bg-white shadow-sm position-relative">
                  <div
                    className="fw-black text-warning display-5 mb-2 fw-bold"
                    style={{ opacity: 0.8 }}
                  >
                    {step.step}
                  </div>
                  <h3 className="h5 fw-bold text-dark mb-2">{step.title}</h3>
                  <p className="text-secondary small mb-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Book CTA */}
      <section className="contact-section section-padding border-top">
        <div className="container text-center">
          <span className="section-label">GET STARTED TODAY</span>
          <h2>Have a Specific Service Requirement?</h2>
          <p className="mx-auto" style={{ maxWidth: "600px" }}>
            Reach out to Shree Enterprises. We provide quick phone consultations, accurate pricing,
            and prompt on-site support across Pune.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <button
              type="button"
              className="btn btn-primary btn-lg rounded-pill px-4"
              onClick={() => handleOpenForm("Custom Service Request")}
            >
              Book an Appointment
            </button>
            <Link href="/contact" className="btn btn-outline-primary btn-lg rounded-pill px-4">
              Visit Contact Page
            </Link>
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
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              &times;
            </button>

            <div style={{ marginTop: "-1rem" }}>
              <EnquiryForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                defaultService={selectedService}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

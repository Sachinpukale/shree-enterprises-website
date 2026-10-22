"use client";

import { useState } from "react";
import EnquiryForm from "@/components/EnquiryForm";

const galleryCategories = [
  { id: "all", label: "All Projects" },
  { id: "electrical", label: "Electrical" },
  { id: "water", label: "Water RO" },
  { id: "elevator", label: "Elevators" },
  { id: "commercial", label: "Commercial" },
];

const projects = [
  {
    id: 1,
    category: "electrical",
    title: "Concealed Wiring & DB Panel Upgrade",
    location: "Ambegaon Kh, Pune",
    type: "Residential 3BHK",
    icon: "bi-lightning-charge-fill",
    color: "#eaf1f8",
    description:
      "Installed multi-strand FRLS copper wiring, dual-door distribution board with 30mA RCCB shock prevention, and concealed conduit circuits.",
    result: "100% safety certified with zero voltage drop.",
  },
  {
    id: 2,
    category: "water",
    title: "100 LPH Commercial RO Water Plant",
    location: "Hinjewadi Phase 1, Pune",
    type: "IT Workplace & Cafeteria",
    icon: "bi-droplet-fill",
    color: "#e3f2fd",
    description:
      "Engineered an automated stainless steel skid RO plant with dual pressure gauges, micron filtration, and mineral replenishment system.",
    result: "TDS reduced from 750 ppm to healthy 85 ppm.",
  },
  {
    id: 3,
    category: "elevator",
    title: "Society Elevator Overhaul & ARD Installation",
    location: "Kothrud, Pune",
    type: "Cooperative Housing Society",
    icon: "bi-arrow-up-square-fill",
    color: "#fff3e0",
    description:
      "Retrofit modern Automatic Rescue Device (ARD), replaced worn traveling cables, aligned landing door interlocks, and lubricated guide rails.",
    result: "Passed society safety audit with smooth, silent operation.",
  },
  {
    id: 4,
    category: "commercial",
    title: "Retail Store Electrical & Power Distribution",
    location: "Sinhagad Road, Pune",
    type: "Commercial Showroom",
    icon: "bi-shop",
    color: "#ede7f6",
    description:
      "Full illumination wiring with track lights, display LED strips, emergency submeter installation, and heavy AC line distribution.",
    result: "Completed turnkey project in 48 hours before store launch.",
  },
  {
    id: 5,
    category: "water",
    title: "Alkaline RO System Installation & AMC",
    location: "Katraj, Pune",
    type: "Apartment Villa",
    icon: "bi-water",
    color: "#e0f2f1",
    description:
      "Installed a premium under-sink alkaline water purifier with high-rejection 100 GPD membrane and smart faucet integration.",
    result: "Enrolled in annual AMC with automatic filter alerts.",
  },
  {
    id: 6,
    category: "electrical",
    title: "Substation Earthing & Surge Protection",
    location: "Bibwewadi, Pune",
    type: "Commercial Complex",
    icon: "bi-shield-check",
    color: "#fbe9e7",
    description:
      "Constructed chemical earthing pit with low resistance copper electrode, protecting sensitive equipment from grid surges.",
    result: "Earthing resistance measured safely below 1.2 ohms.",
  },
];

const testimonials = [
  {
    name: "Rajesh Kulkarni",
    area: "Ambegaon Kh, Pune",
    review:
      "Shree Enterprises completely rewired our bungalow. Their electricians were polite, extremely knowledgeable, and finished the work with zero mess. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amit Deshmukh",
    area: "Sinhagad Road, Pune",
    review:
      "We took their RO AMC for our apartment building water plant. The water quality is tested regularly and we haven't faced a single breakdown in over 18 months.",
    rating: 5,
  },
  {
    name: "Sunil Shinde",
    area: "Katraj, Pune",
    review:
      "Our society elevator stopped working suddenly. The Shree Enterprises technician arrived within 45 minutes, replaced the faulty sensor, and restored service immediately.",
    rating: 5,
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main>
      {/* Hero Header */}
      <section className="hero-section text-center py-5">
        <div className="container py-4">
          <span className="hero-badge mb-3">
            <i className="bi bi-images me-2" />
            WORK & PORTFOLIO
          </span>
          <h1 className="hero-title mx-auto mt-3">
            Our Completed Projects & <span>Proven Results</span>
          </h1>
          <p className="hero-description mx-auto mt-3">
            A snapshot of our electrical installations, water purification plants, elevator
            modernizations, and commercial facility setups across Pune.
          </p>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="section-padding bg-light">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`btn rounded-pill px-4 py-2 fw-semibold ${
                  activeCategory === cat.id ? "btn-primary" : "btn-outline-secondary bg-white"
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Project Cards */}
          <div className="row g-4">
            {filteredProjects.map((item) => (
              <div className="col-md-6 col-lg-4" key={item.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden p-4 bg-white d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="rounded-4 p-4 mb-3 text-center d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: item.color,
                        height: "140px",
                        border: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      <i className={`bi ${item.icon} text-primary display-4`} />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-light text-primary border small px-2 py-1">
                        {item.type}
                      </span>
                      <span className="text-muted small">
                        <i className="bi bi-geo-alt-fill text-danger me-1" />
                        {item.location}
                      </span>
                    </div>

                    <h3 className="h5 fw-bold text-dark mt-2 mb-2">{item.title}</h3>
                    <p className="text-secondary small mb-3" style={{ lineHeight: "1.7" }}>
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-top">
                    <div className="d-flex align-items-start text-success small fw-semibold">
                      <i className="bi bi-check-circle-fill me-2 mt-1 flex-shrink-0" />
                      <span>{item.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-heading text-center mb-5">
            <span className="section-label">CLIENT VOICES</span>
            <h2>What Pune Residents Say</h2>
            <p>Read real experiences from property owners and society managers who trust Shree Enterprises.</p>
          </div>

          <div className="row g-4">
            {testimonials.map((t, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="p-4 border rounded-4 bg-white shadow-sm h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="text-warning mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <i className="bi bi-star-fill me-1" key={i} />
                      ))}
                    </div>
                    <p className="text-secondary small fst-italic mb-4" style={{ lineHeight: "1.8" }}>
                      &ldquo;{t.review}&rdquo;
                    </p>
                  </div>
                  <div className="border-top pt-3">
                    <h4 className="h6 fw-bold mb-0 text-dark">{t.name}</h4>
                    <p className="text-muted small mb-0">{t.area}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="contact-section section-padding border-top">
        <div className="container text-center">
          <span className="section-label">START YOUR PROJECT</span>
          <h2>Ready to Experience Reliable Service?</h2>
          <p className="mx-auto" style={{ maxWidth: "600px" }}>
            Reach out to our engineering team today for an on-site visit and genuine estimate for
            your property.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <button
              type="button"
              className="btn btn-primary btn-lg rounded-pill px-4"
              onClick={() => setIsFormOpen(true)}
            >
              Get a Fast Quote
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
                defaultService="Project Enquiry from Gallery"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

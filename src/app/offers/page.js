"use client";

import { useState } from "react";
import EnquiryForm from "@/components/EnquiryForm";

const promotionalOffers = [
  {
    id: "ro-amc",
    tag: "MOST POPULAR",
    tagColor: "bg-warning text-dark",
    title: "Complete RO Purifier Annual AMC Plan",
    savings: "Save up to 30%",
    validity: "Valid for Pune Residents",
    description:
      "Keep your family drinking clean, bacteria-free water all year round without worrying about sudden repair bills or filter replacement charges.",
    inclusions: [
      "3 Scheduled periodic service visits per year",
      "Free 1 complete set of Sediment & Activated Carbon filter cartridges",
      "Periodic TDS, pH & water hardness checks",
      "Unlimited emergency breakdown calls with zero inspection fee",
      "10% discount on major spare parts (RO Membrane, Booster Pump)",
    ],
    idealFor: "All domestic water purifier brands",
  },
  {
    id: "electrical-audit",
    tag: "SAFETY FIRST",
    tagColor: "bg-danger text-white",
    title: "Home Electrical Safety & Earthing Audit",
    savings: "Special Festive Package",
    validity: "Limited Time Offer",
    description:
      "Avoid electrical fires and unexpected short-circuits. Have an expert engineer test your entire home's wiring, earthing resistance, and load distribution.",
    inclusions: [
      "Comprehensive digital earthing pit resistance measurement",
      "Main Distribution Board (DB) & MCB load balancing check",
      "Inspection of heavy-load lines (AC, Refrigerator, Microwave, Geysers)",
      "Identification of loose wiring, voltage drops & thermal hotspots",
      "Detailed written safety report with recommended fixes",
    ],
    idealFor: "Independent homes, apartments & older buildings",
  },
  {
    id: "society-combo",
    tag: "BEST VALUE FOR SOCIETIES",
    tagColor: "bg-primary text-white",
    title: "Housing Society Facility Care Combo",
    savings: "Save 25% on Joint AMC",
    validity: "Ambegaon Kh & Surrounding Pune",
    description:
      "Why manage separate contractors? Combine society elevator servicing, water pump room automation, and common area lighting into one hassle-free package.",
    inclusions: [
      "Monthly elevator safety, lubrication, and ARD battery maintenance",
      "Water pump automation & overhead water tank level sensor upkeep",
      "Staircase, parking & compound light maintenance",
      "Single point of contact for society management committees",
      "Priority 24/7 emergency response for lift breakdowns",
    ],
    idealFor: "Cooperative Housing Societies & Apartment Complexes",
  },
  {
    id: "commercial-setup",
    tag: "BUSINESS SOLUTION",
    tagColor: "bg-dark text-white",
    title: "New Office / Shop Turnkey Setup",
    savings: "Flat 15% Off Total Estimate",
    validity: "Valid on combined contracts",
    description:
      "Moving into a new commercial space? Get complete electrical wiring, architectural LED illumination, and commercial drinking water installation in one bundle.",
    inclusions: [
      "Complete electrical conduit piping & modular workstations wiring",
      "High-capacity commercial RO plant installation",
      "Submeter & DB panel installation with surge arrestors",
      "Free post-setup inspection & 6-month service guarantee",
    ],
    idealFor: "Retail stores, offices, clinics & cafes",
  },
];

export default function OffersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState("");

  const handleClaim = (offerTitle) => {
    setSelectedOffer(offerTitle);
    setIsFormOpen(true);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container py-4">
          <span className="hero-badge mb-3">
            <i className="bi bi-tag-fill me-2" />
            SPECIAL PACKAGES & DEALS
          </span>
          <h1 className="hero-title mx-auto mt-3">
            Premium Services at <span>Unmatched Value</span>
          </h1>
          <p className="hero-description mx-auto mt-3">
            Explore our curated maintenance packages and seasonal service discounts designed to
            protect your equipment while saving you money.
          </p>
        </div>
      </section>

      {/* Offers List */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-heading text-center mb-5">
            <span className="section-label">CURRENT PROMOTIONS</span>
            <h2>Exclusive Packages for Pune</h2>
            <p>
              Take advantage of our limited-time maintenance bundles for homes, societies, and
              commercial spaces.
            </p>
          </div>

          <div className="row g-4">
            {promotionalOffers.map((offer) => (
              <div className="col-lg-6" key={offer.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className={`badge px-3 py-2 rounded-pill fw-semibold ${offer.tagColor}`}>
                        {offer.tag}
                      </span>
                      <span className="badge bg-light text-secondary border px-3 py-1 rounded-pill small">
                        {offer.validity}
                      </span>
                    </div>

                    <h3 className="h4 fw-bold text-dark mt-2 mb-1">{offer.title}</h3>
                    <div className="text-warning fw-bold fs-5 mb-3">{offer.savings}</div>

                    <p className="text-secondary mb-4" style={{ lineHeight: "1.7" }}>
                      {offer.description}
                    </p>

                    <h4 className="h6 fw-bold text-dark mb-3">What&apos;s Included:</h4>
                    <ul className="list-unstyled mb-4">
                      {offer.inclusions.map((item, idx) => (
                        <li key={idx} className="d-flex align-items-start mb-2 text-secondary small">
                          <i className="bi bi-check-circle-fill text-success me-2 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-2 bg-light rounded text-muted small mb-4">
                      <strong>Best For:</strong> {offer.idealFor}
                    </div>
                  </div>

                  <div className="pt-3 border-top d-flex gap-2 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-warning rounded-pill px-4 fw-semibold"
                      onClick={() => handleClaim(offer.title)}
                    >
                      Claim This Offer <i className="bi bi-arrow-right ms-1" />
                    </button>
                    <a
                      href={`https://wa.me/918626095720?text=${encodeURIComponent(
                        `Hello Shree Enterprises, I would like to claim the offer: ${offer.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success rounded-pill px-3"
                    >
                      <i className="bi bi-whatsapp me-1" /> Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Society or Business Requirement */}
      <section className="section-padding">
        <div className="container">
          <div className="offer-banner">
            <div>
              <span className="offer-label">CUSTOM PACKAGES</span>
              <h2>Need a Custom Maintenance Package?</h2>
              <p className="mb-0">
                Are you a society chairman, office administrator, or factory owner? We formulate
                tailor-made AMC contracts matching your exact equipment and budget.
              </p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button
                type="button"
                className="btn btn-warning rounded-pill px-4 fw-semibold"
                onClick={() => handleClaim("Custom Society / Office Package")}
              >
                Request Custom Quote
              </button>
              <a href="tel:8626095720" className="btn btn-outline-primary rounded-pill px-4 fw-semibold">
                <i className="bi bi-telephone me-1" /> Call Us
              </a>
            </div>
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
                defaultService={`Offer Enquiry: ${selectedOffer}`}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

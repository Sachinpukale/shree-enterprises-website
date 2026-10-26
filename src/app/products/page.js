"use client";

import { useState } from "react";
import EnquiryModal from "@/components/Enquirymodal";

const categories = [
  { id: "all", label: "All Products" },
  { id: "water", label: "Water Purifiers & RO Spares" },
  { id: "electrical", label: "Electrical & Switchgear" },
  { id: "elevator", label: "Elevator Hardware" },
];

const products = [
  {
    id: 1,
    category: "water",
    title: "Domestic 12L RO+UV+UF Water Purifier",
    specs: "Multi-stage filtration, TDS control, copper alkaline infusion, 12L food-grade tank.",
    warranty: "1 Year Comprehensive Warranty",
    badge: "Best Seller",
    icon: "bi-droplet-fill",
    idealFor: "Apartments, Villas & Medium Families",
  },
  {
    id: 2,
    category: "water",
    title: "Commercial RO Plant (50 LPH / 100 LPH)",
    specs: "Heavy-duty SS 304 skid, dual high-pressure pumps, automatic backwash system.",
    warranty: "1 Year Commercial Warranty + Free Installation",
    badge: "Commercial Grade",
    icon: "bi-building-fill-gear",
    idealFor: "Offices, Cafes, Hostels & Small Factories",
  },
  {
    id: 3,
    category: "water",
    title: "High-Rejection RO Membrane & Booster Pump Kit",
    specs: "Certified 80/100 GPD membrane (up to 2000 ppm TDS) with 24V/36V heavy-duty SMPS & pump.",
    warranty: "6 Months Replacement Guarantee",
    badge: "100% Genuine",
    icon: "bi-cpu-fill",
    idealFor: "Replacement for all leading purifier brands",
  },
  {
    id: 4,
    category: "water",
    title: "Complete Purifier Filter Service Kit",
    specs: "5-Micron Spun Sediment Filter, Pre-Carbon, Post-Carbon block, and Mineral Cartridge.",
    warranty: "Factory Sealed Fresh Stock",
    badge: "Routine Care",
    icon: "bi-recycle",
    idealFor: "6-Month & Annual filter replacements",
  },
  {
    id: 5,
    category: "electrical",
    title: "FRLS Flame Retardant Copper Wires",
    specs: "99.9% pure electrolytic copper, multi-strand FRLS insulation (1.0 to 6.0 sq mm).",
    warranty: "ISI Marked & Certified",
    badge: "Safety Standard",
    icon: "bi-lightning-charge-fill",
    idealFor: "Full house wiring and renovation projects",
  },
  {
    id: 6,
    category: "electrical",
    title: "Distribution Boards & MCB / RCCB Units",
    specs: "Double door IP43 MCB boxes, 30mA residual current breakers (shock protection).",
    warranty: "Manufacturer Warranty Included",
    badge: "Critical Protection",
    icon: "bi-shield-shaded",
    idealFor: "Residential panels, commercial circuits",
  },
  {
    id: 7,
    category: "electrical",
    title: "Premium Modular Switches & Touch Plates",
    specs: "Fire-resistant polycarbonate build, silver-plated contacts, smooth tactile click.",
    warranty: "5-Year Manufacturer Warranty",
    badge: "Modern Living",
    icon: "bi-toggle-on",
    idealFor: "Contemporary homes & designer offices",
  },
  {
    id: 8,
    category: "elevator",
    title: "Automatic Rescue Device (ARD) Unit",
    specs: "Microcontroller-based ARD with heavy-duty backup batteries for emergency floor leveling.",
    warranty: "1 Year AMC Included",
    badge: "Lifesaving",
    icon: "bi-arrow-up-square-fill",
    idealFor: "Society lifts and commercial buildings",
  },
  {
    id: 9,
    category: "elevator",
    title: "Infrared Multi-Beam Door Safety Light Curtain",
    specs: "Full door height optical sensors detecting obstacles to prevent accidental door closure.",
    warranty: "High Durability Certified",
    badge: "Passenger Safety",
    icon: "bi-eye-fill",
    idealFor: "Passenger & hospital elevators",
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleEnquire = (productTitle) => {
    setSelectedProduct(productTitle);
    setIsFormOpen(true);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container py-4">
          <span className="hero-badge mb-3">
            <i className="bi bi-box-seam me-2" />
            GENUINE PRODUCTS & SPARES
          </span>
          <h1 className="hero-title mx-auto mt-3">
            High-Grade Equipment <span>Built for Durability</span>
          </h1>
          <p className="hero-description mx-auto mt-3">
            We supply and install genuine water purification units, electrical switchgear,
            and elevator safety components backed by manufacturer warranties.
          </p>
        </div>
      </section>

      {/* Product Filter and Grid */}
      <section className="section-padding bg-light">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`btn rounded-pill px-4 py-2 fw-semibold ${
                  selectedCategory === cat.id ? "btn-primary" : "btn-outline-secondary bg-white"
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          <div className="row g-4">
            {filteredProducts.map((prod) => (
              <div className="col-md-6 col-lg-4" key={prod.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column justify-content-between p-4 bg-white">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="service-icon mb-0" style={{ width: "48px", height: "48px" }}>
                        <i className={`bi ${prod.icon} fs-4`} />
                      </div>
                      <span className="badge bg-warning text-dark px-3 py-1 rounded-pill small fw-semibold">
                        {prod.badge}
                      </span>
                    </div>

                    <h3 className="h5 fw-bold text-dark mt-2 mb-2">{prod.title}</h3>
                    <p className="text-secondary small mb-3">{prod.specs}</p>

                    <div className="p-3 bg-light rounded-3 mb-3">
                      <div className="d-flex align-items-center text-primary small fw-semibold mb-1">
                        <i className="bi bi-shield-check me-2" />
                        <span>{prod.warranty}</span>
                      </div>
                      <div className="text-muted small">
                        <i className="bi bi-check2 me-1" />
                        <strong>Ideal For:</strong> {prod.idealFor}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-top d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-primary rounded-pill w-100 py-2 fw-semibold"
                      onClick={() => handleEnquire(prod.title)}
                    >
                      Enquire Price
                    </button>
                    <a
                      href={`https://wa.me/918626095720?text=${encodeURIComponent(
                        `Hi Shree Enterprises, I would like to inquire about: ${prod.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success rounded-pill px-3 py-2"
                      title="WhatsApp Chat"
                    >
                      <i className="bi bi-whatsapp" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Genuine Parts Assurance */}
      <section className="section-padding">
        <div className="container">
          <div
            className="p-5 rounded-4 text-white text-center"
            style={{
              background: "linear-gradient(135deg, #0a2845 0%, #123b63 100%)",
            }}
          >
            <i className="bi bi-patch-check-fill text-warning display-4 mb-3" />
            <h2 className="display-6 fw-bold text-white">100% Genuine Spare Parts Guarantee</h2>
            <p className="mx-auto mt-3 text-light" style={{ maxWidth: "650px", lineHeight: "1.8" }}>
              We never use cheap duplicate filters, unrated cables, or substandard elevator parts.
              Every component we install is sourced directly from verified distributors and inspected
              for optimal performance.
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
              <button
                type="button"
                className="btn btn-warning btn-lg rounded-pill px-4"
                onClick={() => handleEnquire("Custom Product Requirement")}
              >
                Request a Custom Quote
              </button>
              <a href="tel:8626095720" className="btn btn-outline-light btn-lg rounded-pill px-4">
                <i className="bi bi-telephone me-2" /> 86260 95720
              </a>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService={selectedProduct ? `Product Enquiry: ${selectedProduct}` : ""}
      />
    </main>
  );
}

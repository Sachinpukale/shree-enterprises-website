  "use client";

  import { useEffect, useMemo, useState } from "react";
  import EnquiryModal from "@/components/Enquirymodal";

  const WHATSAPP_NUMBER = "918626095720";
  const PHONE_NUMBER = "8626095720";

  const categories = [
    { key: "all", label: "All Offers", icon: "bi-grid-fill" },
    { key: "water", label: "Water Purifier", icon: "bi-droplet-fill" },
    { key: "electrical", label: "Electrical", icon: "bi-lightning-charge-fill" },
    { key: "society", label: "Societies", icon: "bi-buildings-fill" },
    { key: "commercial", label: "Business", icon: "bi-shop" },
  ];

  // NOTE: discount figures below are display content. Confirm them with the business before going live.
  const promotionalOffers = [
    {
      id: "ro-amc",
      category: "water",
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
      category: "electrical",
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
      category: "society",
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
      category: "commercial",
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
    {
      id: "pump-automation",
      category: "society",
      tag: "SMART UPGRADE",
      tagColor: "bg-success text-white",
      title: "Water Pump & Tank Automation Package",
      savings: "Free Site Inspection",
      validity: "Valid for Pune Societies & Bungalows",
      description:
        "Stop overflowing tanks and dry-running pumps. Automate your pump room with level sensors and protection controllers to save water and electricity.",
      inclusions: [
        "Overhead & underground tank level sensor installation",
        "Automatic pump controller with dry-run protection",
        "Starter panel check and motor load testing",
        "Cable and earthing inspection of the pump room",
        "30-day free support after installation",
      ],
      idealFor: "Societies, bungalows, row houses & small complexes",
    },
    {
      id: "led-lighting",
      category: "commercial",
      tag: "ENERGY SAVER",
      tagColor: "bg-info text-dark",
      title: "LED Lighting Upgrade for Shops & Offices",
      savings: "Cut Power Bills with LED",
      validity: "Limited Time Offer",
      description:
        "Replace old tube lights and bulbs with efficient LED lighting. Brighter spaces, lower electricity bills, and a cleaner professional look for your business.",
      inclusions: [
        "Free lighting assessment and layout suggestion",
        "Supply and fitting of LED panels, downlights & strip lights",
        "Neat concealed wiring and switchboard adjustments",
        "Old fitting removal and site cleanup",
        "Installation warranty on workmanship",
      ],
      idealFor: "Shops, showrooms, offices, clinics & godowns",
    },
  ];

  const claimSteps = [
    {
      icon: "bi-hand-index-thumb-fill",
      title: "Choose Your Offer",
      text: "Pick the package that suits your home, society or business.",
    },
    {
      icon: "bi-pencil-square",
      title: "Send an Enquiry",
      text: "Fill the short form or message us on WhatsApp with your details.",
    },
    {
      icon: "bi-telephone-inbound-fill",
      title: "We Call You Back",
      text: "Our team confirms the offer and fixes a convenient site visit.",
    },
    {
      icon: "bi-patch-check-fill",
      title: "Enjoy the Service",
      text: "A trained engineer completes the work and the offer is applied.",
    },
  ];

  const faqs = [
    {
      q: "How do I claim an offer?",
      a: "Click 'Claim This Offer', submit the enquiry form, and our team will contact you to confirm eligibility and schedule a visit. You can also message us on WhatsApp.",
    },
    {
      q: "Can I combine two offers?",
      a: "In many cases yes, especially for society and commercial bundles. Mention the offers you are interested in and we will share a combined estimate.",
    },
    {
      q: "Are the offers valid outside Pune?",
      a: "Most offers apply to Pune and nearby areas. The validity shown on each card tells you the exact service area. Contact us if you are unsure.",
    },
    {
      q: "Is there a charge for the site visit or inspection?",
      a: "Inspection and estimate details are mentioned inside each package. We always confirm any applicable charges before starting work.",
    },
  ];

  export default function OffersPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [openFaq, setOpenFaq] = useState(0);

    const visibleOffers = useMemo(
      () =>
        activeCategory === "all"
          ? promotionalOffers
          : promotionalOffers.filter((o) => o.category === activeCategory),
      [activeCategory]
    );

    const handleClaim = (offerTitle) => {
      setSelectedOffer(offerTitle);
      setIsFormOpen(true);
    };

    const closeForm = () => setIsFormOpen(false);

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
        <section className="section-padding bg-light" id="current-offers">
          <div className="container">
            <div className="section-heading text-center mb-4">
              <span className="section-label">CURRENT PROMOTIONS</span>
              <h2>Exclusive Packages for Pune</h2>
              <p>
                Take advantage of our limited-time maintenance bundles for homes, societies, and
                commercial spaces.
              </p>
            </div>

            {/* Category filter */}
            <div
              className="d-flex justify-content-center gap-2 flex-wrap mb-5"
              role="group"
              aria-label="Filter offers by category"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    aria-pressed={isActive}
                    className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                      isActive ? "btn-primary" : "btn-outline-secondary bg-white"
                    }`}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    <i className={`bi ${cat.icon} me-1`} />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <p className="text-center text-secondary small mb-4" aria-live="polite">
              Showing {visibleOffers.length} {visibleOffers.length === 1 ? "offer" : "offers"}
            </p>

            {visibleOffers.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-emoji-neutral fs-1 text-secondary" />
                <p className="text-secondary mt-2">No offers in this category right now.</p>
                <button
                  type="button"
                  className="btn btn-warning rounded-pill px-4 fw-semibold"
                  onClick={() => setActiveCategory("all")}
                >
                  View All Offers
                </button>
              </div>
            ) : (
              <div className="row g-4">
                {visibleOffers.map((offer) => (
                  <div className="col-lg-6" key={offer.id}>
                    <div className="card h-100 border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white d-flex flex-column justify-content-between">
                      <div>
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                          <span className={`badge px-3 py-2 rounded-pill fw-semibold ${offer.tagColor}`}>
                            {offer.tag}
                          </span>
                          <span className="badge bg-light text-secondary border px-3 py-1 rounded-pill small">
                            {offer.validity}
                          </span>
                        </div>

                        <h3 className="h4 fw-bold text-dark mt-2 mb-1">{offer.title}</h3>
                        <div className="fw-bold fs-5 mb-3" style={{ color: "#a56c0e" }}>{offer.savings}</div>

                        <p className="text-secondary mb-4" style={{ lineHeight: "1.7" }}>
                          {offer.description}
                        </p>

                        <h4 className="h6 fw-bold text-dark mb-3">What&apos;s Included:</h4>
                        <ul className="list-unstyled mb-4">
                          {offer.inclusions.map((item) => (
                            <li key={item} className="d-flex align-items-start mb-2 text-secondary small">
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
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
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
            )}
          </div>
        </section>

        {/* How to claim */}
        <section className="section-padding">
          <div className="container">
            <div className="section-heading text-center mb-5">
              <span className="section-label">SIMPLE PROCESS</span>
              <h2>How to Claim Your Offer</h2>
              <p>Four easy steps from enquiry to a completed service.</p>
            </div>
            <div className="row g-4">
              {claimSteps.map((step, idx) => (
                <div className="col-sm-6 col-lg-3" key={step.title}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center bg-white">
                    <div className="mb-3">
                      <i className={`bi ${step.icon} fs-1`} style={{ color: "#c4881b" }} />
                    </div>
                    <div className="small fw-bold text-secondary mb-1">STEP {idx + 1}</div>
                    <h3 className="h6 fw-bold text-dark">{step.title}</h3>
                    <p className="text-secondary small mb-0">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Society or Business Requirement */}
        <section className="section-padding pt-0">
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
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="btn btn-outline-primary rounded-pill px-4 fw-semibold"
                >
                  <i className="bi bi-telephone me-1" /> Call Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-light">
          <div className="container" style={{ maxWidth: "820px" }}>
            <div className="section-heading text-center mb-5">
              <span className="section-label">GOOD TO KNOW</span>
              <h2>Offer FAQs</h2>
            </div>
            <div className="d-flex flex-column gap-3">
              {faqs.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div className="card border-0 shadow-sm rounded-4 bg-white" key={item.q}>
                    <button
                      type="button"
                      className="btn text-start d-flex justify-content-between align-items-center fw-semibold text-dark p-3 px-4 border-0"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    >
                      <span>{item.q}</span>
                      <i className={`bi ${isOpen ? "bi-dash-lg" : "bi-plus-lg"} ms-3`} style={{ color: "#a56c0e" }} />
                    </button>
                    {isOpen && <div className="px-4 pb-3 text-secondary small">{item.a}</div>}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-muted small mt-4 mb-0">
              Offers are subject to availability, site inspection and our standard terms. Final
              pricing is confirmed after enquiry.
            </p>
          </div>
        </section>

        {/* Modal Popup Wrapper Layout */}
        <EnquiryModal
          isOpen={isFormOpen}
          onClose={closeForm}
          defaultService={selectedOffer ? `Offer Enquiry: ${selectedOffer}` : ""}
        />
      </main>
    );
  }
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import EnquiryModal from "@/components/Enquirymodal";
import HeroWave from "@/components/Herowave";
import TrustStrip from "@/components/Truststrip";
import useScrollReveal from "@/hooks/Usescrollreveal";
import { site } from "@/data/Site";
import "@/css/services.css";

const highlights = [
  { icon: "bi-patch-check-fill", title: "100% Genuine Parts", text: "Original spares with manufacturer warranty" },
  { icon: "bi-shield-check", title: "Certified Engineers", text: "Trained, experienced professionals on every job" },
  { icon: "bi-receipt-cutoff", title: "Upfront Transparent Pricing", text: "No hidden charges or unexpected bills" },
  { icon: "bi-headset", title: "Prompt Support", text: "Quick response & priority booking across Pune" },
];

const categories = [
  { key: "all", label: "All Offers", icon: "bi-grid-fill" },
  { key: "water", label: "Water Purifier", icon: "bi-droplet-fill" },
  { key: "electrical", label: "Electrical", icon: "bi-lightning-charge-fill" },
  { key: "society", label: "Societies & AMC", icon: "bi-buildings-fill" },
  { key: "commercial", label: "Commercial", icon: "bi-shop" },
];

const claimSteps = [
  {
    icon: "bi-hand-index-thumb-fill",
    title: "Choose Your Package",
    text: "Select the promotional deal that suits your home, society, or business.",
  },
  {
    icon: "bi-pencil-square",
    title: "Submit Enquiry",
    text: "Fill our quick enquiry form or message us directly on WhatsApp.",
  },
  {
    icon: "bi-telephone-inbound-fill",
    title: "Site Inspection",
    text: "Our engineer confirms your booking and schedules a convenient site visit.",
  },
  {
    icon: "bi-patch-check-fill",
    title: "Offer Applied",
    text: "Work is executed to perfection with promotional discount applied.",
  },
];

const faqs = [
  {
    q: "How do I claim a promotional offer?",
    a: "Click 'Claim Offer' on any package, submit your contact details, and our team will get in touch immediately to confirm your discount and schedule a site visit.",
  },
  {
    q: "Can I combine two promotional packages?",
    a: "Yes! Especially for housing societies and commercial setups. Simply mention the offers you need and we will bundle them for maximum savings.",
  },
  {
    q: "Are these offers valid across all of Pune?",
    a: "Yes, our engineers cover all residential, commercial, and industrial areas across Pune and Pimpri-Chinchwad.",
  },
  {
    q: "Is there any inspection fee for site visits?",
    a: "Our promotional packages include free or heavily discounted initial site audits. All charges are confirmed transparently before starting any work.",
  },
];

const detectCategory = (title = "", desc = "") => {
  const text = `${title} ${desc}`.toLowerCase();
  if (text.includes("water") || text.includes("ro") || text.includes("purifier") || text.includes("filter") || text.includes("membrane")) {
    return "water";
  }
  if (text.includes("electric") || text.includes("wiring") || text.includes("earthing") || text.includes("light") || text.includes("mcb")) {
    return "electrical";
  }
  if (text.includes("society") || text.includes("elevator") || text.includes("lift") || text.includes("pump") || text.includes("tank")) {
    return "society";
  }
  if (text.includes("commercial") || text.includes("office") || text.includes("shop") || text.includes("business") || text.includes("industry")) {
    return "commercial";
  }
  return "all";
};

export default function OffersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(0);
  const [liveOffers, setLiveOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollReveal([liveOffers]);

  // Fetch live promotional offers from the CMS Backend
  useEffect(() => {
    const fetchCmsOffers = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "https://cms-h37b.onrender.com/api/v1";
        const res = await fetch(`${apiUrl}/offers`);
        const json = await res.json();

        if (json?.success && Array.isArray(json.data)) {
          const formatted = json.data.map((o) => ({
            id: o.id,
            category: detectCategory(o.title, o.description),
            tag: o.status === "Active" ? "PROMO DEAL" : o.status,
            title: o.title,
            validity: o.validTill ? `Valid till: ${o.validTill}` : "Limited Period",
            description: o.description,
            image: o.image,
          }));
          setLiveOffers(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch live CMS offers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCmsOffers();
  }, []);

  // Smooth scroll when hash is present or changes
  useEffect(() => {
    if (isLoading || liveOffers.length === 0) return;

    const handleHashScroll = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase().trim();
      if (!hash) return;

      let targetEl = document.getElementById(hash);
      if (!targetEl && hash.startsWith("offer-")) {
        const rawId = hash.replace("offer-", "");
        const matched = liveOffers.find((o) => o.id.toLowerCase() === rawId);
        if (matched) {
          targetEl = document.getElementById(`offer-${matched.id}`);
        }
      }

      if (targetEl) {
        setTimeout(() => {
          const yOffset = -90; // offset for sticky navbar
          const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 150);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [isLoading, liveOffers]);

  const visibleOffers = useMemo(() => {
    if (activeCategory === "all") return liveOffers;
    return liveOffers.filter((o) => o.category === activeCategory || o.category === "all");
  }, [activeCategory, liveOffers]);

  const handleClaim = (offerTitle) => {
    setSelectedOffer(offerTitle);
    setIsFormOpen(true);
  };

  const closeForm = () => setIsFormOpen(false);

  return (
    <main>
      {/* ── Refined Hero Section Matching Services & Site Design ── */}
      <section className="hero-section sv-hero">
        <div className="page-container">
          <nav aria-label="Breadcrumb" className="sv-breadcrumb">
            <Link href="/">Home</Link>
            <i className="bi bi-chevron-right" aria-hidden="true" />
            <span aria-current="page">Special Offers</span>
          </nav>

          <span className="hero-badge">
            <i className="bi bi-tag-fill me-2" aria-hidden="true" />
            Promotional Deals & AMC Packages
          </span>

          <h1 className="hero-title mt-4">
            Special offers & curated <span>service packages.</span>
          </h1>
          <p className="hero-description mt-3">
            Save on water purifier AMC, electrical safety audits, building maintenance and turnkey commercial solutions with upfront transparent pricing across Pune.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <a
              href="#current-offers"
              className="btn btn-warning btn-lg rounded-pill px-4 shadow-sm"
            >
              Browse Active Deals <i className="bi bi-arrow-down ms-2" aria-hidden="true" />
            </a>
            <a
              href={site.phoneHref}
              className="btn btn-outline-light btn-lg rounded-pill px-4"
              style={{ borderColor: "rgba(255,255,255,0.5)" }}
            >
              <i className="bi bi-telephone me-2" aria-hidden="true" />
              Call {site.phoneDisplay}
            </a>
          </div>

          {/* Jump to menu */}
          {liveOffers.length > 0 && (
            <div className="sv-jump" role="navigation" aria-label="Jump to active offer">
              <span className="sv-jump-label">Jump to</span>
              {liveOffers.map((o) => (
                <a key={o.id} href={`#offer-${o.id}`} className="sv-jump-chip">
                  <i className="bi bi-tag-fill" aria-hidden="true" />{" "}
                  {o.title.split(" ").slice(0, 3).join(" ")}
                </a>
              ))}
            </div>
          )}
        </div>
        <HeroWave />
      </section>

      {/* Trust Standards Strip */}
      <TrustStrip items={highlights} label="Our promotional standards" />

      {/* ── Compact, Clean Offers Grid ── */}
      <section className="section-padding bg-light" id="current-offers">
        <div className="page-container">
          <div className="section-heading text-center mb-5 reveal-on-scroll">
            <span className="section-label">EXCLUSIVE SAVINGS</span>
            <h2>Active Promotional Packages</h2>
            <p>
              Hand-picked maintenance packages and inspection audits for homes, housing societies, and businesses in Pune.
            </p>
          </div>

          {/* Category Filter Chips */}
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
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                    isActive ? "btn-primary shadow-sm" : "btn-outline-secondary bg-white"
                  }`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  <i className={`bi ${cat.icon} me-1.5`} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading live offers...</span>
              </div>
              <p className="text-secondary mt-2 small">Loading active promotional packages...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && visibleOffers.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-tag text-secondary fs-1" />
              <p className="text-secondary mt-2">No promotional packages found under this category.</p>
              <button
                type="button"
                className="btn btn-warning rounded-pill px-4 py-2 fw-semibold mt-2"
                onClick={() => setActiveCategory("all")}
              >
                View All Deals
              </button>
            </div>
          )}

          {/* Sleek, Reliable 3-Column Grid */}
          {!isLoading && visibleOffers.length > 0 && (
            <div className="row g-4">
              {visibleOffers.map((offer) => (
                <div className="col-12 col-md-6 col-lg-4" key={offer.id} id={`offer-${offer.id}`}>
                  <article className="offer-card reveal-on-scroll">
                    {/* Media Header */}
                    {offer.image ? (
                      <div className="offer-card-media">
                        <div
                          className="offer-media-backdrop"
                          style={{ backgroundImage: `url(${offer.image})` }}
                        />
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="offer-media-img"
                          loading="lazy"
                        />
                        <span className="offer-card-badge">{offer.tag}</span>
                      </div>
                    ) : (
                      <div className="offer-card-no-img-head">
                        <div className="service-icon">
                          <i className="bi bi-tag-fill" aria-hidden="true" />
                        </div>
                        <span className="badge bg-warning text-dark px-3 py-1.5 rounded-pill fw-bold small">
                          {offer.tag}
                        </span>
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="offer-card-body">
                      <div className="offer-card-validity">
                        <i className="bi bi-clock-history" aria-hidden="true" />
                        <span>{offer.validity}</span>
                      </div>

                      <h3 className="offer-card-title">{offer.title}</h3>
                      <p className="offer-card-desc">{offer.description}</p>

                      <div className="offer-card-guarantee">
                        <i className="bi bi-shield-check text-success" aria-hidden="true" />
                        <span>Genuine Parts & Certified Workmanship</span>
                      </div>

                      {/* Card Actions */}
                      <div className="offer-card-actions">
                        <button
                          type="button"
                          className="btn btn-warning rounded-pill px-3 py-2 fw-bold flex-grow-1"
                          onClick={() => handleClaim(offer.title)}
                        >
                          Claim Offer
                        </button>
                        <a
                          href={`https://wa.me/918626095720?text=${encodeURIComponent(
                            `Hello Shree Enterprises, I would like to claim the promotional offer: ${offer.title}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-success rounded-pill px-3 py-2 d-inline-flex align-items-center"
                          aria-label={`Enquire about ${offer.title} on WhatsApp`}
                        >
                          <i className="bi bi-whatsapp" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="section-padding">
        <div className="page-container">
          <div className="section-heading text-center mb-5 reveal-on-scroll">
            <span className="section-label">SIMPLE PROCESS</span>
            <h2>How to Claim Your Offer</h2>
            <p>Four easy steps from online enquiry to a completed, warrantied service.</p>
          </div>
          <ol className="sv-steps">
            {claimSteps.map((step, idx) => (
              <li className="sv-step reveal-on-scroll" key={step.title}>
                <div className="sv-step-icon">
                  <span className="sv-step-num">{idx + 1}</span>
                  <i className={`bi ${step.icon}`} aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Custom AMC Banner ── */}
      <section className="section-padding pt-0">
        <div className="page-container">
          <div className="offer-banner reveal-on-scroll">
            <div>
              <span className="offer-label">CUSTOM PACKAGES</span>
              <h2>Need a Custom Maintenance Package?</h2>
              <p className="mb-0">
                Are you a society chairman, office administrator, or plant manager? We formulate
                tailor-made AMC contracts matching your exact equipment and budget.
              </p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button
                type="button"
                className="btn btn-warning rounded-pill px-4 py-2 fw-semibold"
                onClick={() => handleClaim("Custom Society / Office Package")}
              >
                Request Custom Quote
              </button>
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

      {/* ── FAQ Section ── */}
      <section className="section-padding bg-light">
        <div className="page-container sv-faq-wrap">
          <div className="section-heading text-center mb-5 reveal-on-scroll">
            <span className="section-label">GOOD TO KNOW</span>
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about claiming promotional packages and site visits.</p>
          </div>
          <div className="sv-faq">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  className={`sv-faq-item ${isOpen ? "is-open" : ""}`}
                  key={item.q}
                >
                  <button
                    type="button"
                    className="sv-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  >
                    <span>{item.q}</span>
                    <i className="bi bi-plus-lg" aria-hidden="true" />
                  </button>
                  <div className="sv-faq-a">
                    <div>
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-muted small mt-4 mb-0">
            Promotional offers are subject to equipment condition and site inspection in Pune. Final quotation confirmed upfront.
          </p>
        </div>
      </section>

      {/* Modal Popup */}
      <EnquiryModal
        isOpen={isFormOpen}
        onClose={closeForm}
        defaultService={selectedOffer ? `Offer Enquiry: ${selectedOffer}` : ""}
      />
    </main>
  );
}

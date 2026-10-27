"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EnquiryModal from "@/components/Enquirymodal";
import HeroWave from "@/components/Herowave";
import TrustStrip from "@/components/Truststrip";
import useScrollReveal from "@/hooks/Usescrollreveal";
import { site } from "@/data/Site";
import "@/css/services.css";

const highlights = [
  { icon: "bi-patch-check-fill", title: "Certified technicians", text: "Trained, experienced professionals on every job" },
  { icon: "bi-box-seam-fill", title: "Genuine materials", text: "Quality parts and certified tools" },
  { icon: "bi-receipt-cutoff", title: "Upfront pricing", text: "Honest quotation after site inspection" },
  { icon: "bi-headset", title: "Prompt support", text: "Quick response and friendly follow-up" },
];

const workSteps = [
  { icon: "bi-chat-dots", title: "Share your requirement", description: "Send an enquiry or call us with details of your issue or project." },
  { icon: "bi-clipboard-check", title: "Inspection & estimate", description: "A technician visits your site in Pune and gives a clear quotation." },
  { icon: "bi-tools", title: "Quality execution", description: "Work is done with genuine materials and strict safety practices." },
  { icon: "bi-shield-check", title: "Testing & support", description: "Every installation is tested, with follow-up support after." },
];

const faqs = [
  { q: "Which areas do you serve?", a: "We provide on-site service across Pune. Call or send an enquiry and we will confirm availability for your location." },
  { q: "How do I get a price for my requirement?", a: "Share your requirement through the enquiry form or phone. Our technician visits your site, inspects the work and gives you an upfront quotation." },
  { q: "Do you offer annual maintenance contracts?", a: "Yes. We offer AMCs for water purifiers and RO plants, as well as scheduled maintenance for housing societies, offices and elevators." },
  { q: "Can you handle emergencies?", a: "We offer emergency support for electrical faults and elevator breakdowns. Call us directly for the fastest response." },
];

export default function ServicesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [liveServices, setLiveServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useScrollReveal([liveServices]);

  // Fetch live services from CMS Backend
  useEffect(() => {
    const fetchCmsServices = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5000/api/v1";
        const res = await fetch(`${apiUrl}/services`);
        const json = await res.json();

        if (json?.success && Array.isArray(json.data)) {
          const formatted = json.data.map((s, idx) => ({
            id: s.id,
            icon: s.image ? "bi-check-circle" : "bi-gear-wide-connected",
            badge: s.status === "Active" ? "Active Service" : s.status,
            title: s.title,
            short: s.title.split(" ")[0] || `Service ${idx + 1}`,
            tagline: s.title,
            description: s.description,
            image: s.image,
            features: [
              "Complete turnkey installation and commissioning",
              "Genuine industrial materials & certified tools",
              "Tested for safety, durability & operational efficiency",
              "On-demand emergency breakdown & scheduled AMC support",
            ],
          }));
          setLiveServices(formatted);
        }
      } catch (err) {
        console.error("Failed to load live CMS services:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCmsServices();
  }, []);

  // Smooth scroll to service when hash is present or changes
  useEffect(() => {
    if (isLoading || liveServices.length === 0) return;

    const handleHashScroll = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase().trim();
      if (!hash) return;

      // 1. Direct ID match
      let targetEl = document.getElementById(hash);

      // 2. Keyword / alias match if direct ID not found
      if (!targetEl) {
        const matched = liveServices.find((s) => {
          const title = s.title.toLowerCase();
          const sid = s.id.toLowerCase();
          if (sid === hash) return true;
          if (
            hash === "electrical" &&
            (title.includes("electric") ||
              title.includes("wiring") ||
              title.includes("earthing") ||
              title.includes("switchgear"))
          )
            return true;
          if (
            hash === "water" &&
            (title.includes("water") ||
              title.includes("ro ") ||
              title.includes("purifier") ||
              title.includes("filter") ||
              title.includes("pump"))
          )
            return true;
          if (
            hash === "commercial" &&
            (title.includes("commercial") ||
              title.includes("turnkey") ||
              title.includes("maintenance") ||
              title.includes("support") ||
              title.includes("office"))
          )
            return true;
          if (
            hash === "elevator" &&
            (title.includes("elevator") ||
              title.includes("lift") ||
              title.includes("ard"))
          )
            return true;
          return title.includes(hash);
        });

        if (matched) {
          targetEl = document.getElementById(matched.id);
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
  }, [isLoading, liveServices]);

  const openForm = (serviceName) => {
    setSelectedService(serviceName || "");
    setIsFormOpen(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="hero-section sv-hero">
        <div className="page-container">
          <nav aria-label="Breadcrumb" className="sv-breadcrumb">
            <Link href="/">Home</Link>
            <i className="bi bi-chevron-right" aria-hidden="true" />
            <span aria-current="page">Services</span>
          </nav>

          <span className="hero-badge">
            <i className="bi bi-gear-wide-connected" aria-hidden="true" />
            Our Core Expertise
          </span>

          <h1 className="hero-title mt-4">
            Professional services built for <span>longevity & safety.</span>
          </h1>
          <p className="hero-description mt-3">
            Electrical work, purified drinking water, building maintenance and elevator servicing,
            delivered by trained technicians across Pune.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <button
              type="button"
              className="btn btn-warning btn-lg rounded-pill px-4 shadow-sm"
              onClick={() => openForm("General Service Enquiry")}
            >
              Book a Service <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
            </button>
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
          {liveServices.length > 0 && (
            <div className="sv-jump" role="navigation" aria-label="Jump to a service">
              <span className="sv-jump-label">Jump to</span>
              {liveServices.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="sv-jump-chip">
                  <i className={`bi ${s.icon}`} aria-hidden="true" /> {s.short}
                </a>
              ))}
            </div>
          )}
        </div>
        <HeroWave />
      </section>

      <TrustStrip items={highlights} label="Our service standards" />

      {/* Services List */}
      <section className="section-padding">
        <div className="page-container">
          <div className="section-heading text-center mb-5 reveal-on-scroll">
            <span className="section-label">SPECIALIZED SERVICES</span>
            <h2>What We Offer</h2>
            <p>Reliable service solutions for homeowners, businesses and housing societies.</p>
          </div>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading services...</span>
              </div>
              <p className="text-secondary mt-2 small">Loading live services...</p>
            </div>
          )}

          {!isLoading && liveServices.length === 0 && (
            <div className="text-center py-5">
              <p className="text-secondary">No services currently listed.</p>
            </div>
          )}

          {!isLoading && liveServices.length > 0 && (
            <div className="sv-list">
              {liveServices.map((service, idx) => (
                <article
                  id={service.id}
                  key={service.id}
                  className={`sv-row reveal-on-scroll ${idx % 2 ? "sv-row--flip" : ""}`}
                >
                  <div className="sv-row-main">
                    <div className="sv-row-head">
                      <div className="service-icon">
                        <i className={`bi ${service.icon}`} aria-hidden="true" />
                      </div>
                      <span className="sv-badge">{service.badge}</span>
                    </div>

                    {service.image && (
                      <div className="sv-media-frame mb-3">
                        <div
                          className="sv-media-backdrop"
                          style={{ backgroundImage: `url(${service.image})` }}
                        />
                        <img
                          src={service.image}
                          alt={service.title}
                          className="sv-media-img"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <h3>{service.title}</h3>
                    <p className="sv-tagline">{service.tagline}</p>
                    <p className="sv-desc">{service.description}</p>

                    <div className="d-flex flex-wrap gap-2 mt-4">
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill px-4"
                        onClick={() => openForm(service.title)}
                      >
                        Enquire Now
                      </button>
                      <a
                        href={site.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-success rounded-pill px-3"
                      >
                        <i className="bi bi-whatsapp me-1" aria-hidden="true" /> WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="sv-row-side">
                    <h4>What&apos;s included</h4>
                    <ul>
                      {service.features.map((item) => (
                        <li key={item}>
                          <i className="bi bi-check-circle-fill" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="benefits-section section-padding">
        <div className="page-container">
          <div className="section-heading text-center mb-5 reveal-on-scroll">
            <span className="section-label">SIMPLE & TRANSPARENT</span>
            <h2>How It Works</h2>
            <p>Getting your service done takes four easy steps.</p>
          </div>

          <ol className="sv-steps reveal-on-scroll">
            {workSteps.map((step, idx) => (
              <li className="sv-step" key={step.title}>
                <div className="sv-step-icon">
                  <i className={`bi ${step.icon}`} aria-hidden="true" />
                  <span className="sv-step-num">{idx + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-light">
        <div className="page-container" style={{ maxWidth: "820px" }}>
          <div className="section-heading text-center mb-5 reveal-on-scroll">
            <span className="section-label">FREQUENTLY ASKED</span>
            <h2>Services FAQs</h2>
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
        </div>
      </section>

      {/* Modal Popup */}
      <EnquiryModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService={selectedService}
      />
    </main>
  );
}

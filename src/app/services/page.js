"use client";

import { useState } from "react";
import Link from "next/link";
import EnquiryModal from "@/components/Enquirymodal";
import HeroWave from "@/components/Herowave";
import TrustStrip from "@/components/Truststrip";
import useScrollReveal from "@/hooks/Usescrollreveal";
import { site } from "@/data/Site";
import "@/css/services.css";

const serviceCategories = [
  {
    id: "electrical",
    icon: "bi-lightning-charge-fill",
    badge: "Most requested",
    title: "Electrical Wiring & Power Solutions",
    short: "Electrical",
    tagline: "Safe, compliant and durable electrical work for homes and commercial setups.",
    description:
      "Whether you are constructing a new property, renovating an office, or fixing recurring electrical tripping, our certified electricians deliver precise installations and prompt fault troubleshooting.",
    features: [
      "Complete home & commercial rewiring and conduit piping",
      "Distribution Board (DB) setup with MCB & RCCB shock protection",
      "Architectural lighting, LED panels and designer switches",
      "Dedicated heavy-load circuits for ACs, geysers and appliances",
      "Earthing pit installation and electrical safety audits",
      "Short-circuit diagnostics and emergency fuse replacements",
    ],
  },
  {
    id: "water",
    icon: "bi-droplet-fill",
    badge: "Health & purity",
    title: "Water Purification & RO Plants",
    short: "Water & RO",
    tagline: "Clean, mineral-rich drinking water for families and workplaces.",
    description:
      "End-to-end water treatment, from kitchen RO systems to high-capacity commercial plants, delivering clear water with an optimal TDS balance.",
    features: [
      "Domestic RO, UV and UF purifier installation & relocation",
      "Commercial RO plants (25, 50, 100+ LPH) for offices & cafes",
      "Filter cartridge replacement (Sediment, Pre-Carbon, Mineralizer)",
      "RO membrane replacement & booster pump repair",
      "Water TDS testing and hardness reduction treatment",
      "Annual Maintenance Contracts (AMC) with free visits",
    ],
  },
  {
    id: "commercial",
    icon: "bi-building-gear",
    badge: "Facility support",
    title: "Residential & Commercial Maintenance",
    short: "Maintenance",
    tagline: "Turnkey property maintenance that keeps your premises running smoothly.",
    description:
      "Skip coordinating with several contractors. Shree Enterprises handles routine electrical, plumbing and facility care for housing societies, retail stores and commercial buildings.",
    features: [
      "Housing society maintenance contracts & scheduled inspections",
      "Office electrical fitting, data cabling conduit and lighting upkeep",
      "Pump room automation, water level controllers & starter panels",
      "Plumbing leak detection, valve replacement and drain clearing",
      "Preventive maintenance to avoid costly downtime",
      "On-call technician support across Pune",
    ],
  },
  {
    id: "elevator",
    icon: "bi-arrow-up-square-fill",
    badge: "Certified safety",
    title: "Elevator Maintenance & Safety Inspections",
    short: "Elevators",
    tagline: "Smooth, quiet and safe vertical transport with no compromises.",
    description:
      "We partner with building committees and property managers for regular elevator servicing, safety audits and rapid breakdown response.",
    features: [
      "Monthly lift servicing, lubrication & mechanical adjustments",
      "Automatic Rescue Device (ARD) and emergency battery checks",
      "Door sensor alignment, motor drive checks and cable wear audits",
      "Cabin touch-ups, push button & indicator repairs",
      "Compliance safety audits as per elevator norms",
      "24/7 emergency breakdown and passenger rescue support",
    ],
  },
];

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
  useScrollReveal();

  const openForm = (serviceName) => {
    setSelectedService(serviceName || "");
    setIsFormOpen(true);
  };

  return (
    <main>
      {/* Hero (reuses the home hero styles) */}
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

          <div className="sv-jump" role="navigation" aria-label="Jump to a service">
            <span className="sv-jump-label">Jump to</span>
            {serviceCategories.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="sv-jump-chip">
                <i className={`bi ${s.icon}`} aria-hidden="true" /> {s.short}
              </a>
            ))}
          </div>
        </div>
        <HeroWave />
      </section>

      <TrustStrip items={highlights} label="Our service standards" />

      {/* Services */}
      <section className="section-padding">
        <div className="page-container">
          <div className="section-heading text-center mb-5 reveal-on-scroll">
            <span className="section-label">SPECIALIZED SERVICES</span>
            <h2>What We Offer</h2>
            <p>Four service areas for homeowners, businesses and housing societies.</p>
          </div>

          <div className="sv-list">
            {serviceCategories.map((service, idx) => (
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
      <section className="section-padding">
        <div className="page-container sv-faq-wrap">
          <div className="section-heading text-center mb-4 reveal-on-scroll">
            <span className="section-label">FAQ</span>
            <h2>Common Questions</h2>
          </div>

          <div className="sv-faq reveal-on-scroll">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div className={`sv-faq-item ${open ? "is-open" : ""}`} key={f.q}>
                  <button
                    type="button"
                    className="sv-faq-q"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <i className="bi bi-plus-lg" aria-hidden="true" />
                  </button>
                  <div id={`faq-panel-${i}`} className="sv-faq-a" role="region" aria-label={f.q}>
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA (reuses the home offer banner) */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="page-container">
          <div className="offer-banner reveal-on-scroll">
            <div>
              <span className="offer-label">GET STARTED TODAY</span>
              <h2>Have a specific requirement?</h2>
              <p className="mb-0">
                Quick phone consultation, accurate pricing and on-site support across Pune.
              </p>
            </div>
            <div className="d-flex flex-wrap gap-3">
              <button
                type="button"
                className="btn btn-warning rounded-pill px-4 shadow-sm"
                onClick={() => openForm("Custom Service Request")}
              >
                Book an Appointment
              </button>
              <Link href="/contact" className="btn btn-outline-primary rounded-pill px-4">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService={selectedService}
      />
    </main>
  );
}
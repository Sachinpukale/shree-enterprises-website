"use client";

import { useState } from "react";
import Link from "next/link";
import EnquiryModal from "@/components/Enquirymodal";
import HeroWave from "@/components/Herowave";
import TrustStrip from "@/components/Truststrip";
import useScrollReveal from "@/hooks/Usescrollreveal";
import { site } from "@/data/Site";
import "@/css/home.css";

const trustItems = [
  { icon: "bi-grid-fill", title: "4 service areas", text: "Electrical, water, maintenance and elevators" },
  { icon: "bi-buildings-fill", title: "Homes to businesses", text: "Residential, commercial and societies" },
  { icon: "bi-geo-alt-fill", title: "Based in Pune", text: `Serving ${site.location}` },
  { icon: "bi-headset", title: "Easy to reach", text: "Call or WhatsApp for quick support" },
];

const services = [
  {
    id: "electrical",
    icon: "bi-lightning-charge-fill",
    title: "Electrical Wiring",
    description: "New wiring, rewiring, DB installation, lighting solutions and electrical repairs.",
  },
  {
    id: "water",
    icon: "bi-droplet-fill",
    title: "Water Purification",
    description: "RO systems, UV and UF purifiers, water filters and maintenance services.",
  },
  {
    id: "commercial",
    icon: "bi-building",
    title: "Residential & Commercial",
    description: "Electrical and plumbing support for homes, offices, shops and industrial units.",
  },
  {
    id: "elevator",
    icon: "bi-arrow-up-square-fill",
    title: "Elevator Maintenance",
    description: "Regular maintenance, safety checks and breakdown support for elevators.",
  },
];

const benefits = [
  { icon: "bi-check-circle-fill", title: "Multiple services, one partner", text: "Electrical, water purification and maintenance under one roof." },
  { icon: "bi-clipboard-check-fill", title: "Clear, upfront estimates", text: "A technician inspects your site and gives an honest quotation." },
  { icon: "bi-chat-dots-fill", title: "Easy enquiries", text: "Reach us by phone, WhatsApp or the online enquiry form." },
  { icon: "bi-house-check-fill", title: "Homes and businesses", text: "Support for different types of properties and spaces." },
];

const audiences = [
  { icon: "bi-house-door-fill", title: "Homeowners", text: "Wiring, repairs, water purifiers and everyday upkeep for your home." },
  { icon: "bi-shop", title: "Offices & shops", text: "Reliable electrical and water solutions that keep work running." },
  { icon: "bi-buildings-fill", title: "Housing societies", text: "Scheduled maintenance, pump rooms and elevator servicing." },
  { icon: "bi-gear-wide-connected", title: "Industrial units", text: "Electrical and plumbing support for larger premises." },
];

const contactMethods = [
  { icon: "bi-telephone-fill", label: "Call us", value: site.phoneDisplay, href: site.phoneHref },
  { icon: "bi-whatsapp", label: "WhatsApp", value: "Chat with us", href: site.whatsappHref, external: true },
  { icon: "bi-geo-alt-fill", label: "Location", value: site.location },
];

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  useScrollReveal();

  return (
    <main>
      {/* Hero */}
      <section className="hero-section">
        <div className="page-container">
          <div className="row align-items-center g-5">
            <div className="col-lg-8 reveal-left">
              <span className="hero-badge">
                <i className="bi bi-award-fill" aria-hidden="true" />
                Your Trusted Service Partner
              </span>

              <h1 className="hero-title mt-4">
                Reliable Solutions
                <br />
                for <span>Every Space.</span>
              </h1>

              <p className="hero-description mt-3">
                From electrical wiring and water purification to building support and elevator
                maintenance, {site.name} helps keep your spaces running smoothly.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4 mb-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="btn btn-warning btn-lg rounded-pill px-4 shadow-sm"
                >
                  Get an Enquiry <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
                </button>
                <a
                  href={site.phoneHref}
                  className="btn btn-outline-light btn-lg rounded-pill px-4"
                  style={{ borderColor: "rgba(255,255,255,0.5)" }}
                >
                  <i className="bi bi-telephone me-2" aria-hidden="true" />
                  Call Us
                </a>
              </div>

              <div className="hero-note">
                <i className="bi bi-geo-alt-fill me-2" aria-hidden="true" />
                Proudly serving {site.location}
              </div>
            </div>

            <div className="col-lg-4 reveal-right">
              <div className="hero-visual animate-float">
                <div className="hero-visual-icon">
                  <i className="bi bi-tools" aria-hidden="true" />
                </div>
                <p className="visual-eyebrow">SHREE ENTERPRISES</p>
                <h2>
                  Quality Service.
                  <br />
                  Lasting Solutions.
                </h2>
                <div className="visual-line" />
                <div className="hero-services-row">
                  <div className="hero-service-item">
                    <i className="bi bi-lightning-fill" aria-hidden="true" /> Electrical
                  </div>
                  <div className="hero-service-divider" />
                  <div className="hero-service-item">
                    <i className="bi bi-droplet-fill" aria-hidden="true" /> Water
                  </div>
                  <div className="hero-service-divider" />
                  <div className="hero-service-item">
                    <i className="bi bi-gear-fill" aria-hidden="true" /> Maintenance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HeroWave />
      </section>

      <TrustStrip items={trustItems} label="Why customers reach out to us" />

      {/* Services */}
      <section className="section-padding">
        <div className="page-container">
          <div className="section-heading text-center reveal-on-scroll">
            <span className="section-label">WHAT WE DO</span>
            <h2>Our Services</h2>
            <p>Practical solutions to meet your home and business needs.</p>
          </div>

          <div className="row g-4 mt-3">
            {services.map((service, index) => (
              <div
                className="col-sm-6 col-lg-3 reveal-on-scroll"
                style={{ transitionDelay: `${index * 0.12}s` }}
                key={service.id}
              >
                <article className="service-card h-100">
                  <div className="service-icon">
                    <i className={`bi ${service.icon}`} aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href={`/services#${service.id}`} className="service-link">
                    Explore service <i className="bi bi-arrow-right ms-1" aria-hidden="true" />
                  </Link>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="benefits-section section-padding">
        <div className="page-container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 reveal-left">
              <span className="section-label">WHY SHREE ENTERPRISES</span>
              <h2 className="display-6 fw-bold mt-3">One trusted partner for your service needs.</h2>
              <p className="text-secondary mt-3">
                We bring multiple essential services together, making it easier to find support for
                your home, office or business.
              </p>
              <Link href="/services" className="btn btn-primary rounded-pill px-4 mt-2">
                View all services <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
              </Link>
            </div>

            <div className="col-lg-6 reveal-right">
              {benefits.map((b) => (
                <div className="benefit-item" key={b.title}>
                  <i className={`bi ${b.icon}`} aria-hidden="true" />
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section-padding">
        <div className="page-container">
          <div className="section-heading text-center reveal-on-scroll">
            <span className="section-label">WHO WE SERVE</span>
            <h2>Support for every kind of space</h2>
            <p>Whatever the size of your property, we have a service plan that fits.</p>
          </div>

          <div className="row g-4 mt-3">
            {audiences.map((a, index) => (
              <div
                className="col-sm-6 col-lg-3 reveal-on-scroll"
                style={{ transitionDelay: `${index * 0.12}s` }}
                key={a.title}
              >
                <div className="hm-serve-card">
                  <i className={`bi ${a.icon}`} aria-hidden="true" />
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="section-padding hm-flush-top">
        <div className="page-container">
          <div className="offer-banner reveal-on-scroll">
            <div>
              <span className="offer-label">SPECIAL OFFERS</span>
              <h2>Looking for the right solution?</h2>
              <p className="mb-0">Contact us to discuss your service needs and available offers.</p>
            </div>
            <Link href="/offers" className="btn btn-warning rounded-pill px-4 shadow-sm">
              View Offers <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section section-padding">
        <div className="page-container text-center reveal-on-scroll">
          <span className="section-label">LET&apos;S CONNECT</span>
          <h2>Need help with a service?</h2>
          <p>Tell us what you need. We&apos;ll help you take the next step.</p>

          <div className="row g-3 hm-contact-grid">
            {contactMethods.map((m) => {
              const inner = (
                <>
                  <span className="hm-contact-icon">
                    <i className={`bi ${m.icon}`} aria-hidden="true" />
                  </span>
                  <span>
                    <small>{m.label}</small>
                    <strong>{m.value}</strong>
                  </span>
                </>
              );
              return (
                <div className="col-md-4" key={m.label}>
                  {m.href ? (
                    <a
                      href={m.href}
                      className="hm-contact-card"
                      {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {inner}
                    </a>

                  ) : (
                    <div className="hm-contact-card-hover">
                      <div className="hm-contact-card">{inner}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm mt-4"
            onClick={() => setIsFormOpen(true)}
          >
            Send an Enquiry
          </button>
        </div>
      </section>

      <EnquiryModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </main>
  );
}
"use client";

import EnquiryForm from "@/components/EnquiryForm";

export default function ContactPage() {
  return (
    <main>
      {/* Hero Header */}
      <section className="hero-section text-center py-5">
        <div className="container py-4">
          <span className="hero-badge mb-3">
            <i className="bi bi-chat-quote-fill me-2" />
            LET&apos;S TALK
          </span>
          <h1 className="hero-title mx-auto mt-3">
            Get in Touch with <span>Shree Enterprises</span>
          </h1>
          <p className="hero-description mx-auto mt-3">
            Have questions about electrical wiring, RO water systems, elevator AMC, or general maintenance?
            Our Pune team is here to assist you promptly.
          </p>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="row g-5">
            {/* Left Column: Direct Contact Info & Map */}
            <div className="col-lg-5">
              <div className="mb-4">
                <span className="section-label">CONTACT INFORMATION</span>
                <h2 className="h3 fw-bold text-dark mt-2">We Are Here to Help</h2>
                <p className="text-secondary">
                  Reach out directly by phone, WhatsApp, or visit us in Ambegaon Kh, Pune.
                </p>
              </div>

              {/* Phone Card */}
              <div className="p-4 bg-white rounded-4 shadow-sm border-0 mb-3 d-flex align-items-start gap-3">
                <div className="service-icon mb-0 flex-shrink-0" style={{ width: "50px", height: "50px" }}>
                  <i className="bi bi-telephone-fill text-primary fs-4" />
                </div>
                <div>
                  <h3 className="h6 fw-bold mb-1 text-dark">Call Us Directly</h3>
                  <p className="text-muted small mb-2">Available 7 days a week</p>
                  <div>
                    <a href="tel:8626095720" className="fw-bold text-primary text-decoration-none me-3">
                      +91 86260 95720
                    </a>
                    <a href="tel:8669625720" className="fw-bold text-primary text-decoration-none">
                      +91 86696 25720
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-4 bg-white rounded-4 shadow-sm border-0 mb-3 d-flex align-items-start gap-3">
                <div
                  className="service-icon mb-0 flex-shrink-0"
                  style={{ width: "50px", height: "50px", background: "#e8f5e9" }}
                >
                  <i className="bi bi-whatsapp text-success fs-4" />
                </div>
                <div>
                  <h3 className="h6 fw-bold mb-1 text-dark">WhatsApp Instant Chat</h3>
                  <p className="text-muted small mb-2">Quick queries & site photos</p>
                  <a
                    href="https://wa.me/918626095720?text=Hi%20Shree%20Enterprises,%20I%20have%20an%20enquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-success rounded-pill px-3 fw-semibold"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div className="p-4 bg-white rounded-4 shadow-sm border-0 mb-3 d-flex align-items-start gap-3">
                <div className="service-icon mb-0 flex-shrink-0" style={{ width: "50px", height: "50px" }}>
                  <i className="bi bi-geo-alt-fill text-danger fs-4" />
                </div>
                <div>
                  <h3 className="h6 fw-bold mb-1 text-dark">Office Location</h3>
                  <p className="text-secondary small mb-0">
                    Ambegaon Khurd, Pune, Maharashtra 411046
                  </p>
                  <span className="badge bg-light text-secondary border mt-2">Serving All Pune Areas</span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-4 bg-white rounded-4 shadow-sm border-0">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-clock-history text-warning fs-5 me-2" />
                  <h3 className="h6 fw-bold mb-0 text-dark">Service Hours</h3>
                </div>
                <div className="small text-secondary mt-2">
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span>Mon - Sat:</span>
                    <strong className="text-dark">8:00 AM - 8:30 PM</strong>
                  </div>
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span>Sunday:</span>
                    <strong className="text-dark">9:00 AM - 6:00 PM</strong>
                  </div>
                  <div className="d-flex justify-content-between py-1 text-danger fw-semibold">
                    <span>Emergency Breakdown:</span>
                    <span>24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Enquiry Form Card */}
            <div className="col-lg-7">
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 border-0">
                <div className="text-center mb-4">
                  <span className="section-label">SEND A DIRECT MESSAGE</span>
                  <h2 className="h3 fw-bold text-dark mt-2">Submit an Enquiry</h2>
                  <p className="text-muted small">
                    Fill out the form below. Our team receives your message instantly on WhatsApp and
                    will get back to you promptly.
                  </p>
                </div>

                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

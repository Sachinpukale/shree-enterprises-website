"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="site-footer">
      <div className="page-container">
        {/* Main Footer */}
        <div className="row g-4 g-lg-5 py-5">
          {/* Company Information */}
          <div className="col-lg-5 col-md-6">
            <Link href="/" className="footer-brand">
              <Image
                            src="/assets/se-Photoroom.png"
                            alt="Shree Enterprises Logo"
                            width={70}
                            height={70}
                            className="brand-logo-footer"
                          />

              <span>
                Shree <span className="footer-brand-highlight">Enterprises</span>
              </span>
            </Link>

            <p className="footer-description mt-4 mb-4">
              Your trusted partner for electrical solutions, water
              purification systems, and reliable maintenance services
              for residential and commercial needs.
            </p>

            <div className="footer-trust-note">
              <i className="bi bi-patch-check-fill me-2" />
              Quality solutions. Reliable service.
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6 col-6">
            <h3 className="footer-heading">Quick Links</h3>

            <ul className="footer-links list-unstyled mb-0">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Our Services</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/offers">Special Offers</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-lg-4 col-md-12">
            <h3 className="footer-heading">Get in Touch</h3>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <i className="bi bi-geo-alt" />
              </span>

              <div>
                <span className="footer-contact-label">Our Location</span>
                <p className="mb-0">Ambegaon Kh, Pune, Maharashtra</p>
              </div>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <i className="bi bi-telephone" />
              </span>

              <div>
                <span className="footer-contact-label">Call Us</span>
                <a href="tel:8626095720">+91 86260 95720</a>
                <a href="tel:8669625720">+91 86696 25720</a>
              </div>
            </div>

            <Link href="/contact" className="footer-contact-cta">
              Contact Our Team
              <i className="bi bi-arrow-right ms-2" />
            </Link>
          </div>
        </div>

        
      </div>
      {/* Footer Bottom */}
        <div className="footer-bottom-bar">
          <p className="mb-0">
            © {year} Shree Enterprises. All rights reserved.
          </p>

          <a href="#top" className="footer-back-to-top">
            Back to top
            <i className="bi bi-arrow-up ms-2" />
          </a>
        </div>
    </footer>
  );
}

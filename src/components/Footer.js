'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {

  const [year , setYear] = useState('...');
  useEffect(() => {
    
    setYear(new Date().getFullYear().toString());
  }, []);
  return (
    <footer className="site-footer">
      <div className="container py-5">
        <div className="row g-4">
          {/* Company Information */}
          <div className="col-md-6">
            <Link className="footer-brand" href="/">
              <span className="footer-brand-mark">S</span>
              Shree Enterprises
            </Link>

            <p className="mt-3 mb-0 footer-description">
              Electrical, water purification and maintenance solutions
              for residential and commercial needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 col-6">
            <h3>Quick Links</h3>

            <Link href="/about">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/products">Products</Link>
            <Link href="/offers">Offers</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          {/* Contact Information */}
          <div className="col-md-3 col-6">
            <h3>Contact</h3>

            <p>
              <i className="bi bi-geo-alt me-2" />
              Ambegaon Kh, Pune
            </p>

            <p>
              <i className="bi bi-telephone me-2" />
              <a href="tel:8626095720">86260 95720</a>
            </p>

            <p>
              <i className="bi bi-telephone me-2" />
              <a href="tel:8669625720">86696 25720</a>
            </p>
          </div>
        </div>

        <hr className="footer-divider" />

        <p className="footer-bottom mb-0">
          {year} Shree Enterprises.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

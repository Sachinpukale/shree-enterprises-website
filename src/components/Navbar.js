"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  // { label: "Products", href: "/products" },
  { label: "Offers", href: "/offers" },
  { label: "About Us", href: "/about" },
  // { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();

  // Automatically close mobile menu when route/pathname changes
  useEffect(() => {
    const mainNavbar = document.getElementById("mainNavbar");
    if (mainNavbar && mainNavbar.classList.contains("show")) {
      if (typeof window !== "undefined" && window.bootstrap?.Collapse) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(mainNavbar) || new window.bootstrap.Collapse(mainNavbar, { toggle: false });
        bsCollapse.hide();
      } else {
        // Fallback manual close if Bootstrap JS bundle isn't attached globally
        mainNavbar.classList.remove("show");
        const toggler = document.querySelector(".navbar-toggler");
        if (toggler) {
          toggler.setAttribute("aria-expanded", "false");
          toggler.classList.add("collapsed");
        }
      }
    }
  }, [pathname]);

  return (
    <nav className="navbar navbar-expand-lg site-navbar sticky-top">
      <div className="page-container d-flex flex-wrap align-items-center justify-content-between py-1">
        {/* Company Brand wrapped in a dedicated div */}
        <div className="navbar-brand-wrapper">
          <Link className="navbar-brand site-brand" href="/">
            <span className="brand-mark">S</span>

            <span className="brand-text">
              <span className="brand-name">
                Shree <span>Enterprises</span>
              </span>
              <span className="brand-tagline">
                ELECTRICAL · WATER · MAINTENANCE
              </span>
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler site-navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navigation Links & Contact Button */}
        <div className="collapse navbar-collapse justify-content-between align-items-center" id="mainNavbar">
          {/* Invisible desktop spacer to balance the right button for true dead-center alignment */}
          <div className="d-none d-lg-block" style={{ width: "160px" }} />

          {/* Centered Navigation Links */}
          <ul className="navbar-nav align-items-lg-center gap-lg-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li className="nav-item" key={link.href}>
                  <Link
                    className={`nav-link site-nav-link ${
                      isActive ? "active" : ""
                    }`}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right-aligned Contact Button */}
          <div className="navbar-nav">
            <Link
              className="btn btn-primary site-contact-btn mt-3 mt-lg-0"
              href="/contact"
            >
              Contact Us
              <i className="bi bi-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
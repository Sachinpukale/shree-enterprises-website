
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Offers", href: "/offers" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg site-navbar sticky-top">
      <div className="container py-2">
        {/* Company Brand */}
        <Link className="navbar-brand site-brand" href="/">
          <span className="brand-mark">S</span>

          <span className="brand-name">
            Shree <span>Enterprises</span>
          </span>
        </Link>

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

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
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

            <li className="nav-item ms-lg-2">
              <Link
                className="btn btn-primary site-contact-btn"
                href="/contact"
              >
                Contact Us
                <i className="bi bi-arrow-up-right ms-2" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

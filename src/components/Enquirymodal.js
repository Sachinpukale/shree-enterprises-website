"use client";

import { useEffect } from "react";
import EnquiryForm from "@/components/EnquiryForm";

// Shared modal wrapper: overlay click + Escape to close, locks page scroll.
// Uses the .enquiry-modal-overlay / .enquiry-modal styles from globals.css.
export default function EnquiryModal({ isOpen, onClose, defaultService = "" }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="enquiry-modal-overlay" onClick={onClose}>
      <div
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Service enquiry form"
        onClick={(e) => e.stopPropagation()}
      >
        <EnquiryForm isOpen={isOpen} onClose={onClose} defaultService={defaultService} />
      </div>
    </div>
  );
}
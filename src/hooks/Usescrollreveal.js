"use client";

import { useEffect } from "react";

// Adds "is-visible" to .reveal-on-scroll / .reveal-left / .reveal-right
// elements once they enter the viewport (styles live in globals.css).
// Supports dynamically loaded content (e.g. CMS services & offers) via MutationObserver.
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const selector = ".reveal-on-scroll, .reveal-left, .reveal-right";

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    const observeElements = () => {
      document.querySelectorAll(`${selector}:not(.is-visible)`).forEach((el) => {
        observer.observe(el);
      });
    };

    // Observe any existing elements on mount / state change
    observeElements();

    // Use MutationObserver so any dynamically inserted elements (e.g. API responses)
    // are automatically detected and observed immediately.
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    if (document.body) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, deps);
}

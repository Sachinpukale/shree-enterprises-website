# Technical Bug Report & Refactoring Specification: `EnquiryForm` Component

**Project:** Shree Enterprises Website  
**Date:** October 26, 2026  
**Audience:** Frontend Development Team  
**Target Files:**  
- [`src/components/EnquiryForm.js`](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/components/EnquiryForm.js)  
- [`src/components/Enquirymodal.js`](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/components/Enquirymodal.js)  
- [`src/app/contact/page.js`](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/app/contact/page.js)  
- [`src/app/offers/page.js`](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/app/offers/page.js)  
- [`src/app/products/page.js`](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/app/products/page.js)  
- [`src/app/api/send-whatsapp-bg/route.js`](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/app/api/send-whatsapp-bg/route.js)  

---

## 1. Executive Summary

The `EnquiryForm` component is the primary lead-generation element across the Shree Enterprises website. While its core validation functions and API integration operate as intended, architectural tight-coupling between the **form content** and the **modal shell** causes critical visual breakage, duplicate DOM overlays, state desynchronization, and poor form validation UX.

This document details each defect, explains the root causes with exact line numbers, and presents the target architectural design and code snippets needed to resolve them.

---

## 2. Component Hierarchy: Current vs. Target Architecture

mermaid

flowchart TD
    subgraph Current Architecture [Current: Tightly Coupled & Duplicated]
        A1["Contact Page (/contact)"] --> B1["EnquiryForm.js\n(Contains Fixed Fullscreen Overlay)"]
        Note1["Result: Breaks page layout; pops over entire screen"]
        
        A2["Home / Services / Offers"] --> B2["EnquiryModal.js\n(Contains Fullscreen Overlay)"]
        B2 --> C2["EnquiryForm.js\n(Also Contains Fullscreen Overlay)"]
        Note2["Result: Nested overlays, double blur, double backdrops"]
    end

    subgraph Recommended Architecture [Target: Clean Separation of Concerns]
        D1["Contact Page (/contact)"] --> E1["EnquiryForm (Pure Form Component)\nNo Fixed Overlays or Viewport Styles"]
        
        D2["Home / Services / Offers"] --> E2["EnquiryModal (Modal Wrapper Only)\nControls Overlay, Backdrop, Escape, Scroll-Lock"]
        E2 --> E1
    end
```

---

## 3. Detailed Defect Analysis & Recommended Solutions

### Defect 1: Hardcoded Modal Shell Inside `EnquiryForm.js` Breaks Inline Embedding
- **Severity:** `Critical`
- **Location:** [`src/components/EnquiryForm.js` (Lines 249–260)](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/components/EnquiryForm.js#L249-L260) and [`src/app/contact/page.js` (Line 129)](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/app/contact/page.js#L129)

#### Root Cause
`EnquiryForm.js` wraps its entire return statement with:
```jsx
<div className="enquiry-modal-overlay" onClick={handleOverlayClick}>
  <div className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-title">
    <div className="enquiry-form-container">
```
In `src/app/globals.css`, `.enquiry-modal-overlay` is defined as:
```css
.enquiry-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(4px);
}
```
When `<EnquiryForm />` is placed inside the card on `/contact`, it breaks out of the normal layout flow and covers the whole screen as a fixed modal.

#### Recommended Fix
Make `EnquiryForm.js` a pure form component that returns only `<div className="enquiry-form-container">` or `<form>`. Leave modal wrapping exclusively to `EnquiryModal.js`.

---

### Defect 2: Double Modal Overlay Nesting in `EnquiryModal.js`
- **Severity:** `High`
- **Location:** [`src/components/Enquirymodal.js` (Lines 27–37)](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/components/Enquirymodal.js#L27-L37)

#### Root Cause
`EnquiryModal.js` renders:
```jsx
return (
  <div className="enquiry-modal-overlay" onClick={onClose}>
    <div className="enquiry-modal" role="dialog" aria-modal="true" aria-label="Service enquiry form" onClick={(e) => e.stopPropagation()}>
      <EnquiryForm isOpen={isOpen} onClose={onClose} defaultService={defaultService} />
    </div>
  </div>
);
```
Since `EnquiryForm` also renders `.enquiry-modal-overlay` and `.enquiry-modal`, two stacked overlays and two dialog elements are mounted simultaneously.

#### Recommended Fix
Once `EnquiryForm` is stripped of the modal wrapper, `EnquiryModal` becomes the single container for modal presentation:
```jsx
// src/components/EnquiryModal.js
export default function EnquiryModal({ isOpen, onClose, defaultService = "" }) {
  // Escape key & body overflow lock effects...
  if (!isOpen) return null;

  return (
    <div className="enquiry-modal-overlay" onClick={onClose}>
      <div
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <EnquiryForm isModal onClose={onClose} defaultService={defaultService} />
      </div>
    </div>
  );
}
```

---

### Defect 3: `isOpen` Prop is Passed Everywhere but Unused in `EnquiryForm.js`
- **Severity:** `Medium`
- **Location:** [`src/components/EnquiryForm.js` (Line 98)](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/components/EnquiryForm.js#L98)

#### Root Cause
Across multiple pages (`offers/page.js`, `products/page.js`, `Enquirymodal.js`), developers pass `isOpen={isFormOpen}`:
```jsx
<EnquiryForm isOpen={isFormOpen} onClose={closeForm} defaultService="..." />
```
However, the signature in `EnquiryForm.js` is:
```javascript
export default function EnquiryForm({ onClose, defaultService = "" })
```
The `isOpen` prop is discarded. If the parent doesn't wrap the call in a conditional `{isOpen && ...}`, the form remains visible regardless of whether `isOpen` is `true` or `false`.

#### Recommended Fix
Decide where visibility logic lives:
- **Best Practice:** Keep visibility logic in `EnquiryModal.js` (`if (!isOpen) return null;`), and do not pass `isOpen` to the pure `EnquiryForm` component.

---

### Defect 4: `defaultService` State Does Not Sync on Prop Update
- **Severity:** `Medium`
- **Location:** [`src/components/EnquiryForm.js` (Lines 107–110 & 225)](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/components/EnquiryForm.js#L107-L110)

#### Root Cause
1. `formData.service` is initialized using `useState(defaultService || "")`. If the user opens the modal for "Service A", closes it, and opens it for "Service B" without the component unmounting, the state remains set to "Service A".
2. When the submission succeeds, line 225 calls `setFormData(INITIAL_FORM_DATA)`. Because `INITIAL_FORM_DATA.service` is `""`, `defaultService` is wiped out for subsequent submissions.

#### Recommended Fix
Add a `useEffect` hook to keep `formData.service` synchronized when `defaultService` changes:
```javascript
useEffect(() => {
  if (defaultService) {
    setFormData((prev) => ({ ...prev, service: defaultService }));
  }
}, [defaultService]);
```

---

### Defect 5: Close Button & Post-Submission State on Inline Forms
- **Severity:** `Medium`
- **Location:** [`src/components/EnquiryForm.js` (Lines 228–230 & 277–285)](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/components/EnquiryForm.js#L228-L230)

#### Root Cause
1. The close button (`&times;`) renders unconditionally:
   ```jsx
   <button type="button" className="enquiry-close" onClick={onClose} aria-label="Close enquiry form">
       &times;
   </button>
   ```
   When mounted on `/contact`, `onClose` is `undefined`, so clicking the `×` button does nothing.
2. After a successful submission:
   ```javascript
   setTimeout(() => {
       onClose?.();
   }, 2000);
   ```
   On inline forms, `onClose` is not called, leaving the form permanently displaying *"Your enquiry has been sent successfully!"* without returning to an active state.

#### Recommended Fix
Support an `isModal` flag or check if `onClose` exists:
```jsx
{/* Only show close button if used inside a modal */}
{Boolean(onClose) && (
  <button type="button" className="enquiry-close" onClick={onClose} aria-label="Close enquiry form">
    &times;
  </button>
)}
```
For inline forms, reset `status` back to empty after a delay so a user can submit another inquiry if needed.

---

### Defect 6: Aggressive Keystroke Validation (Poor Input UX)
- **Severity:** `Low / UX`
- **Location:** [`src/components/EnquiryForm.js` (Lines 127–137)](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/components/EnquiryForm.js#L127-L137)

#### Root Cause
`handleChange` triggers validation on every character typed:
```javascript
if (name === "name" || name === "phone") {
    const error = name === "name" ? validateName(value) : validatePhone(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
}
```
As soon as a user enters the first letter of their name (e.g., "R"), `validateName` fails the `< 2` characters test and immediately renders red error borders and messages before the user can finish typing.

#### Recommended Fix
- Validate on **`handleBlur`** and on **`handleSubmit`**.
- In `handleChange`, only clear an existing error if the user has resolved it, but do **not** introduce new errors while the user is actively typing.

```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));

  // Only clear error if currently in error state and input is now valid
  if (errors[name]) {
    const error = name === "name" ? validateName(value) : name === "phone" ? validatePhone(value) : "";
    if (!error) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }
};
```

---

### Defect 7: Overly Restrictive Name Regex Rejecting Valid Indian Names
- **Severity:** `Low / UX`
- **Location:** [`src/components/EnquiryForm.js` (Line 39)](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/components/EnquiryForm.js#L39)

#### Root Cause
```javascript
const namePattern = /^[\p{L}]+(?:[ '-][\p{L}]+)*(?:\.)?(?:\s+[\p{L}]+(?:[ '-][\p{L}]+)*(?:\.)?)*$/u;
```
Names containing consecutive initials or title abbreviations without whitespace (e.g., `A.B. Patil`, `Dr.Sachin`, `K.R. Rao`) fail this expression.

#### Recommended Fix
Simplify to allow letters, spaces, dots, hyphens, and apostrophes:
```javascript
const namePattern = /^[\p{L}][\p{L}\s.'-]{1,99}$/u;
```

---

### Defect 8: Backend WhatsApp Meta API Constraint (`type: "text"` 24-Hour Policy)
- **Severity:** `High / Infrastructure`
- **Location:** [`src/app/api/send-whatsapp-bg/route.js` (Line 59)](file:///c:/Users/Admin/Desktop/shree-enterprises-website/src/app/api/send-whatsapp-bg/route.js#L59)

> [!WARNING]
> Meta WhatsApp Cloud API prohibits sending free-form `type: "text"` messages to phone numbers unless a customer-initiated 24-hour conversation session is open.

#### Root Cause
If the owner’s phone number (`OWNER_WHATSAPP_NUMBER`) has not replied to the Meta test number within the last 24 hours, Meta returns error `131047` (`Re-engagement message: session window expired`). The client receives `500 Failed to send your enquiry`.

#### Recommended Fix
In Meta Business Manager, create an approved **Utility Message Template** (e.g. `website_enquiry_alert`) with parameters `{{1}}`, `{{2}}`, `{{3}}`, etc. In `route.js`, dispatch using `type: "template"` rather than `type: "text"`.

---

## 4. Frontend Developer Action Checklist

- [ ] **Step 1: Refactor `EnquiryForm.js`**


  - Strip the outer `.enquiry-modal-overlay` and `.enquiry-modal` wrapper tags.
  - Return only `<div className="enquiry-form-container">` containing the header, form, and status messages.
  - Show the close button conditionally based on `Boolean(onClose)`.
  - Add `useEffect` to sync `defaultService` changes into `formData.service`.
  - Update `handleChange` to avoid flashing errors prematurely while typing.
  - Update `validateName` regex to support initials and abbreviations.
- [ ] **Step 2: Update `EnquiryModal.js`**
  - Ensure `EnquiryModal.js` is the sole provider of `.enquiry-modal-overlay` and `.enquiry-modal`.
  - Ensure Escape key and body scroll lock handlers remain attached to `EnquiryModal.js`.
- [ ] **Step 3: Verify All Consumer Pages**
  - Check `/contact`: verify that the form renders cleanly inside the right column without popping up over the page.
  - Check `/` (Home), `/services`, `/offers`, and `/products`: verify that opening the inquiry modal renders a single backdrop and closes on Escape, `×` click, or backdrop click.

"use client";

import { useState, useEffect } from "react";

const SERVICES = [
    "Electrical Wiring",
    "Water Purification",
    "Residential & Commercial Support",
    "Elevator Maintenance",
    "Other",
];

const INITIAL_FORM_DATA = {
    name: "",
    phone: "",
    service: "",
    message: "",
    preferredTime: "",
};

// Full name validation
function validateName(value) {
    const name = value.trim().replace(/\s+/g, " ");

    if (!name) {
        return "Please enter your full name.";
    }

    if (name.length < 2) {
        return "Name must contain at least 2 characters.";
    }

    if (name.length > 100) {
        return "Name cannot exceed 100 characters.";
    }

    const namePattern = /^[\p{L}][\p{L}\s.'-]{1,99}$/u;

    if (!namePattern.test(name)) {
        return "Enter a valid name using letters only.";
    }

    const letters = name.match(/\p{L}/gu) || [];

    if (letters.length < 2) {
        return "Please enter your complete name.";
    }

    return "";
}

// Indian mobile number validation
function validatePhone(value) {
    const phone = value.trim();

    if (!phone) {
        return "Please enter your mobile number.";
    }

    if (!/^\+?[\d\s()-]+$/.test(phone)) {
        return "Enter a valid mobile number using digits only.";
    }

    let digits = phone.replace(/[\s()-]/g, "");

    if (digits.startsWith("+91")) {
        digits = digits.slice(3);
    }

    if (digits.length !== 10) {
        return "Mobile number must contain 10 digits.";
    }

    if (!/^[6-9]\d{9}$/.test(digits)) {
        return "Enter a valid Indian mobile number.";
    }

    return "";
}

function normalizePhone(value) {
    let digits = value.trim().replace(/[\s()-]/g, "");

    if (digits.startsWith("+91")) {
        digits = digits.slice(3);
    }

    return digits;
}

export default function EnquiryForm({
    onClose,
    defaultService = "",
    showHeader = true,
}) {
    const serviceList =
        defaultService && !SERVICES.includes(defaultService)
            ? [defaultService, ...SERVICES]
            : SERVICES;

    const [formData, setFormData] = useState({
        ...INITIAL_FORM_DATA,
        service: defaultService || "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({
        type: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (defaultService) {
            setFormData((prev) => ({
                ...prev,
                service: defaultService,
            }));
            setErrors((prev) => ({
                ...prev,
                service: "",
            }));
        }
    }, [defaultService]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            let error = "";
            if (name === "name") {
                error = validateName(value);
            } else if (name === "phone") {
                error = validatePhone(value);
            } else if (name === "service") {
                error = value ? "" : "Please select a service.";
            }

            if (!error) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            setErrors((prev) => ({
                ...prev,
                name: validateName(value),
            }));
        }

        if (name === "phone") {
            setErrors((prev) => ({
                ...prev,
                phone: validatePhone(value),
            }));
        }

        if (name === "service") {
            setErrors((prev) => ({
                ...prev,
                service: value ? "" : "Please select a service.",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        const newErrors = {
            name: validateName(formData.name),
            phone: validatePhone(formData.phone),
            service: formData.service ? "" : "Please select a service.",
        };

        setErrors(newErrors);

        if (newErrors.name || newErrors.phone || newErrors.service) {
            setStatus({
                type: "",
                message: "",
            });
            return;
        }

        setIsSubmitting(true);
        setStatus({
            type: "info",
            message: "Sending your enquiry...",
        });

        try {
            const payload = {
                ...formData,
                name: formData.name.trim().replace(/\s+/g, " "),
                phone: normalizePhone(formData.phone),
            };

            const response = await fetch("/api/send-whatsapp-bg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.error || "Failed to send your enquiry."
                );
            }

            setStatus({
                type: "success",
                message: "Your enquiry has been sent successfully!",
            });

            setFormData({
                ...INITIAL_FORM_DATA,
                service: defaultService || "",
            });
            setErrors({});

            setTimeout(() => {
                if (onClose) {
                    onClose();
                } else {
                    setStatus({ type: "", message: "" });
                }
            }, 2500);
        } catch (error) {
            setStatus({
                type: "error",
                message:
                    error.message ||
                    "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="enquiry-form-container">
            {showHeader && (
                <div className="modal-header">
                    <div className="enquiry-heading">
                        <span className="enquiry-eyebrow">
                            SHREE ENTERPRISES
                        </span>

                        <h2 id="enquiry-modal-title">
                            Send an Enquiry
                        </h2>

                        <p>
                            Tell us what you need. We’ll get back to you.
                        </p>
                    </div>

                    {Boolean(onClose) && (
                        <button
                            type="button"
                            className="enquiry-close"
                            onClick={onClose}
                            aria-label="Close enquiry form"
                        >
                            &times;
                        </button>
                    )}
                </div>
            )}

            <div className="modal-body">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="field-group">
                        <label htmlFor="enquiry-name">
                            Full Name <span className="required">*</span>
                        </label>

                        <input
                            id="enquiry-name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            maxLength={100}
                            required
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your full name"
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={
                                errors.name
                                    ? "enquiry-name-error"
                                    : undefined
                            }
                            className={
                                errors.name ? "input-error" : ""
                            }
                        />

                        {errors.name && (
                            <p
                                className="field-error"
                                id="enquiry-name-error"
                                role="alert"
                            >
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="field-group">
                        <label htmlFor="enquiry-phone">
                            Mobile Number <span className="required">*</span>
                        </label>

                        <input
                            id="enquiry-phone"
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            inputMode="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. 9876543210"
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={
                                errors.phone
                                    ? "enquiry-phone-error"
                                    : undefined
                            }
                            className={
                                errors.phone ? "input-error" : ""
                            }
                        />

                        {errors.phone && (
                            <p
                                className="field-error"
                                id="enquiry-phone-error"
                                role="alert"
                            >
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div className="field-group">
                        <label htmlFor="enquiry-service">
                            Service Required <span className="required">*</span>
                        </label>

                        <select
                            id="enquiry-service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={Boolean(errors.service)}
                        >
                            <option value="">
                                -- Select a service --
                            </option>

                            {serviceList.map((service) => (
                                <option
                                    key={service}
                                    value={service}
                                >
                                    {service}
                                </option>
                            ))}
                        </select>

                        {errors.service && (
                            <p className="field-error" role="alert">
                                {errors.service}
                            </p>
                        )}
                    </div>

                    <div className="field-group">
                        <label htmlFor="enquiry-time">
                            Preferred Contact Time{" "}
                            <span className="optional">
                                (Optional)
                            </span>
                        </label>

                        <input
                            id="enquiry-time"
                            type="text"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            placeholder="e.g. Morning, Evening, After 6 PM"
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="enquiry-message">
                            Your Message{" "}
                            <span className="optional">
                                (Optional)
                            </span>
                        </label>

                        <textarea
                            id="enquiry-message"
                            name="message"
                            rows={2}
                            maxLength={2000}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us more about your requirement..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        <span>
                            {isSubmitting
                                ? "Sending Enquiry..."
                                : "Send Enquiry"}
                        </span>

                        {!isSubmitting && (
                            <span
                                className="submit-arrow"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        )}
                    </button>

                    {status.message && (
                        <div
                            className={`status-message ${status.type}`}
                            role="status"
                            aria-live="polite"
                        >
                            {status.message}
                        </div>
                    )}
                </form>

                <div className="enquiry-footer-note">
                    <span
                        className="enquiry-footer-dot"
                        aria-hidden="true"
                    />
                    We’ll contact you regarding your requirement.
                </div>
            </div>
        </div>
    );
}
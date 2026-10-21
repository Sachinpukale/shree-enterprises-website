"use client";

import { useEffect, useState } from "react";

const OWNER_WHATSAPP = "918626095720";

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

export default function EnquiryForm({ isOpen, onClose }) {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [status, setStatus] = useState({ type: "", message: "" });

    // Close popup on Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim() || !formData.service) {
            setStatus({
                type: "error",
                message: "Please fill all required fields (Name, Phone & Service).",
            });
            return;
        }

        setStatus({ type: "info", message: "Opening WhatsApp..." });

        const whatsappMessage = [
            "*New Enquiry - Shree Enterprises*",
            "",
            `👤 *Name:* ${formData.name.trim()}`,
            `📞 *Phone:* ${formData.phone.trim()}`,
            `🔧 *Service Required:* ${formData.service}`,
            formData.preferredTime.trim() ? `⏰ *Preferred Time:* ${formData.preferredTime.trim()}` : "",
            formData.message.trim() ? `💬 *Message:* ${formData.message.trim()}` : "",
            "",
            "---",
            "Sent from website",
        ]
            .filter(Boolean)
            .join("\n");

        const whatsappURL = `https://wa.me/${OWNER_WHATSAPP}?text=` + encodeURIComponent(whatsappMessage);

        // FIX: Use window.location.href or a direct link click to bypass popup blockers
        window.location.href = whatsappURL;

        setStatus({
            type: "success",
            message: "Redirecting to WhatsApp...",
        });

        setFormData(INITIAL_FORM_DATA);
    };

    const closePopup = () => {
        setStatus({ type: "", message: "" });
        onClose?.();
    };

    if (!isOpen) return null;

    return (
        <div
            className="enquiry-overlay"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    closePopup();
                }
            }}
        >
            <section
                className="enquiry-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="enquiry-title"
            >
                <button
                    type="button"
                    className="close-button"
                    onClick={closePopup}
                    aria-label="Close enquiry form"
                >
                    ×
                </button>

                <div className="modal-header">
                    <h2 id="enquiry-title">Send an Enquiry</h2>
                    <p>We will respond quickly on WhatsApp</p>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field-group">
                            <label htmlFor="enquiry-name">
                                Full Name <span className="required">*</span>
                            </label>
                            <input
                                id="enquiry-name"
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="field-group">
                            <label htmlFor="enquiry-phone">
                                Phone Number <span className="required">*</span>
                            </label>
                            <input
                                id="enquiry-phone"
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="e.g. 9876543210"
                            />
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
                            >
                                <option value="">-- Select a service --</option>
                                {SERVICES.map((service) => (
                                    <option key={service} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="field-group">
                            <label htmlFor="enquiry-time">Preferred Contact Time (Optional)</label>
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
                            <label htmlFor="enquiry-message">Your Message (Optional)</label>
                            <textarea
                                id="enquiry-message"
                                name="message"
                                rows="3"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us more about your requirement..."
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Send Enquiry on WhatsApp
                        </button>
                    </form>

                    {status.message && (
                        <div className={`status-message ${status.type}`} role="status">
                            {status.message}
                        </div>
                    )}
                </div>
            </section>

            <style jsx>{`
                .enquiry-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    background: rgba(0, 0, 0, 0.55);
                    backdrop-filter: blur(4px);
                    animation: fade-in 0.2s ease-out;
                }

                .enquiry-modal {
                    position: relative;
                    width: 100%;
                    max-width: 480px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 16px;
                    background: #ffffff;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                    animation: modal-in 0.25s ease-out;
                }

                .close-button {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    z-index: 10;
                    display: grid;
                    place-items: center;
                    width: 32px;
                    height: 32px;
                    border: none;
                    border-radius: 50%;
                    background: #f0f2f5;
                    color: #555;
                    font-size: 20px;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .close-button:hover {
                    background: #e4e6eb;
                }

                .modal-header {
                    padding: 24px 24px 12px;
                    text-align: center;
                }

                .modal-header h2 {
                    margin: 0 0 6px;
                    color: #1a1a1a;
                    font-size: 1.4rem;
                    font-weight: 700;
                }

                .modal-header p {
                    margin: 0;
                    color: #666;
                    font-size: 0.9rem;
                }

                .modal-body {
                    padding: 12px 24px 24px;
                }

                .field-group {
                    margin-bottom: 1rem;
                }

                .field-group label {
                    display: block;
                    margin-bottom: 0.35rem;
                    color: #333;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .field-group .required {
                    color: #e53935;
                }

                .field-group input,
                .field-group select,
                .field-group textarea {
                    width: 100%;
                    padding: 0.7rem 0.9rem;
                    border: 1px solid #d0d0d0;
                    border-radius: 8px;
                    background: #fafafa;
                    color: #222;
                    font-family: inherit;
                    font-size: 0.95rem;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s;
                    box-sizing: border-box;
                }

                .field-group textarea {
                    resize: vertical;
                }

                .field-group input:focus,
                .field-group select:focus,
                .field-group textarea:focus {
                    border-color: #25d366;
                    background: #fff;
                }

                .submit-button {
                    width: 100%;
                    margin-top: 0.5rem;
                    padding: 0.85rem;
                    border: none;
                    border-radius: 8px;
                    background: #25d366;
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s, transform 0.1s;
                }

                .submit-button:hover {
                    background: #22bf5b;
                }

                .status-message {
                    margin-top: 1rem;
                    padding: 0.75rem;
                    border-radius: 8px;
                    text-align: center;
                    font-size: 0.9rem;
                }

                .status-message.success {
                    background: #e8f5e9;
                    color: #2e7d32;
                }

                .status-message.error {
                    background: #ffebee;
                    color: #c62828;
                }

                .status-message.info {
                    background: #e3f2fd;
                    color: #1565c0;
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                    }

                @keyframes modal-in {
                    from {
                        opacity: 0;
                        transform: translateY(12px) scale(0.97);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
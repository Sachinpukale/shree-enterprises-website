"use client";

import { useState } from "react";

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

export default function EnquiryForm({ onClose, defaultService = "" }) {
    const serviceList = defaultService && !SERVICES.includes(defaultService)
        ? [defaultService, ...SERVICES]
        : SERVICES;

    const [formData, setFormData] = useState({
        ...INITIAL_FORM_DATA,
        service: defaultService || "",
    });
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim() || !formData.service) {
            setStatus({
                type: "error",
                message: "Please fill all required fields (Name, Phone & Service).",
            });
            return;
        }

        setStatus({ type: "info", message: "Sending enquiry..." });

        try {
            const response = await fetch("/api/send-whatsapp-bg", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus({
                    type: "success",
                    message: "Enquiry sent directly to the owner via WhatsApp!",
                });
                setFormData(INITIAL_FORM_DATA);
                setTimeout(() => {
                    onClose?.();
                }, 2500);
            } else {
                throw new Error(data.error || "Failed to send message");
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: error.message || "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="enquiry-form-container">
            <div className="modal-header">
                <h2>Send an Enquiry</h2>
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
                            {serviceList.map((service) => (
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
                        Send Enquiry
                    </button>
                </form>

                {status.message && (
                    <div className={`status-message ${status.type}`} role="status">
                        {status.message}
                    </div>
                )}
            </div>

            <style jsx>{`
                .enquiry-form-container {
                    padding: 10px 24px 24px;
                }
                .modal-header {
                    text-align: center;
                    margin-bottom: 16px;
                }
                .modal-header h2 {
                    margin: 0 0 4px;
                    color: #1a1a1a;
                    font-size: 1.4rem;
                }
                .modal-header p {
                    margin: 0;
                    color: #666;
                    font-size: 0.9rem;
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
                .required {
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
                    font-size: 0.95rem;
                    outline: none;
                    box-sizing: border-box;
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
                .status-message.success { background: #e8f5e9; color: #2e7d32; }
                .status-message.error { background: #ffebee; color: #c62828; }
                .status-message.info { background: #e3f2fd; color: #1565c0; }
            `}</style>
        </div>
    );
}

import EnquiryForm from "@/components/EnquiryForm";'@/components/EnquiryForm';

export default function ContactPage() {
    return (
        <div style={{ padding: "2rem" }}>
            <h1 style={{ textAlign: "center" }}>Contact Shree Enterprises</h1>
            <p style={{ textAlign: "center", color: "#666" }}>Have a question? Fill out the form below and we will get back to you soon.</p>

            {/* Rendering our default-exported form component */}
            <EnquiryForm />
        </div>
    );
}
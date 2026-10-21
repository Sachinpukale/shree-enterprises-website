import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, phone, service, preferredTime, message } = body;

        if (!name || !phone || !service) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const accessToken = process.env.META_ACCESS_TOKEN;
        const phoneNumberId = process.env.META_PHONE_NUMBER_ID;
        const ownerNumber = process.env.OWNER_WHATSAPP_NUMBER;

        if (!accessToken || !phoneNumberId || !ownerNumber) {
            return NextResponse.json(
                { success: false, error: "Meta API credentials are not configured on the server." },
                { status: 500 }
            );
        }

        // Format the message template
        const whatsappMessage = [
            "🔔 *New Website Enquiry - Shree Enterprises*",
            "",
            `👤 *Name:* ${name.trim()}`,
            `📞 *Phone:* ${phone.trim()}`,
            `🔧 *Service Required:* ${service}`,
            preferredTime ? `⏰ *Preferred Time:* ${preferredTime.trim()}` : "",
            message ? `💬 *Message:* ${message.trim()}` : "",
            "",
            "---",
            "Sent automatically via Meta Cloud API",
        ]
            .filter(Boolean)
            .join("\n");

        // Meta Graph API Endpoint for sending messages
        const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: ownerNumber,
                type: "text",
                text: {
                    preview_url: false,
                    body: whatsappMessage,
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Meta API Error Response:", data);
            throw new Error(data.error?.message || "Failed to send via Meta API");
        }

        return NextResponse.json({ success: true, message: "Enquiry sent directly to owner's WhatsApp!" });
    } catch (error) {
        console.error("Meta WhatsApp Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
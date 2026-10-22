import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, phone, service, preferredTime, message } = body;

        // Basic validation
        if (!name || !phone || !service) {
            return NextResponse.json(
                { success: false, error: "Missing required fields (Name, Phone, or Service)." },
                { status: 400 }
            );
        }

        const accessToken = process.env.META_ACCESS_TOKEN;
        const phoneNumberId = process.env.META_PHONE_NUMBER_ID;
        const ownerNumber = process.env.OWNER_WHATSAPP_NUMBER;

        // Ensure credentials exist before sending request
        if (!accessToken || !phoneNumberId || !ownerNumber) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Meta API credentials are missing in server environment variables (.env.local)."
                },
                { status: 500 }
            );
        }

        const messageBody = [
            "🔔 *New Website Enquiry*",
            "",
            `👤 *Name:* ${name.trim()}`,
            `📞 *Phone:* ${phone.trim()}`,
            `🔧 *Service:* ${service.trim()}`,
            preferredTime ? `⏰ *Preferred Time:* ${preferredTime.trim()}` : "",
            message ? `💬 *Message:* ${message.trim()}` : "",
            "",
            "---",
        ]
            .filter(Boolean)
            .join("\n");

        // Meta Graph API Endpoint
        const metaUrl = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;

        const metaResponse = await fetch(metaUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: ownerNumber.replace(/[^0-9]/g, ""), // Ensure purely numeric phone format
                type: "text",
                text: {
                    preview_url: false,
                    body: messageBody,
                },
            }),
        });

        const metaData = await metaResponse.json();

        if (!metaResponse.ok) {
            console.error("Meta Graph API Error Response:", metaData);
            return NextResponse.json(
                {
                    success: false,
                    error: metaData.error?.message || "Meta API request failed."
                },
                { status: metaResponse.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Enquiry sent successfully to WhatsApp!",
            metaResponse: metaData,
        });

    } catch (error) {
        console.error("Server API Route Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
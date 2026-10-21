# 🚀 Meta WhatsApp API Token & Configuration Guide

This guide explains **where to add your API tokens** and **how the automatic WhatsApp background messaging works**.

---

## 📍 1. Where to Add Your API Tokens

All API tokens and secrets must be placed inside your **`.env.local`** file located at the **root directory** of your Next.js project.

### File: `.env.local`
*(If this file does not exist, create it in your project root next to `package.json`)*

```env
# ------------------------------------------------------------------
# META WHATSAPP API CREDENTIALS
# ------------------------------------------------------------------

# 1. Place your permanent System User Access Token here:
META_ACCESS_TOKEN=EAAG...your_full_meta_token_here...

# 2. Place your Meta WhatsApp Phone Number ID here:
META_PHONE_NUMBER_ID=100654321098765

# 3. Target WhatsApp Number of the Business Owner (Country Code + Number, NO '+' or spaces):
OWNER_WHATSAPP_NUMBER=918626095720
```

---

## ⚙️ 2. Where Code Changes Were Made

Here are the 2 main files responsible for handling the form submission and API call:

### A. Next.js Server API Route
**File Location:** `app/api/send-whatsapp-meta/route.js`

* **What it does:** Runs on your server securely. It reads the `META_ACCESS_TOKEN` and `META_PHONE_NUMBER_ID` from `.env.local` and sends a server-to-server request directly to Meta's API endpoint (`https://graph.facebook.com/v17.0/...`).
* **Where to edit message format:** If you want to change how the WhatsApp text looks, modify the `whatsappMessage` variable inside this file.

### B. Frontend Form Component
**File Location:** `components/EnquiryForm.jsx`

* **What it does:** Collects user details (Name, Phone, Service, Time, Message) and sends a JSON POST request to `/api/send-whatsapp-meta`.
* **User experience:** Displays a loading indicator (`Sending enquiry...`) and shows a success notification when Meta accepts the message.

---

## 🔄 3. How It Works (Step-by-Step Flow)

```
[ User ] -> Fills Enquiry Form on Website -> Clicks "Send Enquiry"
                                  │
                                  ▼
             [ Next.js API Route: /api/send-whatsapp-meta ]
                                  │
         (Reads META_ACCESS_TOKEN securely on server)
                                  │
                                  ▼
          [ Meta Cloud API Server (graph.facebook.com) ]
                                  │
                                  ▼
      [ Owner's WhatsApp ] receives notification directly in background!
```

1. **Submit:** The user submits the form. **No WhatsApp window opens on the user's browser or mobile device.**
2. **Backend Processing:** Next.js securely forwards the form data to Meta Cloud API using your server token.
3. **Instant Direct Message:** Meta delivers the formatted text directly into the owner's WhatsApp chat instantly.
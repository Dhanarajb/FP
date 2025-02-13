require("dotenv").config(); // Load .env variables
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

// Twilio Credentials (Loaded from .env)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// API Route to Send WhatsApp Message
app.post("/send-whatsapp", async (req, res) => {
  try {
    const { to } = req.body; // Get recipient number from request
    if (!to) {
      return res
        .status(400)
        .json({ success: false, error: "Recipient number is required" });
    }

    const message = await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio WhatsApp Sandbox Number
      to: `whatsapp:${to}`,
      body: "✅ Interested",
    });

    console.log("WhatsApp Message Sent! ID:", message.sid);
    res.json({
      success: true,
      message: "WhatsApp message sent successfully!",
      sid: message.sid,
    });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

// Twilio Credentials
const accountSid = "AC8f08ec17755a9ee6ba0d1231f2977e6d";
const authToken = "d72bf4d6a2be6129364b9b40a66afb8e";
const client = new twilio(accountSid, authToken);

// API Route to Send WhatsApp Message
app.post("/send-whatsapp", async (req, res) => {
  try {
    const message = await client.messages.create({
      from: "whatsapp:+917038785737", // Twilio Sandbox Number
      to: "whatsapp:+919590891302", // Your WhatsApp Number
      body: "Interested", // Set custom message here
    });

    console.log("WhatsApp Message Sent! ID:", message.sid);
    res.json({ success: true, message: "WhatsApp message sent successfully!" });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/send-whatsapp", (req, res) => {
  client.messages
    .create({
      from: "whatsapp:+917038785737", // Twilio WhatsApp Sandbox Number
      to: `whatsapp:${USER_PHONE}`,
      body: "✅ Interested",
    })
    .then((message) => res.json({ success: true, sid: message.sid }))
    .catch((error) => res.json({ success: false, error }));
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

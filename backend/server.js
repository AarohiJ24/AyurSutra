const express = require("express");
const dotenv = require("dotenv");
const pool = require("./db");



dotenv.config();
const app = express();

app.use(express.json());

// Import routes
const feedbackRoutes = require("./routes/feedback");
const patientRoutes = require("./routes/patients");
const therapistRoutes = require("./routes/therapists");
const appointmentRoutes = require("./routes/appointments");
app.use("/feedback", feedbackRoutes);
app.use("/patients", patientRoutes);
app.use("/therapists", therapistRoutes);
app.use("/appointments", appointmentRoutes);

// Default port (from .env or fallback to 5000)
let PORT = process.env.PORT || 5000;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`✅ Server running on port ${server.address().port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`⚠️ Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("❌ Server error:", err);
    }
  });
}

startServer(PORT);

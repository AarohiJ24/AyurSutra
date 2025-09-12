const express = require("express");
const router = express.Router();
const db = require("../db");

// Schedule an appointment
router.post("/", async (req, res) => {
  try {
    const { patient_id, therapist_id, therapy_id, appointment_date, appointment_time } = req.body;

    await db.query(
      "INSERT INTO appointments (patient_id, therapist_id, therapy_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?, ?)",
      [patient_id, therapist_id, therapy_id, appointment_date, appointment_time]
    );

    res.status(201).json({ message: "Appointment scheduled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to schedule appointment" , details: error.message});
  }
})

// Get patient appointments
router.get("/patient/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM appointments WHERE patient_id = ? ORDER BY appointment_date, appointment_time",
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

module.exports = router;

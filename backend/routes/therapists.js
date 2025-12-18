const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");


router.post("/register", async (req, res) => {
  try {
    const { name, specialization, availability, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO therapists (name, specialization, availability, password_hash) VALUES (?, ?, ?, ?)",
      [name, specialization, JSON.stringify(availability), hashedPassword]
    );

    res.status(201).json({ message: "Therapist registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register therapist" });
  }
});


router.get("/:id/schedule", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM appointments WHERE therapist_id = ? ORDER BY appointment_date, appointment_time",
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch schedule" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// Register patient
router.post("/register", async (req, res) => {
  try {
    const { name, age, therapy_type, assigned_therapist_id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO patients (name, age, therapy_type, assigned_therapist_id, password_hash) VALUES (?, ?, ?, ?, ?)",
      [name, age, therapy_type, assigned_therapist_id, hashedPassword]
    );

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    
    res.status(500).json({ error: "Failed to register patient" });
  }
});

module.exports = router;

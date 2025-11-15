const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");

// ------------------ SELLER SIGNUP ------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, brandName, address, craftTypes, description, email, password } = req.body;

    const exists = await Seller.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const seller = await Seller.create({
      name,
      brandName,
      address,
      craftTypes,
      description,
      email,
      password,
    });

    return res.status(201).json({
      message: "Seller registered successfully",
      seller,
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ SELLER LOGIN ------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: "User not found" });

    if (seller.password !== password)
      return res.status(400).json({ message: "Wrong password" });

    return res.json({
      message: "Login successful",
      seller: {
        id: seller._id,
        name: seller.name,
        brandName: seller.brandName,
        email: seller.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

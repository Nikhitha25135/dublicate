const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Upload Product
router.post("/upload", async (req, res) => {
  try {
    const { sellerId, title, price, category, description, image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({
      sellerId,
      title,
      price,
      category,
      description,
      image,
    });

    return res.json({
      message: "Product uploaded successfully",
      product,
    });

  } catch (error) {
    console.error("Product Upload Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

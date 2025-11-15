const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ADD TO CART
router.post("/add", async (req, res) => {
  try {
    const { buyerId, productId } = req.body;

    let cart = await Cart.findOne({ buyerId });
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!cart) {
      cart = await Cart.create({
        buyerId,
        items: [{ 
          productId, 
          title: product.title, 
          price: product.price,
          image: product.image,
          quantity: 1 
        }]
      });
    } else {
      // Check if product already exists
      const existing = cart.items.find((item) => item.productId === productId);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.items.push({
          productId,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
      await cart.save();
    }

    return res.json({ message: "Item added to cart", cart });

  } catch (err) {
    res.status(500).json({ message: "Server error adding to cart", err });
  }
});

// GET CART
router.get("/:buyerId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ buyerId: req.params.buyerId });
    res.json(cart || { buyerId: req.params.buyerId, items: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching cart", err });
  }
});

// UPDATE QUANTITY
router.put("/update", async (req, res) => {
  try {
    const { buyerId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ buyerId });
    const item = cart.items.find((i) => i.productId === productId);
    item.quantity = quantity;
    cart.save();
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error updating quantity", err });
  }
});

// DELETE ITEM
router.delete("/remove", async (req, res) => {
  try {
    const { buyerId, productId } = req.body;

    let cart = await Cart.findOne({ buyerId });

    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();

    res.json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error removing item", err });
  }
});

module.exports = router;

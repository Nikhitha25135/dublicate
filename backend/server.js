const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

// File upload setup
const upload = multer({ dest: "uploads/" });

// -------------------------------
// Static folders (must be before routes)
// -------------------------------
app.use("/mockups", express.static(path.join(__dirname, "mockups")));
app.use("/outputs", express.static(path.join(__dirname, "outputs")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ====================================================
// 1️⃣ BACKGROUND REMOVAL API
// ====================================================
app.post("/remove-bg", upload.single("image"), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `outputs/${req.file.filename}.png`;

  if (!fs.existsSync("outputs")) fs.mkdirSync("outputs");

  exec(`python remove_bg.py ${inputPath} ${outputPath}`, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Background removal failed" });
    }

    res.sendFile(path.resolve(outputPath));
  });
});

// ====================================================
// 2️⃣ FABRIC MOCKUP API (ADD THIS ABOVE listen())
// ====================================================
app.post("/fabric-mockup", upload.single("image"), (req, res) => {
  const inputPath = req.file.path;
  const outputDir = `mockups/${req.file.filename}`;

  if (!fs.existsSync("mockups")) fs.mkdirSync("mockups");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  exec(`python mockup.py ${inputPath} ${outputDir}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Mockup Error:", error);
      return res.status(500).json({ error: "Mockup generation failed", details: stderr });
    }

    try {
      const result = JSON.parse(stdout);
      const baseUrl = "http://localhost:5001";

      // convert backend paths to full URLs
      Object.keys(result).forEach((key) => {
        if (key !== "caption") {
          result[key] = baseUrl + "/" + result[key].replace(/\\/g, "/");
        }
      });

      return res.json(result);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      res.status(500).json({ error: "Output parsing failed" });
    }
  });
});

// ====================================================
// 🚀 SERVER START (LAST LINE ONLY)
// ====================================================
app.listen(5001, () => {
  console.log("API running on port 5001");
});

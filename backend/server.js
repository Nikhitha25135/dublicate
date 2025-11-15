const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

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

app.listen(5001, () => {
  console.log("BG Removal API running on port 5001");
});

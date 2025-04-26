import { Router } from "express";
import upload from "../config/multerConfig.js";
import fs from "fs";
const router = Router();
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsPath = path.join(__dirname, "../uploads");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.render("success", { imageUrl: `/uploads/${req.file.filename}` });

  console.log(req.file.filename);
});

router.get("/gallery", (req, res) => {
  fs.readdir(uploadsPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to load images");
    }

    // Filter to show only image files if you want
    const imageFiles = files.filter((file) => {
      return file.match(/\.(jpg|jpeg|png|gif)$/);
    });

    res.render("gallery", { images: imageFiles });
  });
});

// Delete

router.post("/delete", (req, res) => {
  const imageName = req.body.imageName; // get the image name from the form
  const imagePath = path.join(uploadsPath, imageName); // full path to the image

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Failed to delete image:", err);
    }
    res.redirect("/gallery"); // <- Notice the "/" before gallery
    console.log("Deleting:", imagePath);
  });
});

export default router;

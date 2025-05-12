import { Router } from "express";
import { readFileSync } from "fs";
import fs from "fs";

const router = Router();
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let data;

router.get("/", (req, res) => {
  res.render("index.ejs", { uni: data });
});

router.post("/uniAction", (req, res) => {
  const universitiesJSON = readFileSync(
    path.join(__dirname, "../universities.json"),
    "utf-8"
  );

  const universities = JSON.parse(universitiesJSON);

  data = universities.find((u) => u.name === req.body.choice) || null;

  console.log("Selected university:", req.body.choice);
  console.log("Matched data:", data);

  res.redirect("/");
});

router.get("/download/:id", (req, res) => {
  const universitiesJSON = readFileSync(
    path.join(__dirname, "../universities.json"),
    "utf-8"
  );

  const universities = JSON.parse(universitiesJSON);

  const idParam = req.params.id.trim().toLowerCase();
  const uni = universities.find(
    (c) => String(c.id).toLowerCase() === String(req.params.id).toLowerCase()
  );
  if (!uni) {
    return res.status(404).send("University not found");
  }

  res.attachment(`${uni.name}.json`);
  res.send(JSON.stringify(uni, null, 2));
});
export default router;

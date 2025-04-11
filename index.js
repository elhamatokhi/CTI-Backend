import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

//  Initializing express app
const app = express();
const PORT = 3000;

// __dirname Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

let movies = [];

//  Read movies from the JSON file when the server restarts
const moviesFilePath = path.join(__dirname, "movies.json");
fs.readFile(moviesFilePath, "utf-8", (err, data) => {
  if (err) {
    console.error(`Error reading the JSON file: ${err}`);
  } else movies = JSON.parse(data);
});

// Create and display movies
app.post("/submit", (req, res) => {
  const { movie, rating } = req.body;

  if (!movie || !rating) {
    return res.status(400).send("<h3>Movie name and rating are required!</h3>");
  }

  movies.push({ movie, rating });

  fs.writeFile(moviesFilePath, JSON.stringify(movies, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error writing to the JSON file.");
    }
    res.render("success.ejs", { movie, rating });
  });
});

app.get("/", (req, res) => {
  res.render("index.ejs", { movies });
});

// Sever
app.listen(PORT, () => {
  console.log(`The Server is listening on port ${PORT}`);
});

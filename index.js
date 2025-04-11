import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

let movies = [];

app.post("/submit", (req, res) => {
  const { movie, rating } = req.body;

  movies.push({ movie, rating });
  if (!movie || !rating) {
    return res.status(400).send("<h3>Movie name and rating are required!</h3>");
  }

  res.render("success.ejs", { movie, rating });
});

app.get("/", (req, res) => {
  res.render("index.ejs", { movies });
});

app.listen(PORT, () => {
  console.log(`The Server is listening on port ${PORT}`);
});

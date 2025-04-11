import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const { movie, rating } = req.body;

  console.log(req.body);
  try {
    res.render("success.ejs", { movie: movie, rating: rating });
  } catch (error) {
    res.status(500).send(`<h3>Sever is not responding</h3>`);
  }
});
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});

import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/movies/:name", (req, res) => {
  const movieName = req.params.name;
  res.render("movieList", { movieName });
});

export default router;

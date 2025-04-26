import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get('/movieList',(req,res)=>{
  res.render('movieList')
})
router.get("/movies/:name", (req, res) => {
  const movieName = req.params.name;
  res.render("movieList", { movieName });
});


router.post('/submit',(req,res)=>{
  const {movie, rating} = req.body
  res.render('success',{movie,rating})
})

export default router;

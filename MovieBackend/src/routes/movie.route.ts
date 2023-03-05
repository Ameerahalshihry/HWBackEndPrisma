import { Router } from "express";
import { findMovies, createMovie, updateMovie, deleteMovie, findMovieByName,findMovieByGenre, findMovieByRating } from "../controller/movie.controller";
import validate from "../middleware/validate";
import { Movietype } from "../schema.zod/movie.zod";

const router= Router()

router.get('/', findMovies)
router.post('/', validate(Movietype) ,createMovie)
router.put('/:id', updateMovie)
router.delete('/:id', deleteMovie)
router.get('/:name', findMovieByName)
router.get('/genre/:genre', findMovieByGenre)
router.get('/rating/:rating', findMovieByRating)

export default router
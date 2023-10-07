// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const {
  addMovies, getallMovies, getByIdMovies, updateById,
} = require('../controller/movies');

const router = express.Router();

router.post('/', addMovies);
router.get('/', getallMovies);
router.get('/:movieId', getByIdMovies);
router.put('/:movieId', updateById);
module.exports = router;

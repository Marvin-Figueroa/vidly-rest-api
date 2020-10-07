const express = require('express');
const moviesController = require('../controllers/moviesController');
const validator = require('../middleware/validateMongoObjectId');

const router = express.Router();

router.param('id', validator.validateId);

router
  .route('/')
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie);

router
  .route('/:id')
  .get(moviesController.getMovie)
  .put(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

module.exports = router;

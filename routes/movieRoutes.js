const express = require('express');
const moviesController = require('../controllers/moviesController');
const validateId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Asegura que el parametro id de la request sea un ObjectId valido
router.param('id', validateId);

router
  .route('/')
  .get(moviesController.getAllMovies)
  .post(auth, moviesController.createMovie);

router
  .route('/:id')
  .get(moviesController.getMovie)
  .put(auth, moviesController.updateMovie)
  .delete(auth, admin, moviesController.deleteMovie);

module.exports = router;

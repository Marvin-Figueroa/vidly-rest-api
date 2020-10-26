const express = require('express');
const genresController = require('../controllers/genresController');
const validateId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Asegura que el parametro id de la request sea un ObjectId valido
router.param('id', validateId);

router
  .route('/')
  .get(genresController.getAllGenres)
  .post(auth, genresController.createGenre);

router
  .route('/:id')
  .get(genresController.getGenre)
  .delete(auth, admin, genresController.deleteGenre)
  .put(auth, genresController.updateGenre);

module.exports = router;

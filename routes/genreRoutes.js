const express = require('express');
const genresController = require('../controllers/genresController');
const validator = require('../middleware/validateMongoObjectId');

const router = express.Router();

router.param('id', validator.validateId);

router.route('/')
  .get(genresController.getAllGenres)
  .post(genresController.createGenre);

router.route('/:id')
  .get(genresController.getGenre)
  .delete(genresController.deleteGenre)
  .put(genresController.updateGenre);

module.exports = router;

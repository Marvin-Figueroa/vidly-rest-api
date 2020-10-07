const mongoose = require('mongoose');

exports.validateId = (req, res, next, val) => {
  console.log(`Given ID: ${val}`);
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('The given ID is not valid');
  }
  next();
}

const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('The given ID is not valid');
  }
  next();
};

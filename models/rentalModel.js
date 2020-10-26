const mongoose = require('mongoose');
const Joi = require('joi');

// Cada objeto Rental estara compuesto por Customer, Movie, dateOut, dateReturned y rentalFee.
// Customer se redefine como un nuevo Schema para especificar solo aquellas propiedades
// que nos interesa formen parte de cada nuevo Rental. Lo mismo pasa con Movie.
const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const validationPattern = /^[0-9a-fA-F]{24}$/;

  const schema = Joi.object({
    // Verifico si ambos ID son ObjectIds validos con la RegExp en validationPattern
    customerId: Joi.string().required().pattern(validationPattern),
    movieId: Joi.string().required().pattern(validationPattern),
    // El cliente enviara unicamente los 2 ID anteriores como parte de la post request.
  });

  return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;

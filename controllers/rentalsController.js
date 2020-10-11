const { Rental, validateRental } = require('../models/rentalModel');
const { Customer } = require('../models/customerModel');
const { Movie } = require('../models/movieModel');

exports.getAllRentals = async (req, res) => {
  const rentals = await Rental.find().sort({ dateOut: -1 });
  return res.send(rentals);
};

exports.createRental = async (req, res) => {
  // Valido que el body de la request contenga solo el customerId y el movieId.
  const { error } = validateRental(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // No verifico si customerId es un ObjectId valido...posible error al parsearlo
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    return res.status(400).send('The given customer ID does not exist.');
  }

  // No verifico si movieId es un ObjectId valido...posible error al parsearlo
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    return res.status(400).send('The given movie ID does not exist.');
  }

  // Reviso si aun hay existencias de la movie que se quiere rentar
  if (movie.numberInStock === 0) {
    return res.status(400).send('Movie not in stock.');
  }

  // Creo la nueva Rental
  const rental = await Rental.create({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // Tanto la creacion de la Rental como la disminucion en 1 del stock de la movie deben
  // formar parte de una transaccion para garantizar la integridad y consistencia de los datos
  movie.numberInStock -= 1;
  movie.save();

  return res.send(rental);
};

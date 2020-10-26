const mongoose = require('mongoose');
const { Rental, validateRental } = require('../models/rentalModel');
const { Customer } = require('../models/customerModel');
const { Movie } = require('../models/movieModel');

exports.getAllRentals = async (req, res) => {
  const rentals = await Rental.find().sort({ dateOut: -1 });
  return res.send(rentals);
};

exports.createRental = async (req, res) => {
  // Creando la session e iniciando la transaccion
  const session = await mongoose.startSession();
  session.startTransaction();

  // Valido que el body de la request contenga unicamente el customerId y el movieId.
  const { error } = validateRental(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Verifico si el customerId existe en la BD
  const customer = await Customer.findById(req.body.customerId).session(
    session
  );
  if (!customer) {
    return res.status(400).send('The given customer ID does not exist.');
  }

  // Verifico si el movieId existe en la BD
  const movie = await Movie.findById(req.body.movieId).session(session);
  if (!movie) {
    return res.status(400).send('The given movie ID does not exist.');
  }

  // Reviso si aun hay existencias de la movie que se quiere rentar
  if (movie.numberInStock === 0) {
    return res.status(400).send('Movie not in stock.');
  }

  // Creo la nueva Rental
  const rental = new Rental({
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

  try {
    await rental.save({ session });
    movie.numberInStock -= 1;
    // throw new Error('Error autoocasionado ocurrio');
    await movie.save();

    await session.commitTransaction();
    return res.send(rental);
  } catch (ex) {
    // Si un error ocurre, se aborta la transaccion y
    // se deshace cualquier cambio previamente realizado

    console.log('Something bad happened during the transacction.');
    await session.abortTransaction();
    throw ex;
  } finally {
    session.endSession();
  }
};

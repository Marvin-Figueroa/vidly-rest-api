module.exports = () => {
  // Verificando que process.env.JWT_PRIVATE_KEY este definida
  if (!process.env.JWT_PRIVATE_KEY) {
    throw new Error('FATAL ERROR: process.env.JWT_PRIVATE_KEY is not defined.');
  }
};

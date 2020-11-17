// The preferred way to handle async errors in route handlers is using the
// express-async-errors npm package but if for some reason that package
// does not work then the function below should be used instead

module.exports = function (routeHandler) {
  return async (req, res, next) => {
    try {
      await routeHandler(req, res);
    } catch (error) {
      next(error);
    }
  };
};

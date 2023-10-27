export const defaultErrorHandler = (err, req, res, next) => {
  res.status(err.status).json({
    message: "Error",
    error: err,
  });
};

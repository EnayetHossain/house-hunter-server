const CustomError = require("../errors/customError.error");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res
    .status(500)
    .json({ error: "Something went wrong please try again latter" });
};

module.exports = errorHandler;

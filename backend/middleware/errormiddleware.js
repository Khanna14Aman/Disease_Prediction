// we use middleware so that it will return error in very structured format not in html format.

// This error is used when any router is not found eg=> user/loginnn
const notFound = (req, res, next) => {
  console.log("error1");
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// This error is used when any other general error is found
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log("error2");
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };

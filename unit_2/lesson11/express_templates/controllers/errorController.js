const httpStatus = require("http-status-codes");

// exports.logErrors = (error, req, res, next) => {//add middleware to handle errors
//   console.error(error.stack);//log the error stack
//   next(error);//pass the error to the next middleware function
// };

exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.sendFile(`./public/${errorCode}.html`, {root: "./",});
};

exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};

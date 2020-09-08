const winston = require("winston");

function error(err, req, res, next) {
  winston.error("", err);
  // winston.log("error", err);

  //error
  //warning
  //info
  //verbose
  //debug
  //silly

  res.status(500).send("Something failed.");
}

exports.error = error;

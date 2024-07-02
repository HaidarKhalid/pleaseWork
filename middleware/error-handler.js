const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later."
  }
  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(err.keyValue)} already in use, plaese choosse another one.`,
    customError.statusCode = 400
  }
  if (err == "Error: Illegal arguments: undefined, string") {
    customError.msg = "Something went wrong, please try again later."
    customError.statusCode = StatusCodes.BAD_REQUEST 
  }
  if (err.name == 'CastError') {
    customError.msg =  `no item with that id: ${err.value}`
    customError.statusCode = 404
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
  return res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = errorHandlerMiddleware

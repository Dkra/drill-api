const { GeneralError } = require('../utils/errors')

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: err.status,
      message: err.message,
    })
  }

  return res.status(500).json({
    status: err.status,
    message: err.message,
  })
}

module.exports = handleErrors

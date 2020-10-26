class GeneralError extends Error {
  constructor(message) {
    super()
    this.status = 'error'
    this.message = message
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400
    }
    if (this instanceof NotFound) {
      return 404
    }

    // Redirect

    // More...

    return 500
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}

export { GeneralError, BadRequest, NotFound }
export default GeneralError

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
    if (this instanceof Forbidden) {
      return 403
    }
    if (this instanceof Unauthorized) {
      return 401
    }

    // Redirect

    // More...

    return 500
  }
}

class BadRequest extends GeneralError {}
class Forbidden extends GeneralError {}
class Unauthorized extends GeneralError {}
class NotFound extends GeneralError {}

export { GeneralError, BadRequest, NotFound, Unauthorized, Forbidden }
export default GeneralError

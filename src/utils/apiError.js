// Purpose: Custom  handling error class to handle api errors
class apiError extends Error {
  constructor(
    statusCode,
    message = 'something went wrong ', //
    errors = [], //passing errors as an array
    stack = '', //passing error stack
  ) {
    super(message) //calling the parent class constructor to orveride the message property
    this.status = statusCode //setting the status code
    this.data = null // data is set to null as a placeholder to be used later for storing additional error-specific information.
    this.message = message //
    this.sucess = false //not sending sucess message
    this.errors = errors //setting the errors property to the errors array
    //if stack is passed then set the stack property to the stack value
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export { apiError }

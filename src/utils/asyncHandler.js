//creating promise based async handler for utility

const asyncHandler = requesthandler => {
  return (request, response, next) => {
    Promise.resolve(requesthandler(request, response, next)).catch(err =>
      next(err),
    )
  }
}

export { asyncHandler }

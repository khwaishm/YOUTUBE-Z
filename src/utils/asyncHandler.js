//creating promise based async handler for utility

const asyncHandler = (requesthandler) =>{
  (request,response,next ) => {
    Promise.resolve(requesthandler(request,response,next)).catch((err) => next(err))
  }
}



export {asyncHandler};
const asyncHandler = (requestHandler) =>{
  return (req,res,next) =>{
    Promise.resolve(requestHandler(req,res,next)).
    catch((error) => next(error));
  }
}


export {asyncHandler};

//Higher order FUNciton that takes a function as an argument and returns a new function that wraps the original function in a try-catch block. This is useful for handling errors in asynchronous functions without having to write try-catch blocks in every route handler.

/*
const asyncHandler = (fn) => async(req,res,next) =>{
  try {
    await fn(req,res,next);
  } catch (error) {
    res.status(error.code || 500).json({ 
      success: false,
      message: error.message || "Internal Server Error" });
  }
};

*/
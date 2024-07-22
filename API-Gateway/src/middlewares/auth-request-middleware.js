const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

const { UserService } = require("../services");
function validateAuthRequest(req, res, next) {
  console.log(req.body.email);
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while authenticating";
    ErrorResponse.explanation = "Email data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while authenticating";
    ErrorResponse.explanation = "Password not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    console.log("Response from checkAtuh :", response);
    if (response) {
      req.user = response; // setting the user id in the req object
      next();
    }
  } catch (error) {
    console.log(error);
    if (error.statusCode) return res.status(error.statusCode).json(error);
    return res.status(StatusCodes.FORBIDDEN).json(error);
  }
}

async function checkAdmin(req, res, next) {
  const response = await UserService.isAdmin(req.user.id);
  if(!response) {
      return res
              .status(StatusCodes.UNAUTHORIZED)
              .json({message: 'User not authorized for this action'});
  }
  next();
}





module.exports = {
  validateAuthRequest,
  checkAuth,
  checkAdmin,
};

const { StatusCodes } = require('http-status-codes');
const AppError = require("../utils/errors/app-error");

const {errorResponse}=require('../utils/common');
function validateCreateCity(req, res, next) {
    if(!req.body.name){
        errorResponse.message='Something went wrong while creating a new City'
        errorResponse.error={
            explanation: 'name not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    next();
}
function validateUpdateRequest(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      errorResponse.message = "Failed to update an City";
      errorResponse.error = new AppError(
        ["The Data was not found in the incoming request"],
        StatusCodes.BAD_REQUEST
      );
  
      return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next(); // If users send the Data properly without any fail then u will call the next middleware (i.e. the controller) using the next() function
  }

module.exports = {
    validateCreateCity,
    validateUpdateRequest
}
const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.recepientEmail) {
    ErrorResponse.message = "Failed to send email";
    ErrorResponse.error = new AppError(
      ["The recepientEmail was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.subject && !req.body.content) {
    ErrorResponse.message = "Failed to send email";
    ErrorResponse.error = new AppError(
      [
        "The subject and content were not found in the incoming request, can't send empty email",
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}
module.exports = {
  validateCreateRequest,
};

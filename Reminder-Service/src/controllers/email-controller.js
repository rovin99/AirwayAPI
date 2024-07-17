const { StatusCodes } = require("http-status-codes");

const { emailService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function create(req, res) {
  console.log(req.body);
  try {
    const response = await emailService.createTicket({
      recepientEmail: req.body.recepientEmail,
      subject: req.body.subject,
      content: req.body.content,
    });
    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.log("Found error obj inside email controller -----", error);
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(ErrorResponse);
  }
}



module.exports = { create };

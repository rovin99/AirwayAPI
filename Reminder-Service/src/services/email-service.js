const { TicketRepository } = require("../repositories");
const { Mailer } = require("../config");
const ticketRepo = new TicketRepository();
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");


async function createTicket(data) {
  try {
    console.log(data);
    const response = await ticketRepo.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError("Not able to create ticket", StatusCodes.INTERNAL_SERVER);
   
  }
}


async function sendEmail(mailFrom, mailTo, subject, text) {
  try {

      const response = await Mailer.sendMail({
          from: mailFrom,
          to: mailTo,
          subject: subject,
          text: text
      });
      return response;
  } catch(error) {
      console.log(error);
      throw error;
  }
}
module.exports = {
  
  createTicket,
  sendEmail,

};

const { TicketRepository } = require("../repositories");
const { mailsender } = require("../config");
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


async function sendEmail(mailFrom, mailTo, subject, text, html) {
  try {
    const response = await mailsender.sendMail({
      from: {
        name: "Airway",
        address: mailFrom,
      },
      to: mailTo,
      subject: subject,
      text: text,
      html: html,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError("Not able to send email", StatusCodes.INTERNAL_SERVER);
  }
}
module.exports = {
  
  createTicket,
  sendEmail,

};

const { StatusCodes } = require("http-status-codes");
const CrudRepository = require("./crud-repository");
const { Ticket } = require("../models");
const { Op } = require("sequelize");
const { Enums } = require("../utils/common");
const { AppError } = require("../utils");

class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }

  async getPendingTickets() {
    try {
      const response = await Ticket.findAll({
        where: {
          status: Enums.TICKET_STATUS.PENDING,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new AppError("Not able to get Pending Tickets", StatusCodes.NOT_FOUND);
    }
  }

  async getBookedTickets() {
    try {
      const response = await Ticket.findAll({
        where: {
          status: Enums.TICKET_STATUS.BOOKED,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new AppError("Not able to get Booked Tickets", StatusCodes.NOT_FOUND);
    }
  }
}

module.exports = TicketRepository;

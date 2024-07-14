const CrudRepository = require('./crud-repository');
const { Booking } = require('../models');
const { StatusCodes } = require('http-status-codes');
const commonUtils = require('../utils/common');
const { Op } = require("sequelize");
const { Enums } = commonUtils;
const { BOOKED, PENDING, INITIATED, CANCELLED } = Enums.BOOKING_STATUS;
class BookingRepository extends CrudRepository {

    constructor(){
        super(Booking);
    }
    async createBooking(data, transaction) {
        const response = await Booking.create(data, {transaction: transaction});
        return response;
    } 
    async get(data, transaction) {
        const response = await Booking.findByPk(data, {transaction: transaction});
        if(!response) {
            throw new AppError('Not able to fund the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(id, data, transaction) { // data -> {col: value, ....}
        const response = await Booking.update(data, {
            where: {
                id: id
            }
        }, {transaction: transaction});
        return response;
    }

    async cancelOldBooking(id, transaction) {

        console.log("in repo");
        const response = await Booking.update({status: CANCELLED},{
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt]: timestamp
                        }
                    }, 
                    {
                        status: {
                            [Op.ne]: BOOKED
                        }
                    },
                    {
                        status: {
                            [Op.ne]: CANCELLED
                        }
                    }
                ]
                
            }
        });
        return response;
    }
    async getAllBookings(userId) {
        const response = await this.model.findAll({
          where: {
            userId: userId,
          },
        });
        if (!response) {
          throw new AppError(
            "Not able to find the bookings ",
            StatusCodes.NOT_FOUND
          );
        }
        return response;
      }
};

module.exports = BookingRepository;
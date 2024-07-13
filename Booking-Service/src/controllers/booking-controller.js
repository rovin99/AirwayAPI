const {BookingService} =require('../services');
const {StatusCodes}=require('http-status-codes');
const { successResponse, errorResponse } = require('../utils/common');

async function createBooking(req, res) {
    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        });
        successResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
    } catch(error) {
        errorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(errorResponse);
    }
}

async function makePayment(req, res) {
    try {
        const response = await BookingService.makePayment({
            bookingId: req.body.bookingId,
            userId: req.body.userId,
            totalCost: req.body.totalCost
        });
        successResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
    } catch(error) {
        errorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(errorResponse);
    }
}

module.exports ={
    createBooking,
    makePayment
}
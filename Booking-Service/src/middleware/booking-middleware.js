const { StatusCodes } = require('http-status-codes');


const {errorResponse}=require('../utils/common');


function validatecreateBooking(req, res, next) {
    
    if(!req.body.flightId){
        errorResponse.message='Something went wrong while creating a new Booking'
        errorResponse.error={
            explanation: 'flightId not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.userId){
        errorResponse.message='Something went wrong while creating a new Booking'
        errorResponse.error={
            explanation: 'userId not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.noOfSeats){
        errorResponse.message='Something went wrong while creating a new Booking'
        errorResponse.error={
            explanation: 'noOfSeats not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    
    next();
}

module.exports = {
    validatecreateBooking
}
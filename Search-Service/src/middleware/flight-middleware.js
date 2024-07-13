const { StatusCodes } = require('http-status-codes');


const {errorResponse}=require('../utils/common');
function validateCreateFlight(req, res, next) {
    if(!req.body.flightNumber){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'flightNumber not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.departureAirportId){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'departureAirportId not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.arrivalAirportId) {
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'arrivalAirportId not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.price){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'price not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.arrival){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'arrival not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.departure){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'departure not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.airplaneId){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'airplaneId not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.boardingGate){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'boardingGate not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.totalSeats){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'totalSeats not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    
}
function validateUpdateSeats(req, res) {
    
    if(!req.body.seats){
        errorResponse.message='Something went wrong while updating Flight'
        errorResponse.error={
            explanation: 'seats not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    
    next();
}

module.exports = {
    validateCreateFlight,
    validateUpdateSeats
}
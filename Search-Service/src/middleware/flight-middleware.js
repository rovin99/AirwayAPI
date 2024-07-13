const { StatusCodes } = require('http-status-codes');


const {errorResponse}=require('../utils/common');
function validateCreateFlight(req, res, next) {
    if(!req.body.name){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'name not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.from){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'from not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.to) {
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'to not found in the request in correct format'
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
    if(!req.body.airplane){
        errorResponse.message='Something went wrong while creating a new Flight'
        errorResponse.error={
            explanation: 'airplane not found in the request in correct format'
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
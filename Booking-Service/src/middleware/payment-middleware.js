const { StatusCodes } = require('http-status-codes');


const {errorResponse}=require('../utils/common');


function validatemakePayment(req, res, next) {

    if(!req.body.bookingId){
        errorResponse.message='Something went wrong while making payment'
        errorResponse.error={
            explanation: 'flightId not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.userId){
        errorResponse.message='Something went wrong while making payment'
        errorResponse.error={
            explanation: 'userId not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.totalCost){
        errorResponse.message='Something went wrong while making payment'
        errorResponse.error={
            explanation: 'totalCost not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    next();
}

module.exports = {
    validatemakePayment
}
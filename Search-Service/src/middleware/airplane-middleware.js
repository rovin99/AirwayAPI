const { StatusCodes } = require('http-status-codes');


const {errorResponse}=require('../utils/common');
function validateCreateAirplane(req, res, next) {
    if(!req.body.modelNumber){
        errorResponse.message='Something went wrong while creating a new Airplane'
        errorResponse.error={
            explanation: 'Model number not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.capacity){
        errorResponse.message='Something went wrong while creating a new Airplane'
        errorResponse.error={
            explanation: 'Capacity not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    next();
}

module.exports = {
    validateCreateAirplane
}
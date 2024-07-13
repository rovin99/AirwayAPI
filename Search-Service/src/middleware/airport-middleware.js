const { StatusCodes } = require('http-status-codes');


const {errorResponse}=require('../utils/common');
function validateCreateAirport(req, res, next) {
    if(!req.body.name){
        errorResponse.message='Something went wrong while creating a new Airport'
        errorResponse.error={
            explanation: 'name not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.code){
        errorResponse.message='Something went wrong while creating a new Airport'
        errorResponse.error={
            explanation: 'code not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.address) {
        errorResponse.message='Something went wrong while creating a new Airport'
        errorResponse.error={
            explanation: 'address not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.city_id){
        errorResponse.message='Something went wrong while creating a new Airport'
        errorResponse.error={
            explanation: 'city_id not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    next();
}

module.exports = {
    validateCreateAirport
}
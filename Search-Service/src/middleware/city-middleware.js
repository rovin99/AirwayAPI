const { StatusCodes } = require('http-status-codes');


const {errorResponse}=require('../utils/common');
function validateCreateCity(req, res, next) {
    if(!req.body.name){
        errorResponse.message='Something went wrong while creating a new City'
        errorResponse.error={
            explanation: 'name not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    next();
}

module.exports = {
    validateCreateCity
}
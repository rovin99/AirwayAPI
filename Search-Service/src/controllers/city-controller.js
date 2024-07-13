const { StatusCodes } = require('http-status-codes');

const { CityService } = require('../services');
const { response } = require('express');
const {errorResponse,successResponse}=require('../utils/common');
/**
 * POST : /city 
 * req-body {name : 'london'}
 */
async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name,
            
        });
        successResponse.message = 'City created successfully';
        successResponse.data=city;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
                
    } catch(error) {
        
        errorResponse.error=error;
        return res
            .status(error.statusCode)
            .json(errorResponse);
    }
}
/**
 * DELETE : /city/id
 * req-body {}
 */
async function destroyCity(req, res) {
    try {
        const response = await CityService.destroyCity(req.params.id);
        successResponse.message = 'City deleted successfully';
        successResponse.data=response;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
                
    } catch(error) {
        
        errorResponse.error=error;
        return res
            .status(error.statusCode)
            .json(errorResponse);
    }
}

/**
 * PATCH: /city/id/
 * req-body {name : 'london'}
 */
async function updateCity(req, res) {
    try {
        const updateResponse = await CityService.updateCity(req.params.id,req.body);
        successResponse.message = 'City updated successfully';
        successResponse.data=updateResponse;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
                
    } catch(error) {
        errorResponse.error=error;
        return res
            .status(error.statusCode)
            .json(errorResponse);
    }
}



module.exports={
    createCity,
    destroyCity,
    updateCity,
}
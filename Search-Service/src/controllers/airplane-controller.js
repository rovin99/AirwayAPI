const { StatusCodes } = require('http-status-codes');

const { AirplaneService } = require('../services');
const { response } = require('express');
const {errorResponse,successResponse}=require('../utils/common');
/**
 * POST : /airplanes 
 * req-body {modelNumber: 'airbus320', capacity: 200}
 */
async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        successResponse.message = 'Airplane created successfully';
        successResponse.data=airplane;
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
async function getAirplanes(req, res) {
    try {
        const airplanesData = await AirplaneService.getAirplanes();
        successResponse.data=airplanesData;
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

//POST: /airplanes/:id
async function getAirplane(req, res) {
    try {
        const airplaneData = await AirplaneService.getAirplane(req.params.id);
        successResponse.data=airplaneData;
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
//DELETE: /airplanes/:id
async function destroyAirplane(req, res) {
    try {
        const response = await AirplaneService.destroyAirplane(req.params.id);
        successResponse.data=response;
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

//Patch: /airplanes/:id/:data

async function updateAirplane(req, res) {
    try {
        const updateResponse = await AirplaneService.updateAirplane(req.params.id,req.body);
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


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}
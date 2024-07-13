const { StatusCodes } = require('http-status-codes');

const { AirportService } = require('../services');
const { response } = require('express');
const {errorResponse,successResponse}=require('../utils/common');
/**
 * POST : /Airports 
 * req-body {modelNumber: 'airbus320', capacity: 200}
 */
async function createAirport(req, res) {
    try {
        const Airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            city_id: req.body.city_id
        });
        successResponse.message = 'Airport created successfully';
        successResponse.data=Airport;
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
async function getAirports(req, res) {
    try {
        const AirportsData = await AirportService.getAirports();
        successResponse.data=AirportsData;
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

//POST: /Airports/:id
async function getAirport(req, res) {
    try {
        const AirportData = await AirportService.getAirport(req.params.id);
        successResponse.data=AirportData;
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
//DELETE: /Airports/:id
async function destroyAirport(req, res) {
    try {
        const response = await AirportService.destroyAirport(req.params.id);
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

//Patch: /Airports/:id/:data

async function updateAirport(req, res) {
    try {
        const updateResponse = await AirportService.updateAirport(req.params.id,req.body);
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
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}
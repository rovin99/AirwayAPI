const { StatusCodes } = require('http-status-codes');

const { FlightService } = require('../services');
const { response } = require('express');
const {errorResponse,successResponse}=require('../utils/common');

/**
 * POST : /Flights 
 * req-body {modelNumber: 'airbus320', capacity: 200}
 */
async function createFlight(req, res) {
    try {
        const Flight = await FlightService.createFlight({
            name: req.body.name,
            from: req.body.from,
            to: req.body.to,
            price: req.body.price,
            arrival: req.body.arrival,
            departure: req.body.departure,
            airplane: req.body.airplane,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        });
        successResponse.message = 'Flight created successfully';
        successResponse.data=Flight;
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
async function getFlights(req, res) {
    try {
        const FlightsData = await FlightService.getFlights(req.query);
        successResponse.data=FlightsData;
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

//POST: /Flights/:id
async function getFlight(req, res) {
    try {
        console.log(req.params.id);
        const FlightData = await FlightService.getFlight(req.params.id);
        successResponse.data=FlightData;
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
//DELETE: /Flights/:id
async function destroyFlight(req, res) {
    try {
        const response = await FlightService.destroyFlight(req.params.id);
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

//Patch: /Flights/:id/:data

async function updateSeats(req, res) {
    try {
        const updateResponse = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });
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
    createFlight,
    getFlights,
    getFlight,
    destroyFlight,
    updateSeats
}
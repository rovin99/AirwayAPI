const {StatusCodes} = require('http-status-codes');

const { AirportRepository } = require('../repositories');

const AppError = require('../utils/errors/app-error');
const airportRepository = new AirportRepository();

async function createAirport(data) {
    console.log('Received data:', data); 
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch(error) {
        
        if(error.name =='SequelizeValidationError') {
            let explaination=[];
            
            error.errors.forEach((err)=>{
                explaination.push(err.message);
            });
           
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch(error) {
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);

        
        return airport;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirport(id,data){
    try{
        const updateResponse = await airportRepository.update(id,data);
        return updateResponse;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}
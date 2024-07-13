const {StatusCodes} = require('http-status-codes');

const { AirplaneRepository } = require('../repositories');

const AppError = require('../utils/errors/app-error');
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch(error) {
        
        if(error.name =='SequelizeValidationError') {
            let explaination=[];
            
            error.errors.forEach((err)=>{
                explaination.push(err.message);
            });
           
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch(error) {
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);

        
        return airplane;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirplane(id,data){
    try{
        const updateResponse = await airplaneRepository.update(id,data);
        return updateResponse;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}
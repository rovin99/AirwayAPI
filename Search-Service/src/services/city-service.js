const {StatusCodes} = require('http-status-codes');

const { CityRepository } = require('../repositories');

const AppError = require('../utils/errors/app-error');
const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch(error) {
        
        if(error.name =='SequelizeValidationError'|| error.name =='SequelizeUniqueConstraintError') {
            let explaination=[];
            
            error.errors.forEach((err)=>{
                explaination.push(err.message);
            });
           
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new City object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function destroyCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete data of the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateCity(id,data) {
    try {
        const updateResponse = await cityRepository.update(id,data);
        return updateResponse;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update data of the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createCity,
    destroyCity,
    updateCity,
}
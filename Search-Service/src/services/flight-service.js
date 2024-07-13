const {StatusCodes} = require('http-status-codes');

const { FlightRepository } = require('../repositories');
const compareDate=require('../utils/common/helpers/date-compare');
const arrDepartCheck=require('../utils/common/helpers/arr-depart-check');
const AppError = require('../utils/errors/app-error');
const {Op} = require("sequelize");
const flightRepository = new FlightRepository();

async function createFlight(data) {
    console.log('Received data:', data); 
    try {
        if(!compareDate(data.arrival, data.departure)) {
          throw new AppError('Invalid date/time range...', 400); 
        }
    } catch (err) {
        throw new AppError('Invalid date/time range...', 400);
      
    }
    try {
        
        const Flight = await flightRepository.create(data);
        return Flight;
        
    } catch(error) {
        
        if(error.name =='SequelizeValidationError') {
            let explaination=[];
            
            error.errors.forEach((err)=>{
                explaination.push(err.message);
            });
           
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlights(query) {

    let customFilter={};
    let sortFilter = [];
    if(query.trips){
        [from,to,year,month,day] = query.trips.split("-");   
        const queryDate = new Date(year, month - 1, day);
        const startOfDay = new Date(queryDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(queryDate);
        endOfDay.setHours(23, 59, 59, 999);

        customFilter.from = from;
        customFilter.to = to;
        customFilter.departure = {
            [Op.gte]: startOfDay, 
            [Op.lte]: endOfDay,   
        };

        if(arrDepartCheck(customFilter)){
            throw new AppError('Arrival and Departure cannot be same', 400); 
        }
    }
    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if(query.price){
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000: maxPrice)]
        }
    }
    if(query.sort){
        const params = query.sort.split(",");

        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;


    }
    try {
        const Flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        return Flights;
    } catch(error) {
        throw new AppError('Cannot fetch data of all the Flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const Flight = await flightRepository.get(id);

        
        return Flight;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The Flight you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch data of the Flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyFlight(id) {
    try {
        const response = await flightRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The Flight you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete data of the Flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateSeats(data){
    try{
        const updateResponse = await flightRepository.updateSeats(data.flightId, data.seats, data.dec);
        return updateResponse;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The Flight did not got updated', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update data of the Flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createFlight,
    getFlights,
    getFlight,
    destroyFlight,
    updateSeats
}
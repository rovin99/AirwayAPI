const CrudRepository = require('./crud-repo');
const { Flight,Airplane,Airport} = require('../models');
const {Sequelize,Op}=require('sequelize');
const db=require('../models');
const {addRowLock}=require('./queries');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }
    async getAllFlight(filter,sortFilter){
        try {
            const response = await Flight.findAll({
              where: filter,
              order: sortFilter,
              include: [
                {
                  model: Airplane,
                  as: 'AirplaneDetails',
                  required: true
                },
                {
                  model: Airport,
                  required: true,
                  as: 'DepartureAirport',
                  on:{
                    col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=",Sequelize.col("DepartureAirport.code"))
                  }  
                },
                {
                  model: Airport,
                  required: true,
                  as: 'ArrivalAirport',
                  on:{
                    col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=",Sequelize.col("ArrivalAirport.code"))
                  }  
                }
                
              ],
            });
            return response;
          } catch (error) {
            console.error('Error fetching Flight:', error);
            throw new AppError('Cannot fetch data of all the Flight', StatusCodes.INTERNAL_SERVER_ERROR);
          }
          
    }
    async updateSeats(flightId,seats,dec=true){
      try{
        await db.sequelize.query(addRowLock(flightId)); //PUTS A ROW LOCK
        const response= await Flight.findByPk(flightId);
        
        if(parseInt(dec)){
          
          await response.decrement('totalSeats', {by: seats});

        }
        else{
          await response.increment('totalSeats', {by: seats});
          
        }
        const newresponse= await Flight.findByPk(flightId);
        return newresponse;
      }
      catch (error) {
        console.error('Error updating Flight:', error);
        throw new AppError('Cannot update the Flight', StatusCodes.INTERNAL_SERVER_ERROR);
      }
    }
    
}

module.exports = FlightRepository;
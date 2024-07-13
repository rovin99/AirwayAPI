const CrudRepository = require('./crud-repo');
const { flights,Airplane,airport} = require('../models');
const {Sequelize,Op}=require('sequelize');
const db=require('../models');
const {addRowLock}=require('./queries');

class FlightRepository extends CrudRepository {
    constructor() {
        super(flights);
    }
    async getAllFlights(filter,sortFilter){
        try {
            const response = await flights.findAll({
              where: filter,
              order: sortFilter,
              include: [
                {
                  model: Airplane,
                  as: 'AirplaneDetails',
                  required: true
                },
                {
                  model: airport,
                  required: true,
                  as: 'DepartureAirport',
                  on:{
                    col1: Sequelize.where(Sequelize.col("flights.from"),"=",Sequelize.col("DepartureAirport.code"))
                  }  
                },
                {
                  model: airport,
                  required: true,
                  as: 'ArrivalAirport',
                  on:{
                    col1: Sequelize.where(Sequelize.col("flights.to"),"=",Sequelize.col("ArrivalAirport.code"))
                  }  
                }
                
              ],
            });
            return response;
          } catch (error) {
            console.error('Error fetching flights:', error);
            throw new AppError('Cannot fetch data of all the Flights', StatusCodes.INTERNAL_SERVER_ERROR);
          }
          
    }
    async updateSeats(flightId,seats,dec=true){
      try{
        await db.sequelize.query(addRowLock(flightId)); //PUTS A ROW LOCK
        const response= await flights.findByPk(flightId);
        
        if(parseInt(dec)){
          
          await response.decrement('totalSeats', {by: seats});

        }
        else{
          await response.increment('totalSeats', {by: seats});
          
        }
        const newresponse= await flights.findByPk(flightId);
        return newresponse;
      }
      catch (error) {
        console.error('Error updating flights:', error);
        throw new AppError('Cannot update the Flight', StatusCodes.INTERNAL_SERVER_ERROR);
      }
    }
    
}

module.exports = FlightRepository;
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
    
    async updateSeats(flightId, seats, dec = true) {
      const transaction = await db.sequelize.transaction();
      try {
          await db.sequelize.query(addRowLock(flightId));
          const flight = await Flight.findByPk(flightId);
          if(+dec) {
              await flight.decrement('totalSeats', {by: seats}, {transaction: transaction});
          } else {
              await flight.increment('totalSeats', {by: seats}, {transaction: transaction});
          }
          await transaction.commit();
          return flight;
      } catch(error) {
          await transaction.rollback();
          throw error;
      }
     
  }
    
}

module.exports = FlightRepository;
const axios = require('axios');
const {BookingRepository} =require('../repositories');
const {StatusCodes}=require('http-status-codes');
const {ServerConfig}=require('../config');
const db=require('../models');
const AppError = require('../utils/errors/app-error');
const commonUtils = require('../utils/common');
const { Enums } = commonUtils;
const { BOOKED, PENDING, INITIATED, CANCELLED } = Enums.BOOKING_STATUS;
const { Queue } = require("../config");
const bookingRepository = new BookingRepository();


async function createBooking(data){

    const transaction = await db.sequelize.transaction();
    
    try{
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightData = flight.data.data;
        if(data.noOfSeats > flightData.totalSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }
        const totalBilling = data.noOfSeats*flightData.price;
        const BookingPayLoad={...data,totalCost: totalBilling};
        const booking=await bookingRepository.create(BookingPayLoad,transaction);

        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`,{
            seats: data.noOfSeats
        });

        await transaction.commit();
        
        return booking;
    }
    catch(err){
        
        await transaction.rollback();
        console.error(err);
        throw err;
    }
}

async function makePayment(data){

    const transaction = await db.sequelize.transaction();
    try{
        const bookingDetails = await bookingRepository.get(data.bookingId, transaction);
        if(bookingDetails.status === CANCELLED){
            throw new AppError('Booking Expired-Request Timeout', StatusCodes.BAD_REQUEST);
        }
        const startDate=new Date(bookingDetails.createdAt);
        const currDate = new Date();
        var diff =(currDate.getTime() - startDate.getTime()) / 1000;
        diff /= 60;

        if(diff>20){
            await cancelBooking(data.bookingId);
            throw new AppError('Booking Expired-Request Timeout', StatusCodes.BAD_REQUEST);
        }
        if(data.totalCost!=bookingDetails.totalCost){
            throw new AppError('The amount of the payment doesnt match', StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.userId != data.userId) {
            throw new AppError('The user corresponding to the booking doesnt match', StatusCodes.BAD_REQUEST);
        }
        //assuming the payment is sucessful


        const response=await bookingRepository.update(data.bookingId, {status: BOOKED}, transaction);
        console.log("response inside booking/payment service", response);

        const flight = await axios.get(
            `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}`
          );
        const flightData = flight.data.data;

        Queue.sendData({

            recepientEmail: 'rs206987@gmail.com',
            subject: 'Flight booked',
            text: `Booking confirmed for flight ${flightData.flightNumber} from ${flightData.arrivalAirportId} to ${flightData.departureAirportId}`
        })
        await transaction.commit();
        return response;
    }
    catch(err){
        await transaction.rollback();
        console.error(err);
        throw err;
    }
}

async function cancelBooking(bookingId){

    const transaction = await db.sequelize.transaction();
    try{
        const bookingDetails = await bookingRepository.get(bookingId, transaction);
        if(bookingDetails.status == CANCELLED) {
            await transaction.commit();
            return true;
        }
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}`, {
            seats: bookingDetails.noofSeats,
            dec: 0
        });
        await bookingRepository.update(bookingId, {status: CANCELLED}, transaction);
        await transaction.commit();


    }
    catch(err){
        await transaction.rollback();
        throw err;
    }
}

async function cancelOldBookings(timestamp){
    try {
        console.log("Inside service");
        const time = new Date( Date.now() - 1000 * 300 ); // time 5 mins ago
        const response = await bookingRepository.cancelOldBooking(time);
        
        return response;
    } catch(error) {
        console.log(error);
    }

}
module.exports ={
    createBooking,
    makePayment,
    cancelOldBookings
}
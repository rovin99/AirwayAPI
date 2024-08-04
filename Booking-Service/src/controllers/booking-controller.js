const {BookingService} =require('../services');
const {StatusCodes}=require('http-status-codes');
const { successResponse, errorResponse } = require('../utils/common');
const redisClient = require('../config/redis-config');

async function createBooking(req, res) {
    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        });
        successResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
    } catch(error) {
        errorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(errorResponse);
    }
}

async function makePayment(req, res) {
    console.log("Received in Controller");
    try {
      const idempotentKey = req.headers["idempotent-key"];
  
      if (!idempotentKey || typeof idempotentKey !== 'string') {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Invalid or missing idempotent key" });
      }
  
      let existingKey;
      try {
        existingKey = await redisClient.get(idempotentKey);
      } catch (redisError) {
        console.error('Redis error:', redisError);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: "Error checking idempotent key" });
      }
  
      if (existingKey) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Cannot process the same payment request again" });
      }
  
      const response = await BookingService.makePayment({
        bookingId: req.body.bookingId,
        userId: req.body.userId,
        totalCost: req.body.totalCost
      });
  
      try {
        await redisClient.set(idempotentKey, 'processed', {
          EX: 24 * 60 * 60 // 24 hours in seconds
        });
      } catch (redisError) {
        console.error('Redis error:', redisError);
        
      }
  
      successResponse.data = response;
      return res
        .status(StatusCodes.OK)
        .json(successResponse);
    } catch (error) {
      console.error(error);
      errorResponse.error = error;
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(errorResponse);
    }
  }

module.exports ={
    createBooking,
    makePayment
}
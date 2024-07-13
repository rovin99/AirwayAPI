const express = require('express');

const { BookingController } = require('../../controllers');
const {bookingMiddleware,paymentMiddleware}=require('../../middleware');
const router = express.Router();

router.post(
    '/',bookingMiddleware.validatecreateBooking,BookingController.createBooking
)
router.post(
    '/payments',paymentMiddleware.validatemakePayment,
    BookingController.makePayment
);


module.exports = router;
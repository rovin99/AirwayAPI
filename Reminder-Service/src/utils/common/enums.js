const { CANCELLED } = require("dns");

const SEAT_TYPE = {
    BUISNESS: "buisness",
    ECONOMY: "economy",
    PREMIUM_ECONOMY: "premium_economy",
    FIRST_CLASS: "first_class",
  };
  
  const BOOKING_STATUS = {
    PENDING: "pending",
    BOOKED: "booked",
    CANCELLED: "cancelled",
    INITIATED: "initiated",
  };
  
  const TICKET_STATUS = {
    PENDING: "pending",
    BOOKED: "booked",
    CANCELLED: "cancelled",
  };
  
  module.exports = { SEAT_TYPE, BOOKING_STATUS, TICKET_STATUS };
  
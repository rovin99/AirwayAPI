const express = require('express');

const { FlightController } = require('../../controllers');
const { FlightMiddleware } = require('../../middleware');

const router = express.Router();

// /api/v1/Flights POST
router.post('/', FlightMiddleware.validateCreateFlight,
        FlightController.createFlight);

// /api/v1/Flight GET
router.get('/',FlightController.getFlights);

// /api/v1/Flights/id GET
router.get('/:id',FlightController.getFlight);

// /api/v1/Flights/id DELETE

router.delete('/:id', FlightController.destroyFlight);

// /api/v1/Flights/id/data PATCH

router.patch('/:id/', FlightController.updateSeats);

module.exports = router;
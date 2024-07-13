const express = require('express');

const { AirportController } = require('../../controllers');
const { AirportMiddleware } = require('../../middleware');

const router = express.Router();

// /api/v1/Airports POST
router.post('/', AirportMiddleware.validateCreateAirport,
        AirportController.createAirport);

// /api/v1/Airport GET
router.get('/',AirportController.getAirports);

// /api/v1/Airports/id GET
router.get('/:id',AirportController.getAirport);

// /api/v1/Airports/id DELETE

router.delete('/:id', AirportController.destroyAirport);

// /api/v1/Airports/id/data PATCH

router.patch('/:id/', AirportController.updateAirport);

module.exports = router;
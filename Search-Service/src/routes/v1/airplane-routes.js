const express = require('express');

const { AirplaneController } = require('../../controllers');
const {AirplaneMiddleware } = require('../../middleware');

const router = express.Router();

// /api/v1/airplanes POST
router.post('/', AirplaneMiddleware.validateCreateAirplane,
        AirplaneController.createAirplane);

// /api/v1/airplane GET
router.get('/',AirplaneController.getAirplanes);

// /api/v1/airplanes/id GET
router.get('/:id',AirplaneController.getAirplane);

// /api/v1/airplanes/id DELETE

router.delete('/:id', AirplaneController.destroyAirplane);

// /api/v1/airplanes/id/data PATCH

router.patch('/:id/', AirplaneController.updateAirplane);

module.exports = router;
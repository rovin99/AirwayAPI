const express = require('express');

const { CityController } = require('../../controllers');
const { CityMiddleware } = require('../../middleware');

const router = express.Router();

// /api/v1/cities POST
router.post('/',CityMiddleware.validateCreateCity,CityController.createCity);

// /api/v1/cities/id DELETE
router.delete('/:id',CityController.destroyCity);

// /api/v1/cities/id/ PATCH
router.patch('/:id/',CityController.updateCity);

module.exports = router;
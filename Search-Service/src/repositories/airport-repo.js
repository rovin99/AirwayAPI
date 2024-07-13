const CrudRepository = require('./crud-repo');
const { airport } = require('../models');


class AirportRepository extends CrudRepository {
    constructor() {
        super(airport);
    }
}

module.exports = AirportRepository;
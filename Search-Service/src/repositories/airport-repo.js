const CrudRepository = require('./crud-repo');
const { Airport } = require('../models');


class AirportRepository extends CrudRepository {
    constructor() {
        super(Airport);
    }
}

module.exports = AirportRepository;
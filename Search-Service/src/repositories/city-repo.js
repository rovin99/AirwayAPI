const CrudRepository = require('./crud-repo');
const { City } = require('../models');


class CityRepository extends CrudRepository {
    constructor() {
        super(City);
    }
}

module.exports = CityRepository;
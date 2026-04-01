const crudRouter = require('../utils/crudRouter');
const Sleep = require('../models/Sleep');
module.exports = crudRouter(Sleep, { dateField: 'date' });

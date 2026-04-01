const crudRouter = require('../utils/crudRouter');
const HealthLog = require('../models/HealthLog');
module.exports = crudRouter(HealthLog, { dateField: 'date' });

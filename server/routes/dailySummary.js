const crudRouter = require('../utils/crudRouter');
const DailySummary = require('../models/DailySummary');
module.exports = crudRouter(DailySummary, { dateField: 'date' });

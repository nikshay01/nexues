const crudRouter = require('../utils/crudRouter');
const ScreenTime = require('../models/ScreenTime');
module.exports = crudRouter(ScreenTime, { dateField: 'date' });

const crudRouter = require('../utils/crudRouter');
const WorkSession = require('../models/WorkSession');
module.exports = crudRouter(WorkSession, { dateField: 'startTime' });

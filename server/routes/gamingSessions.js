const crudRouter = require('../utils/crudRouter');
const GamingSession = require('../models/GamingSession');
module.exports = crudRouter(GamingSession, { dateField: 'timestampStart' });

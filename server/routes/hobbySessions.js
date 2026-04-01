const crudRouter = require('../utils/crudRouter');
const HobbySession = require('../models/HobbySession');
module.exports = crudRouter(HobbySession, { dateField: 'startedAt' });

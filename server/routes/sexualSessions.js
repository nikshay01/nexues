const crudRouter = require('../utils/crudRouter');
const SexualSession = require('../models/SexualSession');
module.exports = crudRouter(SexualSession, { dateField: 'timestampStart' });

const crudRouter = require('../utils/crudRouter');
const PainLog = require('../models/PainLog');
module.exports = crudRouter(PainLog, { dateField: 'timestamp' });

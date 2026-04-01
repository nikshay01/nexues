const crudRouter = require('../utils/crudRouter');
const Meditation = require('../models/Meditation');
module.exports = crudRouter(Meditation, { dateField: 'timestampStart' });

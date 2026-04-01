const crudRouter = require('../utils/crudRouter');
const Devotion = require('../models/Devotion');
module.exports = crudRouter(Devotion, { dateField: 'timestampStart' });

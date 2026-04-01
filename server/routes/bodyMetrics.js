const crudRouter = require('../utils/crudRouter');
const BodyMetric = require('../models/BodyMetric');
module.exports = crudRouter(BodyMetric, { dateField: 'recordedAt' });

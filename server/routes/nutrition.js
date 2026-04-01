const crudRouter = require('../utils/crudRouter');
const Nutrition = require('../models/Nutrition');
module.exports = crudRouter(Nutrition, { dateField: 'date' });

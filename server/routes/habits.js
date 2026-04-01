const crudRouter = require('../utils/crudRouter');
const HabitDefinition = require('../models/HabitDefinition');
module.exports = crudRouter(HabitDefinition, { dateField: 'createdAt' });

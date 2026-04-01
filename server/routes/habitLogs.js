const crudRouter = require('../utils/crudRouter');
const HabitLog = require('../models/HabitLog');
module.exports = crudRouter(HabitLog, { dateField: 'periodDate' });

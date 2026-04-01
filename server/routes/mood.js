const crudRouter = require('../utils/crudRouter');
const MoodEntry = require('../models/MoodEntry');
module.exports = crudRouter(MoodEntry, { dateField: 'timestamp' });

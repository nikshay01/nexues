const crudRouter = require('../utils/crudRouter');
const Score = require('../models/Score');
module.exports = crudRouter(Score, { dateField: 'date' });

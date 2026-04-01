const crudRouter = require('../utils/crudRouter');
const Hobby = require('../models/Hobby');
module.exports = crudRouter(Hobby, { dateField: 'createdAt' });

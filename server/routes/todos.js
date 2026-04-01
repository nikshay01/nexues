const crudRouter = require('../utils/crudRouter');
const Todo = require('../models/Todo');
module.exports = crudRouter(Todo, { dateField: 'createdAt' });

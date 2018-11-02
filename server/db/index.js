const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const connection = mongoose.createConnection('mongodb://localhost/todoMVP');
const connection = mongoose.createConnection('mongodb://localhost/togetherTodo');

module.exports = connection;
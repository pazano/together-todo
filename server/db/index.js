const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connection = mongoose.createConnection('mongodb://localhost/todoMVP');

module.exports = connection;
const mongoose    = require('mongoose');
const config      = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.db_url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
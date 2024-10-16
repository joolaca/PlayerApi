const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI_DOCKER || process.env.MONGO_URI_LOCAL ;

mongoose.set('strictQuery', true);

module.exports = {
    database: dbURI,
};

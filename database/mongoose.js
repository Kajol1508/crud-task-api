const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/taskManager_db')
    .then(() => { console.log("Database connected successfully!!") })
    .catch((error) => { console.log("Error while Connecting database", error) });

module.exports = mongoose;
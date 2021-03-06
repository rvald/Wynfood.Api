var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({

    userName: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', UserSchema);
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({

    id: { type: Number, required: true  },
    userName: { type: String, required: true },
    created: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', UserSchema);
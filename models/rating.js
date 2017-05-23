var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RatingSchema = Schema(
    {
       
        restaurantName: { type: String, required: true },
        userName: { type: String, required: true },
        text: { type: String, required: true },
        value: { type: Number, required: true },
        created: { type: Date, deafult: Date.now }

    }
);

module.exports = mongoose.model('Rating', RatingSchema);
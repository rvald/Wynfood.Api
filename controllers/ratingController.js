var Rating = require('../models/rating');

// All the ratings
exports.rating_list = function(req, res, next) {
    Rating.find()
        .exec(function(err, ratings) {

            if (err) {
                res.status(404).json('Records not found.');
                return next(err);
            
            } else {
                res.status(200).json(ratings);
            }
        });
};

// Get rating for a specific Restaurant
exports.rating_for_restaurant = function(req, res, next) {
    Rating.find({'restaurantName':  req.params.name })
        .exec(function(err, restaurant_ratings) {

            if (err) {
                res.status(404).json('Records not found.');
                return next(err);
            
            } else {
                res.status(200).json(restaurant_ratings);
            }
        });
};

// Add a new rating
exports.rating_create_post = function(req, res) {
    
    req.checkBody('restaurantName', 'Restaurant name must be included.').notEmpty()
    req.checkBody('userName', 'Username must be included.').notEmpty()
    req.checkBody('text', 'Rating message must be included.').notEmpty()
    req.checkBody('value', 'Rating must have a value.').notEmpty()
    
    req.sanitize('restaurantName').escape();
    req.sanitize('userName').escape();
    req.sanitize('text').escape();
    req.sanitize('value').escape();

    req.sanitize('restaurantName').trim();
    req.sanitize('userName').trim();
    req.sanitize('text').trim();
    req.sanitize('value').trim();

    var errors = req.validationErrors();

    var rating = new Rating(
        {
            restaurantName: req.body.restaurantName,
            userName: req.body.userName,
            text: req.body.text,
            value: req.body.value,
            created: Date.now()
        }
    );

    if (errors) {
        res.status(400).json(errors);
        return;
    
    } else {

        rating.save(function(err) {
            if (err) {
                return next(err);
            
            } else {
                res.status(201).json(rating);
            }
        });

    }

};


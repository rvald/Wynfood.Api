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
    Rating.find({'restaurantId':  parseInt(req.params.restaurantId) })
        .exec(function(err, restaurant_ratings) {

            if (err) {
                res.status(404).json('Records not found.');
                return next(err);
            
            } else {
                res.status(200).json(restaurant_ratings);
            }

        });
};

// Get rating for a specific User
exports.rating_for_user = function(req, res, next) {
   
    console.log(req.params.userName);

    Rating.find({'userId': parseInt(req.params.id)  })
        .exec(function(err, user_ratings) {

            if (err) {
                res.status(404).json('Records not found.');
                return next(err);
            
            } else {
                res.status(200).json(user_ratings);
            }
            
        });
};

// Add a new rating
exports.rating_create_post = function(req, res, next) {
    
    req.checkBody('restaurantId', 'Restaurant id must be included.').notEmpty()
    req.checkBody('userName', 'Username must be included.').notEmpty()
    req.checkBody('text', 'Rating message must be included.').notEmpty()
    req.checkBody('value', 'Rating must have a value.').notEmpty()
    
    req.sanitize('restaurantId').escape();
    req.sanitize('userName').escape();
    req.sanitize('text').escape();
    req.sanitize('value').escape();

    req.sanitize('restaurantId').trim();
    req.sanitize('userName').trim();
    req.sanitize('text').trim();
    req.sanitize('value').trim();

    var errors = req.validationErrors();

    var rating = new Rating(
        {
            restaurantId: req.body.restaurantId,
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


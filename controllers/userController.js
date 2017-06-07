var User = require('../models/user');

// All the users
exports.user_list = function(req, res, next) {
    User.find()
        .exec(function(err, users) {

            if (err) {
                res.status(404).json('Records not found.');
                return next(err);
            
            } else {
                res.status(200).json(users);
            }
        });
};

// Get a user
exports.user = function(req, res, next) {
    User.find({'email':  req.params.email })
        .exec(function(err, user) {

            if (err) {
                res.status(404).json('Records not found.');
                return next(err);
            
            } else {
                res.status(200).json(user);
            }
        });
};

// Add a new user
exports.user_create_post = function(req, res, next) {
    
    req.checkBody('userName', 'Username must be included.').notEmpty()
    req.sanitize('userName').escape();
    req.sanitize('userName').trim();

    req.checkBody('email', 'Email must be included.').notEmpty()
    req.sanitize('email').escape();
    req.sanitize('email').trim();

   
    var errors = req.validationErrors();

    var user = new User(
        {
            email: req.body.email,
            userName: req.body.userName,
            created: Date.now()
        }
    );

    if (errors) {

        res.status(400).json(errors);
        return;
    
    } else {

        user.save(function(err) {
            if (err) {
                return next(err);
            
            } else {
                res.status(201).json(user);
            }
        });
        
    }

};
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

// Add a new user
exports.user_create_post = function(req, res, next) {
    
    req.checkBody('userName', 'Username must be included.').notEmpty()
    req.sanitize('userName').escape();
    req.sanitize('userName').trim();

     req.checkBody('id', 'User id must be included.').notEmpty()
    req.sanitize('id').escape();
    req.sanitize('id').trim();
   
    var errors = req.validationErrors();

    var user = new User(
        {
            id: req.body.id,
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
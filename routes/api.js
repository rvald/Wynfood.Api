var express = require('express');
var router = express.Router();

var rating_controller = require('../controllers/ratingController');
var user_controller = require('../controllers/userController');

// Get ratings
router.get('/ratings', rating_controller.rating_list);

// Post new rating
router.post('/ratings', rating_controller.rating_create_post);

// Get rating for restaurant
router.get('/ratings/:restaurantId', rating_controller.rating_for_restaurant);

// Get rating for user
router.get('/ratings/user/:id', rating_controller.rating_for_user);

// Get users
router.get('/users', user_controller.user_list);

// Post new user
router.post('/users', user_controller.user_create_post);

module.exports = router;
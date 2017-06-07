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

// Get users
router.get('/users', user_controller.user_list);

// Get user
router.get('/users/:email', user_controller.user);

// Post new user
router.post('/users', user_controller.user_create_post);

module.exports = router;
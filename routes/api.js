var express = require('express');
var router = express.Router();

var rating_controller = require('../controllers/ratingController');

// Get ratings
router.get('/ratings', rating_controller.rating_list);

// Post new rating
router.post('/ratings', rating_controller.rating_create_post);

// Get rating for restaurant
router.get('/ratings/:restaurantId', rating_controller.rating_for_restaurant);

module.exports = router;
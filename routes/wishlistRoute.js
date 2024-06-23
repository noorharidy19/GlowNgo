// wishlistRoutes.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist');

router.post('/add', wishlistController.addToWishlist);

module.exports = router;
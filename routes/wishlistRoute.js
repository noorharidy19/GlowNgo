// wishlistRoutes.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/whishlist');

router.post('/remove', wishlistController.removeFromWishlist);

module.exports = router;
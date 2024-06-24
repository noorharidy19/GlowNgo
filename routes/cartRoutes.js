const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.post('/addToCart', cartController.addProductToCart);

module.exports = router;

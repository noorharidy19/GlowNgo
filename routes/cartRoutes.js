const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.post('/add', cartController.addToCart);
router.post('/addAll', cartController.addAllToCart);

module.exports=router;
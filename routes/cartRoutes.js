
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const isAuthenticated = require('../middleware/auth');

// Cart Routes
router.post('/cart/add-to-cart', isAuthenticated, cartController.addToCart);

// Example: Fetch the user's cart (you can expand on this as needed)
router.get('/cart', isAuthenticated, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.session.user._id }).populate('items.product');
        res.render('cart', { cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Error fetching cart');
    }
});

module.exports = router;


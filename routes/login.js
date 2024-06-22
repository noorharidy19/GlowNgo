const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login'); 
const Cart = require('../models/cart');
const Wishlist = require('../models/wishlist');
const isAuthenticated = require('../mildware/auth'); 

// Route to render home page, requiring authentication
router.get('/Home', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user._id;
        
        // Fetch the cart and wishlist concurrently
        const [cart, wishlist] = await Promise.all([
            Cart.findOne({ user: userId }).populate('items.product'),
            Wishlist.findOne({ user: userId }).populate('items.product')
        ]);

        const cartData = cart ? cart : { items: [] };
        const wishlistData = wishlist ? wishlist : { items: [] };

        res.render('Home', { cart: cartData, wishlist: wishlistData }); // Pass 'cart' and 'wishlist' data to 'Home.ejs'
    } catch (error) {
        console.error('Error fetching cart or wishlist:', error);
        res.status(500).send('Error fetching cart or wishlist');
    }
});

router.get('/Products', isAuthenticated, (req, res) => {
    res.render('Products');
});

router.get('/About', isAuthenticated, (req, res) => {
    res.render('About');
});

// Login route
router.post('/login', loginController.loginProcess);

// Forgot password route
router.post('/forgot-password', loginController.forgotPassword);

module.exports = router;

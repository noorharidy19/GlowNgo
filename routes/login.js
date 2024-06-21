const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login'); // Assuming your login controller is in the controllers directory
const Cart = require('../models/cart');
const isAuthenticated = require('../mildware/auth'); 


// Route to render home page, requiring authentication
router.get('/Home', isAuthenticated, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.session.user._id }).populate('items.product');

        if (!cart) {
            // If cart doesn't exist, provide an empty cart object
            res.render('Home', { cart: { items: [] } });
            return;
        }

        res.render('Home', { cart }); // Pass 'cart' data to 'Home.ejs'
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Error fetching cart');
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

module.exports = router;

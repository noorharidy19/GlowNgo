const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login'); // Assuming your login controller is in the controllers directory

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login'); // Redirect to login if user is not authenticated
    }
}

// Define routes
router.get('/Home', isAuthenticated, (req, res) => {
    res.render('Home', { user: req.session.user, errorMessage: '' });
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

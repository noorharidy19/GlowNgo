const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login'); // Assuming your login controller is in the controllers directory

// Middleware to check if user is authenticated
// function isAuthenticated(req, res, next) {
//   if (req.session.user) {
//     return next();
//   } else {
//     res.redirect('/login'); // Redirect to login if user is not authenticated
//   }
// }

router.get('/Home', (req, res) => {
  res.render('Home', { user: req.user });
});
router.get('/Products', (req, res) => {
    res.render('Products');
});
router.get('/About', (req, res) => {
    res.render('About');
});
router.get('/profile', (req, res) => {
    res.render('myprofile', {
      user: req.session.user || '',
   });
  });
  router.get('/profile', (req, res) => {
    res.render('myprofile', {
      currentPage: 'myprofile',
      user: req.session.user || '',
      error: '',
    });
  });


router.post('/myprofile', loginController.loginProcess);

module.exports = router;
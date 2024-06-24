const express = require('express');
const router = express.Router();
const { signupProcess } = require('../controllers/signup.js');

// router.get('/signup', (req, res) => {
//   res.render('Home', {
//   });
// });

// router.post('/signup', signupProcess);

module.exports = router;

const express = require('express');
const router = express.Router();
const { signupProcess } = require('../controllers/signup.js');

router.get('/signup', (req, res) => {
  res.render('Home', {
    currentPage: "signup",
    user: req.session.user || "",
  });
});

router.post('/signup', signupProcess);

module.exports = router;

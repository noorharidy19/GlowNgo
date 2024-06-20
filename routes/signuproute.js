const express = require('express');
const router = express.Router();
const { signupProcess } = require('../controllers/signup');

router.get('/signup', (req, res) => {
  res.render('signup', {
    currentPage: "signup",
    user: req.session.user || "",
  });
});

router.post('/signup', signupProcess);

module.exports = router;


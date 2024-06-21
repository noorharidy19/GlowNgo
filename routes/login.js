const express = require('express');
var bodyParser = require('body-parser');
const loginController = require('../controllers/login'); // Assuming your login controller is in the controllers directory

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/Home', (req, res) => {
  res.render('Home');
});
router.get('/Products', (req, res) => {
    res.render('Products');
});
router.get('/About', (req, res) => {
    res.render('About');
});



router.get('/login', loginController.loginProcess);

module.exports = router;
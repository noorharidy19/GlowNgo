const express = require('express');
const router = express.Router();

router.get('/Home', (req, res) => {
    res.render('Home');
});
router.get('/Products', (req, res) => {
    res.render('Products');
});
router.get('/About', (req, res) => {
    res.render('About');
});
router.get('/profile', (req, res) => {
    res.render('myprofile');
});
module.exports = router;


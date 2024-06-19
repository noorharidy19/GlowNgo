
const express = require('express');
const router = express.Router();
router.get('/home', (req, res) => {
    res.render('Home');
});
router.get('/admin', (req, res) => {
    res.render('admin');
});

router.get('/orders', (req, res) => {
    res.render('orders');
});
router.get('/user', (req, res) => {
    res.render('users');
});
module.exports = router;
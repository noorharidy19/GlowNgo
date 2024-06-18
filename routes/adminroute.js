
const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => {
    res.render('admin');
});
router.get('/adminProducts', (req, res) => {
    res.render('AdminProducts');
});
router.get('/orders', (req, res) => {
    res.render('orders');
});
router.get('/user', (req, res) => {
    res.render('users');
});
module.exports = router;
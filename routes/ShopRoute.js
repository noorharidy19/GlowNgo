const express = require("express");
var bodyParser = require('body-parser');
const prod=require('../controllers/prod');
const { getProductsByCategory } = require('../controllers/prod');
const router = express.Router();


// router.get('/home', (req, res) => {
//     res.render('Home');
// });

router.get('/brow', getProductsByCategory('Brows'));
module.exports = router;
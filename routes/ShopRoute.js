const express = require("express");
var bodyParser = require('body-parser');
const prod=require('../controllers/prod');
const { getProductsByCategory } = require('../controllers/prod');
const router = express.Router();


// router.get('/home', (req, res) => {
//     res.render('Home');
// });

// router.get('/brow', getProductsByCategory('Brows','brow'),);
// router.get('/tools', getProductsByCategory('Tools','tools'));
// router.get('/Eyes', getProductsByCategory('Eyes','Eyes'));
// router.get('/lip', getProductsByCategory('Lips','lip'));
// router.get('/face', getProductsByCategory('Face','face'));
// router.get('/allproducts', prod.getProducts('allproducts'));

module.exports = router;
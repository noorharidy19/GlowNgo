const express = require("express");
var bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const prod = require("../controllers/prod");

router.get('/adminProducts', (req, res) => {
    res.render('AdminProducts');
});



router.post('/addProduct', prod.Addproducts);
module.exports = router;

const express = require("express");
var bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const prod = require("../controllers/prod");

router.get('/AdminProducts', prod.getProducts);

router.delete('/delete/:id',prod.deleteProducts);

router.post('/addProduct', prod.Addproducts);
module.exports = router;

const express = require("express");
var bodyParser = require('body-parser');
// const { addProductValidation, validate } = require('../mildware/validation');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const user = require("../controllers/user");


module.exports = router;
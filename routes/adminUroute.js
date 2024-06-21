const express = require("express");
var bodyParser = require('body-parser');
const user = require("../controllers/user");

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/user', user.getUsers);

module.exports = router;


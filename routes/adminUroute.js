const express = require("express");
var bodyParser = require('body-parser');
const user = require("../controllers/user");


const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const User = require('../models/users'); 

router.get('/users', async (req, res) => {
    const currentPage = parseInt(req.query.page, 10) || 1;
    const limit = 3;
    const skip = (currentPage - 1) * limit;

    try {
        const users = await User.find().skip(skip).limit(limit);
        const count = await User.countDocuments();
        const totalPagesCount = Math.ceil(count / limit);

        res.render('users', {
            users,
            currentPage,
            totalPagesCount,
            hasNextPage: currentPage < totalPagesCount,
            hasPreviousPage: currentPage > 1,
            nextPageNumber: currentPage + 1,
            previousPageNumber: currentPage - 1,
            lastPage: totalPagesCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving users');
    }
});
function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      // Redirect to login page with a query parameter indicating the need to log in
      res.redirect('/404');
    }
  }

router.get('/users', ensureAuthenticated, (req, res) => {
    user.getUsers(req, res, { user: req.session.user });
  });
router.delete('/deletee/:id',user.deleteUsers);
router.put('/editt/:id', user.updateUser);

module.exports = router;


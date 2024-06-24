const express = require("express");
var bodyParser = require('body-parser');
const user = require("../controllers/user");


const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const User = require('../models/users'); 
function ensureAuthenticated(req, res, next) {
  console.log("Session User:", req.session.user); // Debugging: Log the session user
  if (req.session.user) {
    next();
  } else {
    console.log("Redirecting to /404 due to lack of authentication."); // Debugging: Log redirection
    res.render('404');
  }
}

router.get('/users', ensureAuthenticated, async (req, res) => {
  const currentPage = parseInt(req.query.page, 10) || 1;
  const limit = 3;
  const skip = (currentPage - 1) * limit;

  console.log(`Handling GET /users - Page: ${currentPage}, Limit: ${limit}, Skip: ${skip}`); // Step 1

  try {
      console.log('Fetching users from DB...'); // Step 3
      const users = await User.find().skip(skip).limit(limit);
      console.log(`Fetched ${users.length} users`); // Step 4

      const count = await User.countDocuments();
      console.log(`Total user count: ${count}`); // Step 4

      const totalPagesCount = Math.ceil(count / limit);

      res.render('users', {
          users,
          currentPage,
          totalPagesCount,
          hasNextPage: currentPage < totalPagesCount,
          hasPreviousPage: currentPage > 1,
          nextPageNumber: currentPage + 1,
          previousPageNumber: currentPage - 1,
          lastPage: totalPagesCount,
          user: req.session.user || "" 
      });
  } catch (error) {
      console.error('Error in GET /users:', error); // Step 5
      res.status(500).send('Error retrieving users');
  }
  
});

router.delete('/deletee/:id',user.deleteUsers);
router.put('/editt/:id', user.updateUser);

module.exports = router;


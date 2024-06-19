const User = require("../models/users.js"); // Assuming you have a User model defined
const bcrypt = require('bcryptjs');

// Login process function
const loginProcess = async (req, res) => {
  try {
    // Retrieve username and password from req.body
    const { username, password } = req.body;

    // Search for the user in the database
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.render("login", {
        currentPage: "login",
        user: req.session.user || "",
        error: "User does not exist.",
      });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        currentPage: "login",
        user: req.session.user || "",
        error: "Invalid username or password.",
      });
    }

    // Store user data in the session
    req.session.user = user;

    // Redirect to home page or render index with user info
    res.render("index", {
      currentPage: "home",
      user: req.session.user || "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  loginProcess,
};

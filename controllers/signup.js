const bcrypt = require('bcryptjs');
const User = require("../models/users.js");

const signupProcess = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, address, phoneNumber } = req.body;
    console.log("Form data received:", req.body); // Debug: Print form data

    if (!username || !email || !password || !confirmPassword || !address || !phoneNumber ) {
      console.log("Error: Missing fields"); // Debug: Missing fields
      return res.render("Home", { error: "All fields are required.", user: req.session.user || "" });
    }

    if (password !== confirmPassword) {
      console.log("Error: Passwords do not match"); // Debug: Password mismatch
      return res.render("Home", { error: "Passwords do not match.", user: req.session.user || "" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log("Error: User or email already exists"); // Debug: User exists
      return res.render("Home", { error: "User or email already exists.", user: req.session.user || "" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword); // Debug: Print hashed password

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      phoneNumber
      
    });

    await newUser.save();
    console.log("New user saved to database:", newUser); // Debug: User saved

    req.session.user = newUser;
    res.render("Home", { successMessage: "Account created successfully!", user: req.session.user || "" });
  } catch (error) {
    console.error("Signup Error:", error); // Debug: Print error
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { signupProcess };
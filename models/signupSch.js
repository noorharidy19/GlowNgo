const bcrypt = require('bcryptjs');
const User = require('./signupSch.js');

// Signup process function
const signupProcess = async (req, res) => {
  try {
    // Retrieve form data from req.body
    const { username, email, password, confirmPassword, address, phoneNumber, acceptedTerms } = req.body;

    // Basic validation
    if (!username || !email || !password || !confirmPassword || !address || !phoneNumber || !acceptedTerms) {
      return res.render('signup', {
        currentPage: 'signup',
        error: 'All fields are required.',
      });
    }

    if (password !== confirmPassword) {
      return res.render('signup', {
        currentPage: 'signup',
        error: 'Passwords do not match.',
      });
    }

    // Check if the user or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render('signup', {
        currentPage: 'signup',
        error: 'User or email already exists.',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      acceptedTerms
    });

    // Save the user to the database
    await newUser.save();

    // Store user data in the session
    req.session.user = newUser;

    // Redirect to home page or render index with user info
    res.render('index', {
      currentPage: 'home',
      user: req.session.user || '',
      successMessage: 'Account created successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  signupProcess,
};

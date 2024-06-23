const express = require("express");
const loginController = require("../controllers/login");
const signupController = require("../controllers/signup");
const Product = require('../models/products');
const { getProductsByCategory, getProducts } = require("../controllers/prod");
const app = express.Router();

// Middleware to check if the user is logged in
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    // Redirect to login page with a query parameter indicating the need to log in
    res.redirect('/404');
  }
}

// Public routes
app.get("/login", (req, res) => {
  res.render("Home", { // Changed from 'Home' to 'login' to match the provided structure
    user: req.session.user || "",
    message: req.query.loginRequired ? "You must log in to view this page." : "" // Display a message if login is required
  });
});

app.get("/signup", (req, res) => {
  res.render("Home", { // Changed from 'Home' to 'signup' to match the provided structure
    user: req.session.user || ""
  });
});

app.post("/login", loginController.loginProcess);
app.post('/forgot-password', loginController.forgotPassword);
app.post("/signup", signupController.signupProcess);
app.get('/admin', ensureAuthenticated, (req, res) => {
  res.render('admin', { user: req.session.user });
});

app.get('/orders', ensureAuthenticated, (req, res) => {
  res.render('orders', { user: req.session.user });
});
// Protected routes - require login
app.get('/Home', (req, res) => {
  res.render('Home', { user: req.session.user || "" });
});

app.get('/About', (req, res) => {
  res.render('About', { user: req.session.user || "" });
});

app.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('myprofile', { user: req.session.user });
});


app.get('/Products',  (req, res) =>  {
  res.render('Products', { user: req.session.user || "" });
});

app.get('/brow', getProductsByCategory('Brows', 'brow'));
app.get('/tools', getProductsByCategory('Tools', 'tools'));
app.get('/Eyes', getProductsByCategory('Eyes', 'Eyes'));
app.get('/lip', getProductsByCategory('Lips', 'lip'));
app.get('/face', getProductsByCategory('Face', 'face'));
app.get('/allproducts', getProducts('allproducts'));


app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    // Use a regex to find any product names that contain the query string, case insensitive
    const searchResults = await Product.find({ name: { $regex: query, $options: 'i' } });
    // Pass the entire session to the view, along with the searchResults
    res.render('Search', { user: req.session.user || "", products: searchResults });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Session destruction error:", err);
      return res.status(500).send("Error logging out");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login"); // Redirect to '/login' instead of '/Home'
  });
});

module.exports = app;
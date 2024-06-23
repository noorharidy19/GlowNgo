const express = require("express");
var bodyParser = require('body-parser');
// const { addProductValidation, validate } = require('../mildware/validation');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const prod = require("../controllers/prod");


const Product = require('../models/products'); // Assuming you have a Mongoose model for Products

router.get('/AdminProducts', async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 3; // Set the limit to 3 items per page
    const skip = (page - 1) * limit;

    try {
        // Fetch paginated data with limit set to 3
        const products = await Product.find().skip(skip).limit(limit);

        // Get total count of documents
        const count = await Product.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(count / limit);

        // Render the EJS view with paginated data and pagination details
        res.render('AdminProducts', {
            products,
            page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving products');
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

router.get('/AdminProducts', ensureAuthenticated, (req, res) => {
    prod.getProducts('AdminProducts', req, res, { user: req.session.user });
  });
router.put('/edit/:id', prod.updateProduct);
router.delete('/delete/:id',prod.deleteProducts);
router.post('/addProduct', prod.Addproducts);
router.get('/Home', prod.getProducts('Home'));

module.exports = router;

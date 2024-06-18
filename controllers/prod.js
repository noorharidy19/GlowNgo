
const path = require('path');
const Products = require('../models/products'); // assuming products.js is in the same directory
const upload = require('../mildware/multer');

const Addproducts = (req, res) => {
    // Handle file upload with multer middleware
    upload(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            res.status(400).send('Error uploading file');
        } else {
            // File uploaded successfully, now save product
            const imagePath = `/${req.file.filename}`; // Path to saved image

            const newProduct = new Products({
                name: req.body.productName,
                price: req.body.productPrice,
                category: req.body.productCategory,
                quantity: req.body.productQuantity,
                Image: imagePath
            });

            newProduct.save()
                .then((result) => {
                    console.log('Product added:', result);
                    res.status(201).send('Product added successfully');
                })
                .catch((err) => {
                    console.error('Error saving product:', err);
                    res.status(500).send('Error adding product');
                });
        }
    });
};

module.exports = {
    Addproducts
};
const path = require('path');
const Products = require('../models/products');
const upload = require('../mildware/multer');

const Addproducts = (req, res) => {
    // Handle file upload with multer middleware
    upload.fields([
        { name: 'productImage', maxCount: 1 },
        { name: 'productShades', maxCount: 1 }
    ])(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            res.status(400).send('Error uploading files');
        } else {
            // Files uploaded successfully, now save product
            const productImage = req.files['productImage'][0]; // Assuming single file upload
            const shadeImage = req.files['productShades'][0]; // Assuming single file upload

            const newProduct = new Products({
                name: req.body.productName,
                price: req.body.productPrice,
                category: req.body.productCategory,
                quantity: req.body.productQuantity,
                Image: `/${productImage.filename}`, // Path to saved product image
                Shade: `/${shadeImage.filename}` // Path to saved shade image
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
const getProducts = (req, res) => {
    Products.find()
        .then(result => {
            res.render('AdminProducts', { products: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving products');
        });
};

  
module.exports = {
    Addproducts,
    getProducts
};

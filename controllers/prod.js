const path = require('path');
const Products = require('../models/products');
const upload = require('../mildware/multer');


const Addproducts = (req, res) => {
    upload.fields([
        { name: 'productImage', maxCount: 1 },
        { name: 'productShades', maxCount: 1 }
    ])(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            res.status(400).send('Error uploading files');
        }   const { productName, productPrice, productCategory, productQuantity } = req.body;

        if (!productName || !productPrice || !productCategory || !productQuantity) {
            return res.status(400).json({ text: 'Please enter all required fields' });
        }
            const productImage = req.files['productImage'][0]; // Assuming single file upload
            const shadeImage = req.files['productShades'][0]; // Assuming single file upload
            const productData = {
                name: req.body.productName,
                price: req.body.productPrice,
                category: req.body.productCategory,
                quantity: req.body.productQuantity,
                Image: `/${productImage.filename}`, // Path to saved product image
                Shade: `/${shadeImage.filename}` // Path to saved shade image
            };

            // Try to find the product
            Products.findOne({ name: productData.name })
                .then((product) => {
                    if (product) {
                        // If product exists, increment quantity by 1
                        return Products.findOneAndUpdate(
                            { name: productData.name },
                            { $inc: { quantity: 1 } },
                            { new: true }
                        );
                    } else {
                        // If product doesn't exist, create a new product with specified quantity
                        return Products.create(productData);
                    }
                })
                .then((result) => {
                    console.log('Product added or updated:', result);
                  res.status(201).json({ text: 'Product added or updated successfully' });
                })
                .catch((err) => {
                    console.error('Error saving product:', err);
                    res.status(500).send({ text:'Error adding or updating product'});
                });

    });
};

const getProducts = (pageName) => {
    if (typeof pageName !== 'string' || pageName.trim() === '') {
      throw new Error('pageName must be a non-empty string');
    }
  
    return (req, res, next) => {
      Products.find()
        .then(result => {
            result.forEach(product => {
                product.stockStatus = product.quantity > 0 ? 'In Stock' : 'Out of Stock';
            });
          res.render(pageName, { products: result , user: req.session.user || ""});
        })
        .catch(err => {
          console.error('Error retrieving products:', err);
          res.status(500).send('We are unable to retrieve the products at this moment. Please try again later.');
        });
    };
  };

  const getProductsByCategory = (category, pageName) => {
    return (req, res) => {
        Products.find({ category: category })
            .then(result => {
                // Add stock status to each product
                result.forEach(product => {
                    product.stockStatus = product.quantity > 0 ? 'In Stock' : 'Out of Stock';
                });

                res.render(pageName, { products: result, user: req.session.user || "" });
              
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error retrieving products');
            });
    };
};
const deleteProducts = (req,res)=>{
    Products.findByIdAndDelete(req.params.id).then(()=>{
        res.redirect("/adminProducts");
    }).catch((err)=>{
        console.log(err);
    });
}
      



// const updateProduct = (req, res) => {
//     const id = req.params.id;
//     const updates = req.body;

//     Products.updateOne({ _id: id }, updates)
//         .then((result) => {
//             if (result.nModified === 0) {
//                 return res.status(404).send('Product not found or no changes made');
//             }
//             res.redirect('/');
//         })
//         .catch((error) => {
//             console.error(error);
//             res.status(500).send('Error updating product');
//         });
// }; 
const updateProduct = (req, res) => {
    console.log('Received update request for ID:', req.params.id);
    console.log('Request body:', req.body);
    
    let updateObject = { ...req.body };
  
    // Remove properties that are empty strings
    for (let prop in updateObject) {
        if (updateObject[prop] === '') {
            delete updateObject[prop];
        }
    }
  
    console.log('Update object:', updateObject);
  
    Products.findByIdAndUpdate(req.params.id, updateObject, { new: true, runValidators: true })
        .then((updatedProduct) => {
            if (!updatedProduct) {
                return res.status(404).send('Product not found');
            } else {
                console.log("Product updated successfully:", updatedProduct);
                res.redirect("/AdminProducts");
            }
        })
        .catch((err) => {
            console.error('Error updating product:', err);
            res.status(500).send('Error updating product');
        });
  };




  
module.exports = {
    Addproducts,
    getProducts,
    deleteProducts,
    updateProduct,
    getProductsByCategory
};

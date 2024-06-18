
const Products = require('../models/products'); // assuming products.js is in the same directory




const Addproducts = (req, res) => {
console.log(req.body);
    const products = new Products({
        // image: {
        //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        //     contentType: 'image/png'
        // },
        name: req.body.productName,
        price: req.body.productPrice,
        category: req.body.productCategory,
        quantity: req.body.productQuantity,
        // shades: {
        //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        //     contentType: 'image/png'
        // }
    });
    products.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    module.exports = {
        Addproducts
    }; 
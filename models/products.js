const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productsSchema = new Schema({
   
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type:Number,
        required: true
    },
    Image:{
        type: String,
        required:true
    },
    Shade:{
        type: String,
        required:true
    }

}, { timestamps: true });
const Products = mongoose.model('Products', productsSchema);
module.exports = Products;
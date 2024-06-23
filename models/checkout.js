const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{ name: String, quantity: Number, price: Number }],
    subtotal: Number,
    shippingCost: Number,
    salesTax: Number,
    total: Number,
    paymentMethod: String,
    cardDetails: {
        cardNumber: String,
        expiryYear: String,
        expiryMonth: String,
        cvv: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
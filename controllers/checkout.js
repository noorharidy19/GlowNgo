const Order = require('../models/checkout');

exports.Checkout = async (req, res) => {
    const { items, subtotal, shippingCost, salesTax, total, paymentMethod, cardDetails } = req.body;
    try {
        const order = new Order({
            items,
            subtotal,
            shippingCost,
            salesTax,
            total,
            paymentMethod,
            cardDetails
        });
        await order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error});
}
};
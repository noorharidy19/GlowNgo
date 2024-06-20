const Cart = require('../models/cart');
const Products = require('../models/products');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.session.user._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      cart = await cart.save();
      res.status(200).json(cart);
    } else {
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });

      const savedCart = await newCart.save();
      res.status(201).json(savedCart);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


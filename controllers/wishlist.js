const Wishlist = require('../models/wishlist');
const Products = require('../models/products');

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.session.user._id;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      const itemExists = wishlist.items.some(item => item.product.toString() === productId);

      if (!itemExists) {
        wishlist.items.push({ product: productId });
        wishlist = await wishlist.save();
        res.status(200).json(wishlist);
      } else {
        res.status(400).json({ message: 'Product already in wishlist' });
      }
    } else {
      const newWishlist = new Wishlist({
        user: userId,
        items: [{ product: productId }]
      });

      const savedWishlist = await newWishlist.save();
      res.status(201).json(savedWishlist);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.session.user._id;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      wishlist.items = wishlist.items.filter(item => item.product.toString() !== productId);
      wishlist = await wishlist.save();
      res.status(200).json(wishlist);
    } else {
      res.status(404).json({ message: 'Wishlist not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  const userId = req.session.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('items.product');

    if (wishlist) {
      res.status(200).json(wishlist);
    } else {
      res.status(404).json({ message: 'Wishlist not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

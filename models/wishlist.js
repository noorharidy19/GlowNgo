const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
  addedAt: { type: Date, default: Date.now }  // Timestamp for when the item was added to the wishlist
});

const wishlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [wishlistItemSchema]
}, { timestamps: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports=Wishlist;
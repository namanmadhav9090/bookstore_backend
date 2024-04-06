// models/CartItem.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: Schema.Types.ObjectId, required: true },
  bookTitle: { type: String, required: true },
  bookPrice: { type: Number, required: true },
  quantity: { type: Number, default: 1 }, // Default quantity is 1
  imageUrl: { type: String, required: true }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;

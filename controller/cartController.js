const Cart = require('../models/Cart');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

module.exports = {
    addtoCart: async(req, res) => {

        const userId = req?.userid;
        const { bookId, bookTitle, bookPrice, quantity, imageUrl, type } = req.body;

        try {
          let cartItem = await Cart.findOne({ userId, bookId });
      
          if (cartItem) {
            if(type=="increment"){
              cartItem.quantity = cartItem.quantity +  1; 
            } else {
              if(cartItem.quantity > 1){
                cartItem.quantity = cartItem.quantity - 1;
              }
            }


         
            await cartItem.save();
          } else {
   
            cartItem = new Cart({
              userId,
              bookId,
              bookTitle,
              bookPrice,
              imageUrl,
              quantity: quantity || 1
            });
            await cartItem.save();
          }
      
          res.status(201).json({cartItem, messgae:"book added to cart"});
        } catch (error) {
          console.error(error);
          res.status(500).send('Error adding item to cart');
        }
    },

    getCartItems: async(req, res) => {
      const userId = req.userid;

      try {
        const cartItems = await Cart.find({ userId });
        res.status(200).json(cartItems);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart items');
      }
    },

    deleteCartItems: async(req, res) => {
      try {
        const { itemId, clearCart } = req.query;
        
        if (clearCart === 'true') {
       
          await Cart.deleteMany({});
          res.status(200).json({ message: 'Cart cleared successfully' });
        } else {
         
          await Cart.findByIdAndDelete(itemId);
          res.status(200).json({ message: 'Item deleted from cart successfully' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
      }
    }
}
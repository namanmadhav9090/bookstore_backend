const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      price: {
        type: Number,
        required: true
      },
      category: {
        type: String
      },
      imageUrl: {
        type: String,
        required: true,
      },
})

const Book = mongoose.model("Book",BooksSchema);

module.exports = Book;
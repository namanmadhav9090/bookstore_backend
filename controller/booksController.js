const Book = require('../models/Book');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

module.exports = {
    createBook: async(req, res) => {
        try {
            const { title, author, description, price, category, imageUrl } = req.body;

          
            const schema = Joi.object({
              title: Joi.string().required(),
              author: Joi.string().required(),
              description: Joi.string().allow(''),
              price: Joi.number().required(),
              category: Joi.string().allow(''),
              imageUrl: Joi.string().required()
            });
        
            const { error } = schema.validate(req.body);
            if (error) {
              return res.status(400).json(error.details[0].message);
            }
        
           
            const existingBook = await Book.findOne({ title });
            if (existingBook) {
              return res.status(400).json('Book already exists');
            }
        
           
            const newBook = new Book({ title, author, description, price, category, imageUrl });
            await newBook.save();
        
            res.status(201).json({ message: 'Book registered successfully', book: newBook });
          } catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
          }
        },

    getBooks : async(req, res) => {
        try {
            const { id } = req.query;
        
            if (id) {
             
              const book = await Book.findById(id);
              if (!book) {
                return res.status(404).json('Book not found');
              }
              res.json(book);
            } else {
             
              const books = await Book.find();
              res.json(books);
            }
          } catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
          }
        },

    updateBook: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, author, description, price, category, imageUrl } = req.body;
        
         
            const existingBook = await Book.findById(id);
            if (!existingBook) {
              return res.status(404).json('Book not found');
            }
        
            
            existingBook.title = title;
            existingBook.author = author;
            existingBook.description = description;
            existingBook.price = price;
            existingBook.category = category;
            existingBook.imageUrl = imageUrl;
        
          
            await existingBook.save();
        
            res.json({ message: 'Book updated successfully', book: existingBook });
          } catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
          }
    },

    deletebook: async (req, res) => {
        try {
            const { id } = req.params;
            const removeBook = await Book.deleteOne({_id : id});
            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
        }
    },

    searchBooks: async (req, res) => {
      try {
        let filter = {};
        const { query } = req.query;
     
      
      
        if (query) {
        
          const regexQuery = new RegExp(`.*${query}.*`, 'i'); 
          filter.$or = [
            { title: regexQuery },
            { author: regexQuery },
            { category: regexQuery }
          ];
        }
      
        const books = await Book.find(filter);
        res.json(books);
      } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
      }
    }
}

    


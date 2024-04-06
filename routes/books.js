// routes/books.js
const express = require("express");
const router = express.Router();
const {createBook, getBooks, updateBook, deletebook, searchBooks} = require("../controller/booksController");
const authUser = require("../middleware/auth");

router.get("/search", authUser,searchBooks);
router.post("/", authUser,createBook);
router.get("/", authUser,getBooks);
router.put("/:id", authUser,updateBook);
router.delete("/:id", deletebook);

module.exports = router;

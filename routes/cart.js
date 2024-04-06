// routes/books.js
const express = require("express");
const router = express.Router();
const {addtoCart, getCartItems, deleteCartItems} = require("../controller/cartController");
const authUser = require("../middleware/auth");


router.post("/", authUser,addtoCart);
router.get("/", authUser, getCartItems);
router.delete("/", authUser, deleteCartItems);

module.exports = router;

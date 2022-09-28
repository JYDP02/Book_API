const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");
const { addBook, getBooks, getBook, updateBook, deleteBook } = require("../controllers/booksController");
const { loginUser, registerUser, logoutUser } = require("../controllers/userController");
 
//login user
router.post("/login", loginUser);

//register user
router.post("/register", registerUser);

//logout user
router.post("/logout", logoutUser);

//Home Page or Get Books or Get a Single Book
router.get("/getbooks", auth, getBooks);

//Home Page or Get Books or Get a Single Book
router.get("/getbook/:name", auth, getBook);

//Create A Book
router.post("/addbook", auth, addBook);

//Update A Book
router.put("/updatebook/:name", auth, updateBook)

//Delete A Book
router.delete("/deletebook/:name", auth, deleteBook);


module.exports = router;
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    //  Task 1:  Complete the code for getting the list of books available in the shop
    res.send(JSON.stringify(books,null,4));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

    //  Task 2:  Complete the code for getting the book details based on ISBN
    //  This assumes the isbn is they key of the books map, which is not
    //  explicitly specified.  It is the bet interpretation of this I can find.
    const isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn],null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

    //  Task 3:  Complete the code for getting the book details based on the author 
    const author = req.params.author;

    let authorsBooks = {};

    for (const key in books) {
        if (Object.hasOwn(books, key) && books[key].author === author) {
            authorsBooks[key] = books[key]
        }
    }

    res.send(JSON.stringify(authorsBooks, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

    //  Task 4:  Complete the code for getting the book details based on the title 
    const title = req.params.title;

    let titleBooks = {};

    for(const key in books) {
        if (Object.hasOwn(books,key) && books[key].title === title) {
            titleBooks[key] = books[key]
        }
    }

    res.send(JSON.stringify(titleBooks, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {

    //  Task 5:  Get the book reviews based on ISBN provided in the request parameters
    const isbn = req.params.isbn;

    let book = books[isbn];

    if (Object.hasOwn(book, "reviews")){
        if (books["reviews"] == null){
            res.status(400).json({message: "No reviews found for that book"});
        }
        else {
            res.send(JSON.stringify(books["reviews"], null, 4));
        }
    }
    else {
        res.status(400).json({message: "No books with that ISBN having a review object"});
    }
});


module.exports.general = public_users;

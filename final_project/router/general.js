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
  res.send(books)
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = parseInt(req.params.isbn);
  res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let authorBooks = '';
  for (let isbn in books) {
    if (books[isbn]['author'] == author) {
        authorBooks = books[isbn]['title']
    }
  };
  res.send(`${author} published "${authorBooks}"`);
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let author = '';
  for (let isbn in books) {
    if (books[isbn]['title'] == title) {
        author = books[isbn]['author']
    }
  };
  res.send(`The book named "${title}" was published by ${author}`);
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const author = books[isbn]['author']; 
  const title = books[isbn]['title'];
  const reviews = books[isbn]['reviews'][1];
  res.send(`The book "${title}" published by ${author} has following review: "${reviews}"`);

  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

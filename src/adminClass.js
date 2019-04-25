const User = require("./userClass");
const Book = require("./bookClass");
const DATABASE = require("../db/db");

function Admin(name, email, password) {
  User.call(this, name, email, password);
  this.isAdmin = true;
  this.subscribed = "Premium Plan";
  this.expiringDate = "unlimited";
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.addNewBook = (
  noCopies,
  authorName,
  bookTitle,
  bookCategory,
  bookPages,
  bookDescription
) => {
  Book.prototype.addNewBook(
    noCopies,
    authorName,
    bookTitle,
    bookCategory,
    bookPages,
    bookDescription
  );
};

Admin.prototype.checkSuggestions = () => {
  return DATABASE.suggestedBooks;
};

Admin.prototype.deleteABook = book_id => {
  return Book.prototype.deleteABook(book_id);
};

Admin.prototype.viewAllUsers = () => {
  return DATABASE.userDB.map(users => users);
};

module.exports = Admin;

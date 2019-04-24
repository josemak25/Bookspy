const User = require("./userClass");
const Book = require("./bookClass");

function Admin(name, email, password) {
  User.call(this, name, email, password);
  this.isAdmin = true;
  this.subscribed = "Pro Plan";
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

module.exports = Admin;

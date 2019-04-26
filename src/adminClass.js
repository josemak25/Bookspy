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
  return Book.prototype.addNewBook(
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

Admin.prototype.viewAUser = user_id => {
  return DATABASE.userDB.find(user => user.user_id === user_id);
};

Admin.prototype.deleteAUserById = user_id => {
  let byByIndex = 0;
  const user = DATABASE.userDB.find((user, index) => {
    if (user.user_id === user_id) {
      byByIndex = index;
      return user;
    }
  });
  if (user) {
    DATABASE.userDB.splice(byByIndex, 1);
    return "User Deleted successfully";
  } else return "User not found";
};

Admin.prototype.deleteAllBooks = () => {
  return Book.prototype.deleteAllBooks();
};

Admin.prototype.deleteAllUsers = () => {
  DATABASE.userDB = [];
  return "Users where all deleted successfully";
};

module.exports = Admin;

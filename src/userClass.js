const DATABASE = require("../db/db");
const Book = require("./bookClass");

function User(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.subscribed = "Basic Plan";
  this.expiringDate = "00:00:00";
  this.user_id = null;
}

User.prototype.saveUser = function() {
  function idgenerator() {
    return DATABASE.userDB.length < 1
      ? 1
      : DATABASE.userDB[DATABASE.userDB.length - 1].user_id + 1;
  }

  this.user_id = idgenerator();
  return DATABASE.userDB.push(this);
};

User.prototype.viewAllBooks = () => {
  return Book.prototype.viewAllBooks();
};

User.prototype.viewBookByCategory = category => {
  return Book.prototype.viewBookByCategory(category);
};

module.exports = User;

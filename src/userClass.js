const DATABASE = require("../db/db");

function User(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.subscribed = "Basic Plan";
  this.expiringDate = "00:00:00";
}

User.prototype.saveUser = function() {
  DATABASE.userDB.push(this);
};

module.exports = User;

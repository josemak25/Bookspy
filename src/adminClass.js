const User = require("./userClass");

function Admin(name, email, password) {
  User.call(this, name, email, password);
  this.isAdmin = true;
  this.subscribed = "Pro Plan";
  this.expiringDate = "unlimited";
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

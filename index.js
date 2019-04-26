// TEST FILE FOR ALL USER AND ADMIN METHODS

const User = require("./src/userClass");
const Admin = require("./src/adminClass");
const Book = require("./src/bookClass");
const dataBase = require("./db/db");

//Instantiate Users
const john = new User("john", "johnDoe@gmail.com", "password");
const kenny = new User("kenny mars", "kennyMars@gmail.com", "swordfish");
const penny = new User("penny drey", "pennyDrey@gmail.com", "glory23");
const drake = new User("drake mathew", "drakeMat@gmail.com", "drakeMar32");

//Instantiate Admin
const james = new Admin("joseph", "joseph@gmail.com", "password");

//Saving Users
john.saveUser();
kenny.saveUser();
penny.saveUser();
drake.saveUser();
james.saveUser();

//Admin create Book
james.addNewBook(
  12,
  "Marijn Haverbeke",
  "Eloquent JavaScript",
  "Technology",
  448,
  "A Modern Introduction to Programming"
);

james.addNewBook(
  5,
  "Kenneth E. Hagin",
  "Exceedingly Growing Faith",
  "Religion",
  114,
  "If your life's work can be accomplished in your lifetime, you're not thinking big enough."
);

james.addNewBook(
  7,
  "Jeffry A. Frieden",
  "International Political Economy",
  "Politics",
  496,
  "Perspectives on Global Power and Wealth"
);

//User view all books
console.log(john.viewAllBooks());

//User search a book by category
console.log(john.viewBookByCategory("Politics"));

//User buy a book from the library
console.log(john.buyBook("Eloquent JavaScript", 7));

//User buy a book from the library when passed in quantity is much more than avaliable copies in stock
console.log(john.buyBook("Eloquent JavaScript", 17));

//User subscribe to read book
console.log(john.subscribeForReading("premium"));

//User to read book after subscribing
console.log(john.readABook("Exceedingly Growing Faith", "Kenneth E. Hagin"));

//User who is not subscribed trys to read book
console.log(kenny.readABook("Eloquent JavaScript", "Marijn Haverbeke"));

//User leaving suggestions of books to be added to library
console.log(drake.suggestBooks("Mother Teresa - A Biography", "Meg Greene"));

//User updating his profile
console.log(drake.updateUserDetails("Noah", "NoahArk@gmail.com", "Unicode934"));

//Admin to check all suggested books
console.log(james.checkSuggestions());

//Admin to delete a book by id
console.log(james.deleteABook(2));

//Admin to delete a book by id thats not found
console.log(james.deleteABook(8));

//Admin to view a user by id
console.log(james.viewAUser(1));

//Admin to to delete a user by id
console.log(james.deleteAUserById(2));

//Admin to to delete a user by id thats not found
console.log(james.deleteAUserById(12));

//Admin to view all users
console.log(james.viewAllUsers());

//Admin to view all books on library
console.log(james.viewAllBooks());

//Admin to delete all books on database
console.log(james.deleteAllBooks());

//Admin to delete all users on database
console.log(james.deleteAllUsers());

console.log(dataBase.userDB);
console.log(dataBase.bookLibery);

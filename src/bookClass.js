const DATABASE = require("../db/db");

function Book(
  noCopies,
  authorName,
  bookTitle,
  bookCategory,
  bookPages,
  bookDescription
) {
  this.author = authorName;
  this.title = bookTitle;
  this.pages = `${bookPages} pages`;
  this.category = bookCategory;
  this.image = "https://api.gooogle.book.com/314561";
  this.avaliable_copies = noCopies;
  this.view = 0;
  this.book_id = idgenerator();
  this.description = bookDescription;

  function idgenerator() {
    return DATABASE.bookLibery.length < 1
      ? 1
      : DATABASE.bookLibery[DATABASE.bookLibery.length - 1].book_id + 1;
  }
  DATABASE.bookLibery.push(this);
}

Book.prototype.addNewBook = (
  noCopies,
  authorName,
  bookTitle,
  bookCategory,
  bookPages,
  bookDescription
) => {
  return new Book(
    noCopies,
    authorName,
    bookTitle,
    bookCategory,
    bookPages,
    bookDescription
  );
};

Book.prototype.viewAllBooks = () => {
  return DATABASE.bookLibery;
};

Book.prototype.viewBookByCategory = category => {
  return DATABASE.bookLibery.filter(elem => elem.category === category);
};

Book.prototype.buyBook = (bookName, noOfCopies) => {
  const book = DATABASE.bookLibery.find(book => book.title == bookName);
  if (book.avaliable_copies > 1) {
    if (book.avaliable_copies >= noOfCopies) {
      book.avaliable_copies -= noOfCopies;
      return "Succesfuly purchased";
    } else {
      return "Number of book at stcok is not enough";
    }
  } else {
    return "Sorry this book is out of stock";
  }
};

Book.prototype.suggestBooks = (bookName, authorName) => {
  return DATABASE.suggestedBooks.push({ title: bookName, author: authorName });
};

Book.prototype.readABook = function(bookName, authorName, user_id) {
  const user = DATABASE.userDB.find(user => user.user_id === user_id);
  if (user.expiringDate !== "00:00:00") {
    const book = DATABASE.bookLibery.find(
      book => book.title == bookName && book.author == authorName
    );
    if (book) {
      book.view += 1;
      return console.log("Enjoy your reading");
    } else {
      return console.log("Sorry couldn't find your book at this time");
    }
  } else {
    return console.log("Please subscribe to our plans to read a book");
  }
};

Book.prototype.subscribeForReading = function(subPlan, user_id) {
  const user = DATABASE.userDB.find(user => user.user_id === user_id);
  if (subPlan.toLowerCase() == "pro") {
    user.subscribed = `${subPlan.charAt(0).toUpperCase() +
      subPlan.slice(1)} Plan`;
    user.expiringDate = "1 Month";
  } else if (subPlan.toLowerCase() == "premium") {
    user.subscribed = `${subPlan.charAt(0).toUpperCase() +
      subPlan.slice(1)} Plan`;
    user.expiringDate = "1 Year";
  } else {
    return console.log("Invalid Subscription");
  }
  return console.log("Subscription successful");
};

module.exports = Book;

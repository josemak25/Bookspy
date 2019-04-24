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

module.exports = Book;

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
  this.status = `${noCopies} copies available`;
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
module.exports = Book;

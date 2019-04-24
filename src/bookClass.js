const DATABASE = require("./db");

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
  this.description = bookDescription;
  DATABASE.bookLibery.push(this);
}

const DATABASE = require("../db/db");

function Book(noCopies, authorName, bookTitle, bookCategory, bookPages, bookDescription) {
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
		return DATABASE.bookLibery.length < 1 ? 1 : DATABASE.bookLibery[DATABASE.bookLibery.length - 1].book_id + 1;
	}
	DATABASE.bookLibery.push(this);
}

Book.prototype.addNewBook = (noCopies, authorName, bookTitle, bookCategory, bookPages, bookDescription) => {
	new Book(noCopies, authorName, bookTitle, bookCategory, bookPages, bookDescription);
	return "Book was added successfully";
};

Book.prototype.viewAllBooks = () => {
	return DATABASE.bookLibery.map(books => books);
};

Book.prototype.viewBookByCategory = category => {
	return DATABASE.bookLibery.filter(elem => elem.category === category);
};

Book.prototype.buyBook = (bookName, noOfCopies) => {
	const book = DATABASE.bookLibery.find(book => book.title === bookName);
	if (!book) return "Sorry no book as such was found";
	if (book.avaliable_copies === 0) return "Sorry this book is out of stock";
	if (book.avaliable_copies >= noOfCopies) {
		book.avaliable_copies -= noOfCopies;
		return "Succesfuly purchased";
	} else return "Number of book at stock is not enough";
};

Book.prototype.suggestBooks = (bookName, authorName) => {
	DATABASE.suggestedBooks.push({ title: bookName, author: authorName });
	return "Thanks, your suggestions are been looked at";
};

Book.prototype.readABook = function(bookName, authorName, user_id) {
	const user = DATABASE.userDB.find(user => user.user_id === user_id);
	if (user.subscribed !== "Basic Plan") {
		const book = DATABASE.bookLibery.find(book => book.title == bookName && book.author == authorName);
		if (!book) return "Sorry couldn't find your book at this time";
		book.view += 1;
		return "Enjoy your reading";
	} else {
		return "Please subscribe to our plans to read a book";
	}
};

Book.prototype.subscribeForReading = function(subPlan, user_id) {
	const user = DATABASE.userDB.find(user => user.user_id === user_id);
	if (subPlan.toLowerCase() == "pro") {
		user.subscribed = `${subPlan.charAt(0).toUpperCase() + subPlan.slice(1)} Plan`;
		user.expiringDate = "3 Months";
	} else if (subPlan.toLowerCase() == "premium") {
		user.subscribed = `${subPlan.charAt(0).toUpperCase() + subPlan.slice(1)} Plan`;
		user.expiringDate = "1 Year";
	}
	return "Subscription successful";
};

Book.prototype.deleteABook = book_id => {
	let byByIndex = 0;
	const book = DATABASE.bookLibery.find((book, index) => {
		if (book.book_id == book_id) {
			byByIndex = index;
			return book;
		}
	});

	if (!book) return "Book not found";
	DATABASE.bookLibery.splice(byByIndex, 1);
	return "Book Deleted successfully";
};

Book.prototype.deleteAllBooks = () => {
	DATABASE.bookLibery = [];
	return "Books where all deleted successfully";
};

module.exports = Book;

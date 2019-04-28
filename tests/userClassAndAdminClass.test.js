const User = require("../src/userClass");
const Admin = require("../src/adminClass");

const DATABASE = require("../db/db");

//USERS FOR TEST
const jane = new User("Friday Doe", "fridayDoeg@gmail.com", "transport324");
const james = new Admin("Charles Grey", "GreyCharlesg@gmail.com", "swordfish");
const kenny = new User("Kenny Black", "KenndyB@gmail.com", "searchWell312");
const Amelia = new User("Amelia Daniel", "AmeliaD@gmail.com", "holyAmelia132");

describe("Testing user class and admin class methods", () => {
	it("should create new user when userClass is called", () => {
		expect(jane.saveUser()).toMatch("Thank for registring with BookSpy");
		expect(Array.isArray(DATABASE.userDB)).toEqual(true);
		DATABASE.userDB.forEach(user => {
			expect(typeof user).toEqual("object");
			expect(Object.keys(user).sort()).toEqual(["email", "expiringDate", "name", "password", "subscribed", "user_id"]);

			expect(typeof user.email).toEqual("string");
			expect(typeof user.expiringDate).toEqual("string");
			expect(typeof user.name).toEqual("string");
			expect(typeof user.password).toEqual("string");
			expect(typeof user.subscribed).toEqual("string");
			expect(typeof user.user_id).toEqual("number");
		});
	});

	it("should be able to subscribe as a user to bookspy plan", () => {
		const sub = jane.subscribeForReading("pro");
		expect(sub).toContain("Subscription successful");
		expect(jane).toEqual({
			email: "fridayDoeg@gmail.com",
			expiringDate: "3 Months",
			name: "Friday Doe",
			password: "transport324",
			subscribed: "Pro Plan",
			user_id: 1
		});
	});

	it("admin should be able to add a book to book library when addNewBook method is called", () => {
		james.saveUser();
		const eloquentJavaScript = james.addNewBook(
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

		expect(eloquentJavaScript).toMatch("Book was added successfully");
		expect(Array.isArray(DATABASE.bookLibery)).toEqual(true);
		DATABASE.bookLibery.forEach(book => {
			expect(typeof book).toEqual("object");
			expect(Object.keys(book).sort()).toEqual([
				"author",
				"avaliable_copies",
				"book_id",
				"category",
				"description",
				"image",
				"pages",
				"title",
				"view"
			]);

			expect(typeof book.author).toEqual("string");
			expect(typeof book.avaliable_copies).toEqual("number");
			expect(typeof book.book_id).toEqual("number");
			expect(typeof book.category).toEqual("string");
			expect(typeof book.description).toEqual("string");
			expect(typeof book.image).toEqual("string");
			expect(typeof book.title).toEqual("string");
			expect(typeof book.view).toEqual("number");
		});
	});

	it("User can search for a book on the library by category", () => {
		expect(jane.viewBookByCategory("Politics")).toContainEqual({
			author: "Jeffry A. Frieden",
			avaliable_copies: 7,
			book_id: 3,
			category: "Politics",
			description: "Perspectives on Global Power and Wealth",
			image: "https://api.gooogle.book.com/314561",
			pages: "496 pages",
			title: "International Political Economy",
			view: 0
		});
	});

	it("User can view all books on the book library", () => {
		const viewAllBooks = jane.viewAllBooks();
		expect(viewAllBooks).toEqual(
			expect.arrayContaining([
				expect.objectContaining(
					{
						author: "Marijn Haverbeke",
						title: "Eloquent JavaScript",
						book_id: 1
					},
					{
						author: "Kenneth E. Hagin",
						title: "Exceedingly Growing Faith",
						book_id: 2
					},
					{
						author: "Jeffry A. Frieden",
						title: "International Political Economy",
						book_id: 3
					}
				)
			])
		);
	});

	it("User to buy book from the book library when number of copies on the book library is not enough", () => {
		const bookToBuy = jane.buyBook("Eloquent JavaScript", 17);
		expect(bookToBuy).toEqual("Number of book at stock is not enough");
	});

	it("User can buy a book from the book library and also expect the number of copies of the book in library to decrease on the amount of sales", () => {
		const bookToBuy = jane.buyBook("Eloquent JavaScript", 12);
		expect(bookToBuy).toEqual("Succesfuly purchased");
		expect(DATABASE.bookLibery).toContainEqual({
			author: "Marijn Haverbeke",
			avaliable_copies: 0,
			book_id: 1,
			category: "Technology",
			description: "A Modern Introduction to Programming",
			image: "https://api.gooogle.book.com/314561",
			pages: "448 pages",
			title: "Eloquent JavaScript",
			view: 0
		});
	});

	it("User to buy book from the book library when number book is out of stock", () => {
		Amelia.saveUser();
		Amelia.subscribeForReading("premium");
		const bookToBuy = Amelia.buyBook("Eloquent JavaScript", 4);
		expect(bookToBuy).toEqual("Sorry this book is out of stock");
	});

	it("A subscribed User can read a book from the library and number of views on the book is increased", () => {
		const readMorning = jane.readABook("Exceedingly Growing Faith", "Kenneth E. Hagin");
		const readAfternoon = jane.readABook("Exceedingly Growing Faith", "Kenneth E. Hagin");
		const readEvening = jane.readABook("Exceedingly Growing Faith", "Kenneth E. Hagin");

		expect(readMorning).toMatch("Enjoy your reading");

		expect(DATABASE.bookLibery).toContainEqual({
			author: "Kenneth E. Hagin",
			avaliable_copies: 5,
			book_id: 2,
			category: "Religion",
			description: "If your life's work can be accomplished in your lifetime, you're not thinking big enough.",
			image: "https://api.gooogle.book.com/314561",
			pages: "114 pages",
			title: "Exceedingly Growing Faith",
			view: 3
		});
	});

	it("An unsubscribed User can not read a book from library", () => {
		kenny.saveUser();
		const unsubUserToRead = kenny.readABook("Eloquent JavaScript", "Marijn Haverbeke");
		expect(unsubUserToRead).toMatch("Please subscribe to our plans to read a book");
	});

	it("A subscribed User wanting to read a book but not found in library", () => {
		const subUserToRead = jane.readABook("Virtual Typography", "Hillner, Matthias.");
		expect(subUserToRead).toMatch("Sorry couldn't find your book at this time");
	});

	it("User can suggest books to admin for adding it to the book library", () => {
		expect(jane.suggestBooks("Mother Teresa - A Biography", "Meg Greene")).toMatch(
			"Thanks, your suggestions are been looked at"
		);
	});

	it("User can update his or her details successfully", () => {
		const changeDetails = jane.updateUserDetails("Noah", "NoahArk@gmail.com", "Unicode934");
		expect(changeDetails).toMatch("Details Updated Successfully");
		expect(DATABASE.userDB).toContainEqual({
			email: "NoahArk@gmail.com",
			expiringDate: "3 Months",
			name: "Noah",
			password: "Unicode934",
			subscribed: "Pro Plan",
			user_id: 1
		});
	});

	it("Admin to check for user suggested books", () => {
		expect(Array.isArray(DATABASE.suggestedBooks)).toEqual(true);
		DATABASE.suggestedBooks.forEach(suggestion => {
			expect(typeof suggestion).toEqual("object");
			expect(Object.keys(suggestion).sort()).toEqual(["author", "title"]);
			expect(typeof suggestion.author).toEqual("string");
			expect(typeof suggestion.title).toEqual("string");
		});
		expect(james.checkSuggestions()).toContainEqual({
			author: "Meg Greene",
			title: "Mother Teresa - A Biography"
		});
	});

	it("Admin to delete a book by id from book library", () => {
		const deleteABook = james.deleteABook(2);
		expect(deleteABook).toMatch("Book Deleted successfully");
		expect(DATABASE.bookLibery).not.toContainEqual({
			author: "Kenneth E. Hagin",
			avaliable_copies: 5,
			book_id: 2,
			category: "Religion",
			description: "If your life's work can be accomplished in your lifetime, you're not thinking big enough.",
			image: "https://api.gooogle.book.com/314561",
			pages: "114 pages",
			title: "Exceedingly Growing Faith",
			view: 3
		});
	});

	it("Admin to delete a book by id that dosent exit in user library", () => {
		expect(james.deleteABook(8)).toMatch("Book not found");
	});

	it("Admin to view all users in user database", () => {
		expect(james.viewAllUsers()).toEqual(
			expect.arrayContaining([
				expect.objectContaining(
					{
						email: "NoahArk@gmail.com",
						name: "Noah",
						password: "Unicode934",
						user_id: 1
					},
					{
						email: "GreyCharlesg@gmail.com",
						name: "Charles Grey",
						password: "swordfish",
						user_id: 2
					},
					{
						email: "AmeliaD@gmail.com",
						name: "Amelia Daniel",
						password: "holyAmelia132",
						user_id: 3
					},
					{
						email: "KenndyB@gmail.com",
						name: "Kenny Black",
						password: "searchWell312",
						user_id: 4
					}
				)
			])
		);
	});

	it("Admin can view a single user by id", () => {
		expect(james.viewAUser(3)).toEqual({
			email: "AmeliaD@gmail.com",
			expiringDate: "1 Year",
			name: "Amelia Daniel",
			password: "holyAmelia132",
			subscribed: "Premium Plan",
			user_id: 3
		});
	});

	it("Admin to delete a user by id", () => {
		expect(james.deleteAUserById(1)).toMatch("User Deleted successfully");
		expect(DATABASE.userDB).not.toContainEqual({
			name: "Noah",
			email: "NoahArk@gmail.com",
			password: "Unicode934",
			subscribed: "Pro Plan",
			expiringDate: "3 Months",
			user_id: 1
		});
	});

	it("Admin to delete a user by id that dosent exit in user database", () => {
		expect(james.deleteAUserById(8)).toMatch("User not found");
	});

	it("Admin to delete all book from the book library", () => {
		expect(james.deleteAllBooks()).toMatch("Books where all deleted successfully");
		expect(DATABASE.bookLibery).toEqual([]);
	});

	it("Admin to delete all users from the users database", () => {
		expect(james.deleteAllUsers()).toMatch("Users where all deleted successfully");
		expect(DATABASE.bookLibery).toEqual([]);
	});
});

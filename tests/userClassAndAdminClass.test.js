const User = require("../src/userClass");
const Admin = require("../src/adminClass");

const DATABASE = require("../db/db");

//USERS FOR TEST
const jane = new User("Friday Doe", "fridayDoeg@gmail.com", "transport324");
const james = new Admin("Charles Grey", "GreyCharlesg@gmail.com", "swordfish");

describe("Testing user class and admin class methods", () => {
  it("should create new user when userClass is called", () => {
    expect(jane.saveUser()).toMatch("Thank for registring with BookSpy");
    expect(Array.isArray(DATABASE.userDB)).toEqual(true);
    DATABASE.userDB.forEach(user => {
      expect(typeof user).toEqual("object");
      expect(Object.keys(user).sort()).toEqual([
        "email",
        "expiringDate",
        "name",
        "password",
        "subscribed",
        "user_id"
      ]);

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
});

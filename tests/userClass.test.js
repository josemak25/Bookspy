const User = require("../src/userClass");
const DATABASE = require("../db/db");

//USERS FOR TEST
const jane = new User("Friday Doe", "fridayDoeg@gmail.com", "transport324");

describe("Testing user class methods", () => {
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
});

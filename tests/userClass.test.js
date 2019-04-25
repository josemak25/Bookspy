const User = require("../src/userClass");

//USERS FOR TEST
const jane = new User("Friday Doe", "fridayDoeg@gmail.com", "transport324");

describe("Testing user class methods", () => {
  it("should create new user when userClass is called", () => {
    expect(jane.saveUser()).toMatch("Thank for registring with BookSpy");
  });
});

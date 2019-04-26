# **BOOKSPY**

                                An Example Of JavaScript Prototypal Inheritance

**JavaScript** is quite unique in the popular programming
languages landscape because of its usage of prototypal inheritance. While most object-oriented languages use a class-based inheritance model,
JavaScript is based on the prototype inheritance model.

**Bookspy** is a book Library Model system which allow users to register, buy
and subscribe to read any category of book from the Library

## **Getting Started**

These instructions bellow will guide you in getting a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

You will need to have the following softwares installed on your local machine

- node js & npm

## Installing

A step by step series of instruction to install and get a development env running

```
npm install
```

To start the the book run the index file

```
node index
```

## Features

#### User Features

- User can create account.
- User can request for the list of books on the library.
- User can search for a book by category.
- User can buy a book found on the library.
- User can subscribe to a plan for reading books on library.
- User can update his/her profile.

#### Admin Features

- Admin can create account.
- Admin can request for all the list of books on the library.
- Admin can request for all the list of users on the platform.
- Admin can add books to the library.
- Admin can request for all suggested books by users.
- Admin can delete a book on the library.
- Admin can delete a user from the platform.
- Admin can delete all books.
- Admin can delete all users.

#### Performable Actions

## User Methods

<table>
<tr><th>HTTP verbs</th><th>Method Desc.</th><th>Function</th><th>Responses/Payload</th></tr>
<tr><td>POST</td><td>Creating a new User</td><td>const jane = new User("Friday Doe", "fridayDoeg@gmail.com", "transport324")</td><td>
    
 ``` javascript
   Res = "Thank for registring with BookSpy"

    {
      email: "fridayDoeg@gmail.com",
      expiringDate: "00:00:00",
      name: "Friday Doe",
      password: "transport324",
      subscribed: "Basic Plan",
      user_id: 1
    }

````
</pre></code></td></tr>
<tr><td>POST</td><td>Adding created user to DATABASE</td><td>jane.saveUser()</td><td>
<code>
<pre>"Thank for registring with BookSpy"
</pre></code></td></tr>

<tr><td>GET</td><td>View the list of books</td><td>viewAllBooks()</td><td>


```javascript
[
    {
        author: 'Marijn Haverbeke',
        title: 'Eloquent JavaScript',
        pages: '448 pages',
        category: 'Technology',
        image: 'https://api.gooogle.book.com/314561',
        avaliable_copies: 12,        
	view: 0,
        book_id: 1,
        description: 'A Modern Introduction to Programming' },
      Book {
        author: 'Kenneth E. Hagin',
        title: 'Exceedingly Growing Faith',
        pages: '114 pages',
        category: 'Religion',
        image: 'https://api.gooogle.book.com/314561',
        avaliable_copies: 5,
        view: 0,
        book_id: 2,
        description:
         "If your life's work can be accomplished in your lifetime, you're not thinking big enough."
   }
]
````

</pre></code></td></tr>
<tr><td>GET</td><td>User search book by category</td><td>jane.viewBookByCategory("Technology")</td><td>

```javascript
{
  author: "Marijn Haverbeke",
  title: "Eloquent JavaScript",
  pages: "448 pages",
  category: "Technology",
  image: "https://api.gooogle.book.com/314561",
  avaliable_copies: 12,
  view: 0,
  book_id: 1,
  description: "A Modern Introduction to Programming"
};
```

</pre></code></td></tr>
<tr><td>POST</td><td>User can buy a book by book name and no. of copies</td><td>jane.buyBook("Eloquent JavaScript", 6)</td><td>
<code>
<pre>
"Succesfuly purchased"
</pre></code></td></tr>
<tr><td>POST</td><td>User can subscribe to read books on library</td><td>jane.subscribeForReading("pro")</td><td>

```javascript
Res = "Subscription successful.";

{
  email: "fridayDoeg@gmail.com",
  expiringDate: "3 Months",
  name: "Friday Doe",
  password: "transport324",
  subscribed: "Pro Plan",
  user_id: 1
};

```

</pre></code></td></tr>
<tr><td>GET</td><td>User can read a book on library</td><td>jane.readABook(
      "Exceedingly Growing Faith",
      "Kenneth E. Hagin"
    )</td><td>
<code>
<pre>Res = "Enjoy your reading"

</pre></code></td></tr>
<tr><td>POST</td><td>User can suggest a book to be added to library</td><td>jane.suggestBooks("Mother Teresa - A Biography", "Meg Greene")</td><td>

```javascript
Res = "Thanks, your suggestions are been looked at.";

[
  {
    author: "Meg Greene",
    title: "Mother Teresa - A Biography"
  }
];
```

</pre></code></td></tr>
<tr><td>PUT</td><td>User can update his details</td><td>jane.updateUserDetails(
      "Noah",
      "NoahArk@gmail.com",
      "Unicode934"
    )</td><td>

```javascript
Res = "Details Updated Successfully.";

{
  email: "NoahArk@gmail.com",
  expiringDate: "3 Months",
  name: "Noah",
  password: "Unicode934",
  subscribed: "Pro Plan",
  user_id: 1
};
```

</pre></code></td></tr>
</table>

## Admin Methods

<table>
<tr><th>HTTP verbs</th><th>Method Desc.</th><th>Function</th><th>Responses/Payload</th></tr>
<tr><td>POST</td><td>Creating a new Admin</td><td>const james = new Admin("Charles Grey", "GreyCharlesg@gmail.com", "swordfish");</td><td>

```javascript

     {
        name: 'Charles Grey',
        email: 'GreyCharlesg@gmail.com',
        password: 'swordfish',
        subscribed: 'Premium Plan',
        expiringDate: 'unlimited',
        isAdmin: true,
        user_id: 2
    },
```

</pre></code></td></tr>
<tr><td>POST</td><td>Add new books to library</td><td>
james.addNewBook(
      12,
      "Marijn Haverbeke",
      "Eloquent JavaScript",
      "Technology",
      448,
      "A Modern Introduction to Programming"
    )
</td><td>

```javascript
[
  {
    author: "Marijn Haverbeke",
    title: "Eloquent JavaScript",
    pages: "448 pages",
    category: "Technology",
    image: "https://api.gooogle.book.com/314561",
    avaliable_copies: 12,
    view: 0,
    book_id: 1,
    description: "A Modern Introduction to Programming"
  }
];
```

</pre></code></td></tr>

<tr><td>GET</td><td>check user book suggestions </td><td>
james.checkSuggestions()
</td><td>

```javascript
[
  {
    author: "Meg Greene",
    title: "Mother Teresa - A Biography"
  }
];
```

</pre></code></td></tr></table>   

This and many more are Admin methods, Attached with is an Index.js, that has all methods and actions on each.
Each method from User Constructor to Admin Constructor are tested with Jest.   

## Running the tests

To run jest test
```
npm test
```  

To run jest with test coverage
```
npx jest --coverage 
```  

*A*ttached here is a link to my medium article, on the followup of how Bookspy was built using 
JavaScript Prototype Inheritance Principles.

## Credits

*Credits@Decagon Institute*

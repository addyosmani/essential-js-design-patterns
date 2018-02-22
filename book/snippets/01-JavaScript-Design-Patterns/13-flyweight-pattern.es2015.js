//*******************************************************//
// Implementing Classical Flyweights
//*******************************************************//
//********************** Snippet 1 **********************//
// Simulate pure virtual inheritance/"implement" keyword for JS
Function.prototype.implementsFor = function(parentClassOrObject) {
  if (parentClassOrObject.constructor === Function) {
    // Normal Inheritance
    this.prototype = new parentClassOrObject();
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject.prototype;
  } else {
    // Pure Virtual Inheritance
    this.prototype = parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject;
  }
  return this;
};


//********************** Snippet 2 **********************//
// [ES2015+] We used new template literals for string interpolation
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax
// [ES2015+] Parentheses are optional when there is only one parameter

// Flyweight object
const CoffeeOrder = {
  // Interfaces
  serveCoffee(context) {},
  getFlavor() {},
};

// ConcreteFlyweight object that creates ConcreteFlyweight
// Implements CoffeeOrder
function CoffeeFlavor(newFlavor) {
  const flavor = newFlavor;

  // If an interface has been defined for a feature
  // implement the feature
  if (typeof this.getFlavor === 'function') {
    this.getFlavor = () => flavor;
  }

  if (typeof this.serveCoffee === 'function') {
    this.serveCoffee = context => {
      console.log(
        `Serving Coffee flavor ${flavor} to table number ${context.getTable()}`
      );
    };
  }
}

// Implement interface for CoffeeOrder
CoffeeFlavor.implementsFor(CoffeeOrder);

// Handle table numbers for a coffee order
const CoffeeOrderContext = tableNumber => {
  return {
    getTable() {
      return tableNumber;
    },
  };
};

const CoffeeFlavorFactory = () => {
  const flavors = {};
  let length = 0;

  return {
    getCoffeeFlavor(flavorName) {
      let flavor = flavors[flavorName];
      if (typeof flavor === 'undefined') {
        flavor = new CoffeeFlavor(flavorName);
        flavors[flavorName] = flavor;
        length++;
      }
      return flavor;
    },

    getTotalCoffeeFlavorsMade() {
      return length;
    },
  };
};

// Sample usage:
// testFlyweight()

const testFlyweight = () => {
  // The flavors ordered.
  const flavors = [];

  // The tables for the orders.
  const tables = [];

  // Number of orders made
  let ordersMade = 0;

  // The CoffeeFlavorFactory instance
  const flavorFactory = new CoffeeFlavorFactory();

  function takeOrders(flavorIn, table) {
    flavors.push(flavorFactory.getCoffeeFlavor(flavorIn));
    tables.push(new CoffeeOrderContext(table));
    ordersMade++;
  }

  takeOrders('Cappuccino', 2);
  takeOrders('Cappuccino', 2);
  takeOrders('Frappe', 1);
  takeOrders('Frappe', 1);
  takeOrders('Xpresso', 1);
  takeOrders('Frappe', 897);
  takeOrders('Cappuccino', 97);
  takeOrders('Cappuccino', 97);
  takeOrders('Frappe', 3);
  takeOrders('Xpresso', 3);
  takeOrders('Cappuccino', 3);
  takeOrders('Xpresso', 96);
  takeOrders('Frappe', 552);
  takeOrders('Cappuccino', 121);
  takeOrders('Xpresso', 121);

  for (let i = 0; i < ordersMade; ++i) {
    flavors[i].serveCoffee(tables[i]);
  }
  console.log(' ');
  console.log(
    `total CoffeeFlavor objects made: ${flavorFactory.getTotalCoffeeFlavorsMade()}`
  );
};

//*******************************************************//
// Converting code to use the Flyweight pattern
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] We used new keyword const for immutable constant declaration

class Book {
  constructor(
    id,
    title,
    author,
    genre,
    pageCount,
    publisherID,
    ISBN,
    checkoutDate,
    checkoutMember,
    dueReturnDate,
    availability
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.publisherID = publisherID;
    this.ISBN = ISBN;
    this.checkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = dueReturnDate;
    this.availability = availability;
  }

  getTitle() {
    return this.title;
  }

  getAuthor() {
    return this.author;
  }

  getISBN() {
    return this.ISBN;
  }

  // For brevity, other getters are not shown
  updateCheckoutStatus(
    bookID,
    newStatus,
    checkoutDate,
    checkoutMember,
    newReturnDate
  ) {
    this.id = bookID;
    this.availability = newStatus;
    this.checkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = newReturnDate;
  }

  extendCheckoutPeriod(bookID, newReturnDate) {
    this.id = bookID;
    this.dueReturnDate = newReturnDate;
  }

  isPastDue(bookID) {
    const currentDate = new Date();
    return currentDate.getTime() > Date.parse(this.dueReturnDate);
  }
}

//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration

// Flyweight optimized version
const Book = function(title, author, genre, pageCount, publisherID, ISBN) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pageCount = pageCount;
  this.publisherID = publisherID;
  this.ISBN = ISBN;
};

//*******************************************************//
// Converting code to use the Flyweight pattern
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [SE2015+] We used new keyword let, which declares a block scope local variable
// [ES2015+] We used new arrow function syntax

// Book Factory singleton
const existingBooks = {};

class BookFactory {
  constructor(title, author, genre, pageCount, publisherID, ISBN) {

      // Find out if a particular book meta-data combination has been created before
      // !! or (bang bang) forces a boolean to be returned
    this.existingBook = existingBooks[ISBN];
    if (!!this.existingBook) {
      return this.existingBook;
    } else {

      // if not, let's create a new instance of the book and store it
      const book = new Book(title, author, genre, pageCount, publisherID, ISBN);
      existingBooks[ISBN] = book;
      return book;

    }
  }
}


//*******************************************************//
// Managing the extrinsic states
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] We used new keyword const for immutable constant declaration

// BookRecordManager singleton
const bookRecordDatabase = {};

class BookRecordManager {
   // add a new book into the library system
  constructor(id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
    this.book = new BookFactory(title, author, genre, pageCount, publisherID, ISBN);

    bookRecordDatabase[id] = {
      checkoutMember,
      checkoutDate,
      dueReturnDate,
      availability,
      book: this.book,
    };
  }

  updateCheckoutStatus(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {

    const record = bookRecordDatabase[bookID];
    record.availability = newStatus;
    record.checkoutDate = checkoutDate;
    record.checkoutMember = checkoutMember;
    record.dueReturnDate = newReturnDate;
  }

  extendCheckoutPeriod(bookID, newReturnDate) {
    bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
  }

  isPastDue(bookID) {
    const currentDate = new Date();
    return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
  }
}

//*******************************************************//
// The Flyweight pattern and the DOM
//*******************************************************//
//********************** Snippet 1 **********************//

<div id="container">
   <div class="toggle" href="#">More Info (Address)
       <span class="info">
           This is more information
       </span></div>
   <div class="toggle" href="#">Even More Info (Map)
       <span class="info">
          <iframe src="http://www.map-generator.net/extmap.php?name=London&amp;address=london%2C%20england&amp;width=500...gt;"</iframe>
       </span>
   </div>
</div>

//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used the destructuring assignment syntax that makes it possible to unpack values from data structures into distinct variables.

const stateManager = {
  fly() {
    const self = this;

    $('#container')
      .unbind()
      .on('click', 'div.toggle', ({ target }) => {
        self.handleClick(target);
      });
  },

  handleClick(elem) {
    $(elem)
      .find('span')
      .toggle('slow');
  },
};

//********************** Snippet 3 **********************//
// [ES2015+] We used new template literals for string interpolation

$('div').on('click', function() {
  console.log(`You clicked: ${$(this).attr('id')}`);
});

// we should avoid using the DOM element to create a
// jQuery object (with the overhead that comes with it)
// and just use the DOM element itself like this:

$('div').on('click', function() {
  console.log(`You clicked:${this.id}`);
});

//********************** Snippet 4 **********************//
$('a').map(function() {
  return $(this).text();
});

//********************** Snippet 5 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

jQuery.single = (o => {
  const collection = jQuery([1]);
  return element => {
    // Give collection the element:
    collection[0] = element;

    // Return the collection:
    return collection;
  };
})();

//********************** Snippet 6 **********************//
$('div').on('click', function() {
  const html = jQuery
    .single(this)
    .next()
    .html();
  console.log(html);
});

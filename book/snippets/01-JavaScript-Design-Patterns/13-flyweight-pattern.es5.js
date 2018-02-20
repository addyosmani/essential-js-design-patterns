//*******************************************************//
// Implementing Classical Flyweights
//*******************************************************//

//********************** Snippet 1 **********************//
// Simulate pure virtual inheritance/"implement" keyword for JS
Function.prototype.implementsFor = function( parentClassOrObject ){
    if ( parentClassOrObject.constructor === Function )
    {
        // Normal Inheritance
        this.prototype = new parentClassOrObject();
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    }
    else
    {
        // Pure Virtual Inheritance
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
};


//********************** Snippet 2 **********************//

// Flyweight object
var CoffeeOrder = {
 
    // Interfaces
    serveCoffee:function(context){},
      getFlavor:function(){}
   
  };
   
   
  // ConcreteFlyweight object that creates ConcreteFlyweight
  // Implements CoffeeOrder
  function CoffeeFlavor( newFlavor ){
   
      var flavor = newFlavor;
   
      // If an interface has been defined for a feature
      // implement the feature
      if( typeof this.getFlavor === "function" ){
        this.getFlavor = function() {
            return flavor;
        };
      }
   
      if( typeof this.serveCoffee === "function" ){
        this.serveCoffee = function( context ) {
          console.log("Serving Coffee flavor "
            + flavor
            + " to table number "
            + context.getTable());
        };
      }
   
  }
   
   
  // Implement interface for CoffeeOrder
  CoffeeFlavor.implementsFor( CoffeeOrder );
   
   
  // Handle table numbers for a coffee order
  function CoffeeOrderContext( tableNumber ) {
     return{
        getTable: function() {
           return tableNumber;
       }
     };
  }
   
   
  function CoffeeFlavorFactory() {
      var flavors = {},
      length = 0;
   
      return {
          getCoffeeFlavor: function (flavorName) {
   
              var flavor = flavors[flavorName];
              if (typeof flavor === "undefined") {
                  flavor = new CoffeeFlavor(flavorName);
                  flavors[flavorName] = flavor;
                  length++;
              }
              return flavor;
          },
   
          getTotalCoffeeFlavorsMade: function () {
              return length;
          }
      };
  }
   
  // Sample usage:
  // testFlyweight()
   
  function testFlyweight(){
   
   
    // The flavors ordered.
    var flavors = [],
   
    // The tables for the orders.
      tables = [],
   
    // Number of orders made
      ordersMade = 0,
   
    // The CoffeeFlavorFactory instance
      flavorFactory = new CoffeeFlavorFactory();
   
    function takeOrders( flavorIn, table) {
       flavors.push( flavorFactory.getCoffeeFlavor( flavorIn ) );
       tables.push( new CoffeeOrderContext( table ) );
       ordersMade++;
    }
   
     takeOrders("Cappuccino", 2);
     takeOrders("Cappuccino", 2);
     takeOrders("Frappe", 1);
     takeOrders("Frappe", 1);
     takeOrders("Xpresso", 1);
     takeOrders("Frappe", 897);
     takeOrders("Cappuccino", 97);
     takeOrders("Cappuccino", 97);
     takeOrders("Frappe", 3);
     takeOrders("Xpresso", 3);
     takeOrders("Cappuccino", 3);
     takeOrders("Xpresso", 96);
     takeOrders("Frappe", 552);
     takeOrders("Cappuccino", 121);
     takeOrders("Xpresso", 121);
   
     for (var i = 0; i < ordersMade; ++i) {
         flavors[i].serveCoffee(tables[i]);
     }
     console.log(" ");
     console.log("total CoffeeFlavor objects made: " + flavorFactory.getTotalCoffeeFlavorsMade());
  }


//*******************************************************//
// Converting code to use the Flyweight pattern
//*******************************************************//

//********************** Snippet 1 **********************//

var Book = function( id, title, author, genre, pageCount,publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate,availability ){
 
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
  
 };
  
 Book.prototype = {
  
   getTitle: function () {
      return this.title;
   },
  
   getAuthor: function () {
      return this.author;
   },
  
   getISBN: function (){
      return this.ISBN;
   },
  
   // For brevity, other getters are not shown
   updateCheckoutStatus: function( bookID, newStatus, checkoutDate, checkoutMember, newReturnDate ){
  
      this.id = bookID;
      this.availability = newStatus;
      this.checkoutDate = checkoutDate;
      this.checkoutMember = checkoutMember;
      this.dueReturnDate = newReturnDate;
  
   },
  
   extendCheckoutPeriod: function( bookID, newReturnDate ){
  
       this.id = bookID;
       this.dueReturnDate = newReturnDate;
  
   },
  
   isPastDue: function(bookID){
  
      var currentDate = new Date();
      return currentDate.getTime() > Date.parse( this.dueReturnDate );
  
    }
 };


//********************** Snippet 2 **********************//

// Flyweight optimized version
var Book = function ( title, author, genre, pageCount, publisherID, ISBN ) {
 
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
// Book Factory singleton
var BookFactory = (function () {
    var existingBooks = {}, existingBook;
   
    return {
      createBook: function ( title, author, genre, pageCount, publisherID, ISBN ) {
   
        // Find out if a particular book meta-data combination has been created before
        // !! or (bang bang) forces a boolean to be returned
        existingBook = existingBooks[ISBN];
        if ( !!existingBook ) {
          return existingBook;
        } else {
   
          // if not, let's create a new instance of the book and store it
          var book = new Book( title, author, genre, pageCount, publisherID, ISBN );
          existingBooks[ISBN] = book;
          return book;
   
        }
      }
    };
   
  })();

//*******************************************************//
// Managing the extrinsic states
//*******************************************************//

//********************** Snippet 1 **********************//

// BookRecordManager singleton
var BookRecordManager = (function () {
 
    var bookRecordDatabase = {};
   
    return {
      // add a new book into the library system
      addBookRecord: function ( id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability ) {
   
        var book = BookFactory.createBook( title, author, genre, pageCount, publisherID, ISBN );
   
        bookRecordDatabase[id] = {
          checkoutMember: checkoutMember,
          checkoutDate: checkoutDate,
          dueReturnDate: dueReturnDate,
          availability: availability,
          book: book
        };
      },
      updateCheckoutStatus: function ( bookID, newStatus, checkoutDate, checkoutMember, newReturnDate ) {
   
        var record = bookRecordDatabase[bookID];
        record.availability = newStatus;
        record.checkoutDate = checkoutDate;
        record.checkoutMember = checkoutMember;
        record.dueReturnDate = newReturnDate;
      },
   
      extendCheckoutPeriod: function ( bookID, newReturnDate ) {
        bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
      },
   
      isPastDue: function ( bookID ) {
        var currentDate = new Date();
        return currentDate.getTime() > Date.parse( bookRecordDatabase[bookID].dueReturnDate );
      }
    };
   
  })();


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

var stateManager = {
 
    fly: function () {
   
      var self = this;
   
      $( "#container" )
            .unbind()
            .on( "click", "div.toggle", function ( e ) {
              self.handleClick( e.target );
            });
    },
   
    handleClick: function ( elem ) {
      $( elem ).find( "span" ).toggle( "slow" );
    }
  };

//********************** Snippet 3 **********************//


$("div").on( "click", function () {
    console.log( "You clicked: " + $( this ).attr( "id" ));
  });
   
  // we should avoid using the DOM element to create a
  // jQuery object (with the overhead that comes with it)
  // and just use the DOM element itself like this:
   
  $( "div" ).on( "click", function () {
    console.log( "You clicked:"  + this.id );
  });

  
//********************** Snippet 4 **********************//
$( "a" ).map( function () {
    return $( this ).text();
  });
//********************** Snippet 5 **********************//

jQuery.single = (function( o ){
 
    var collection = jQuery([1]);
    return function( element ) {
  
        // Give collection the element:
        collection[0] = element;
  
         // Return the collection:
        return collection;
  
    };
 })();

 //********************** Snippet 6 **********************//
 $( "div" ).on( "click", function () {
 
    var html = jQuery.single( this ).next().html();
    console.log( html );
  
 });

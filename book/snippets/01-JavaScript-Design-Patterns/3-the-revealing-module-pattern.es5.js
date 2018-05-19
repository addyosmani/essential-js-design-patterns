//********************** Snippet 1 **********************//

var myRevealingModule = (function () {
 
  var privateVar = "Ben Cherry",
      publicVar = "Hey there!";

  function privateFunction() {
      console.log( "Name:" + privateVar );
  }

  function publicSetName( strName ) {
      privateVar = strName;
  }

  function publicGetName() {
      privateFunction();
  }


  // Reveal public pointers to
  // private functions and properties

  return {
      setName: publicSetName,
      greeting: publicVar,
      getName: publicGetName
  };

})();

myRevealingModule.setName( "Paul Kinlan" );

//********************** Snippet 2 **********************//

var myRevealingModule = (function () {
 
  var privateCounter = 0;

  function privateFunction() {
      privateCounter++;
  }

  function publicFunction() {
      publicIncrement();
  }

  function publicIncrement() {
      privateFunction();
  }

  function publicGetCount(){
    return privateCounter;
  }

  // Reveal public pointers to
  // private functions and properties

 return {
      start: publicFunction,
      increment: publicIncrement,
      count: publicGetCount
  };

})();

myRevealingModule.start();


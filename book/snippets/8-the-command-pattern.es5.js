//********************** Snippet 1 **********************//

(function(){
 
  var carManager = {
 
    // request information
    requestInfo: function( model, id ){
      return "The information for " + model + " with ID " + id + " is foobar";
    },
 
    // purchase the car
    buyVehicle: function( model, id ){
      return "You have successfully purchased Item " + id + ", a " + model;
    },
 
    // arrange a viewing
    arrangeViewing: function( model, id ){
      return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
    }
 
  };
 
})();

//********************** Snippet 2 **********************//

carManager.execute( "buyVehicle", "Ford Escort", "453543" );

//********************** Snippet 3 **********************//

carManager.execute = function ( name ) {
  return carManager[name] && carManager[name].apply( carManager, [].slice.call(arguments, 1) );
};

//********************** Snippet 4 **********************//

carManager.execute( "arrangeViewing", "Ferrari", "14523" );
carManager.execute( "requestInfo", "Ford Mondeo", "54323" );
carManager.execute( "requestInfo", "Ford Escort", "34232" );
carManager.execute( "buyVehicle", "Ford Escort", "34232" );
//********************** Snippet 1 **********************//
// [ES2015+] We used new template literals for string interpolation
// [ES2015+] We used new arrow function syntax

$.each(['john', 'dave', 'rick', 'julian'], (index, value) => {
    console.log(`${index}: ${value}`);
});

$('li').each(function(index) {
    console.log(`${index}: ${$(this).text()}`);
});

//********************** Snippet 2 **********************//
// Execute a callback for every element in the matched set.
each: function( callback, args ) {
  return jQuery.each( this, callback, args );
}

//********************** Snippet 3 **********************//
each: function( object, callback, args ) {
  var name, i = 0,
    length = object.length,
    isObj = length === undefined || jQuery.isFunction( object );

  if ( args ) {
    if ( isObj ) {
      for ( name in object ) {
        if ( callback.apply( object[ name ], args ) === false ) {
          break;
        }
      }
    } else {
      for ( ; i < length; ) {
        if ( callback.apply( object[ i++ ], args ) === false ) {
          break;
        }
      }
    }

  // A special, fast, case for the most common use of each
  } else {
    if ( isObj ) {
      for ( name in object ) {
        if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
          break;
        }
      }
    } else {
      for ( ; i < length; ) {
        if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
          break;
        }
      }
    }
  }

  return object;
};

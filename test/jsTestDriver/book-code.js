var myModule = {

    myProperty: "someValue",

    // object literals can contain properties and methods.
    // e.g we can define a further object for module configuration:
    myConfig: {
        useCaching: true,
        language: "en"
    },

    // a very basic method
    saySomething: function () {
        return ( "Where in the world is Paul Irish today?" );
    },

    // output a value based on the current configuration
    reportMyConfig: function () {
        return ( "Caching is: " + ( this.myConfig.useCaching ? "enabled" : "disabled") );
    },

    // override the current configuration
    updateMyConfig: function( newConfig ) {

        if ( typeof newConfig === "object" ) {
            this.myConfig = newConfig;
            return ( this.myConfig.language );
        }
    }
};


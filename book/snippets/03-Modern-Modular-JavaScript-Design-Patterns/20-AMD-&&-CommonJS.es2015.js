//*******************************************************//
// UMD: AMD And CommonJS-Compatible Modules For Plugins
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

//********************** Snippet 1 **********************//
define((require, exports, module) => {
    const shuffler = require('lib/shuffle');
  
    // [ES2015+] Equivalent to: => { return shuffler.shuffle(input); }
    exports.randomize = input => shuffler.shuffle(input);
  });
  
  //********************** Snippet 2 **********************//
  ((root, factory) => {
    if (typeof exports === 'object') {
      // CommonJS
      factory(exports, require('b'));
    } else if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['exports', 'b'], factory);
    } else {
      // Browser globals
      factory((root.commonJsStrict = {}), root.b);
    }
  })(this, (exports, b) => {
    //use b in some fashion.
  
    // attach properties to the exports object to define
    // the exported module properties.
    exports.action = () => {};
  });
  

//********************** Snippet 3 **********************//
<script type="text/javascript" src="jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="pluginCore.js"></script>
<script type="text/javascript" src="pluginExtension.js"></script>
 
<script type="text/javascript">
 
$(() => {
  // Our plugin "core" is exposed under a core namespace in
  // this example, which we first cache
  const core = $.core;

  // Then use use some of the built-in core functionality to
  // highlight all divs in the page yellow
  core.highlightAll();

  // Access the plugins (extensions) loaded into the "plugin"
  // namespace of our core module:

  // Set the first div in the page to have a green background.
  core.plugin.setGreen('div:first');
  // Here we're making use of the core's "highlight" method
  // under the hood from a plugin loaded in after it

  // Set the last div to the "errorColor" property defined in
  // our core module/plugin. If we review the code further down,
  // we can see how easy it is to consume properties and methods
  // between the core and other plugins
  core.plugin.setRed('div:last');
});

 
</script>

//********************** Snippet 4 **********************//
// Module/Plugin core
// Note: the wrapper code we see around the module is what enables
// us to support multiple module formats and specifications by
// mapping the arguments defined to what a specific format expects
// to be present. Our actual module functionality is defined lower
// down, where a named module and exports are demonstrated.
//
// Note that dependencies can just as easily be declared if required
// and should work as demonstrated earlier with the AMD module examples.
(function(name, definition) {
    const theModule = definition();
    // this is considered "safe":
    const hasDefine = typeof define === 'function' && define.amd;
    // hasDefine = typeof define === "function",
    const hasExports = typeof module !== 'undefined' && module.exports;
  
    if (hasDefine) {
      // AMD Module
      define(theModule);
    } else if (hasExports) {
      // Node.js Module
      module.exports = theModule;
    } else {
      // Assign to common namespaces or simply the global object (window)
      (this.jQuery || this.ender || this.$ || this)[name] = theModule;
    }
  })('core', function() {
    const module = this;
    module.plugins = [];
    module.highlightColor = 'yellow';
    module.errorColor = 'red';
  
    // define the core module here and return the public API
  
    // This is the highlight method used by the core highlightAll()
    // method and all of the plugins highlighting elements different
    // colors
    module.highlight = function(el, strColor) {
      if (this.jQuery) {
        jQuery(el).css('background', strColor);
      }
    };
    return {
      highlightAll() {
        module.highlight('div', module.highlightColor);
      },
    };
  });
  
  //********************** Snippet 5 **********************//
  // Extension to module core
  
  (function(name, definition) {
    const theModule = definition();
    const hasDefine = typeof define === 'function';
    const hasExports = typeof module !== 'undefined' && module.exports;
  
    if (hasDefine) {
      // AMD Module
      define(theModule);
    } else if (hasExports) {
      // Node.js Module
      module.exports = theModule;
    } else {
      // Assign to common namespaces or simply the global object (window)
      // account for for flat-file/global module extensions
      let obj = null;
      let namespaces;
      let scope;
  
      obj = null;
      namespaces = name.split('.');
      scope = this.jQuery || this.ender || this.$ || this;
  
      for (let i = 0; i < namespaces.length; i++) {
        const packageName = namespaces[i];
        if (obj && i == namespaces.length - 1) {
          obj[packageName] = theModule;
        } else if (typeof scope[packageName] === 'undefined') {
          scope[packageName] = {};
        }
        obj = scope[packageName];
      }
    }
  })('core.plugin', () =>
    // Define our module here and return the public API.
    // This code could be easily adapted with the core to
    // allow for methods that overwrite and extend core functionality
    // in order to expand the highlight method to do more if we wish.
    ({
      setGreen(el) {
        highlight(el, 'green');
      },
  
      setRed(el) {
        highlight(el, errorColor);
      },
    })
  );
  
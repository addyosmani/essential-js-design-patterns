//*******************************************************//
// Patterns
//*******************************************************//
// [ES2015+] We used new arrow function syntax

//********************** Snippet 1 **********************//
$.fn.myPluginName = () => {
    // our plugin logic
  };
  
  //********************** Snippet 2 **********************//
  ($ => {
    fn.myPluginName = () => {
      // our plugin logic
    };
  })(jQuery);
  
  //********************** Snippet 3 **********************//
  ($ => {
    $.extend($.fn, {
      myplugin() {
        // your plugin logic
      },
    });
  })(jQuery);
  

//*******************************************************//
// 'A Lightweight Start' Pattern
//*******************************************************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance

//********************** Snippet 1 **********************//
/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(($, window, document, undefined) => {
    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.
  
    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in our plugin).
  
    // Create the defaults once
    const pluginName = 'defaultPluginName';
  
    const defaults = {
      propertyName: 'value',
    };
  
    // The actual plugin constructor
    class Plugin {
      constructor(element, options) {
        this.element = element;
  
        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend({}, defaults, options);
  
        this._defaults = defaults;
        this._name = pluginName;
  
        this.init();
      }
  
      init() {
        // Place initialization logic here
        // We already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options
      }
    }
  
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, `plugin_${pluginName}`)) {
          $.data(this, `plugin_${pluginName}`, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window, document);
  
//********************** Snippet 2 **********************//
$('#elem').defaultPluginName({
  propertyName: 'a custom value',
});
  

//*******************************************************//
// “Complete” Widget Factory Pattern
//*******************************************************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new object method declaration

//********************** Snippet 1 **********************//
/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */

;(($, window, document, undefined) => {
    // define our widget under a namespace of your choice
    // with additional parameters e.g.
    // $.widget( "namespace.widgetname", (optional) - an
    // existing widget prototype to inherit from, an object
    // literal to become the widget's prototype );
  
    $.widget('namespace.widgetname', {
      //Options to be used as defaults
      options: {
        someValue: null,
      },
  
      //Setup widget (e.g. element creation, apply theming
      //, bind events etc.)
      _create() {
        // _create will automatically run the first time
        // this widget is called. Put the initial widget
        // setup code here, then we can access the element
        // on which the widget was called via this.element.
        // The options defined above can be accessed
        // via this.options this.element.addStuff();
      },
  
      // Destroy an instantiated plugin and clean up
      // modifications the widget has made to the DOM
      destroy() {
        // this.element.removeStuff();
        // For UI 1.8, destroy must be invoked from the
        // base widget
        $.Widget.prototype.destroy.call(this);
        // For UI 1.9, define _destroy instead and don't
        // worry about
        // calling the base widget
      },
  
      methodB(event) {
        //_trigger dispatches callbacks the plugin user
        // can subscribe to
        // signature: _trigger( "callbackName", [eventObject],
        // [uiObject] )
        // e.g. this._trigger( "hover", e /*where e.type ==
        // "mouseenter"*/, { hovered: $(e.target)});
        this._trigger('methodA', event, {
          key: value,
        });
      },
  
      methodA(event) {
        this._trigger('dataChanged', event, {
          key: value,
        });
      },
  
      // Respond to any changes the user makes to the
      // option method
      _setOption(key, value) {
        switch (key) {
          case 'someValue':
            // this.options.someValue = doSomethingWith( value );
            break;
          default:
            // this.options[ key ] = value;
            break;
        }
  
        // For UI 1.8, _setOption must be manually invoked
        // from the base widget
        $.Widget.prototype._setOption.apply(this, arguments);
        // For UI 1.9 the _super method can be used instead
        // this._super( "_setOption", key, value );
      },
    });
  })(jQuery, window, document);
  
//********************** Snippet 2 **********************//
const collection = $('#elem').widgetName({
  foo: false,
});
  
collection.widgetName('methodB');

//*******************************************************//
// Nested Namespacing Plugin Pattern
//*******************************************************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new keyword const for immutable constant declaration

//********************** Snippet 1 **********************//
/*!
 * jQuery namespaced "Starter" plugin boilerplate
 * Author: @dougneiner
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */

;($ => {
    if (!$.myNamespace) {
      $.myNamespace = {};
    }
  
    $.myNamespace.myPluginName = function(el, myFunctionParam, options) {
      // To avoid scope issues, use "base" instead of "this"
      // to reference this class from internal events and functions.
      const base = this;
  
      // Access to jQuery and DOM versions of element
      base.$el = $(el);
      base.el = el;
  
      // Add a reverse reference to the DOM object
      base.$el.data('myNamespace.myPluginName', base);
  
      base.init = () => {
        base.myFunctionParam = myFunctionParam;
  
        base.options = $.extend(
          {},
          $.myNamespace.myPluginName.defaultOptions,
          options
        );
  
        // Put our initialization code here
      };
  
      // Sample Function, Uncomment to use
      // base.functionName = function( parameters ){
      //
      // };
      // Run initializer
      base.init();
    };
  
    $.myNamespace.myPluginName.defaultOptions = {
      myDefaultValue: '',
    };
  
    $.fn.mynamespace_myPluginName = function(myFunctionParam, options) {
      return this.each(function() {
        new $.myNamespace.myPluginName(this, myFunctionParam, options);
      });
    };
  })(jQuery);
  
//********************** Snippet 2 **********************//
$('#elem').mynamespace_myPluginName({
  myDefaultValue: 'foobar',
});
  

//*******************************************************//
// Custom Events Plugin Pattern (With The Widget factory)
//*******************************************************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new object method declaration

//********************** Snippet 1 **********************//
/*!
 * jQuery custom-events plugin boilerplate
 * Author: DevPatch
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */

// In this pattern, we use jQuery's custom events to add
// pub/sub (publish/subscribe) capabilities to widgets.
// Each widget would publish certain events and subscribe
// to others. This approach effectively helps to decouple
// the widgets and enables them to function independently.

;(($, window, document, undefined) => {
    $.widget('ao.eventStatus', {
      options: {},
  
      _create() {
        const self = this;
  
        //self.element.addClass( "my-widget" );
  
        //subscribe to "myEventStart"
        self.element.on('myEventStart', e => {
          console.log('event start');
        });
  
        //subscribe to "myEventEnd"
        self.element.on('myEventEnd', e => {
          console.log('event end');
        });
  
        //unsubscribe to "myEventStart"
        //self.element.off( "myEventStart", function(e){
        ///console.log( "unsubscribed to this event" );
        //});
      },
  
      // [ES2015+] The rest parameter syntax allows us to represent an indefinite number of arguments as an array.
      destroy(...args) {
        $.Widget.prototype.destroy.apply(this, args);
      },
    });
  })(jQuery, window, document);
  
  // Publishing event notifications
  // $( ".my-widget" ).trigger( "myEventStart");
  // $( ".my-widget" ).trigger( "myEventEnd" );
  
//********************** Snippet 2 **********************//
const el = $('#elem');
el.eventStatus();
el.eventStatus().trigger('myEventStart');


//*******************************************************//
// Prototypal Inheritance With The DOM-To-Object Bridge Pattern
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new object method declaration

//********************** Snippet 1 **********************//
/*!
 * jQuery prototypal inheritance plugin boilerplate
 * Author: Alex Sexton, Scott Gonzalez
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */

// myObject - an object representing a concept we wish to model
// (e.g. a car)
const myObject = {
    init(options, elem) {
      // Mix in the passed-in options with the default options
      this.options = $.extend({}, this.options, options);
  
      // Save the element reference, both as a jQuery
      // reference and a normal reference
      this.elem = elem;
      this.$elem = $(elem);
  
      // Build the DOM's initial structure
      this._build();
  
      // return this so that we can chain and use the bridge with less code.
      return this;
    },
    options: {
      name: 'No name',
    },
    _build() {
      //this.$elem.html( "<h1>"+this.options.name+"</h1>" );
    },
    myMethod(msg) {
      // We have direct access to the associated and cached
      // jQuery element
      // this.$elem.append( "<p>"+msg+"</p>" );
    },
  };
  
  // Object.create support test, and fallback for browsers without it
  if (typeof Object.create !== 'function') {
    // [ES2015+] Parentheses are optional when there is only one parameter
    Object.create = o => {
      function F() {}
      F.prototype = o;
      return new F();
    };
  }
  
  // Create a plugin based on a defined object
  $.plugin = (name, object) => {
    $.fn[name] = function(options) {
      return this.each(function() {
        if (!$.data(this, name)) {
          $.data(this, name, Object.create(object).init(options, this));
        }
      });
    };
  };
  
//********************** Snippet 2 **********************//
$.plugin('myobj', myObject);

$('#elem').myobj({ name: 'John' });

const collection = $('#elem').data('myobj');
collection.myMethod('I am a method');
  


//*******************************************************//
// jQuery UI Widget Factory Bridge Pattern
//*******************************************************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance

//********************** Snippet 1 **********************//
/*!
 * jQuery UI Widget factory "bridge" plugin boilerplate
 * Author: @erichynds
 * Further changes, additional comments: @addyosmani
 * Licensed under the MIT license
 */

// a "WidgetName" object constructor
// required: this must accept two arguments,
// options: an object of configuration options
// element: the DOM element the instance was created on
class WidgetName {
    constructor(options, element) {
      this.name = 'myWidgetName';
      this.options = options;
      this.element = element;
      this._init();
    }
  
    // the "WidgetName" prototype
    // _create will automatically run the first time this
    // widget is called
    _create() {
      // creation code
    }
  
    // required: initialization logic for the plugin goes into _init
    // This fires when our instance is first created and when
    // attempting to initialize the widget again (by the bridge)
    // after it has already been initialized.
    _init() {
      // init code
    }
  
    // required: objects to be used with the bridge must contain an
    // "option". Post-initialization, the logic for changing options
    // goes here.
    option(key, value) {
      // optional: get/change options post initialization
      // ignore if you don't require them.
  
      // signature: $("#foo").bar({ cool:false });
      if ($.isPlainObject(key)) {
        this.options = $.extend(true, this.options, key);
  
        // signature: $( "#foo" ).option( "cool" ); - getter
      } else if (key && typeof value === 'undefined') {
        return this.options[key];
  
        // signature: $( "#foo" ).bar("option", "baz", false );
      } else {
        this.options[key] = value;
      }
  
      // required: option must return the current instance.
      // When re-initializing an instance on elements, option
      // is called first and is then chained to the _init method.
      return this;
    }
  
    // notice no underscore is used for public methods
    publicFunction() {
      console.log('public function');
    }
  
    // underscores are used for private methods
    _privateFunction() {
      console.log('private function');
    }
  }
  
  //********************** Snippet 2 **********************//
  // [ES2015+] We used new keyword const for immutable constant declaration
  // connect the widget obj to jQuery's API under the "foo" namespace
  $.widget.bridge('foo', WidgetName);
  
  // create an instance of the widget for use
  const instance = $('#foo').foo({
    baz: true,
  });
  
  // our widget instance exists in the elem's data
  // Outputs: #elem
  console.log(instance.data('foo').element);
  
  // bridge allows us to call public methods
  // Outputs: "public method"
  instance.foo('publicFunction');
  
  // bridge prevents calls to internal methods
  instance.foo('_privateFunction');
  

//*******************************************************//
// jQuery Mobile Widgets With The Widget factory
//*******************************************************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new object method declaration

//********************** Snippet 1 **********************//
/*!
 * (jQuery mobile) jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @scottjehl
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */

;(($, window, document, undefined) => {
    // define a widget under a namespace of our choice
    // here "mobile" has been used in the first argument
    $.widget('mobile.widgetName', $.mobile.widget, {
      // Options to be used as defaults
      options: {
        foo: true,
        bar: false,
      },
  
      _create() {
        // _create will automatically run the first time this
        // widget is called. Put the initial widget set-up code
        // here, then we can access the element on which
        // the widget was called via this.element
        // The options defined above can be accessed via
        // this.options
        // var m = this.element,
        // p = m.parents( ":jqmData(role="page")" ),
        // c = p.find( ":jqmData(role="content")" )
      },
  
      // Private methods/props start with underscores
      _dosomething() { ... },
  
      // Public methods like these below can can be called
      // externally:
      // $("#myelem").foo( "enable", arguments );
  
      enable() { ... },
  
      // Destroy an instantiated plugin and clean up modifications
      // the widget has made to the DOM
      destroy() {
        // this.element.removeStuff();
        // For UI 1.8, destroy must be invoked from the
        // base widget
        $.Widget.prototype.destroy.call(this);
        // For UI 1.9, define _destroy instead and don't
        // worry about calling the base widget
      },
  
      methodB(event) {
        //_trigger dispatches callbacks the plugin user can
        // subscribe to
        // signature: _trigger( "callbackName", [eventObject],
        // [uiObject] )
        // e.g. this._trigger( "hover", e /*where e.type ==
        // "mouseenter"*/, { hovered: $(e.target)});
        this._trigger('methodA', event, {
          key: value,
        });
      },
  
      methodA(event) {
        this._trigger('dataChanged', event, {
          key: value,
        });
      },
  
      // Respond to any changes the user makes to the option method
      _setOption(key, value) {
        switch (key) {
          case 'someValue':
            // this.options.someValue = doSomethingWith( value );
            break;
          default:
            // this.options[ key ] = value;
            break;
        }
  
        // For UI 1.8, _setOption must be manually invoked from
        // the base widget
        $.Widget.prototype._setOption.apply(this, arguments);
        // For UI 1.9 the _super method can be used instead
        // this._super( "_setOption", key, value );
      },
    });
  })(jQuery, window, document);
  
  //********************** Snippet 2 **********************//
  // [ES2015+] We used new keyword const for immutable constant declaration

  const instance = $('#foo').widgetName({
    foo: false,
  });
  
  instance.widgetName('methodB');

//********************** Snippet 3 **********************//
// [ES2015+] We used the destructuring assignment syntax that makes it possible to unpack values from data structures into distinct variables.

$(document).on('pagecreate', ({ target }) => {
    // In here, e.target refers to the page that was created
    // (it's the target of the pagecreate event)
    // So, we can simply find elements on this page that match a
    // selector of our choosing, and call our plugin on them.
    // Here's how we'd call our "foo" plugin on any element with a
    // data-role attribute of "foo":
    $(target).find('[data-role="foo"]').foo(options);
  
    // Or, better yet, let's write the selector accounting for the configurable
    // data-attribute namespace
    $(target).find(':jqmData(role="foo")').foo(options);
  });
  

//*******************************************************//
// RequireJS And The jQuery UI Widget Factory
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new object method declaration

/*!
 * jQuery UI Widget + RequireJS module boilerplate (for 1.8/9+)
 * Authors: @jrburke, @addyosmani
 * Licensed under the MIT license
 */

// Note from James:
//
// This assumes we are using the RequireJS+jQuery file, and
// that the following files are all in the same directory:
//
// - require-jquery.js
// - jquery-ui.custom.min.js (custom jQuery UI build with widget factory)
// - templates/
// - asset.html
// - ao.myWidget.js

// Then we can construct the widget as follows:

// ao.myWidget.js file:
define(
    'ao.myWidget',
    ['jquery', 'text!templates/asset.html', 'underscore', 'jquery-ui.custom.min'],
    ($, assetHtml, _) => {
      // define our widget under a namespace of our choice
      // "ao" is used here as a demonstration
      $.widget('ao.myWidget', {
        // Options to be used as defaults
        options: {},
  
        // Set up widget (e.g. create element, apply theming,
        // bind events, etc.)
        _create() {
          // _create will automatically run the first time
          // this widget is called. Put the initial widget
          // set-up code here, then we can access the element
          // on which the widget was called via this.element.
          // The options defined above can be accessed via
          // this.options
          // this.element.addStuff();
          // this.element.addStuff();
          // We can then use Underscore templating with
          // with the assetHtml that has been pulled in
          // var template = _.template( assetHtml );
          // this.content.append( template({}) );
        },
  
        // Destroy an instantiated plugin and clean up modifications
        // that the widget has made to the DOM
        destroy() {
          // this.element.removeStuff();
          // For UI 1.8, destroy must be invoked from the base
          // widget
          $.Widget.prototype.destroy.call(this);
          // For UI 1.9, define _destroy instead and don't worry
          // about calling the base widget
        },
  
        methodB(event) {
          // _trigger dispatches callbacks the plugin user can
          // subscribe to
          // signature: _trigger( "callbackName", [eventObject],
          // [uiObject] )
          this._trigger('methodA', event, {
            key: value,
          });
        },
  
        methodA(event) {
          this._trigger('dataChanged', event, {
            key: value,
          });
        },
  
        // Respond to any changes the user makes to the option method
        _setOption(key, value) {
          switch (key) {
            case 'someValue':
              // this.options.someValue = doSomethingWith( value );
              break;
            default:
              // this.options[ key ] = value;
              break;
          }
  
          // For UI 1.8, _setOption must be manually invoked from
          // the base widget
          $.Widget.prototype._setOption.apply(this, arguments);
          // For UI 1.9 the _super method can be used instead
          // this._super( "_setOption", key, value );
        },
      });
    }
  );
  

//********************** Snippet 2 **********************//
<script data-main="scripts/main" src="http://requirejs.org/docs/release/1.0.1/minified/require.js"></script>

//********************** Snippet 3 **********************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new keyword const for immutable constant declaration

require({
    paths: {
      jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
      jqueryui: 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min',
      boilerplate: '../patterns/jquery.widget-factory.requirejs.boilerplate',
    },
  }, ['require', 'jquery', 'jqueryui', 'boilerplate'], (req, $) => {
    $(() => {
      const instance = $('#elem').myWidget();
      instance.myWidget('methodB');
    });
  });
  

//*******************************************************//
// Globally And Per-Call Overridable Options (Best Options Pattern)
//*******************************************************//
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new object method declaration

//********************** Snippet 1 **********************//
/*!
 * jQuery "best options" plugin boilerplate
 * Author: @cowboy
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */

;(($, window, document, undefined) => {
    $.fn.pluginName = function(options) {
      // Here's a best practice for overriding "defaults"
      // with specified options. Note how, rather than a
      // regular defaults object being passed as the second
      // parameter, we instead refer to $.fn.pluginName.options
      // explicitly, merging it with the options passed directly
      // to the plugin. This allows us to override options both
      // globally and on a per-call level.
  
      options = $.extend({}, $.fn.pluginName.options, options);
  
      return this.each(function() {
        const elem = $(this);
      });
    };
  
    // Globally overriding options
    // Here are our publicly accessible default plugin options
    // that are available in case the user doesn't pass in all
    // of the values expected. The user is given a default
    // experience but can also override the values as necessary.
    // e.g. $fn.pluginName.key ="otherval";
  
    $.fn.pluginName.options = {
      key: 'value',
      myMethod(elem, param) {},
    };
  })(jQuery, window, document);
  
  //********************** Snippet 2 **********************//
  $('#elem').pluginName({
    key: 'foobar',
  });


//*******************************************************//
// A Highly Configurable And Mutable Plugin Pattern
//*******************************************************//

//********************** Snippet 1 **********************//
$('.item-a').draggable({ defaultPosition: 'top-left' });
$('.item-b').draggable({ defaultPosition: 'bottom-right' });
$('.item-c').draggable({ defaultPosition: 'bottom-left' });
//etc

//********************** Snippet 2 **********************//
$('.items').draggable();


//********************** Snippet 3 **********************//
html
<li class="item" data-plugin-options="{"defaultPosition":"top-left"}"></div>
<li class="item" data-plugin-options="{"defaultPosition":"bottom-left"}"></div>

//********************** Snippet 4 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new object method declaration

/*
 * "Highly configurable" mutable plugin boilerplate
 * Author: @markdalgleish
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// Note that with this pattern, as per Alex Sexton's, the plugin logic
// hasn't been nested in a jQuery plugin. Instead, we just use
// jQuery for its instantiation.

;(($, window, document, undefined) => {
    // our plugin constructor
    const Plugin = function(elem, options) {
      this.elem = elem;
      this.$elem = $(elem);
      this.options = options;
  
      // This next line takes advantage of HTML5 data attributes
      // to support customization of the plugin on a per-element
      // basis. For example,
      // <div class="item" data-plugin-options="{'message':'Goodbye World!'}"></div>
      this.metadata = this.$elem.data('plugin-options');
    };
  
    // the plugin prototype
    Plugin.prototype = {
      defaults: {
        message: 'Hello world!',
      },
  
      init() {
        // Introduce defaults that can be extended either
        // globally or using an object literal.
        this.config = $.extend({}, this.defaults, this.options, this.metadata);
  
        // Sample usage:
        // Set the message per instance:
        // $( "#elem" ).plugin( { message: "Goodbye World!"} );
        // or
        // var p = new Plugin( document.getElementById( "elem" ),
        // { message: "Goodbye World!"}).init()
        // or, set the global default message:
        // Plugin.defaults.message = "Goodbye World!"
  
        this.sampleMethod();
        return this;
      },
  
      sampleMethod() {
        // e.g. show the currently configured message
        // console.log(this.config.message);
      },
    };
  
    Plugin.defaults = Plugin.prototype.defaults;
  
    $.fn.plugin = function(options) {
      return this.each(function() {
        new Plugin(this, options).init();
      });
    };
  
    // optional: window.Plugin = Plugin;
  })(jQuery, window, document);
  
  //********************** Snippet 5 **********************//
  $('#elem').plugin({
    message: 'foobar',
  });
  

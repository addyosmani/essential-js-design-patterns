//********************** Snippet 1 **********************//
// [ES2015+] We used new template literals for string interpolation
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new arrow function syntax

const addMyEvent = (el, ev, fn) => {
    if (el.addEventListener) {
      el.addEventListener(ev, fn, false);
    } else if (el.attachEvent) {
      el.attachEvent(`on${ev}`, fn);
    } else {
      el[`on${ev}`] = fn;
    }
  };
  
//********************** Snippet 2 **********************//

bindReady() {
  ...
  if (document.addEventListener) {
    // Use the handy event callback
    document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);

    // A fallback to window.onload, that will always work
    window.addEventListener('load', jQuery.ready, false);

  // If IE event model is used
  } else if (document.attachEvent) {

    document.attachEvent('onreadystatechange', DOMContentLoaded);

    // A fallback to window.onload, that will always work
    window.attachEvent('onload', jQuery.ready);
             ...


//********************** Snippet 3 **********************//
// [ES2015+] We have new pattern implementation with new keywords import and export

const _private = {
    i: 5,
    get() {
      console.log(`current value:${this.i}`);
    },
    set(val) {
      this.i = val;
    },
    run() {
      console.log('running');
    },
    jump() {
      console.log('jumping');
    },
  };
  
  // [ES2015+] We used the destructuring assignment syntax that makes it possible to unpack values from data structures into distinct variables.
  const module = {
    facade({ val, run }) {
      _private.set(val);
      _private.get();
      if (run) {
        _private.run();
      }
    },
  };
  // [ES2015+] Default export module, without name
  export default module;
  
  // [ES2015+] The import statement is used to import bindings which are exported by another module.
  import module from './module';
  // Outputs: "current value: 10" and "running"
  module.facade({
    run: true,
    val: 10,
  });

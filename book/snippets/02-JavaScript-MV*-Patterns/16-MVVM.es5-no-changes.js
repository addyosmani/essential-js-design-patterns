//*******************************************************//
// Model
//*******************************************************//

//********************** Snippet 1 **********************//
var Todo = function ( content, done ) {
  this.content = ko.observable(content);
  this.done = ko.observable(done);
  this.editing = ko.observable(false);
};

//*******************************************************//
// View
//*******************************************************//

//********************** Snippet 1 **********************//
var aViewModel = {
  contactName: ko.observable("John")
};
ko.applyBindings(aViewModel);

//********************** Snippet 2 **********************//
<p><input id="source" data-bind="value: contactName, valueUpdate: 'keyup'" /></p>
<div data-bind="visible: contactName().length > 10">
    You have a really long name!
</div>
<p>Contact name: <strong data-bind="text: contactName"></strong></p>

//********************** Snippet 3 **********************//
<div id="todoapp">
    <header>
        <h1>Todos</h1>
        <input id="new-todo" type="text" data-bind="value: current, valueUpdate: 'afterkeydown', enterKey: add"
               placeholder="What needs to be done?"/>
    </header>
    <section id="main" data-bind="block: todos().length">
 
        <input id="toggle-all" type="checkbox" data-bind="checked: allCompleted">
        <label for="toggle-all">Mark all as complete</label>
 
        <ul id="todo-list" data-bind="foreach: todos">
 
           <!-- item -->
            <li data-bind="css: { done: done, editing: editing }">
                <div class="view" data-bind="event: { dblclick: $root.editItem }">
                    <input class="toggle" type="checkbox" data-bind="checked: done">
                    <label data-bind="text: content"></label>
                    <a class="destroy" href="#" data-bind="click: $root.remove"></a>
                </div>
                <input class="edit" type="text"
                       data-bind="value: content, valueUpdate: 'afterkeydown', enterKey: $root.stopEditing, selectAndFocus: editing, event: { blur: $root.stopEditing }"/>
            </li>
 
        </ul>
 
    </section>
</div>



//*******************************************************//
// ViewModel
//*******************************************************//

//********************** Snippet 1 **********************//
// our main ViewModel
  var ViewModel = function ( todos ) {
      var self = this;

  // map array of passed in todos to an observableArray of Todo objects
  self.todos = ko.observableArray(
  ko.utils.arrayMap( todos, function ( todo ) {
      return new Todo( todo.content, todo.done );
  }));

  // store the new todo value being entered
  self.current = ko.observable();

  // add a new todo, when enter key is pressed
  self.add = function ( data, event ) {
      var newTodo, current = self.current().trim();
      if ( current ) {
          newTodo = new Todo( current );
          self.todos.push( newTodo );
          self.current("");
      }
  };

  // remove a single todo
  self.remove = function ( todo ) {
      self.todos.remove( todo );
  };

  // remove all completed todos
  self.removeCompleted = function () {
      self.todos.remove(function (todo) {
          return todo.done();
      });
  };

  // writeable computed observable to handle marking all complete/incomplete
  self.allCompleted = ko.computed({

      // always return true/false based on the done flag of all todos
      read:function () {
          return !self.remainingCount();
      },

      // set all todos to the written value (true/false)
      write:function ( newValue ) {
          ko.utils.arrayForEach( self.todos(), function ( todo ) {
              //set even if value is the same, as subscribers are not notified in that case
              todo.done( newValue );
          });
      }
  });

  // edit an item
  self.editItem = function( item ) {
      item.editing( true );
  };
..

//********************** Snippet 2 **********************//
// Define an initially an empty array
var myObservableArray = ko.observableArray();
 
// Add a value to the array and notify our observers
myObservableArray.push( 'A new todo item' );

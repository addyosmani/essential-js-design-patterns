//********************** Snippet 1 **********************//
<input id="new-todo" type="text" data-bind="value: current, valueUpdate: 'afterkeydown', enterKey: add" placeholder="What needs to be done?"/>

//********************** Snippet 2 **********************//
var ourBindingProvider = {
  nodeHasBindings: function( node ) {
      // returns true/false
  },
 
  getBindings: function( node, bindingContext ) {
      // returns a binding object
  }
};

//********************** Snippet 3 **********************//
// does an element have any bindings?
function nodeHasBindings( node ) {
  return node.getAttribute ? node.getAttribute("data-class") : false;
};

//********************** Snippet 4 **********************//
var viewModel = new ViewModel( todos || [] ),
    bindings = {
 
        newTodo: {
            value: viewModel.current,
            valueUpdate: "afterkeydown",
            enterKey: viewModel.add
        },
 
        taskTooltip: {
            visible: viewModel.showTooltip
        },
        checkAllContainer: {
            visible: viewModel.todos().length
        },
        checkAll: {
            checked: viewModel.allCompleted
        },
 
        todos: {
            foreach: viewModel.todos
        },
        todoListItem: function() {
            return {
                css: {
                    editing: this.editing
                }
            };
        },
        todoListItemWrapper: function() {
            return {
                css: {
                    done: this.done
                }
            };
        },
        todoCheckBox: function() {
            return {
                checked: this.done
            };
        },
        todoContent: function() {
            return {
                text: this.content,
                event: {
                    dblclick: this.edit
                }
            };
        },
        todoDestroy: function() {
            return {
                click: viewModel.remove
            };
        },
 
        todoEdit: function() {
            return {
                value: this.content,
                valueUpdate: "afterkeydown",
                enterKey: this.stopEditing,
                event: {
                    blur: this.stopEditing
                }
            };
        },
 
        todoCount: {
            visible: viewModel.remainingCount
        },
        remainingCount: {
            text: viewModel.remainingCount
        },
        remainingCountWord: function() {
            return {
                text: viewModel.getLabel(viewModel.remainingCount)
            };
        },
        todoClear: {
            visible: viewModel.completedCount
        },
        todoClearAll: {
            click: viewModel.removeCompleted
        },
        completedCount: {
            text: viewModel.completedCount
        },
        completedCountWord: function() {
            return {
                text: viewModel.getLabel(viewModel.completedCount)
            };
        },
        todoInstructions: {
            visible: viewModel.todos().length
        }
    };
 
    ....

//********************** Snippet 5 **********************//
    // We can now create a bindingProvider that uses
    // something different than data-bind attributes
    ko.customBindingProvider = function( bindingObject ) {
      this.bindingObject = bindingObject;

      // determine if an element has any bindings
      this.nodeHasBindings = function( node ) {
          return node.getAttribute ? node.getAttribute( "data-class" ) : false;
      };
    };

  // return the bindings given a node and the bindingContext
  this.getBindings = function( node, bindingContext ) {

      var result = {},
          classes = node.getAttribute( "data-class" );

      if ( classes ) {
          classes = classes.split( "" );

          //evaluate each class, build a single object to return
          for ( var i = 0, j = classes.length; i < j; i++ ) {

             var bindingAccessor = this.bindingObject[classes[i]];
             if ( bindingAccessor ) {
                 var binding = typeof bindingAccessor === "function" ? bindingAccessor.call(bindingContext.$data) : bindingAccessor;
                 ko.utils.extend(result, binding);
             }

          }
      }

      return result;
  };
};


//********************** Snippet 6 **********************//
// set ko's current bindingProvider equal to our new binding provider
ko.bindingProvider.instance = new ko.customBindingProvider( bindings );
 
// bind a new instance of our ViewModel to the page
ko.applyBindings( viewModel );
 
})();

//********************** Snippet 7 **********************//
<div id="create-todo">
                <input id="new-todo" data-class="newTodo" placeholder="What needs to be done?" />
                <span class="ui-tooltip-top" data-class="taskTooltip" style="display: none;">Press Enter to save this task</span>
            </div>
            <div id="todos">
                <div data-class="checkAllContainer" >
                    <input id="check-all" class="check" type="checkbox" data-class="checkAll" />
                    <label for="check-all">Mark all as complete</label>
                </div>
                <ul id="todo-list" data-class="todos" >
                    <li data-class="todoListItem" >
                        <div class="todo" data-class="todoListItemWrapper" >
                            <div class="display">
                                <input class="check" type="checkbox" data-class="todoCheckBox" />
                                <div class="todo-content" data-class="todoContent" style="cursor: pointer;"></div>
                                <span class="todo-destroy" data-class="todoDestroy"></span>
                            </div>
                            <div class="edit'>
                                <input class="todo-input" data-class="todoEdit'/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>


//*******************************************************//
// A Simple Mediator
//*******************************************************//

//********************** Snippet 1 **********************//

const mediator = {};

//********************** Snippet 2 **********************//

const orgChart = {
 
    addNewEmployee() {
   
      // getEmployeeDetail provides a view that users interact with
      const employeeDetail = this.getEmployeeDetail();
   
      // when the employee detail is complete, the mediator (the 'orgchart' object)
      // decides what should happen next
      employeeDetail.on("complete", function(employee){
   
        // set up additional objects that have additional events, which are used
        // by the mediator to do additional things
        const managerSelector = this.selectManager(employee);
        managerSelector.on("save", employee => {
          employee.save();
        });
   
      });
    },
   
    // ...
  };

//********************** Snippet 3 **********************//

const MenuItem = MyFrameworkView.extend({
 
    events: {
      "click .thatThing": "clickedIt"
    },
   
    clickedIt(e) {
      e.preventDefault();
   
      // assume this triggers "menu:click:foo"
      MyFramework.trigger(`menu:click:${this.model.get("name")}`);
    }
   
  });

// ... somewhere else in the app

class MyWorkflow {
  constructor() {
    MyFramework.on("menu:click:foo", this.doStuff, this);
  }

  doStuff() {
    // instantiate multiple objects here.
    // set up event handlers for those objects.
    // coordinate all of the objects into a meaningful workflow.
  }
}
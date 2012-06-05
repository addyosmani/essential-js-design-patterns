

Below can be found details of where diagrams supplied (once redone by the art department at O'Reilly) should be placed in the book.


Filename: constructor.png
Section: The Constructor Pattern
Placement: After the paragraph 

"Object constructors are used to create specific types of objects - both preparing the object for use and accepting arguments which a constructor can use to set the values of member properties and methods when the object is first created."

========================

Filename: module.png
Section: The Module Pattern
Placement: After the paragraph 

"In JavaScript, the module pattern is used to further emulate the concept of classes in such a way that we're able to include both public/private methods and variables inside a single object, thus shielding particular parts from the global scope. What this results in is a reduction in the likelihood of our function names conflicting with other functions defined in additional scripts on the page."

=========================

Filename: singleton.png
Section: The Singleton Pattern
Placement: After the paragraph 

"Clasically, the singleton pattern can be implemented by creating a class with a method that creates a new instance of the class if one doesn't exist.In the event of an instance already existing, it simply returns a reference to that object.The singleton pattern is thus known because it restricts instantiation of a class to a single object."

=========================

Filename: observer.png
Section: The Observer Pattern
Placement: After the paragraph 

The Observer is a design pattern where an an object (known as a subject) maintains a list of objects depending on it (observers), automatically notifying them of any changes to state.

=========================

Filename: publishsubscribe.png
Section: The Observer Pattern
Plaecment: After the paragraph

The Observer pattern requires that the observer (or object) wishing to receive topic notifications must subscribe this interest to the object firing the event (the subject).

=========================

Filename: mediator.png
Section: The Mediator Pattern
Placement: After the paragraph 

"A real-world analogy could be a typical airport traffic control system. A tower (Mediator) handles what planes can take off and land because all communications (notifications being listened out for or broadcast) are done from the planes to the control tower, rather than from plane-to-plane. A centralized controller is key to the success of this system and that's really the role a Mediator plays in software design."


=========================

Filename: prototype.png
Section: The Prototype Pattern
Placement: After the paragraph 

"We can think of the prototype pattern as being based on prototypal inheritance where we create objects which act as prototypes for other objects. The prototype object itself is effectively used as a blueprint for each object the constructor creates. If the prototype of the constructor function used contains a property called name for example (as per the code sample lower down), then each object created by that same constructor will also have this same property.."


=========================

Filename: command.png
Section: The Command Pattern
Placement: After the paragraph 

"Concrete classes are best explained in terms of class-based programming languages and are related to the idea of abstract classes. An abstract class defines an interface, but doesn't necessarily provide implementations for all of its member functions. It acts as a base class from which others are derived. A derived class which implements the missing functionality is called a concrete class."


=========================

Filename: facade.png
Section: The Facade Pattern
Placement: After the paragraph 

"When we put up a facade, we present an outward appearance to the world which may conceal a very different reality. This was the inspiration for the name behind the next pattern we're going to review - the Facade pattern. This pattern provides a convenient higher-level interface to a larger body of code, hiding its true underlying complexity. Think of it as simplifying the API being presented to other developers, something which almost always improves usability."



=========================

Filename: factory.png
Section: The Factory Pattern
Placement: After the paragraph 

"The Factory pattern is another creational pattern concerned with the notion of creating objects. Where it differs from the other patterns in its category is that it doesn't explicitly require us use a constructor. Instead, a Factory can provide a generic interface for creating objects, where we can specify the type of factory object we wish to be created."


=========================

Filename: mixins.png
Section: The Factory Pattern
Placement: After the paragraph 

"In JavaScript, we can look at inheriting from Mixins as a means of collecting functionality through extension. Each new object we define has a prototype from which it can inherit further properties. Prototypes can inherit from other object prototypes but can even more importantly, can define properties for any number of object instances. We can leverage this fact to promote function re-use and that's where Mixins come in."


=========================

Filename: decorator.png
Section: The Decorator Pattern
Placement: After the paragraph 

"Decorators can be used to modify existing systems where we wish to add additional features to objects without the need to heavily modify the underlying code using them. A common reason why developers use them is their applications may contain features requiring a large quantity of distinct types of object. Imagine having to define hundreds of different object constructors for say, a JavaScript game."


=========================

Filename: flyweight.png
Section: The Flyweight Pattern
Placement: After the paragraph 

"The Flyweight pattern is a classical structural solution for optimizing code that is repetitive, slow and inefficiently shares data. It aims to minimize the use of memory in an application by sharing as much data as possible with related objects (e.g application configuration, state and so on)."



=========================

Filename: mvc.png
Section: The MVC Pattern
Placement: After the paragraph 

"These frameworks include the likes of Backbone, Ember.js and AngularJS. Given the importance of avoiding "spaghetti" code, a term which describes code that is very difficult to read or maintain due to its lack of structure, it's imperative that the modern JavaScript developer understand what this pattern provides. This allows us to effectively appreciate what these frameworks enable us to do differently."


=========================

Filename: mvp.png
Section: The MVP Pattern
Placement: After the paragraph 

"The P in MVP stands for presenter. It's a component which contains the user-interface business logic for the view. Unlike MVC, invocations from the view are delegated to the presenter, which are decoupled from the view and instead talk to it through an interface. This allows for all kinds of useful things such as being able to mock views in unit tests."


=========================

Filename: mvvm.png
Section: The MVVM Pattern
Placement: After the paragraph 

"This facilitates UI and development work occurring almost simultaneously within the same codebase. UI developers write bindings to the ViewModel within their document markup (HTML), where the Model and ViewModel are maintained by developers working on the logic for the application."


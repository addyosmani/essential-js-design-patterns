//*******************************************************//
// Models
//*******************************************************//
// [ES2015+] We used new keyword const for immutable constant declaration

//********************** Snippet 1 **********************//
const Photo = Backbone.Model.extend({
  // Default attributes for the photo
  defaults: {
    src: 'placeholder.jpg',
    caption: 'A default image',
    viewed: false,
  },

  // Ensure that each photo created has an `src`.
  initialize: function() {
    this.set({ src: this.defaults.src });
  },
});

//********************** Snippet 2 **********************//
const PhotoGallery = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: Photo,

  // Filter down the list of all photos
  // that have been viewed
  viewed: function() {
    return this.filter(function(photo) {
      return photo.get('viewed');
    });
  },

  // Filter down the list to only photos that
  // have not yet been viewed
  unviewed: function() {
    return this.without.apply(this, this.viewed());
  },
});

//*******************************************************//
// Models
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new arrow function syntax

const buildPhotoView = (photoModel, photoController) => {
  const base = document.createElement('div');
  const photoEl = document.createElement('div');

  base.appendChild(photoEl);

  const render = () => {
    // We use a templating library such as Underscore
    // templating which generates the HTML for our
    // photo entry
    photoEl.innerHTML = _.template('#photoTemplate', {
      src: photoModel.getSrc(),
    });
  };

  photoModel.addSubscriber(render);

  photoEl.addEventListener('click', () => {
    photoController.handleEvent('click', photoModel);
  });

  const show = () => {
    photoEl.style.display = '';
  };

  const hide = () => {
    photoEl.style.display = 'none';
  };

  return {
    showView: show,
    hideView: hide,
  };
};


//********************** Snippet 2 **********************//
<li class="photo">
  <h2>{{caption}}</h2>
  <img class="source" src="{{src}}"/>
  <div class="meta-data">
    {{metadata}}
  </div>
</li>

//********************** Snippet 3 **********************//
<li class="photo">
  <h2><%= caption %></h2>
  <img class="source" src="<%= src %>"/>
  <div class="meta-data">
    <%= metadata %>
  </div>
</li>

//*******************************************************//
// Controllers
//*******************************************************//

//********************** Snippet 1 **********************//
// Controllers in Spine are created by inheriting from Spine.Controller

const PhotosController = Spine.Controller.sub({
  init: function() {
    this.item.bind('update', this.proxy(this.render));
    this.item.bind('destroy', this.proxy(this.remove));
  },

  render: function() {
    // Handle templating
    this.replace($('#photoTemplate').tmpl(this.item));
    return this;
  },

  remove: function() {
    this.el.remove();
    this.release();
  },
});

//********************** Snippet 2 **********************//
const PhotoRouter = Backbone.Router.extend({
  routes: { 'photos/:id': 'route' },

  route: function(id) {
    const item = photoCollection.get(id);
    const view = new PhotoView({ model: item });

    $('.content').html(view.render().el);
  },
});

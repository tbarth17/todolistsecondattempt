var ListItem = Backbone.Model.extend({});

var TodoListItemsCollection = Backbone.Collection.extend({
  model: ListItem
});

var TodoListView = Backbone.View.extend({
  tagName: 'ul',
  className: 'todo-list',
  initialize: function() {
    $('.container').append(this.el);
      this.listenTo(this.collection, 'add', function(todo) {
        new TodoListItemsView({model: todo});
      });
  }
});

var TodoListItemsView = Backbone.View.extend({
  tagName: 'li',

  events: {
    'click': 'completeToDo'
  },

  initialize: function() {
      this.$el.html(this.model.get('todo') + "  " + "<button class='complete'>Complete</button>");
      $('.todo-list').append(this.el);
  },

  completeToDo: function() {
    console.log(this);
    this.$el.toggleClass('strike');
  }
});

var CreateTodoListItemView = Backbone.View.extend({

    tagName: 'input',
    className: 'create-todo-item',
    attributes: {
      type: 'text'
    },

    events: { 'keyup': 'addToList'
  },

    addToList: function(event) {

      if (event.keyCode === 13) {
        var listItem = this.collection.add({todo: this.$el.val()});
      }
    },

    render: function() {
      $('.container').prepend(this.el);
    }
});

$(document).ready(function(){
   var todoListItems = new TodoListItemsCollection();
   var createTodoListItemView = new CreateTodoListItemView({collection: todoListItems});
   createTodoListItemView.render();
   var todoListView = new TodoListView({collection: todoListItems});

});
 $('input').click(function(){
   console.log('click');
 })
